import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "react-native";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export default function Index() {
  const navigation = useNavigation()
  return (
    <>
    <View className="bg-white flex-1">
   <StatusBar  barStyle={"dark-content"}/>

      <SafeAreaView className=" flex-1 my-7 flex items-center justify-around ">
        <View className="space-y-2">
          <Text style={{ fontSize: hp(5) }} className=" text-center font-bold text-gray-700">
            Uaghoos
          </Text>
          <Text style={{ fontSize: hp(2) }}  className=" text-center text-gray-600 tracking-wider font-semibold mx-2">I am here to help you with your queries.</Text>
        </View>
        <Image
        style={{ height: hp(50),width: wp(75) }}
          source={require("../assets/images/bot.png")}
          className="w-72 h-72"
        />
        <TouchableOpacity 
        onPress={()=>navigation.navigate('Home')}
          style={{width: wp(85) }}
        className="bg-emerald-700 p-4 mx-5 rounded-2xl">
          <Text
            style={{ fontSize: hp(3) }}
            className="font-semibold text-white text-center"
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
      </View>
    </>
  );
}
