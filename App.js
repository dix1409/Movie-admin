import { StatusBar } from "expo-status-bar";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { BottomSheet } from "react-native-btr";
import { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SubjectDetails from "./Screen/SubjectDetails";
import HomeScreen from "./Screen/HomeScreen";
import { onAuthStateChanged } from "firebase/auth";
import LoginScreen from "./Screen/LoginScreen";
import { auth } from "./firebase/firebaseConfig";
import ForgetPassword from "./Screen/ForgetPassword";
const Stack = createNativeStackNavigator();

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true);
      } else {
        setUser(false);
      }
    });
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: true }}
            />
            <Stack.Screen name="SubjectDetails" component={SubjectDetails} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Forget"
              component={ForgetPassword}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
