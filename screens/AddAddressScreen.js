//1st Addresss page part

import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import { UserType } from "@/UserContext";
import Feather from "@expo/vector-icons/Feather";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

import Ionicons from "@expo/vector-icons/Ionicons";

const AddAddressScreen = () => {
  const navigation = useNavigation();

  const [addresses, setAddresses] = useState([]);
 
  const { userId, setUserId } = useContext(UserType);

  console.log("Selected Adress by Btn : ", selectedAddress);
  

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      console.log("Token from AsyncStorage:", token);

      if (!token) {
        console.warn("Token not found");
        return;
      }

      try {
        const decodedToken = jwt_decode(token);
        // console.log("Decoded JJJJJJJJJJJ:", decodedToken);
        const userId = decodedToken.userID;
        console.log("User ID mJmJMjMJMj ::", userId);

        setUserId(userId);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (addresses) {
      console.log(
        "✅ Address from Stored page (after state update):",
        addresses
      );
      console.log("User Id from Add Adresss Screen1234@ :", userId);
    }
  }, [addresses]);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://192.168.29.86:8000/address/${userId}`
      );

      const { addresses } = response.data;
      console.log("Response data123##:", response.data);
      setAddresses(addresses);
    } catch (error) {
      console.log("Error from AddAddressScreen fetchAfdressScreeen : ", error);
    }
    console.log(
      "Address from Stored page of AddAddress Screen12abc : ",
      addresses
    );
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content" // or "light-content"
      />
      <ScrollView>
        <View>
          <LinearGradient //Ut acts as a <View> now
            colors={["#0daab4", "#53d7df", "#ffff"]}
            start={{ x: 0, y: 0 }} // left
            end={{ x: 0, y: 1 }} // right
            style={{
              height: hp(23),
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
                  width: wp(20),
                  resizeMode: "contain",
                }}
                source={require("../assets/images/Amazon Logo.png")}
              />
              <Text
                style={{
                  fontFamily: "poppins-bold",
                  marginLeft: wp(1),
                  marginBottom: hp(0.7),
                  fontSize: wp(3),
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
                top: hp(6.7),

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

            {/* For Serach Icon and Text Input */}
            <Pressable style={styles.searchBoxContainer}>
              <Feather
                style={{ marginLeft: wp(2) }}
                name="search"
                size={24}
                color="black"
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search Product"
                placeholderTextColor="gray"
              />
            </Pressable>
            {/* Mic Icon */}
            <Feather
              style={{
                marginTop: hp(15.3),
              }}
              name="mic"
              size={24}
              color="black"
            />
          </LinearGradient>
        </View>

        <View>
          <Text
            style={{
              fontFamily: "amazon-bold",
              fontSize: wp(5),
              marginLeft: wp(3),
              marginTop: hp(2),
            }}
          >
            Your Addresses
          </Text>

          <Pressable
            onPress={() => navigation.navigate("Add")}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: hp(3),
              marginHorizontal: wp(3),
              paddingVertical: hp(1.4),

              borderWidth: wp(0.2),
              borderRadius: wp(2),
              borderColor: "gray",
            }}
          >
            <Text
              style={{
                fontFamily: "amazon-regular",
                fontSize: wp(3.7),
                marginLeft: wp(3),
              }}
            >
              Add a new Address
            </Text>
            <Feather
              style={{ marginRight: wp(2) }}
              name="chevron-right"
              size={24}
              color="black"
            />
          </Pressable>

          {/* All the Previous stored Address */}

          <Pressable>
            {addresses.map((item, index) => (
              <Pressable
                style={{
                  justifyContent: "space-between",
                  // alignItems: "center",
                  marginTop: hp(3),
                  marginHorizontal: wp(3),
                  paddingVertical: hp(1.6),
                  rowGap: hp(0.4),
                  borderWidth: wp(0.2),
                  borderRadius: wp(2),
                  borderColor: "gray",
                  backgroundColor: "#f6f6f6",
                }}
                key={index}
              >
                {/* Name and Location Icon */}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      fontFamily: "amazon-bold",
                      fontSize: wp(4),
                      marginLeft: wp(3),
                    }}
                  >
                    {item?.name}
                  </Text>
                  <Ionicons
                    style={{
                      marginLeft: wp(1.5),
                      marginBottom: hp(0.4),
                    }}
                    name="location-sharp"
                    size={20}
                    color="#c22828"
                  />
                </View>

                {/* HouseNo, Street  */}
                <Text
                  style={{
                    fontFamily: "amazon-regular",
                    fontSize: wp(3.7),
                    marginLeft: wp(3),
                  }}
                >
                  {item?.houseNo}, {item?.street},
                </Text>

                {/* Landmark */}
                <Text
                  style={{
                    fontFamily: "amazon-regular",
                    fontSize: wp(3.7),
                    marginLeft: wp(3),
                  }}
                >
                  {item?.landmark},
                </Text>

                {/* Postal Code */}
                <Text
                  style={{
                    fontFamily: "amazon-regular",
                    fontSize: wp(3.7),
                    marginLeft: wp(3),
                  }}
                >
                  Chennai - {item?.postalCode},
                </Text>

                {/* Mobile No */}
                <Text
                  style={{
                    fontFamily: "amazon-regular",
                    fontSize: wp(3.7),
                    marginLeft: wp(3),
                  }}
                >
                  Ph No : {item?.mobileNo}.
                </Text>

                  {/* Buttons */}
                <View style={{
                  flexDirection:'row',
                  marginLeft:wp(1.3)
                }}>
                  {/* Edit Btn */}
                  <Pressable style={styles.smallBtns}>
                    <Text
                      style={{
                        fontFamily: "amazon-regular",
                        fontSize: wp(3.5),
                      }}
                    >
                      Edit
                    </Text>
                  </Pressable>

                  {/* Remove Btn */}
                  <Pressable style={styles.smallBtns}>
                    <Text
                      style={{
                        fontFamily: "amazon-regular",
                        fontSize: wp(3.5),
                      }}
                    >
                      Remove
                    </Text>
                  </Pressable>

                  {/* Set as Default Btn */}
                  <Pressable style={styles.smallBtns}>
                    <Text
                      style={{
                        fontFamily: "amazon-regular",
                        fontSize: wp(3.5),
                      }}
                    >
                      Set as Default
                    </Text>
                  </Pressable>
                </View>
              </Pressable>
            ))}
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({
  searchBoxContainer: {
    marginTop: hp(14.5),
    marginLeft: wp(4),
    backgroundColor: "white",
    width: wp(84),
    height: hp(5),
    alignItems: "center",
    borderRadius: wp(1),
    flexDirection: "row",
  },
  searchInput: {
    marginLeft: wp(2),
    fontSize: 16,
    width: wp(81),
    color: "black",
    // fontWeight: "bold",
    fontFamily: "roboto",
  },
  smallBtns: {
    backgroundColor:'#ececec',
    alignItems: "center",
    marginTop: hp(1),
    marginBottom: hp(0.6),
    marginHorizontal: wp(1),
    paddingVertical: hp(0.7),
    paddingHorizontal:wp(2.7),
    borderWidth: wp(0.2),
    borderRadius: wp(2),
  },
});
