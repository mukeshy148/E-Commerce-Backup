import axios from "axios";
import { useNavigation } from "expo-router";

import { UserType } from "@/UserContext";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useContext, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
const MyOrders = () => {
  const { userId, setUserId } = useContext(UserType);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  // to fetch Order Details
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get(
        `http://192.168.29.86:8000/order/${userId}`
      );
      const orders = response.data.orders;

      setOrders(orders);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  console.log("Orders fetched from DB : ", orders);

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // months start from 0
    const year = date.getFullYear();

    let hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format

     return `${day}/${month}/${year}, ${hours}:${minutes} ${ampm}`;
  };

  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
        
      }}
    >
      <ScrollView>
      {/* Past Orders */}
      <LinearGradient //It acts as a <View> now
        colors={["#01575c", "#2dc0c6", "#fff"]}
        start={{ x: 0, y: 0 }} // left
        end={{ x: 0, y: 1 }} // right
        style={{
          height: hp(20.2),
          flexDirection: "row",
          justifyContent: "center",
          gap: wp(2.5),
        }}
      >
        {/* Logo Section */}
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            alignItems: "center",
            marginTop: hp(2),
          }}
        >
          <Image
            style={{
              height: hp(10),
              width: wp(25),
              resizeMode: "contain",
            }}
            source={require("../assets/images/Amazon Logo.png")}
          />
          <Text
            style={{
              fontFamily: "poppins-bold",
              marginLeft: wp(1),
              marginBottom: hp(0.7),
            }}
          >
            Clone
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            alignItems: "center",
            top: hp(7),

            marginTop: hp(3),
          }}
        >
          <Text
            style={{
              fontFamily: "amazon-bold",
              color: "#2e2e2e",
              fontSize: wp(3.4),
            }}
          >
            Mukesh Y
          </Text>
        </View>
      </LinearGradient>

      
        <View style={{
          marginBottom:hp(20 )
        }}>
          {loading ? (
          <Text>Loading</Text>
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <Pressable
              key={order._id}
            >
              {order.cartItems?.map((item, index) => (
                <View
                  key={index}
                  style={{
                    height: hp(23),
                    marginBottom: hp(1),
                    marginHorizontal: wp(3.7),
                    marginVertical:wp(7),
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    borderRadius: wp(2.3),
                    borderWidth: wp(0.54),
                    borderColor: "#5d5d5d",
                  }}
                >
                  <View>
                    <Image
                      style={{
                        height: hp(15),
                        width: wp(30),
                        resizeMode: "contain",
                        // borderWidth: wp(0.6),
                      }}
                      source={{ uri: item?.image }}
                    />
                  </View>

                  <View
                    style={{
                      // backgroundColor:'pink',
                      width: wp(39),
                      alignItems: "center",
                      gap:wp(1.3)
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: hp(1.9),
                        fontFamily: "amazon-bold",
                      }}
                    >
                      {item?.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: hp(1.7),
                        fontFamily: "amazon-medium",
                        color: "#636363",
                      }}
                    >
                      Quantity: {item.quantity}
                    </Text>
                    <Text
                      style={{
                        fontSize: hp(1.7),
                        fontFamily: "amazon-medium",
                        color: "#787878",
                      }}
                    >
                      Price: ₹{item.price}
                    </Text>
                    <Text
                      style={{
                        fontSize: hp(1.7),
                        fontFamily: "amazon-medium",
                        color: "#787878",
                      }}
                    >
                      Ordered : {formatDateTime(order.createdAt)}
                    </Text>
                  </View>
                </View>
              ))}
            </Pressable>
          ))
        ) : (
          <Text>Items Not Found</Text>
        )}
        </View>
      </ScrollView>
    </View>
  );
};

export default MyOrders;

const styles = StyleSheet.create({});
