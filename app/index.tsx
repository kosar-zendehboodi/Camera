import React, { useState, useRef } from 'react';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View, TextInput, Alert, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Camera Permission Component
const CameraPermission = ({ onRequestPermission }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = () => {
        Alert.alert('Form Submitted', `Name: ${name}\nEmail: ${email}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Title</Text>
            <Icon name="camera" borderRadius={50} size={100} color="black" style={styles.icon} />
            <Button onPress={onRequestPermission} title="Take Picture" />
            <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
            <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

// Camera Screen Component
const CameraScreen = ({ onTakePicture, onRequestPermission }) => {
  const [facing, setFacing] = useState<CameraType>('back');
  const cameraRef = useRef(null);

  const takePicture = async () => {
      if (cameraRef.current) {
          const photo = await cameraRef.current.takePictureAsync();
          console.log('Photo URL:', photo.uri);
          Alert.alert('Picture taken!');
          onTakePicture(photo.uri);
      } else {
          onRequestPermission();
      }
  };

  return (
      <View style={styles.container}>
          <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
              <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.circleButton} onPress={takePicture} />
              </View>
          </CameraView>
      </View>
  );
};


const App = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState('');
  const [showCamera, setShowCamera] = useState(false);

  const handleRequestPermission = async () => {
      if (!permission || !permission.granted) {
          const { status } = await requestPermission();
          if (status === 'granted') {
              setShowCamera(true);
          } else {
              Alert.alert('Permission Denied', 'Camera access is required to take pictures.');
              setShowCamera(false); // Return to the form if permission is denied
          }
      } else {
          setShowCamera(true);
      }
  };

  if (showCamera) {
      return <CameraScreen onTakePicture={setPhotoUri} onRequestPermission={handleRequestPermission} />;
  }

  return <CameraPermission onRequestPermission={handleRequestPermission} />;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        marginTop: 20,
        padding: 10,
    },
    icon: {
        backgroundColor: "#d3d3d3",
        borderRadius: 100,
        padding: 10,
        marginBottom: 15,
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
        display: "flex",
        width: 70,
        height: 70,
        borderRadius: 50,
        backgroundColor: 'white',
        alignSelf: 'center',
        textAlign: "center"
    },
});

export default App;
