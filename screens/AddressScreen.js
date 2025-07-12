//2nd Addresss page part

import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useContext, useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import jwt_decode from "jwt-decode"; // ✅ Works with v3.1.2

import { UserType } from "../UserContext";

import axios from "axios";
import { useNavigation } from "expo-router";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const AddressScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState();
  const [mobileNo, setMobileNo] = useState();
  const [houseNo, setHouseNo] = useState();
  const [street, setStreet] = useState();
  const [landmark, setLandmark] = useState();
  const [postalCode, setPostalCode] = useState();

  const { userId, setUserId } = useContext(UserType);

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
        console.log("Decoded token1234444:", decodedToken);
        const userId = decodedToken.userID;

        setUserId(userId);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    };

    fetchUser();
  }, []);

  console.log("User JWT Toekn :: :", userId);

  

  const handleAddAddress = () => {
    const address = {
      name,
      mobileNo,
      houseNo,
      street,
      landmark,
      postalCode,
    };
    

    axios
      .post("https://e-commerce-backup.onrender.com/address", { userId, address })
      .then((response) => {
        console.log("Addresss is 123: ", address);

        Alert.alert("Success", "Address added Successfully...");
        setName("");
        setMobileNo("");
        setHouseNo("");
        setStreet("");
        setLandmark("");
        setPostalCode("");

        setTimeout(() => {
          navigation.goBack();
        }, 500);
      })
      .catch((error) => {
        Alert.alert("EROOR to Add Address", error);
      });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <LinearGradient //It acts as a <View> now
        colors={["#0daab4", "#92ecf1", "#ffff"]}
        start={{ x: 0, y: 0 }} // left
        end={{ x: 0, y: 1 }} // right
        style={{
          height: hp(5),
          flexDirection: "row",
          justifyContent: "center",
          gap: wp(2.5),
          marginBottom: hp(2),
        }}
      />

      {/* Add New Address */}
      <View>
        <Text style={styles.headerText}>Add a new Address</Text>
        <TextInput
          placeholder="India"
          placeholderTextColor="#000"
          style={styles.inputBox}
        />
      </View>

      {/*Full Name  */}
      <View>
        <Text style={styles.headerText}>Full Name</Text>
        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Enter your Name"
          placeholderTextColor="#a3a3a3"
          style={styles.inputBox}
        />
      </View>

      {/* Mobile No */}
      <View>
        <Text style={styles.headerText}>Mobile Number</Text>
        <TextInput
          value={mobileNo}
          onChangeText={(text) => setMobileNo(text)}
          placeholder="Mobile No"
          placeholderTextColor="#a3a3a3"
          keyboardType="phone-pad"
          style={styles.inputBox}
        />
      </View>

      {/* Flat No */}
      <View>
        <Text style={styles.headerText}>Flat, House No, Building, Company</Text>
        <TextInput
          value={houseNo}
          onChangeText={(text) => setHouseNo(text)}
          placeholder=""
          placeholderTextColor="#a3a3a3"
          style={styles.inputBox}
        />
      </View>

      {/* Area */}
      <View>
        <Text style={styles.headerText}>Area, Street</Text>
        <TextInput
          value={street}
          onChangeText={(text) => setStreet(text)}
          placeholder=""
          placeholderTextColor="#a3a3a3"
          style={styles.inputBox}
        />
      </View>

      {/* Landmark */}
      <View>
        <Text style={styles.headerText}>Landmark</Text>
        <TextInput
          value={landmark}
          onChangeText={(text) => setLandmark(text)}
          placeholder="Near Appollo Hospital"
          placeholderTextColor="#a3a3a3"
          style={styles.inputBox}
        />
      </View>

      {/* PinCode */}
      <View>
        <Text style={styles.headerText}>Pincode</Text>
        <TextInput
          value={postalCode}
          onChangeText={(text) => setPostalCode(text)}
          placeholder="Enter Pincode"
          placeholderTextColor="#a3a3a3"
          keyboardType="phone-pad"
          style={styles.inputBox}
        />
      </View>

      {/* Add Adderess Btn */}
      <Pressable
        onPress={handleAddAddress}
        style={{
          alignItems: "center",
          backgroundColor: "#fadc03",
          paddingVertical: hp(2),
          marginHorizontal: wp(3.7),
          borderRadius: wp(2),
          marginTop: hp(3.5),
        }}
      >
        <Text
          style={{
            fontFamily: "amazon-regular",
          }}
        >
          Add Adderess
        </Text>
      </Pressable>

      <View
        style={{
          backgroundColor: "#fff",
          height: hp(40),
        }}
      />
    </ScrollView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  headerText: {
    fontFamily: "amazon-bold",
    fontSize: wp(4),
    marginLeft: wp(3),
    marginTop: hp(1.4),
  },

  inputBox: {
    borderWidth: wp(0.2),
    borderRadius: wp(1.2),
    borderColor: "#b2b2b2",
    marginHorizontal: wp(3.5),
    fontFamily: "amazon-regular",
    paddingLeft: wp(2),
    marginTop: hp(1.5),
    marginBottom: hp(1),
    // width:wp(90),
  },
});
