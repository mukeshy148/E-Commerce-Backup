import { useNavigation } from "expo-router";
import LottieView from "lottie-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const OrderScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ alignItems: "center" }}>
      <LottieView
        source={require("../assets/images/thumbs.json")}
        style={{
          height: hp(60),
          width: wp(60),
          marginTop: hp(10),
          alignSelf: "center",

          // backgroundColor:'#daa',
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />

      <LottieView
        source={require("../assets/images/sparkle.json")}
        style={{
          height: hp(125),
          width: wp(125),
          top: hp(-21.3),
          left: wp(-11.7),
          position: "absolute",
          zIndex: -1,
        }}
        autoPlay
        loop={true}
        speed={0.7}
      />

      <Text
        style={{
          fontFamily: "outfit-semiBold",
          fontSize: wp(6),
          bottom: wp(19),
          color: "#0f2458",
        }}
      >
        Your Order has been Placed
      </Text>
      <Pressable
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "HomeScreen" }],
          })
        }
        style={{
          // backgroundColor: "#d15151",
          backgroundColor: "#f49a07",
          width: wp(75),
          height: hp(8),
          alignItems: "center",
          justifyContent: "center",
          borderRadius: wp(20),
          marginTop: hp(3),

          borderWidth: wp(2.2), 
          borderColor: "#ffaf0e",
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-semiBold",
            fontSize: wp(4.2),
            color: "#fff",
          }}
        >
          Continue Shopping
        </Text>
      </Pressable>
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
