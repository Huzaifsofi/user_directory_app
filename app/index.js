import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, FlatList, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../store/features/userSlicer';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { setSearchQuerys, selectFilteredUsers } from '../store/features/userSlicer';
import { useRouter } from 'expo-router';

export default function index() {
    const router = useRouter();
    const dispatch = useDispatch();

    const handleUsermain = (id) => {
        router.push(`/users/${id}`)
    }


  const [fontsLoaded, error] = useFonts({
    'PlaywriteFRTradGuides-Regular': require('../assets/PlaywriteFRTradGuides-Regular.ttf'),
  });


  useEffect(() => {
    
    dispatch(fetchUsers());
  }, [dispatch]);

  // Only hide splash screen when fonts are loaded or error occurs
  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]); // Ensure that SplashScreen hides only when fontsLoaded or error change

  const isLoading = useSelector((state) => state.users.fetch_user_loading);
  const users = useSelector((state) => state.users.users);
  const searchQuery = useSelector((state) => state.users.searchQuery);
  const filteredUsers = useSelector(selectFilteredUsers);

  const handleSearch = (text) => {
    // Filter the data based on the search query
    dispatch(setSearchQuerys(text))
  };



  // If fonts are not loaded yet, return null to prevent rendering UI
  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <LinearGradient
      colors={['#d4fc79', '#96e6a1']}
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 1.0, y: 1.0 }}
      style={styles.background}
    >
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={
              <View>
                <View style={styles.headingCon}>
                  <Text>Search for users and connect</Text>
                  <Text style={styles.head2}>User Directory</Text>
                </View>

                <View>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search"
                  value={searchQuery}
                  onChangeText={handleSearch}
                />
                </View>
              </View>
            }
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.account_conn} onPress={() => handleUsermain(item.id)}>
                <View>
                  <Image
                    style={styles.image}
                    source={{ uri: `https://picsum.photos/200/300?random=${item.id}` }}
                   />
                </View>
                <View style={styles.acc_textarea}>
                  <Text style={styles.acc_text1}>{item.name}</Text>
                  <Text>{item.username}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingTop: 40,
    padding: 16,
  },
  container: {},
  head2: {
    fontSize: 27,
    fontFamily: 'PlaywriteFRTradGuides-Regular',
  },
  headingCon: {
    marginTop: 52,
  },
  account_conn: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  searchInput: {
    height: 50,
    borderColor: '#ccc',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 8 ,
  },
  image: {
    width: 50, // Set image width
    height: 50, // Set image height
    borderRadius: 50, // Optional: round the corners of the image
  },
  acc_textarea: {
    padding: 16
  },
  acc_text1: {
    fontSize: 20,
    fontWeight: '600'
  }
});
