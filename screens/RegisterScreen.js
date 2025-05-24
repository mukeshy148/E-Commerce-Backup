import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import axios from "axios";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();

  const handleRegister = async () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };

    //send a post request to the Backend
    axios
      .post("http://192.168.29.86:8000/register", user)
      .then((response) => {
        console.log(response);
        Alert.alert("Success!", "Registration successful");

        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.log("error123 : ",error);
        Alert.alert("Error!", error.response?.data?.message || "Registration failed");
      });
  };

  
  return (
    <View
      style={{
        backgroundColor: "white",
        height: hp(150),
        width: wp(100),
      }}
    >
      <Image
        style={styles.amazonLogo}
        source={require("../assets/images/Amazon Logo.png")}
      />

      <Text
        style={{
          fontSize: hp(2.7),
          // fontWeight: "bold",
          color: "#464646",
          textAlign: "center",
          fontFamily: "outfit-semiBold",
          marginTop: hp(-8),
          marginLeft: wp(4),
        }}
      >
        Register to your Account
      </Text>

      {/* Name Input */}
      <View style={{ marginTop: hp(4) }}>
        <View
          style={{
            flexDirection: "row",
            borderRadius: wp(1),
            justifyContent: "flex-start",
            alignSelf: "center",
            marginTop: hp(5),
            backgroundColor: "#d0d0d0",
            paddingVertical: 5,
            width: wp(87),
            gap: 10,
          }}
        >
          <MaterialCommunityIcons
            style={{
              marginLeft: wp(4),
              alignSelf: "center",
            }}
            name="face-man"
            size={24}
            color="gray"
          />
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            style={[styles.input, { fontFamily: "outfit-regular" }]}
            placeholder="Enter Name"
            placeholderTextColor="gray"
            autoCapitalize="words"
          />
        </View>
      </View>

      {/* Email Input*/}
      <View style={{ marginTop: hp(1.2) }}>
        <View
          style={{
            flexDirection: "row",
            borderRadius: wp(1),
            justifyContent: "flex-start",
            alignSelf: "center",
            marginTop: hp(5),
            backgroundColor: "#d0d0d0",
            paddingVertical: 5,
            width: wp(87),
            gap: 10,
          }}
        >
          <MaterialIcons
            style={{
              marginLeft: wp(4),
              alignSelf: "center",
            }}
            name="email"
            size={24}
            color="gray"
          />
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={[styles.input, { fontFamily: "outfit-regular" }]}
            placeholder="Enter Email"
            placeholderTextColor="gray"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      {/* Password Input*/}
      <View style={{ marginTop: hp(1) }}>
        <View
          style={{
            flexDirection: "row",
            borderRadius: wp(1),
            justifyContent: "flex-start",
            alignSelf: "center",
            justifyContent: "center",
            marginTop: hp(5),
            backgroundColor: "#d0d0d0",
            paddingVertical: 5,
            width: wp(87),
            gap: 10,
          }}
        >
          <Entypo
            style={{
              marginLeft: wp(6),
              alignSelf: "center",
            }}
            name="lock"
            size={24}
            color="gray"
          />

          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={[styles.input, { fontFamily: "outfit-regular" }]}
            placeholder="Enter Password"
            placeholderTextColor="gray"
            secureTextEntry={true}
          />
        </View>
      </View>

      {/* Login Button */}
      <TouchableOpacity onPress={handleRegister} style={styles.loginButton}>
        <Text style={styles.btnText}>Register</Text>
      </TouchableOpacity>

      {/* Create Account */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          flexDirection: "row",
          // backgroundColor:'#f043',
          marginHorizontal: wp(7),
          gap: 2,
          marginTop: hp(3),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={[styles.text, { color: "#5f5f5f" }]}>
          Already have an Account?
        </Text>
        <Text style={[styles.text, { color: "black" }]}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  amazonLogo: {
    width: wp(43),
    height: hp(40),
    resizeMode: "contain",
    alignSelf: "center",
    marginLeft: wp(4),
    marginTop: hp(-5),
  },
  input: {
    // borderWidth:1,
    width: wp(77),
    fontFamily: "outfit-regular",
    color: "#323232",
    fontSize: 16,
  },
  text: {
    fontFamily: "outfit-regular",
  },
  loginButton: {
    backgroundColor: "#f9bc50",
    width: wp(55),
    height: hp(6),
    borderRadius: wp(1),
    justifyContent: "center",
    alignSelf: "center",
    marginTop: hp(13),
  },
  btnText: {
    fontFamily: "outfit-semiBold",
    textAlign: "center",
    fontSize: hp(2.5),
    color: "#fff",
  },
});
