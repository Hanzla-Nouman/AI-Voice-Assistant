import Features from "@/components/Features";
import React, { useState } from "react";
import { Image, SafeAreaView, StatusBar, Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const Home = () => {
  const [messages, setMessages] = useState([]);
  return (
    <>
      <View className="flex-1 bg-white">
   <StatusBar barStyle={"dark-content"} />

        <SafeAreaView className="mx-5 flex-1 ">
          <View className="justify-center items-center mt-4">
            <Image
              style={{ height: hp(20), width: hp(20) }}
              source={require("../assets/images/bot.png")}
            />
          </View>
          {messages.length > 0 ? (<>
          <View></View>
          </>):(<>
          <Features/>
          </>)}
        </SafeAreaView>
      </View>
    </>
  );
};

export default Home;
