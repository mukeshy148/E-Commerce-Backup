import axios from "axios";
import jwt_decode from "jwt-decode";

import { useContext, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import { UserType } from "@/UserContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import { clearCart } from "@/Reducer/CartReducer";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import { useDispatch, useSelector } from "react-redux";

const ConfirmationScreen = () => {
  const steps = [
    { title: "Address", content: "Address Form" },
    { title: "Delivery", content: "Delivery Options" },
    { title: "Payment", content: "Payment Details" },
    { title: "Place Order", content: "Order Summary" },
  ];

  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const [addresses, setAddresses] = useState([]);
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
      console.log(
        "Error from Confirmation Screeen fetchAfdressScreeen : ",
        error
      );
    }
  };

  const dispatch = useDispatch();
  const [selectedAddress, setSelectedAddress] = useState("");
  const [options, setOptions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState("");

  // For Total Price
  const cart = useSelector((state) => state.cart.cart);
  //. For All tot Price   ((curItem+prevItem,intialVal  ))
  const total = cart
    ?.map((item) => item?.price * item?.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  useEffect(() => {
    console.log("Total Price  in the Place Order 4th Screen : ", total);
  }, []);

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        userId: userId,
        cartItems: cart,
        totalPrice: total,
        shippingAddress: selectedAddress,
        paymentMethod: selectedOptions,
      };
      console.log("Order Data being sent:", orderData);
      const response = await axios.post(
        "http://192.168.29.86:8000/orders",
        orderData
      );

      if (response.status == 200) {
        navigation.navigate("OrderScreen");
        dispatch(clearCart());
        console.log("Order Created Successfully : ", response.data.order);
      } else {
        console.log("Error while creating Order in ConfirmScreen.js", error);
      }
    } catch (error) {
      console.log("Error Occured in handlePlaceOrder Fn : ", error);
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#ffff",
      }}
    >
      <LinearGradient //It acts as a <View> now
        colors={["#0daab4", "#92ecf1", "#ffff"]}
        start={{ x: 0, y: 0 }} // left
        end={{ x: 0, y: 1 }} // right
        style={{
          height: hp(6.5),
          flexDirection: "row",
          justifyContent: "center",
          gap: wp(2.5),
          marginBottom: hp(2),
        }}
      />
      <View
        style={{
          flex: 1,
          // backgroundColor:'#daa199',
          paddingHorizontal: wp(5),
          paddingTop: hp(3),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "centers",
            marginBottom: 20,
            justifyContent: "space-between",
          }}
        >
          {steps?.map((step, index) => (
            // This is the underLine Color
            <View
              style={{ justifyContent: "center", alignItems: "center" }}
              key={index}
            >
              {index > 0 && (
                <View
                  style={[
                    { flex: 1, height: hp(0.6), backgroundColor: "red" },
                    index <= currentStep && { backgroundColor: "#36da0a" },
                  ]}
                />
              )}

              {/* This is for Tick mark & Step No */}
              <View
                style={[
                  {
                    backgroundColor: "#9b9b9b",
                    width: wp(9),
                    height: hp(4.4),
                    borderRadius: wp(20),
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  index < currentStep && { backgroundColor: "green" },
                ]}
              >
                {index < currentStep ? (
                  <Text style={{ color: "#ffff" }}>✔ </Text>
                ) : (
                  <Text
                    style={{ color: "#ffff", fontFamily: "outfit-regular" }}
                  >
                    {index + 1}{" "}
                  </Text>
                )}
              </View>
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 10,
                }}
              >
                {step?.title}{" "}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {currentStep === 0 && (
        // Main 1st View Container
        <View
          style={{
            marginHorizontal: wp(4),
            marginBottom: hp(10),
            // backgroundColor:'#daa'
          }}
        >
          <Text
            style={{
              fontFamily: "amazon-bold",
              fontSize: wp(5),
            }}
          >
            Select Delivery Address
          </Text>

          <Pressable>
            {addresses.map((item, index) => (
              <View key={index}>
                {/* All the Previous stored Address */}
                <Pressable
                  style={{
                    justifyContent: "space-between",
                    // alignItems: "center",
                    marginTop: hp(3),
                    marginHorizontal: wp(1),
                    paddingVertical: hp(1.6),
                    rowGap: hp(0.4),
                    borderWidth: wp(0.2),
                    borderRadius: wp(2),
                    borderColor: "gray",
                    backgroundColor: "#f6f6f6",
                    flexDirection: "column",
                    width: wp(92),
                    alignSelf: "center",
                  }}
                  key={index}
                >
                  {/* Circle Slect Icon  */}
                  <View
                    style={{
                      marginLeft: wp(2),
                      marginBottom: hp(0.5),
                    }}
                  >
                    {selectedAddress && selectedAddress._id === item._id ? (
                      <FontAwesome5
                        name="dot-circle"
                        size={24}
                        color="#0daab4"
                      />
                    ) : (
                      <FontAwesome5
                        onPress={() => setSelectedAddress(item)}
                        name="circle"
                        size={24}
                        color="#00484f"
                      />
                    )}
                  </View>
                  {/* Name and Location Icon */}
                  <View
                    style={{
                      gap: 5,
                      // backgroundColor:'#fddd',
                      marginLeft: wp(2.9),
                      width: wp(82),
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
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
                    <View
                      style={{
                        flexDirection: "row",
                        marginLeft: wp(1.3),
                      }}
                    >
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

                    {/* Deliver to this adres Btn */}
                    <View>
                      {selectedAddress &&
                        selectedAddress?._id === item?._id && (
                          <Pressable
                            onPress={() => setCurrentStep(1)}
                            style={{
                              marginLeft: wp(4),
                              marginTop: hp(1),
                              backgroundColor: "#0daab4",
                              paddingVertical: hp(1.6),
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: wp(20),
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: "amazon-bold",
                                color: "#fff",
                              }}
                            >
                              Deliver to this Address
                            </Text>
                          </Pressable>
                        )}
                    </View>
                  </View>
                </Pressable>
              </View>
            ))}
          </Pressable>
        </View>
      )}

      {/* 2nd Page Delivery  */}
      {currentStep === 1 && (
        <View
          style={{
            marginHorizontal: wp(4),
            marginTop: hp(3),
            // backgroundColor: "#daa7",
          }}
        >
          <Text
            style={{
              fontFamily: "amazon-bold",
              fontSize: wp(5),
            }}
          >
            Choose Delivery Options
          </Text>

          {/* Selecting Date  */}
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#f5f5f5",
              height: hp(10),
              alignItems: "center",
              paddingHorizontal: wp(3),
              gap: wp(2),
              borderWidth: wp(0.2),
              borderRadius: wp(2.2),
              marginTop: hp(6),
              marginBottom: hp(4),
            }}
          >
            {options ? (
              <FontAwesome5
                onPress={() => setOptions(!options)}
                name="dot-circle"
                size={23}
                color="#0daab4"
              />
            ) : (
              <FontAwesome5
                onPress={() => setOptions(!options)}
                name="circle"
                size={23}
                color="#00484f"
              />
            )}

            <Text
              style={{
                fontFamily: "amazon-regular",
                fontSize: wp(3.7),
              }}
            >
              <Text
                style={{
                  fontFamily: "amazon-regular",
                  fontSize: wp(3.7),
                  color: "#0f8505",
                }}
              >
                Tomorrow by 11am
              </Text>
              {""} - FREE Delivery with your Prime membership
            </Text>
          </View>

          {/* Btn */}
          {/* Only Moves if seleted Delivery Date */}
          <Pressable
            onPress={() => options && setCurrentStep(2)}
            style={{
              marginTop: hp(1),
              paddingVertical: hp(1.2),
              paddingHorizontal: wp(5.2),
              backgroundColor: "yellow",
              borderRadius: wp(10),
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: options ? "#ffde0a" : "#9b9b9b",
            }}
          >
            <Text
              style={{
                fontFamily: "poppins-regular",
                fontSize: wp(3.5),
                color: "#000",
              }}
            >
              Continue
            </Text>
          </Pressable>
        </View>
      )}

      {/* 3rd Paymnet Page  */}
      {currentStep === 2 && (
        <View
          style={{
            marginHorizontal: wp(4),
            marginTop: hp(3),
            // backgroundColor: "#daa7",
          }}
        >
          <Text
            style={{
              fontFamily: "amazon-bold",
              fontSize: wp(5),
            }}
          >
            Select your Payment method
          </Text>

          {/* Mini Container Box for COD */}
          <View
            style={{
              width: wp(90),
              height: hp(6),
              backgroundColor: "#f1f1f1",
              alignSelf: "center",
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: wp(3),
              paddingLeft: wp(5),
              marginTop: hp(4),
              gap: wp(2),
              borderWidth: wp(0.2),
              borderRadius: wp(2),
            }}
          >
            {selectedOptions === "cash" ? (
              <FontAwesome5 name="dot-circle" size={23} color="#0daab4" />
            ) : (
              <FontAwesome5
                onPress={() => setSelectedOptions("cash")}
                name="circle"
                size={23}
                color="#00484f"
              />
            )}

            <Image
              style={{ height: hp(4), width: wp(8), marginLeft: wp(4) }}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/2194/2194656.png",
              }}
            />

            <Text
              style={{
                fontFamily: "amazon-regular",
                fontSize: wp(4),
              }}
            >
              Cash on Delivery
            </Text>
          </View>

          {/* Min Container for UPI/Credit Cards */}
          <View
            style={{
              width: wp(90),
              height: hp(6),
              backgroundColor: "#f1f1f1",
              alignSelf: "center",
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: wp(3),
              paddingLeft: wp(5),
              marginTop: hp(3.5),
              gap: wp(2),
              borderWidth: wp(0.2),
              borderRadius: wp(2),
            }}
          >
            {selectedOptions === "card" ? (
              <FontAwesome5 name="dot-circle" size={23} color="#0daab4" />
            ) : (
              <FontAwesome5
                onPress={() => setSelectedOptions("card")}
                name="circle"
                size={23}
                color="#00484f"
              />
            )}

            <Image
              style={{ height: hp(4), width: wp(8), marginLeft: wp(4) }}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/13010/13010370.png",
              }}
            />

            <Text
              style={{
                fontFamily: "amazon-regular",
                fontSize: wp(4),
              }}
            >
              UPI/Credit or Debit Card
            </Text>
          </View>

          {/* Only Moves if seleted Payment Options */}
          <Pressable
            onPress={() => options && setCurrentStep(3)}
            style={{
              marginTop: hp(6),
              paddingVertical: hp(1.2),
              paddingHorizontal: wp(5.2),
              backgroundColor: "yellow",
              borderRadius: wp(10),
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: selectedOptions ? "#ffde0a" : "#9b9b9b",
            }}
          >
            <Text
              style={{
                fontFamily: "poppins-regular",
                fontSize: wp(3.5),
                color: "#000",
              }}
            >
              Continue
            </Text>
          </Pressable>
        </View>
      )}

      {/* 4th Place Order Page */}
      {currentStep == 3 && (
        <View
          style={{
            marginHorizontal: wp(4),
            marginTop: hp(3),
            // backgroundColor: "#daa7",
          }}
        >
          <Text
            style={{
              fontFamily: "amazon-bold",
              fontSize: wp(5),
            }}
          >
            Order Now
          </Text>

          {/* That OFfer 7% Conatiner */}
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#f8f8f8",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "space-around",
              width: wp(87),
              height: hp(8),
              borderWidth: wp(0.2),
              borderRadius: wp(2),
              marginTop: hp(2),
            }}
          >
            <View style={{ marginLeft: wp(2) }}>
              <Text
                style={{
                  fontFamily: "amazon-bold",
                  fontSize: wp(4),
                }}
              >
                Save 7% and never ran out
              </Text>
              <Text
                style={{
                  fontFamily: "amazon-regular",
                  fontSize: wp(4),
                  color: "#5f5f5f",
                }}
              >
                Turn on auto Deliveries
              </Text>
            </View>
            <Entypo name="chevron-small-right" size={24} color="black" />
          </View>

          <View
            style={{
              backgroundColor: "#ffffff",
              // backgroundColor: "#daa",
              alignSelf: "center",
              width: wp(87),

              borderWidth: wp(0.2),
              borderRadius: wp(0.8),
              marginTop: hp(3),
              padding: wp(2.5),
            }}
          >
            <Text
              style={{
                fontFamily: "amazon-regular",
                fontSize: wp(4),
                color: "#000",
              }}
            >
              Shipping to {selectedAddress?.name}{" "}
            </Text>

            {/* Items & Price Section */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: hp(2),
              }}
            >
              <Text
                style={{
                  fontFamily: "amazon-regular",
                  fontSize: wp(4),
                  color: "#5e5e5e",
                }}
              >
                Items
              </Text>
              <Text
                style={{
                  fontFamily: "amazon-regular",
                  fontSize: wp(4),
                  color: "#5e5e5e",
                }}
              >
                ₹{total.toLocaleString("en-IN")}
              </Text>
            </View>

            {/* Delevivery Charges */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: hp(2.5),
              }}
            >
              <Text
                style={{
                  fontFamily: "amazon-regular",
                  fontSize: wp(4),
                  color: "#5e5e5e",
                }}
              >
                Delivery Charges
              </Text>
              <Text
                style={{
                  fontFamily: "amazon-regular",
                  fontSize: wp(4),
                  color: "#000",
                }}
              >
                ₹0
              </Text>
            </View>

            {/* Order Total Container */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: hp(2.5),
              }}
            >
              <Text
                style={{
                  fontFamily: "amazon-bold",
                  fontSize: wp(4.5),
                  color: "#000",
                }}
              >
                Order Total
              </Text>
              <Text
                style={{
                  fontFamily: "amazon-bold",
                  fontSize: wp(4),
                  color: "#940404",
                }}
              >
                ₹{total.toLocaleString("en-IN")}
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "#ffffff",
              // backgroundColor: "#daa",
              alignSelf: "center",
              width: wp(87),
              gap: wp(1),
              borderWidth: wp(0.2),
              borderRadius: wp(0.8),
              marginTop: hp(3),
              padding: wp(2.5),
            }}
          >
            <Text
              style={{
                fontFamily: "amazon-regular",
                color: "#5e5e5e",
              }}
            >
              Paying via
            </Text>
            <Text
              style={{
                fontFamily: "amazon-bold",
                fontSize: wp(3.8),
              }}
            >
              {selectedOptions == "cash"
                ? "Cash on Delivery"
                : "UPI/Debit or Credit Card"}{" "}
            </Text>
          </View>

          {/* place order Yellow Btn  */}
          <Pressable
            onPress={handlePlaceOrder}
            style={{
              marginTop: hp(6),
              paddingVertical: hp(1.2),
              paddingHorizontal: wp(5.2),
              backgroundColor: "yellow",
              borderRadius: wp(10),
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: options ? "#ffde0a" : "#9b9b9b",
            }}
          >
            <Text
              style={{
                fontFamily: "poppins-regular",
                fontSize: wp(3.5),
                color: "#000",
              }}
            >
              Place my Order
            </Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({
  smallBtns: {
    backgroundColor: "#ececec",
    alignItems: "center",
    marginTop: hp(1),
    marginBottom: hp(0.6),
    marginHorizontal: wp(1),
    paddingVertical: hp(0.7),
    paddingHorizontal: wp(2.7),
    borderWidth: wp(0.2),
    borderRadius: wp(2),
  },
});
