import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";

const DummyTestPage = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.wrapper,
        { bottom: insets.bottom + 10 }, // push it above the nav bar
      ]}
    >
      <LinearGradient
        colors={["#e0e0e0", "#f3f3f3", "white"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.bottomBar}
      >
        <Pressable
          onPress={() => navigation.replace("HomeScreen")}
          style={styles.iconWrapper}
        >
          <Ionicons name="home" size={22} color="#2a2a2a" />
          <Text style={styles.headings}>Home{" "}  </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.replace("ProfileScreen")}
          style={styles.iconWrapper}
        >
          <FontAwesome5 name="user-alt" size={20} color="#2a2a2a" />
          <Text style={styles.headings}>Profile{" "} </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.replace("CartScreen")}
          style={styles.iconWrapper}
        >
          <Ionicons name="cart-sharp" size={25} color="#2a2a2a" />
          <Text style={styles.headings}>Cart{" "} </Text>
        </Pressable>
      </LinearGradient>
    </View>
  );
};

export default DummyTestPage;

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 100,
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: wp(100),
    borderRadius: wp(5),
    height: hp(5.4),
    paddingHorizontal: wp(5),
    backgroundColor: "#fff",
    
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginTop:hp(2)
  },
  headings:{
    fontFamily:'amazon-regular',
    fontSize:wp(3.5)
  }
});
