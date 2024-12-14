import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "https://jsonplaceholder.typicode.com/users"

const initialState = {
    users: [],
    user: [],
    fetch_user_loading: false,
    fetch_user_error: null,
    searchQuery: '',

    fetch_userid_loading: false,
    fetch_userid_error: null,
}


export const fetchUsers = createAsyncThunk('users/fetchUsers', async(_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${baseUrl}`)
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})

export const fetchUserById = createAsyncThunk(
    "users/fetchUserById",
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${baseUrl}/${id}`);
        return response.data;
      } catch (error) {
        return rejectWithValue(
          error.response ? error.response.data : error.message
        );
      }
    }
  );



const userslice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setSearchQuerys: (state, action) => {
            state.searchQuery = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.fetch_user_loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.fetch_user_loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.fetch_user_loading = false;
                state.fetch_user_error = action.payload;
            })



            .addCase(fetchUserById.pending, (state) => {
                state.fetch_userid_loading = true;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.fetch_userid_loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.fetch_userid_loading = false;
                state.fetch_userid_error = action.payload;
            })
    }
})

export const selectFilteredUsers = (state) => {
    // Filter users based on search query
    const query = state.users.searchQuery.toLowerCase();
    return state.users.users.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query)
    );
};


export const { setSearchQuerys } = userslice.actions
export default userslice.reducer;