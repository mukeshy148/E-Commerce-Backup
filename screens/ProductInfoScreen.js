
import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  ImageBackground,
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

import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { addToCart } from "@/Reducer/CartReducer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductInfoScreen = ({ route }) => {
  const {
    //Using Destructure
    item,
    id,
    title,
    offer,
    oldPrice,
    price,
    image,
    carouselImages,
    color,
    size,
  } = route.params;

  const dispatch = useDispatch();

  const [addedToCart , setAddedToCart] = useState(false)

  const addItemToCart = (itemArgs)=>{
    setAddedToCart(true);
    dispatch(addToCart(itemArgs));

    setTimeout(()=>{
      setAddedToCart(false)
    },60000)//  1 Mins later

  }


  const cart = useSelector((state)=>state.cart.cart)
  useEffect(() => {
    if (cart.length > 0) {
      console.log("Cart Selector Box123 :", cart);
    }
  }, [cart]); 
 


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

        {/* Orginal Data Parts */}

        <ScrollView
          pagingEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {carouselImages.map((item, index) => (
            <ImageBackground
              style={{
                // marginTop:hp(2),
                height: hp(50),
                width: wp(100),
                resizeMode: "contain",
              }}
              key={index}
              source={{ uri: item }}
            >
              <View
                style={{
                  padding: wp(2.5),
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#b90303",
                    width: wp(10),
                    height: hp(5),
                    padding: 4,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: wp(20),
                    marginLeft: wp(1),
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "poppins-bold",
                      fontSize: wp(3),
                      textAlign: "center",
                    }}
                  >
                    {offer}
                  </Text>
                </View>

                <View
                  style={{
                    padding: wp(1.3),
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#dedcdc",
                    borderRadius: wp(39),
                    width: wp(9),
                    height: hp(4.5),
                  }}
                >
                  <MaterialCommunityIcons
                    name="share-variant"
                    size={22}
                    color="black"
                  />
                </View>
              </View>

              {/* Heart Icon */}
              <View
                style={{
                  marginTop: "auto",
                  padding: wp(1.3),
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#eaeaea",
                  borderRadius: wp(39),
                  width: wp(9),
                  height: hp(4.5),
                  marginLeft: wp(4),
                }}
              >
                <AntDesign name="hearto" size={22} color="black" />
              </View>
            </ImageBackground>
          ))}
        </ScrollView>

        {/* Description Section */}
        <View
          style={{
            marginHorizontal: wp(3.3),
            marginVertical: hp(2),
            marginTop: hp(3),
          }}
        >
          <Text
            style={{
              fontFamily: "amazon-regular",
              fontSize: wp(3.3),
              color: "#595959",
              lineHeight: hp(2.45),
            }}
          >
            {title}
          </Text>

          {/* Price  */}
          <View style={{ flexDirection: "row", marginTop: hp(1) }}>
            <Text
              style={{
                fontFamily: "amazon-regular",
                fontSize: wp(9),
                marginTop: hp(1.3),
                color: "#c40202",
                marginRight: wp(1),
              }}
            >
              -{offer?.split("off")[0]}
            </Text>

            <Text
              style={{
                fontFamily: "amazon-medium",
                fontSize: wp(9),
                marginTop: hp(1.3),
              }}
            >
              ₹{price.toLocaleString("en-IN")}
            </Text>
          </View>
        </View>

        {/* Empty Divider */}
        <View
          style={{
            height: 2,
            backgroundColor: "#d0d0d0",
            marginBottom: hp(3.5),
          }}
        ></View>

        {/* Color  */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "baseline",
            marginHorizontal: wp(3.5),
          }}
        >
          <Text
            style={{
              fontFamily: "amazon-medium",
              fontSize: wp(3.6),
              color: "#595959",
            }}
          >
            Color :
          </Text>

          <Text
            style={{
              fontFamily: "amazon-bold",
              fontSize: wp(3.9),
              color: "#4c4c4c",
              marginLeft: wp(3),
            }}
          >
            {color}
          </Text>
        </View>

        {/* Size  */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "baseline",
            marginHorizontal: wp(3.5),
            marginTop: hp(1),
          }}
        >
          <Text
            style={{
              fontFamily: "amazon-medium",
              fontSize: wp(3.6),
              color: "#595959",
            }}
          >
            Size :
          </Text>

          <Text
            style={{
              fontFamily: "amazon-bold",
              fontSize: wp(3.9),
              color: "#4c4c4c",
              marginLeft: wp(3),
            }}
          >
            {size}
          </Text>
        </View>

        {/* Empty Divider */}
        <View
          style={{
            height: 2,
            backgroundColor: "#d0d0d0",
            marginTop: hp(3),
            marginBottom: hp(2),
          }}
        ></View>

        <View
          style={{
            marginBottom: hp(3),
            marginHorizontal: wp(3.5),
          }}
        >
          <Text
            style={{
              fontSize: wp(4),
              fontFamily: "amazon-bold",
              fontSize: wp(4),
            }}
          >
            Total : ₹{price.toLocaleString("en-IN")}{" "}
          </Text>

          <Text
            style={{
              fontFamily: "amazon-medium",
              color: "#067fca",
              marginTop: hp(1),
            }}
          >
            FREE delivery by tomorrow by 12 PM Order within 7hrs 27mins
          </Text>
        </View>

        {/* Deliver to Mukesh */}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: wp(3.5),
          }}
        >
          <Ionicons name="location-outline" size={22} color="black" />
          <Text
            style={{
              fontSize: hp(2),
              fontFamily: "amazon-medium",
              width: wp(90),
              marginLeft: wp(2),
            }}
          >
            Deliver to Mukesh Chennai - 600082{" "}
          </Text>
        </View>

        <Text
          style={{
            marginHorizontal: wp(3.5),
            marginTop: hp(2.6),
            fontFamily: "amazon-regular",
            fontSize: wp(4),
            color: "#107c05",
          }}
        >
          In Stock
        </Text>

        {/* Add to cart Button */}
        <View
          style={{
            marginBottom: hp(8),
            marginTop: hp(4),
            alignItems: "center",
          }}
        >
          {/* Below item means route.param.item //Destructerd */}
          <Pressable
            onPress={() => addItemToCart(item)}
            style={{
              backgroundColor: addedToCart?"#d6d6d6":"#fadc03",
              width: wp(85),
              height: hp(5.8),
              alignItems: "center",
              justifyContent: "center",
              borderRadius: wp(20),
              marginBottom: hp(3),
            }} 
          >
            <Text
              style={{
                fontFamily: "poppins-regular",
                fontSize: wp(3.8),
              }}
            >
              {addedToCart?'Added to the Cart' :'Add to cart' }
            </Text>
          </Pressable>

          {/* Buy Now Button */}
          <Pressable
            style={{
              backgroundColor: "#faa703",
              width: wp(85),
              height: hp(5.8),
              alignItems: "center",
              justifyContent: "center",
              borderRadius: wp(20),
            }}
          >
            <Text
              style={{
                fontFamily: "poppins-regular",
                fontSize: wp(3.8),
              }}
            >
              Buy Now
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductInfoScreen;

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
  searchInput: {
    marginLeft: wp(2),
    fontSize: 16,
    width: wp(81),
    color: "black",
    // fontWeight: "bold",
    fontFamily: "roboto",
  },
});
