import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import { UserType } from "@/UserContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ProfileScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#2dc0c6",
        height: hp(16),
      },
      headerLeft: () => (
        <Image
          style={{
            height: hp(10),
            width: wp(33),
            marginLeft: wp(3),
            // backgroundColor:'pink'
          }}
          source={{
            uri: "https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png",
          }}
        />
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            gap: wp(3),
            marginRight: wp(6),
          }}
        >
          <Ionicons name="notifications-outline" size={24} color="black" />
          <AntDesign name="search1" size={24} color="black" />
        </View>
      ),
    });
  }, []);

  const [user, setUser] = useState();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `https://e-commerce-backup.onrender.com/profile/${userId}`
        );
        const { user } = response.data;
        // console.log("Datas from  ProfileScreen : ", user);

        setUser(user);
      } catch (error) {
        console.log("Error in ProfileScreen123 : ", error);
      }
    };
    fetchUserProfile();
  }, []);

  // to fetch Order Details
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get(
        `https://e-commerce-backup.onrender.com/profile/${userId}`
      );
      const orders = response.data.orders;

      setOrders(orders);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  console.log("Orders fetched from DB : ", orders);

  const logout = () => {
    clearAuthToken();
  };

  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("Auth Token is Removed by Logout");
    navigation.replace("LoginScreen");
  };
  return (
    <View>
      <Text
        style={{
          fontFamily: "amazon-bold",
          fontSize: wp(5.7),
          margin: wp(3),
          marginTop: hp(3.7),
        }}
      >
        Welcome {user?.name}{" "}
      </Text>

      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Pressable
          onPress={() => navigation.navigate("MyOrderScreen")}
          style={styles.buttons}
        >
          <Text style={styles.btnText}>Your Orders</Text>
        </Pressable>

        <Pressable style={styles.buttons}>
          <Text>Your Account</Text>
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Pressable style={[styles.buttons, { marginTop: hp(0) }]}>
          <Text style={styles.btnText}>Buy Again</Text>
        </Pressable>

        <Pressable
          onPress={logout}
          style={[styles.buttons, { marginTop: hp(0) }]}
        >
          <Text>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  buttons: {
    backgroundColor: "#c3c3c3",
    paddingVertical: hp(1.7),
    paddingHorizontal: wp(6),
    margin: wp(5),
    flex: 1,
    alignItems: "center",
    borderRadius: wp(10),
  },
  btnText: {
    fontFamily: "amazon-regular",
  },
});
