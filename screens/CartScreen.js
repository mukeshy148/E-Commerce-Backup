import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart
} from "../Reducer/CartReducer";

import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const CartScreen = () => {
  //                        .store.js/CART/.CartReducer.js/intialState.cart
  const cart = useSelector((state) => state.cart.cart);
  //. For All tot Price   ((curItem+prevItem,intialVal  ))
  const total = cart
    ?.map((item) => item?.price * item?.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  useEffect(() => {
    console.log("Total Price  in the Cart Screen : ", total);
  }, []);

  const naviagtion = useNavigation();
  const dispatch = useDispatch();

  const increaseQuantity = (item) => {
    dispatch(incrementQuantity(item));
  };

  const decreaseQuantity = (item) => {
    dispatch(decrementQuantity(item)); 
  };

  const deleteItem = (item) => {
    dispatch(removeFromCart(item));
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffff",
      }}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content" // or "light-content"
      />
      <ScrollView>
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

        {/* Sub Total Price */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            // backgroundColor: "pink",
            padding: wp(3),
            marginLeft: wp(2),
          }}
        >
          <Text
            style={{
              fontFamily: "amazon-bold",
              fontSize: wp(4),
            }}
          >
            Sub Total :
          </Text>

          <Text
            style={{
              fontFamily: "amazon-bold",
              fontSize: wp(3.9),
              marginLeft: wp(2),
              width: wp(68),
              // backgroundColor:'yellow'
            }}
          >
            ₹{total.toLocaleString("en-IN")}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: "amazon-regular",
            fontSize: wp(3.9),
            marginLeft: wp(5),
            width: wp(68),
            //  backgroundColor:'yellow'
          }}
        >
          EMI available. See details
        </Text>

        <Pressable onPress={()=>naviagtion.navigate('ConfirmScreen')}
          style={{
            backgroundColor: "#fadc03",
            width: wp(85),
            height: hp(5.8),
            alignItems: "center",
            justifyContent: "center",
            borderRadius: wp(20),
            alignSelf: "center",
            marginTop: hp(3),
          }}
        >
          <Text
            style={{
              fontFamily: "poppins-regular",
              fontSize: wp(3.8),
            }}
          >
            Proceed to buy {cart?.length} items
          </Text>
        </Pressable>

        <View
          style={{
            borderWidth: wp(0.2),
            borderColor: "#b1b1b1",
            marginTop: hp(3),
          }}
        />

        <View>
          {cart?.map((item, index) => (
            <View
              key={index}
              style={{
                backgroundColor: "#ffff",
                marginVertical: hp(1),
                borderWidth: wp(0.2),
                borderColor: "#b1b1b1",
                borderLeftWidth: 0,
                borderTopWidth: 0,
                borderRightWidth: 0,
                // backgroundColor: "pink",
              }}
            >
              <Pressable
                style={{
                  // backgroundColor:'pink',
                  marginTop: hp(4),
                  marginVertical: hp(3),
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: wp(2.5),
                }}
              >
                <View>
                  <Image
                    style={{
                      width: wp(41),
                      height: hp(20),
                      resizeMode: "contain",
                      //  backgroundColor:'red'
                    }}
                    source={{ uri: item?.image }}
                  />
                </View>
                <View
                  style={{
                    // backgroundColor: "yellow",
                    width: wp(50),
                  }}
                >
                  {/* Cart Title Section */}
                  <Text
                    numberOfLines={3}
                    style={{
                      fontFamily: "amazon-regular",
                      fontSize: wp(3.4),
                    }}
                  >
                    {item?.title}{" "}
                  </Text>

                  {/* Cart Amount Section */}
                  <Text
                    numberOfLines={2}
                    style={{
                      fontFamily: "amazon-bold",
                      fontSize: wp(3.8),
                      marginTop: hp(1.5),
                    }}
                  >
                    ₹{item?.price?.toLocaleString("en-IN")}
                  </Text>
                  <Image
                    style={{
                      height: hp(4.5),
                      width: wp(9),
                      resizeMode: "contain",
                      // backgroundColor:'pink'
                    }}
                    source={{
                      uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Amazon_Prime_logo_%282022%29.svg/512px-Amazon_Prime_logo_%282022%29.svg.png",
                    }}
                  />

                  <Text
                    style={{
                      fontFamily: "amazon-regular",
                      fontSize: wp(3.6),
                      color: "#0c8c16",
                    }}
                  >
                    In Stock
                  </Text>
                </View>
              </Pressable>

              {/* Delete,quantity,incremnet Btns */}
              <Pressable
                style={{
                  flexDirection: "row",
                  // backgroundColor: "#fff123",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    // backgroundColor: "yellow",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderRadius: 10,
                    alignItems: "center",
                    marginLeft: wp(3),
                    // marginBottom:hp(2.5 )
                  }}
                >
                  {/*Minus/ Delete Icon Btn */}
                  <Pressable
                    onPress={() => decreaseQuantity(item)}
                    style={{
                      backgroundColor: "#e7e7e7",
                      padding: wp(2),
                      borderTopLeftRadius: wp(2),
                      borderBottomLeftRadius: wp(2),
                    }}
                  >
                    {item?.quantity > 1 ? (
                      <Entypo name="minus" size={24} color="black" />
                    ) : (
                      <MaterialIcons
                        name="delete-outline"
                        size={24}
                        color="black"
                      />
                    )}
                  </Pressable>

                  {/* Quantity  */}
                  <Pressable
                    style={{
                      backgroundColor: "#ffff",
                      paddingHorizontal: wp(5),
                      borderWidth: wp(0.22),
                      justifyContent: "center",
                      height: hp(5.07),
                      borderColor: "#5a5a5a",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "amazon-bold",
                        fontSize: wp(3.8),

                        // textAlignVertical:5
                      }}
                    >
                      {item?.quantity}{" "}
                    </Text>
                  </Pressable>

                  {/* Increment Btn */}
                  <Pressable
                    onPress={() => increaseQuantity(item)}
                    style={{
                      backgroundColor: "#e7e7e7",
                      padding: wp(2.3),
                      borderTopRightRadius: wp(2),
                      borderBottomRightRadius: wp(2),
                    }}
                  >
                    <Entypo name="plus" size={22} color="black" />
                  </Pressable>
                </View>

                {/* Delete Btn */}
                <Pressable
                  onPress={() => deleteItem(item)}
                  style={{
                    backgroundColor: "#ffff",
                    paddingHorizontal: wp(1),
                    paddingVertical: hp(1),
                    paddingHorizontal: wp(7),
                    borderRadius: wp(2.5),
                    borderColor: "#494949",
                    borderWidth: wp(0.2),
                    marginLeft: wp(8.3),
                    // marginBottom:hp(5),
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "amazon-bold",
                      fontSize: wp(3.8),
                    }}
                  >
                    Delete
                  </Text>
                </Pressable>
              </Pressable>

              {/* Save for Later & See More like this */}
              <Pressable
                style={{
                  flexDirection: "row",
                  // backgroundColor:'#fff123',
                  marginHorizontal: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  columnGap: wp(8),
                  marginTop: hp(2),
                  marginBottom: hp(4),
                }}
              >
                <Pressable
                  style={{
                    backgroundColor: "#ffff",
                    paddingHorizontal: wp(1),
                    paddingVertical: hp(1),
                    paddingHorizontal: wp(7),
                    borderRadius: wp(2.5),
                    borderColor: "#494949",
                    borderWidth: wp(0.2),
                    // marginBottom:hp(5)
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "amazon-regular",
                      fontSize: wp(3.8),

                      // textAlignVertical:5
                    }}
                  >
                    Save for Later
                  </Text>
                </Pressable>

                <Pressable
                  style={{
                    backgroundColor: "#ffff",
                    paddingHorizontal: wp(1),
                    paddingVertical: hp(1),
                    paddingHorizontal: wp(7),
                    borderRadius: wp(2.5),
                    borderColor: "#494949",
                    borderWidth: wp(0.2),
                    // marginBottom:hp(5)
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "amazon-regular",
                      fontSize: wp(3.8),

                      // textAlignVertical:5
                    }}
                  >
                    See more like this
                  </Text>
                </Pressable>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  searchBoxContainer: {
    marginTop: hp(14.5),
    marginLeft: wp(3),
    backgroundColor: "white",
    width: wp(84),
    height: hp(5),
    alignItems: "center",
    borderRadius: wp(1),
    flexDirection: "row",
  },
});
