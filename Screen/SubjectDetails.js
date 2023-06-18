import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import * as VideoThumbnails from 'expo-video-thumbnails';
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  FlatList,
  Alert,
} from "react-native";
import { BottomSheet } from "react-native-btr";
import { uid } from "uid";
import { getVideoDetailFromApi } from "../api/YoutubeDetail";
import { store } from "../firebase/firebaseConfig";
const { width, height } = Dimensions.get("window");
export default function SubjectDetails({ navigation, route }) {
  const [details, setdetails] = useState({});
  const [Url, setUrl] = useState("");
  const [Doubt, setDoubt] = useState("");
  
  const [Videos, setVideos] = useState([]);
  const [visible, setVisible] = useState(false);
  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };
  useEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.title,
      headerRight: () => {
        return (
          <>
            <TouchableOpacity
              onPress={() => {
                Alert.alert("Confirm Delete", "Are You sure? ", [
                  {
                    text: "Yes",
                    onPress: () =>
                      deleteDoc(
                        doc(store, "Subjects", route.params.title)
                      ).then(() => {
                        navigation.goBack();
                      }),
                  },
                  {
                    text: "No",
                    onPress: () => null,
                    style: "cancel",
                  },
                ]);
              }}
            >
              <AntDesign name="delete" size={24} color="black" />
            </TouchableOpacity>
          </>
        );
      },
    });
  }, [navigation]);
  useEffect(() => {
    onSnapshot(
      query(
        collection(store, "Subjects", route.params.title, "Video"),
        orderBy("Time", "desc")
      ),
      (snapshot) => {
        const Video = [];
        snapshot.forEach((data) => {
          Video.push({ ...data.data(), id: data.id });
          // console.log(data.data());
        });
        setVideos(Video);
      }
    );
  }, []);
  // console.log(Videos);
  

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <>
        <View style={styles.container}>
        
          <View
            style={{
              width: "100%",

              marginTop: 25,
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: 8,
            }}
          >
            <TextInput
              style={{
                width: "95%",
                height: 45,
                marginLeft: "auto",
                marginRight: "auto",
                backgroundColor: "white",
                borderRadius: 10,
                paddingLeft: 5,
                marginBottom:10
              }}
              placeholder="Paste Video Photo here..."
              onChangeText={(text) => setDoubt(text)}
              value={Doubt}
            />
            <TextInput
              style={{
                width: "95%",
                height: 45,
                marginLeft: "auto",
                marginRight: "auto",
                backgroundColor: "white",
                borderRadius: 10,
                paddingLeft: 5,
              }}
              placeholder="Paste Video URL here..."
              onChangeText={(text) => setUrl(text)}
              value={Url}
            />
            <TouchableOpacity
              style={{
                width: "100%",
                marginTop: 15,
              }}
              onPress={async() =>
              
            {      // const id = uid(7);
               
     
                  setDoc(
                    doc(
                      store,
                      "Subjects",
                      route.params.title,
                      "Video",
                      uid(16)
                    ),
                    {
                      VideoUrl: Url,
                      ThumbnailUrl:Doubt,
                      VideoTitle: Url.split("/")[3].replace(".mp4",""),
                      Time: serverTimestamp(),
                    }
                  ).then(() => {
                    setUrl("");
                  })
              }
              }
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  textDecorationLine: "underline",
                }}
              >
                SAVE
              </Text>
            </TouchableOpacity>
            <View
              style={{
                width: "95%",
                height: 2,
                backgroundColor: "#000",
                marginTop: 5,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
          </View>
          <FlatList
            data={Videos}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => {
              // console.log(item);
              return (
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                    marginLeft: 10,
                  }}
                >
               
                  <Text style={{ maxWidth: width * 0.45, marginRight: "auto" }}>
                    {item.VideoTitle}
                  </Text>
                  <TouchableOpacity
                    style={{
                      marginRight: "5%",
                      // alignItems: "center",
                      marginTop: "auto",
                      marginBottom: "auto",
                    }}
                    onPress={() => {
                      Alert.alert("Confirm Delete", "Are You sure? ", [
                        {
                          text: "Yes",
                          onPress: () =>
                            deleteDoc(
                              doc(
                                store,
                                "Subjects",
                                route.params.title,
                                "Video",
                                item.id
                              )
                            ),
                        },
                        {
                          text: "No",
                          onPress: () => null,
                          style: "cancel",
                        },
                      ]);
                    }}
                  >
                    <Ionicons
                      name="remove-circle-outline"
                      size={27}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>

        <StatusBar style="auto" />
      </>
    </TouchableWithoutFeedback>
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
