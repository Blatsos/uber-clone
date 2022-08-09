import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";
import { store } from "./store";
import "react-native-gesture-handler";
import { KeyboardAvoidingView, Platform } from "react-native";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <Stack.Navigator>
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="MapScreen"
                component={MapScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
