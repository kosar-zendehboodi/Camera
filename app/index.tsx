
import React from 'react';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, TextInput, Alert, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const cameraRef = useRef(null);

  const handleSubmit = () => {
    Alert.alert('Form Submitted', `Name: ${name}\nEmail: ${email}`);
  };



  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Title</Text>
        <Icon name="camera"  borderRadius={50} size={100} color="black" style={styles.icon} />
        <Button onPress={requestPermission} title="Take Picture" />   
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    );
  }
  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
      console.log('Photo URL:', photo.uri); 
      Alert.alert('Picture taken!');
    }
  };

 

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.circleButton} onPress={takePicture}/>
        </View>
      </CameraView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,  
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
   
  },
  circleButton: {
    display:"flex",
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: 'white',
    alignSelf: 'center',
    textAlign:"center"
    
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 300,
    marginBottom: 20,
    marginTop:20,
    padding: 10,
  },
  icon:{
    backgroundColor:"#d3d3d3",
    borderRadius:100,
    padding:10,
    marginBottom:15,
  }
});

       