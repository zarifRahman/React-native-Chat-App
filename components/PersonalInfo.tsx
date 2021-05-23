import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  Button,
  Image,
  Text,
  Alert,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
// import ImgToBase64 from 'react-native-image-base64';
// import {CropView} from 'react-native-image-crop-tools';
import Styles from "./Styles";

type PersonalInfoProps = {
  onClosed: (name: string, image: any) => void;
};

const PersonalInfo = ({ onClosed }: PersonalInfoProps) => {
  const [name, setName] = useState("");
  const [imageSource, setImageSource] = useState(null);
  const selectImage = () => {
    let options: any = {
      title: "You can choose one image",
      maxWidth: 256,
      maxHeight: 256,
      noData: true,
      mediaType: "photo",
      storageOptions: {
        skipBackup: true,
      },
    };
    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        console.log("User cancelled photo picker");
        Alert.alert("You did not select any image");
      } else if (response?.error) {
        console.log("ImagePicker Error: ", response?.error);
      } else if (response?.customButton) {
        console.log("User tapped custom button: ", response?.customButton);
      } else {
        let source = { uri: response.uri };

        // ADD THIS
        setImageSource(source.uri);
        // setImageData(source.uri);
      }
    });
  };

  return (
    <SafeAreaView style={Styles.personalInfoContainer}>
      <Image
        style={Styles.logo}
        source={require("../assets/wired-brain-coffee-logo.png")}
      />
      <View style={Styles.enterYourName}>
        <Text style={Styles.nameText}>Please enter your name</Text>
        <TextInput
          style={Styles.nameTextInput}
          onChangeText={(text) => setName(text)}
          value={name}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        {imageSource === null ? (
          <Image
            source={require("../assets/wired-brain-coffee-logo.png")}
            style={Styles.imageBox}
            resizeMode="contain"
          />
        ) : (
          <Image
            source={
              imageSource
                ? { uri: imageSource }
                : require("../assets/wired-brain-coffee-logo.png")
            }
            style={Styles.imageBox}
            resizeMode="contain"
          />
        )}
      </View>

      {/* <ImageChooser onChangeImage={image => setImage(image)} /> */}
      <Button
        title="Start chatting!"
        onPress={() => onClosed(name, imageSource)}
      />
      <Button title="Upload Image" onPress={selectImage} />
    </SafeAreaView>
  );
};

export default PersonalInfo;
