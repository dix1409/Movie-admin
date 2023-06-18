import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  Image,
  ImageBackground,
  Keyboard,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { BottomSheet } from "react-native-btr";
import { useEffect, useState } from "react";
import { RenderItem } from "../Components/SubjectRender";
import { SafeAreaView } from "react-native-safe-area-context";
import { StoreSubject } from "../functions/StoreSubject";
import { getSubjects } from "../functions/getSubjects";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { auth, store } from "../firebase/firebaseConfig";
const { width, height } = Dimensions.get("window");
export default function HomeScreen({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [Televisible, setTeleVisible] = useState(false);
  const [Doubt, setDoubt] = useState("");
  const [Share, setShare] = useState("");
  const [Subject, setSubject] = useState([]);
  const [SubjectName, setSubjectName] = useState("");
  const [ChannelUrl, setChannelUrl] = useState("");
  const toggleBottomNavigationView = () => {
    setVisible(false);
    setTeleVisible(false);
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL("https://aws.amazon.com/")
              }}
              style={{
                marginRight: 15,
                backgroundColor: "#50C878",

                padding: 8,
                borderRadius: 8,
              }}
            >

          <FontAwesome5 name="aws" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setTeleVisible(true);
              }}
              style={{
                marginRight: 15,
                backgroundColor: "#50C878",

                padding: 8,
                borderRadius: 8,
              }}
            >
              <Text>SocialMedia</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL("https://console.firebase.google.com/");
              }}
              style={{
                marginRight: 15,
                backgroundColor: "red",
                padding: 8,
                borderRadius: 8,
              }}
            >
              <Text>Security</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => auth.signOut()}>
              <AntDesign name="logout" size={24} color="black" />
            </TouchableOpacity>
          </>
        );
      },
    });
  }, [navigation]);

  useEffect(() => {
    onSnapshot(collection(store, "Subjects"), (snapshot) => {
      const Sub = [];
      snapshot.forEach((data) => {
        Sub.push(data.data());
      });

      setSubject(Sub);
    });
  }, []);
  const ImgOpacity =
    "https://res.cloudinary.com/dz7xfhqxk/image/upload/v1671258109/Image/hand-drawn-science-education-background_23-2148496142_uidknn.webp";

  const Images = [
    "https://res.cloudinary.com/dz7xfhqxk/image/upload/v1671258109/Image/pngtree-chemical-science-education-stationery-background-picture-image_1435864_i2olor.png",
    "https://res.cloudinary.com/dz7xfhqxk/image/upload/v1671258109/Image/hand-drawn-science-education-background_23-2148496142_uidknn.webp",
    "https://res.cloudinary.com/dz7xfhqxk/image/upload/v1671258109/Image/pngtree-math-improve-class-enrollment-blue-childlike-background-image_185980_sxf5u0.jpg",
  ];
  return (
    <SafeAreaView style={styles.container}>
      {Subject.length == 0 ? (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <Image
            source={{
              uri: "https://res.cloudinary.com/dz7xfhqxk/image/upload/v1671331030/Image/image-removebg-preview_ntpchq.png",
            }}
            style={{ width: "50%", height: 150 }}
          />
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 20, textAlign: "center" }}>
              No Channel Found!!
            </Text>
            <Text style={{ marginTop: 5, fontSize: 16 }}>
              Tap on + Add Channel to add a new Channel
            </Text>
          </View>
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: "center" }}>
          <FlatList
            data={Subject}
            style={{ flex: 1, width: "100%" }}
            keyExtractor={(val, index) => index}
            renderItem={({ item }) => {
              return (
                <ImageBackground
                  style={{
                    width: "95%",
                    height: 150,
                    marginLeft: "5%",
                    marginTop: 10,
                    borderRadius: 20,
                    overflow: "visible",
                  }}
                  imageStyle={{
                    borderRadius: 15,
                    opacity: item.ImgUrl === ImgOpacity ? 0.5 : 1,
                  }}
                  source={{
                    uri: item.ImgUrl,
                  }}
                >
                  <TouchableOpacity
                    style={{ width: "100%", height: "100%" }}
                    onPress={() =>
                      navigation.navigate("SubjectDetails", {
                        title: item.SubjectName,
                        uri:item.ImgUrl
                      })
                    }
                    activeOpacity={1}
                  >
                    <Text
                      style={{
                        paddingHorizontal: 25,
                        paddingTop: 10,
                        fontSize: 22,
                        color: "#fff",
                        textAlign: "center",
                        borderBottomColor: "black",
                        // borderBottomWidth:1
                      }}
                    >
                      {item.SubjectName}
                    </Text>
                  </TouchableOpacity>
                </ImageBackground>
              );
            }}
          />
        </View>
      )}

      <TouchableOpacity
        style={{
          backgroundColor: "#2888ff",
          width: "55%",
          position: "absolute",
          top: "90%",
          height: 52,
          left: "26%",
          borderRadius: 26,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
        onPress={() => setVisible(true)}
      >
        <AntDesign name="pluscircleo" size={24} color="white" />
        <Text style={{ color: "white", fontSize: 18, marginLeft: 8 }}>
          {" "}
          Add Channel
        </Text>
      </TouchableOpacity>
      <BottomSheet
        visible={Televisible}
        //setting the visibility state of the bottom shee
        onBackButtonPress={toggleBottomNavigationView}
        //Toggling the visibility state on the click of the back botton
        onBackdropPress={toggleBottomNavigationView}
        //Toggling the visibility state on the clicking out side of the sheet
      >
        {/*Bottom Sheet inner View*/}

        <View
          style={{
            backgroundColor: "rgba(252, 252, 252, 1)",
            width: width,
            // height: 350,
            // alignItems: "center",
            borderTopStartRadius: 25,
            borderTopEndRadius: 25,
          }}
        >
          <Text style={{ textAlign: "center", marginTop: 25, fontSize: 20 }}>
            Add Share Link
          </Text>
          <View style={styles.panel}>
            <Text
              style={{
                fontSize: 14,
                marginTop: 20,
                marginBottom: 10,
                textAlign: "left",
                width: "90%",
                marginLeft: 10,
              }}
            >
              Telegram Link
            </Text>
            <View
              style={{
                width: "90%",
                height: 40,
                borderWidth: 1,
                borderColor: "black",
              }}
            >
              <TextInput
                onChangeText={(text) => setDoubt(text)}
                style={{ width: "100%", height: "100%", marginLeft: 8 }}
                value={Doubt}
              />
            </View>
            <Text
              style={{
                fontSize: 14,
                marginTop: 20,
                marginBottom: 10,
                textAlign: "left",
                width: "90%",
                marginLeft: 10,
              }}
            >
              Share Link
            </Text>
            <View
              style={{
                width: "90%",
                height: 40,
                borderWidth: 1,
                borderColor: "black",
              }}
            >
              <TextInput
                onChangeText={(text) => setShare(text)}
                style={{ width: "100%", height: "100%", marginLeft: 8 }}
                value={Share}
              />
            </View>
            <TouchableOpacity
              style={{
                width: "50%",
                marginLeft: "auto",
                marginRight: "auto",
                height: 50,
                backgroundColor: "#2888ff",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                marginVertical: 30,
              }}
              onPress={async () => {
                try {
                  setDoc(doc(store, "Share", "link"), {
                    ShareLink: Share,
                    TelegramLink: Doubt,
                  }).then(() => {
                    Keyboard.dismiss();
                    setTeleVisible(false);
                    setDoubt("");
                    setShare("");
                    alert("Successfully Added.");
                  });

                  Keyboard.dismiss();
                  setVisible(false);
                  setDoubt("");
                } catch (e) {
                  alert("Error: " + e.message);
                }
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 18,

                  textTransform: "uppercase",
                }}
              >
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
      <BottomSheet
        visible={visible}
        //setting the visibility state of the bottom shee
        onBackButtonPress={toggleBottomNavigationView}
        //Toggling the visibility state on the click of the back botton
        onBackdropPress={toggleBottomNavigationView}
        //Toggling the visibility state on the clicking out side of the sheet
      >
        {/*Bottom Sheet inner View*/}

        <View
          style={{
            backgroundColor: "rgba(252, 252, 252, 1)",
            width: "100%",
            // height: 350,
            borderTopStartRadius: 25,
            borderTopEndRadius: 25,
          }}
        >
          <Text style={{ textAlign: "center", marginTop: 25, fontSize: 20 }}>
            Add Channel
          </Text>
          <View style={styles.panel}>
            <Text
              style={{
                fontSize: 14,
                marginTop: 20,
                marginBottom: 10,
                textAlign: "left",
                width: "90%",
                marginLeft: 10,
              }}
            >
              Channel Name
            </Text>
            <View
              style={{
                width: "90%",
                height: 40,
                borderWidth: 1,
                borderColor: "black",
              }}
            >
              <TextInput
                onChangeText={(text) => setSubjectName(text)}
                style={{ width: "100%", height: "100%", marginLeft: 8 }}
                value={SubjectName}
              />
            </View>
            <Text
              style={{
                fontSize: 14,
                marginTop: 20,
                marginBottom: 10,
                textAlign: "left",
                width: "90%",
                marginLeft: 10,
              }}
            >
              Channel Photo
            </Text>
            <View
              style={{
                width: "90%",
                height: 40,
                borderWidth: 1,
                borderColor: "black",
              }}
            >
              <TextInput
                onChangeText={(text) => setChannelUrl(text)}
                style={{ width: "100%", height: "100%", marginLeft: 8 }}
                value={ChannelUrl}
              />
            </View>
            <TouchableOpacity
              style={{
                width: "50%",
                height: 50,
                backgroundColor: "#2888ff",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                marginVertical: 30,
              }}
              onPress={async () => {
                try {
                  const val = await StoreSubject({
                    title: SubjectName.trim(),
                    url: ChannelUrl,
                  });
                  Keyboard.dismiss();
                  setVisible(!val);
                  setSubjectName("");
                  setChannelUrl("");
                } catch (e) {
                  alert("Error: " + e.message);
                }
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 18,

                  textTransform: "uppercase",
                }}
              >
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e2eefe",
  },
  panel: {
    paddingHorizontal: 20,
    paddingBottom: 20,

    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
    marginBottom: "auto",
    alignItems: "center",
  },
});
