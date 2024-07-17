import React from 'react'
import { Image, Text, View } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
const Features = () => {
  return (
   <View style={{height:hp(60)}}className = "space-y-4">
<Text style={{fontSize:wp(6.5)}} className="font-semibold text-gray-700">Features</Text>
<View className="bg-emerald-200 p-4 rounded-xl space-y-2">
<View className="flex-row items-center space-x-1">
    <Image source={require('../assets/images/bot.png')} style={{height:hp(6),width:hp(6)}}/>
    <Text style={{fontSize:hp(2)}} className="font-semibold text-gray-700">ChatGPT</Text>
</View>
<Text style={{fontSize:hp(1.8)}} className="font-medium text-gray-700">
    Lorem ipsum dolor sit amet consect adipisicing elit. Volupt maiores dicta beatae iure a
</Text>
</View>
<View className="bg-purple-200 p-4 rounded-xl space-y-2">
<View className="flex-row items-center space-x-1">
    <Image source={require('../assets/images/bot.png')} style={{height:hp(6),width:hp(6)}}/>
    <Text style={{fontSize:hp(2)}} className="font-semibold text-gray-700">DALL-E</Text>
</View>
<Text style={{fontSize:hp(1.8)}} className="font-medium text-gray-700">
    Lorem ipsum dolor sit amet consect adipisicing elit. Volupt maiores dicta beatae iure a
</Text>
</View>
<View className="bg-cyan-200 p-4 rounded-xl space-y-2">
<View className="flex-row items-center space-x-1">
    <Image source={require('../assets/images/bot.png')} style={{height:hp(6),width:hp(6)}}/>
    <Text style={{fontSize:hp(2)}} className="font-semibold text-gray-700">Smart AI</Text>
</View>
<Text style={{fontSize:hp(1.8)}} className="font-medium text-gray-700">
    Lorem ipsum dolor sit amet consect adipisicing elit. Volupt maiores dicta beatae iure a
</Text>
</View>
   </View>
  )
}

export default Features