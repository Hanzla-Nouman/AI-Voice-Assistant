import Features from "@/components/Features";
import { dummyMessages } from "@/constants/mesages";
import React, { useState, useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
const Home = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollToDown = useRef();
  const inputRef = useRef();

  const handleText = (e) => {
    setText(e);
  };

  const getResponse = async (prompt) => {
    inputRef.current.blur();
    console.log(1);
    let newMessages = [...messages];
    try {
      scrollToDown?.current?.scrollToEnd({ animated: true });
      if (text.trim().length > 0) {
        console.log("trying", text);

        newMessages.push({ role: "user", content: text });
        setText("");
        setMessages([...newMessages]);
      }
      console.log("Posting", prompt);
      console.log("Messages", messages);

      setLoading(true);
      const res = await fetch("http://192.168.100.3:4000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
        }),
      });
      console.log("Response", res);
      const data = await res.json();
      setLoading(false);
      console.log("returned data", data);

      console.log("doing");
      newMessages.push({ role: "assistant", content: data });
      setMessages([...newMessages]);
      scrollToDown?.current?.scrollToEnd({ animated: true });
    } catch (error) {
      console.log("Error: " + error);
    }
  };
  useEffect(() => {
    scrollToDown?.current?.scrollToEnd({ animated: true });
    inputRef?.current?.focus();
  }, []);

  return (
    <>
      <View className="flex-1 bg-white justify-around">
        <StatusBar barStyle={"dark-content"} />

        <SafeAreaView className=" mt-6 flex-1 justify-around ">
          <>
            <View className="flex-row items-center justify-between py-2 px-4">
              <View className="flex-row items-center space-x-2 justify-center">
                <Image
                  style={{ height: hp(5), width: hp(5) }}
                  source={require("../assets/images/robot.png")}
                />
                <Text
                  style={{ fontSize: wp(5) }}
                  className="text-gray-700 font-medium "
                >
                  Assistant
                </Text>
              </View>
              <Ionicons name="menu" size={30} color="black" />
            </View>
            <View className="space-y-2 flex-1 ">
              <View style={{}} className="bg-neutral-300 px-4 pt-2">
                {!messages.length === 0 ? (
                  <ScrollView
                    overScrollMode="never"
                    bounces={false}
                    className="space-y-2 h-full "
                    showsVerticalScrollIndicator={false}
                    ref={scrollToDown}
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
                                style={{}}
                                className="bg-emerald-100 max-w-[300]  rounded-xl p-2 rounded-tl-none"
                              >
                                <Text>{message.content}</Text>
                              </View>
                            </View>
                          );
                        }
                      } else {
                        return (
                          <View key={index} className="flex-row justify-end ">
                            <View
                              style={{}}
                              className="bg-white rounded-xl max-w-[300] p-2 rounded-tr-none"
                            >
                              <Text>{message.content}</Text>
                            </View>
                          </View>
                        );
                      }
                    })}
                    {messages.length === 0 && (
                      <View className="justify-center items-center flex-1  ">
                        <Image
                          source={require("../assets/images/chat-gpt.png")}
                          style={{ height: hp(5), width: hp(5) }}
                        />
                      </View>
                    )}
                  </ScrollView>
                ) : (
                  <View className="justify-center items-center  h-full ">
                    <Image
                      source={require("../assets/images/chat-gpt.png")}
                      style={{ height: hp(5), width: hp(5) }}
                    />
                  </View>
                )}
              </View>
            </View>
            {loading && (
              <ActivityIndicator
                className=" bg-neutral-300 "
                size={"large"}
                color={"green"}
              />
            )}
          </>

          <View className="bg-neutral-300 ">
            <View className=" relative flex-row items-center  my-1 mx-1 ">
              <TextInput
                className=" font-normal   text-lg p-3  w-full   rounded-3xl pl-5 bg-white"
                onChangeText={(e) => handleText(e)}
                value={text}
                multiline
                placeholder="Ask anything..."
                ref={inputRef}
              />
              <TouchableHighlight
                className=" right-1 bottom-1 absolute bg-emerald-500 rounded-full p-2 "
                onPress={() => getResponse(text)}
              >
                <Ionicons name="send" size={27} color="white" />
              </TouchableHighlight>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </>
  );
};

export default Home;
