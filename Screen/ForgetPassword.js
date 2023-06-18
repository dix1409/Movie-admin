import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../firebase/firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
export default function ForgetPassword(props) {
  const [email, setemail] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 15 }}>
        <Text style={{ fontSize: 24, textAlign: "center" }}>
          Forget Password
        </Text>
      </View>
      <View style={{ marginTop: "10%", marginHorizontal: "5%" }}>
        <Text>Email:</Text>
        <TextInput
          placeholder="Enter Your email address.."
          style={{
            height: 40,
            backgroundColor: "white",
            paddingLeft: 5,
            borderRadius: 5,
          }}
          value={email}
          onChangeText={(text) => setemail(text)}
          autoCapitalize={false}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#2888ff",
            height: 45,
            marginHorizontal: "10%",
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            marginTop: "15%",
            width: "70%",
          }}
          onPress={() => {
            sendPasswordResetEmail(auth, email)
              .then(() => {
                alert("Please check your mail...");
              })
              .catch(() => {
                alert("network error...");
              });
          }}
        >
          <Text style={{ color: "white" }}>Forget Password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
  },
});
