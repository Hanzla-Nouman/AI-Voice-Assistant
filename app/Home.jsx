import Features from "@/components/Features";
import { dummyMessages } from "@/constants/mesages";
import React, { useState,useEffect } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  ScrollViewBase,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Voice from '@react-native-community/voice';
const Home = () => {
  const [pitch, setPitch] = useState('');
  const [error, setError] = useState('');
  const [end, setEnd] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);
  const  onSpeechStart = (e) => {
    setStarted('True')
};
const onSpeechEnd = () => {
    setStarted(null);
    setEnd('True');
};
const onSpeechError = (e) => {
    setError(JSON.stringify(e.error));
};
const onSpeechResults = (e) => {
    setResults(e.value)
};
const onSpeechPartialResults = (e) => {
    setPartialResults(e.value)
};
const onSpeechVolumeChanged = (e) => {
    setPitch(e.value)
};
  const [messages, setMessages] = useState(dummyMessages);
  const [recording, setRecording] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const handleClear = () => {
    setMessages([]);
  };
  const handleStop = () => {
    setRecording(false);
    setSpeaking(false);
  };
  const handleStopRecord = () => {
    setSpeaking(false);
    setRecording(false);
  };
  const handleRecord = () => {
    setSpeaking(true);
    setRecording(true);
  };
  const startSpeechRecognizing = async () => {
    
    setRecording(true)
    setSpeaking(true);
    setPitch('')
    setError('')
    setStarted('')
    setResults([])
    setPartialResults([])
    setEnd('')
    try {
      console.log("recording")
        await Voice.start('en-US',
            {EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS: 10000});
        } catch (e) {
        console.error(e);
        }
};
const stopSpeechRecognizing = async () => {
    try {
      console.log("recording stopped")
      await Voice.stop();
      setSpeaking(false);
      setRecording(false)
      setStarted(null);
    } catch (e) {
      console.error(e);
    }
};
useEffect(() => {
  Voice.onSpeechStart = onSpeechStart;
  Voice.onSpeechEnd = onSpeechEnd;
  Voice.onSpeechError = onSpeechError;
  Voice.onSpeechResults = onSpeechResults;
  Voice.onSpeechPartialResults = onSpeechPartialResults;
  Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;
}, [])

  return (
    <>
      <View className="flex-1 bg-white justify-around">
        <StatusBar barStyle={"dark-content"} />

        <SafeAreaView className="mx-5 my-4 flex-1 justify-around ">
          <View className=" flex-row justify-center items-center mt-4">
            <Image
              style={{ height: hp(20), width: hp(20) }}
              source={require("../assets/images/bot.png")}
            />
          </View>
          {messages.length > 0 ? (
            <>
              <View className="space-y-2 flex-1 ">
                <Text
                  style={{ fontSize: wp(5) }}
                  className="text-gray-700 font-semibold ml-1"
                >
                  Assistant
                </Text>
                {partialResults.map((result, index) => {
         return (
           <Text key={`partial-result-${index}`} style={ styles.resultBox }>
              {result}
           </Text>
         ); })}
                <View
                  style={{ height: hp(56) }}
                  className="bg-neutral-300 rounded-3xl p-4"
                >
                  <ScrollView
                    overScrollMode="never"
                    bounces={false}
                    className="space-y-4"
                    showsVerticalScrollIndicator={false}
                  >
                    {messages.map((message, index) => {
                      if (message.role === "assistant") {
                        if (message.content.includes("https")) {
                          return (
                            <View
                              key={index}
                              className="flex-row justify-start"
                            >
                              <View className=" p-2 rounded-2xl rounded-tl-none bg-emerald-100">
                                <Image
                                  resizeMode="contain"
                                  className="rounded-xl"
                                  style={{ width: wp(60), height: wp(60) }}
                                  source={{
                                    uri: message.content,
                                  }}
                                />
                              </View>
                            </View>
                          );
                        } else {
                          return (
                            <View
                              key={index}
                              className="flex-row justify-start"
                            >
                              <View
                                style={{ width: wp(70) }}
                                className="bg-emerald-100 rounded-xl p-2 rounded-tl-none"
                              >
                                <Text>{message.content}</Text>
                              </View>
                            </View>
                          );
                        }
                      } else {
                        return (
                          <View key={index} className="flex-row justify-end">
                            <View
                              style={{ width: wp(70) }}
                              className="bg-white rounded-xl p-2 rounded-tr-none"
                            >
                              <Text>{message.content}</Text>
                            </View>
                          </View>
                        );
                      }
                    })}
                  </ScrollView>
                </View>
              </View>
            </>
          ) : (
            <>
              <Features />
            </>
          )}
          <View className="flex justify-center items-center mb-3">
            {recording ? (
              <TouchableOpacity
               
                className="border-4 p-2 rounded-full"
              >
                <Image
                  style={{ height: hp(6), width: hp(6) }}
                  source={require("../assets/images/mic.png")}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={startSpeechRecognizing}
                className="border-4 p-2 rounded-full"
              >
                <Image
                  style={{ height: hp(6), width: hp(6) }}
                  source={require("../assets/images/mic1.png")}
                />
              </TouchableOpacity>
            )}

            {messages.length > 0 && (
              <TouchableOpacity
                onPress={handleClear}
                className="bg-neutral-400 rounded-3xl p-2 absolute right-10"
              >
                <Text className="text-white font-semibold text-md px-2">
                  Clear
                </Text>
              </TouchableOpacity>
            )}
            {speaking && (
              <TouchableOpacity
                onPress={stopSpeechRecognizing }
                className="bg-red-400 rounded-3xl p-2 absolute left-10"
              >
                <Text className="text-white font-semibold text-md px-2">
                  Stop
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaView>
      </View>
    </>
  );
};

export default Home;
// import * as React from 'react';
// import { View, StyleSheet, Button } from 'react-native';
// import * as Speech from 'expo-speech';

// export default function Home() {
//   const speak = () => {
//     const thingToSay = 'God is one. And I am using expo speech 1 2 4';
//     Speech.speak(thingToSay);
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Press" onPress={speak} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#ecf0f1',
//     padding: 8,
//   },
// });


// import { useState } from 'react';
// import { View, StyleSheet, Button } from 'react-native';
// import { Audio } from 'expo-av';

// export default function Home() {
//   const [recording, setRecording] = useState();
//   const [permissionResponse, requestPermission] = Audio.usePermissions();

//   async function startRecording() {
//     try {
//       if (permissionResponse.status !== 'granted') {
//         console.log('Requesting permission..');
//         await requestPermission();
//       }
//       await Audio.setAudioModeAsync({
//         allowsRecordingIOS: true,
//         playsInSilentModeIOS: true,
//       });

//       console.log('Starting recording..');
//       const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
//       );
//       setRecording(recording);
//       console.log('Recording started');
//     } catch (err) {
//       console.error('Failed to start recording', err);
//     }
//   }

//   async function stopRecording() {
//     console.log('Stopping recording..');
//     setRecording(undefined);
//     await recording.stopAndUnloadAsync();
//     await Audio.setAudioModeAsync(
//       {
//         allowsRecordingIOS: false,
//       }
//     );
//     const uri = recording.getURI();
//     console.log('Recording stopped and stored at', uri);
//   }

//   return (
//     <View style={styles.container}>
//       <Button
//         title={recording ? 'Stop Recording' : 'Start Recording'}
//         onPress={recording ? stopRecording : startRecording}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#ecf0f1',
//     padding: 10,
//   },
// });
