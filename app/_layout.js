import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from '../store/store'

export default function RootLayout() {
  return (
    <Provider store={store}>
        <Stack>
            {/* Hide header for the home page */}
            <Stack.Screen name="index" options={{ headerShown: false }} />
            {/* Hide header for the user details page */}
            <Stack.Screen name="users/[id]" options={{ headerShown: true }} />
        </Stack>
    </Provider>
  );
}
