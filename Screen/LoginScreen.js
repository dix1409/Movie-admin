import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../firebase/firebaseConfig";
const { width, height } = Dimensions.get("window");
export default function LoginScreen({ navigation }) {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let keyboardHeight = new Animated.Value(0);
  const IMAGE_HEIGHT = height * 0.25;
  let imageHeight = new Animated.Value(IMAGE_HEIGHT);
  useEffect(() => {
    let keyboardWillShowSub = Keyboard.addListener(
      "keyboardWillShow",
      keyboardWillShow
    );
    let keyboardWillHideSub = Keyboard.addListener(
      "keyboardWillHide",
      keyboardWillHide
    );

    return () => {
      keyboardWillShowSub.remove();
      keyboardWillHideSub.remove();
    };
  }, []);
  const keyboardWillShow = (event) => {
    Animated.parallel([
      Animated.timing(keyboardHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height,
      }),
      Animated.timing(imageHeight, {
        duration: event.duration,
        toValue: IMAGE_HEIGHT_SMALL,
      }),
    ]).start();
  };

  const keyboardWillHide = (event) => {
    Animated.parallel([
      Animated.timing(keyboardHeight, {
        duration: event.duration,
        toValue: 0,
      }),
      Animated.timing(imageHeight, {
        duration: event.duration,
        toValue: IMAGE_HEIGHT,
      }),
    ]).start();
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/login.jpg")}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: height * 0.35,
        }}
      >
        <Animated.Image
          source={require("../assets/logo-removebg-preview.png")}
          style={{ height: imageHeight, maxWidth: "100%" }}
          resizeMode="contain"
        />
      </View>
      <Text style={{ textAlign: "center", color: "white" }}>{error}</Text>
      <View style={{ marginHorizontal: "5%", marginTop: "10%" }}>
        <Text style={{ textAlign: "left", color: "white" }}>Email</Text>
        <TextInput
          placeholder="Email"
          style={{
            // width: "90%",
            height: 50,
            paddingLeft: 5,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "black",
            backgroundColor: "white",
          }}
          value={email}
          onChangeText={(txt) => {
            setemail(txt);
          }}
          autoCapitalize={false}
        />
        <Text style={{ textAlign: "left", marginTop: 15, color: "white" }}>
          Password
        </Text>
        <TextInput
          placeholder="Password"
          style={{
            // width: "90%",
            height: 50,
            paddingLeft: 5,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "black",
            backgroundColor: "white",
          }}
          value={password}
          onChangeText={(txt) => {
            setPassword(txt);
          }}
          secureTextEntry
        />

        <TouchableOpacity
          style={{
            backgroundColor: "#2888ff",
            height: 45,
            marginHorizontal: "10%",
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            marginTop: "5%",
          }}
          onPress={() => {
            signInWithEmailAndPassword(
              auth,
              email.trim(),
              password.trim()
            ).catch((err) => {
              switch (err.code) {
                case "auth/email-already-exists":
                  setError("Email already in use !");
                  break;
                case "auth/invalid-email":
                  setError("Email and Password is incorrect");
                  break;
                case "auth/invalid-password":
                  setError("Password is incorrect");
                  break;
                case "auth/user-not-found":
                  setError("user not registered");
                  break;
                case "auth/wrong-password":
                  setError("The email or password is incorrect");
              }
            });
          }}
        >
          <Text style={{ color: "white" }}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginTop: "5%" }}
          onPress={() => navigation.navigate("Forget")}
        >
          <Text
            style={{
              textAlign: "center",
              textDecorationLine: "underline",
              color: "white",
            }}
          >
            Forget Password?
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
