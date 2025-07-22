import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { UserType } from "@/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import jwt_decode from "jwt-decode";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { BottomModal, ModalContent, SlideAnimation } from "react-native-modals";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Swiper from "react-native-swiper";
import { useSelector } from "react-redux";
import ProductItem from "../components/ProductItem";

import DummyTestPage from "./DummyTestPage";
const HomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        // console.log("Products inside fetchData:", response.data);
      } catch (error) {
        console.log("Error in REtreive Category Data ");
      }
    };
    fetchData();
  }, []);

  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("jewelery");
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const { userId, setUserId } = useContext(UserType);

  const [items, setItems] = useState([
    { label: "men's clothing", value: "men's clothing" },
    { label: "jewelery", value: "jewelery" },
    { label: "electronics", value: "electronics" },
    { label: "women's clothing", value: "women's clothing" },
  ]);

  console.log("Selected Address part from HomePage : ", selectedAddress);

  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);

  const list = [
    {
      id: "0",
      image:
        "https://ik.imagekit.io/swxmtftfmc/J23_SEO4.jpg?updatedAt=1747670631097",
      name: "Deals",
    },
    {
      id: "1",
      image: "https://m.media-amazon.com/images/I/51a7IpoDXtL._SY450_.jpg",
      name: "Gaming PC",
    },
    {
      id: "2",
      image: "https://m.media-amazon.com/images/I/71gm8v4uPBL._SX569_.jpg",
      name: "Mobiles",
    },
    {
      id: "3",
      image: "https://m.media-amazon.com/images/I/61F5SXdi9jL._SY450_.jpg",
      name: "Ear Phones",
    },
    {
      id: "4",
      image: "https://m.media-amazon.com/images/I/81TdqUkessL._SY450_.jpg",
      name: "Speakers",
    },
    {
      id: "5",
      image: "https://m.media-amazon.com/images/I/81EkhGUGoWL._SX679_.jpg",
      name: "T-Shirts",
    },
    {
      id: "6",
      image: "https://m.media-amazon.com/images/I/51085t7NUkL._SY450_.jpg",
      name: "Cosmetics",
    },
  ];

  const swiperImages = [
    "https://static.wixstatic.com/media/b69f5d_28d07ddeb461469b9babdf177c333684~mv2.jpg/v1/fill/w_530,h_265,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/b69f5d_28d07ddeb461469b9babdf177c333684~mv2.jpg",

    "https://i.gadgets360cdn.com/large/amazon_prime_day_sale_1721453189245.jpg?downsize=950:*",

    "https://assets.thehansindia.com/h-upload/2022/07/23/1304417-amazon-prime-day.webp",

    "https://assets.aboutamazon.com/dims4/default/ff66517/2147483647/strip/true/crop/1279x720+0+0/resize/1860x1047!/format/webp/quality/90/?url=https%3A%2F%2Famazon-blogs-brightspot.s3.amazonaws.com%2Ff5%2F9f%2F43fe106c4a5081e7a696ef0a8fa8%2Ffresh-1280x7201.jpg",
  ];

  const deals = [
    {
      id: "0",
      // title: "Nothing Phone (1) /*(Black, 128 GB) (8 GB RAM)*/",
      title: "Nothing Phone 1",
      oldPrice: 379999,
      price: 35000,
      image: "https://m.media-amazon.com/images/I/61lN7lxvAFL._SL1100_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/61lN7lxvAFL._SL1100_.jpg",
        "https://m.media-amazon.com/images/I/61mAdqzTzZL._SX569_.jpg",
        "https://m.media-amazon.com/images/I/71rvqyd4JCL._SX569_.jpg",
        "https://m.media-amazon.com/images/I/71cP2wUvzTL._SX569_.jpg",
        "https://m.media-amazon.com/images/I/71ipsf6CrEL._SL1500_.jpg",
      ],
      color: "Black",
      size: "8GB RAM 128GB ROM",
      offer: "7% off",
    },

    {
      id: "1",
      // title: "Samsung Galaxy S25 Ultra 5G AI Smartphone",
      title: "Samsung Galaxy S25 ",
      oldPrice: 170000,
      price: 165000,
      image: "https://m.media-amazon.com/images/I/71P85R392uL._SX569_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/71P85R392uL._SX569_.jpg",
        "https://m.media-amazon.com/images/I/71dtnI25tmL._SX569_.jpg",
        "https://m.media-amazon.com/images/I/71pfjBJUA7L._SX569_.jpg",
        "https://m.media-amazon.com/images/I/71v4umKBOKL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/81gJVEFtA8L._SL1500_.jpg",
      ],
      color: "Titanium Silverblue",
      size: "12GB RAM 1TB ROM",
      offer: "17% off",
    },
    {
      id: "2",
      // title: "Apple iPhone 13 (128GB) - Blue",
      title: "Apple iPhone 13",
      oldPrice: 59900,
      price: 43900,
      image: "https://m.media-amazon.com/images/I/71xb2xkN5qL._SX569_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/71xb2xkN5qL._SX569_.jpg",
        "https://m.media-amazon.com/images/I/61CAYVr34QL._SX569_.jpg",
        "https://m.media-amazon.com/images/I/81junVbiuyL._SX569_.jpg",
        "https://m.media-amazon.com/images/I/71G44HUh7yL._SX569_.jpg",
        "https://m.media-amazon.com/images/I/81-hHbjQGSL._SX569_.jpg",
      ],
      color: "Blue",
      size: "128GB ROM",
      offer: "12% off",
    },
    {
      id: "3",
      title: "OnePlus 13R",
      oldPrice: 45999,
      price: 42998,
      image: "https://m.media-amazon.com/images/I/61++T836jiL._SL1500_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/61++T836jiL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/71lefKoVp8L._SX569_.jpg",
        "https://m.media-amazon.com/images/I/71hr4xmEpfL._SX569_.jpg",
        "https://m.media-amazon.com/images/I/812zeg7DBDL._SX569_.jpg",
        "https://m.media-amazon.com/images/I/710uy5zhJYL._SL1500_.jpg",
      ],
      color: "Crimson Shadow",
      size: "12GB RAM 1TB ROM",
      offer: "5% off",
    },
  ];

  const offers = [
    {
      id: "0",

      title:
        "Nu Republic Cyberstud X2 with 70 Hour Playtime, X-Bass® Technology, 13mm Neodymium Drivers, ENC Mics, Type-C Fast Charging, 40ms Low Latency, Dual Mode (Game/Music) TWS Earbuds (Orange/Grey)",

      offer: "32% off",
      oldPrice: 5999,
      price: 2799,
      image: "https://m.media-amazon.com/images/I/71Qe1YPhMML._SL1500_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/71Qe1YPhMML._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/818QHMz7PyL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/81lC5lunSrL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/71dACPDlJOL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/71W5GgPKyEL._SL1500_.jpg",
      ],
      color: "Orange/Grey",
      size: "13mm 70 Hour Playtime ",
    },

    {
      id: "1",
      offer: "17% off",

      title:
        "AMORIL 1/10 RTR Brushless Fast RC Car for Adults, Max 50mph Hobby Electric Off-Road Monster Truck, Waterproof High-Speed RC Car, 4WD Remote Control Car with 3S Lipo, Green",

      oldPrice: 35999,
      price: 29999,
      image: "https://m.media-amazon.com/images/I/71SKoCK1X1L._SL1500_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/71SKoCK1X1L._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/81gdOkwRvIL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/71f-oGOkF1L._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/71jT9XMFthL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/71QHXckQjtL._SL1500_.jpg",
      ],
      color: "Green",
      size: "4X4 RC Car",
    },

    {
      id: "2",

      title:
        "NutriPro Juicer Mixer Grinder - Smoothie Maker - 500 Watts (2 Jar, Silver) - 2 Year Warranty",

      offer: "27% off",
      oldPrice: 4000,
      price: 1599,
      image: "https://m.media-amazon.com/images/I/71PkRff5mdL._SL1500_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/71PkRff5mdL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/616zWrvE6BL._SL1080_.jpg",
        "https://m.media-amazon.com/images/I/71XhtcD47XL._SL1080_.jpg",
        "https://m.media-amazon.com/images/I/71joF5km66L._SL1080_.jpg",
        "https://m.media-amazon.com/images/I/718ybuLU5QL._SL1500_.jpg",
      ],
      color: "Grey 2 Jar",
      size: "500 Watts",
    },

    {
      id: "3",

      title:
        "Gala e-Quick Spin Mop, Easy Wheels & Big Bucket with 2 Microfiber Refills, Floor Cleaning Mop with Bucket, pocha for floor cleaning, Mopping Set (white and blue)",

      offer: "42% off",
      oldPrice: 2199,
      price: 1599,
      image: "https://m.media-amazon.com/images/I/713vDMWAP1L._SL1500_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/713vDMWAP1L._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/81Vgly7CBuL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/815lEf9to-L._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/81ft4r1EQBL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/81EcKK38x-L._SL1500_.jpg",
      ],
      color: "Blue",
      size: "9.5 Liter",
    },
  ];

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
        console.log("User ID Home Screeen ::", userId);

        setUserId(userId);
      } catch (error) {
        console.error("Failed to decode token in Home Screen :", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (userId) {
      console.log("USer Id Found from the if(userId):", userId);
      fetchAddresses();
    }
  }, [userId, modalVisible]);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `https://e-commerce-backup.onrender.com/address/${userId}`
      );

      const { addresses } = response.data;
      console.log("Response data123##:", response.data);
      setAddresses(addresses);
    } catch (error) {
      console.log("Error from Home Screen  fetchAfdressScreeen : ", error);
    }
    console.log("Address from Stored page of Home Screen12abc : ", addresses);
  };

  console.log("Addres from Home Screen : ", addresses);

  const renderItemFN = ({ item }) => (
    <Pressable
      key={item.id}
      style={{
        margin: wp(1),
        alignItems: "center",
        flex: 1,
        paddingHorizontal: wp(1.5),
        flexDirection: "column",
        // backgroundColor:'gray',
        // marginLeft:5
      }}
    >
      <Image
        style={{
          width: wp(15),
          height: wp(14.5),
          alignSelf: "center",
          borderRadius: wp(10),
          borderWidth: 1.9,
          borderColor: "#ebb928",
          // borderColor: "#d5d5d5",
          resizeMode: "contain",
          padding: 10,
          // margin:10
          // gap:10
        }}
        source={{ uri: item.image }}
      />
      <Text
        style={{
          textAlign: "center",
          fontFamily: "poppins-regular",
          // fontWeight: "bold",
          fontSize: wp(3),
          // backgroundColor:'gray'
        }}
      >
        {item?.name}{" "}
      </Text>
    </Pressable>
  );

  //                        .store.js/CART/.CartReducer.js/intialState.cart
  const cart = useSelector((state) => state.cart.cart);

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View style={{ backgroundColor: "white", flex: 1 , marginBottom:hp(13)}}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content" // or "light-content"
        />
        <ScrollView>
          <LinearGradient //It acts as a <View> now
            colors={["#01575c", "#2dc0c6", "#c4fdff"]}
            start={{ x: 0, y: 0 }} // left
            end={{ x: 0, y: 1 }} // right
            style={{
              height: hp(20.2),
              flexDirection: "row",
              gap: wp(2.5),
            }}
          >
            <Image
              style={{
                height: hp(5),
                width: wp(33),
                resizeMode: "contain",
                position: "absolute",
                alignSelf: "center",
                zIndex: 1,
                alignSelf: "center",
                marginBottom: hp(1.6),
                left: wp(34),

                // backgroundColor:'pink'
              }}
              source={require("../assets/images/Amazon Logo.png")}
            />
            {/* Now Empty Space for moving carousel with dev . name */}
            <Pressable
              onPress={() => navigation.navigate("CoderScreen")}
              style={{
                zIndex: 1,
                position: "absolute",
                marginTop: 40,
              }}
            >
              <Image
                style={{
                  zIndex: 1,
                  bottom: hp(2.9),
                  width: wp(11.5),
                  height: hp(6),
                  marginTop: hp(3),
                  marginLeft: wp(4.9),
                  resizeMode: "contain",
                  // backgroundColor:'pink'
                }}
                source={require("../assets/images/developer.png")}
              />
            </Pressable>

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

          {/* Location View */}
          <Pressable
            onPress={() => setModalVisible(!modalVisible)}
            style={{
              flexDirection: "row",
              backgroundColor: "#c4fdff",
              padding: wp(2),
              alignItems: "center",
              gap: wp(2),
            }}
          >
            <Ionicons
              style={{ marginLeft: wp(3) }}
              name="location-outline"
              size={23}
              color="black"
            />

            <View style={{ width: wp(70) }}>
              {selectedAddress ? (
                <Text
                  style={{
                    fontSize: wp(3.5),
                    // fontWeight:'500',
                    fontFamily: "poppins-regular",
                  }}
                >
                  Deliver to {selectedAddress.name} -{" "}
                  {selectedAddress.postalCode}
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: wp(3.5),
                    // fontWeight:'500',
                    fontFamily: "poppins-regular",
                  }}
                >
                  Add Address
                </Text>
              )}
            </View>
            <View>
              <AntDesign
                style={{ bottom: hp(0.2), marginLeft: wp(5.5) }}
                name="down"
                size={18}
                color="black"
              />
            </View>
          </Pressable>

          {/* Horizontal Categories Scroll */}
          <FlatList
            data={list}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={renderItemFN}
          />

          {/* Carousel AD  Auto Scroller */}
          <Swiper
            autoplay={true}
            autoplayTimeout={2.5}
            loop={true}
            height={200}
            dotColor="#c1c1c1"
            activeDotColor="#474747"
            paginationStyle={{
              /* Dots  Customization */
              top: hp(27.5),
              gap: wp(1.3),
            }}
            dotStyle={styles.inactiveDot} //Inactive Customuztion
            activeDotStyle={styles.activeDot} //Ative Dot Customiztion
          >
            {swiperImages.map((uri, index) => (
              <View style={{ alignItems: "center", marginTop: 5 }} key={index}>
                <Image
                  style={{
                    height: "98%",
                    width: "95%",
                    resizeMode: "cover",
                    borderRadius: wp(3),
                  }}
                  source={{ uri }}
                />
              </View>
            ))}
          </Swiper>

          <Text
            style={{
              fontFamily: "poppins-semiBold",
              fontSize: wp(5),
              padding: wp(3),
              // fontWeight: "600",
              marginTop: hp(2),
              marginBottom: hp(0.5),
            }}
          >
            Trending Deals of the week
          </Text>

          {/* All Phone Deals */}       
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {deals.map((item, index) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("Info", {
                    item: item, //Full details about Product
                    id: item?.id,
                    title: item?.title,
                    offer: item?.offer,
                    oldPrice: item?.oldPrice,
                    price: item?.price,
                    image: item?.image,
                    carouselImages: item?.carouselImages,
                    color: item?.color,
                    size: item?.size,
                  })
                }
                style={{
                  alignItems: "center",
                  marginVertical: hp(0.9),
                  margin: 2,
                  // backgroundColor: "gray",
                }}
                key={index}
              >
                <Image
                  style={{
                    width: wp(48.6),
                    height: wp(40),
                    resizeMode: "contain",
                  }}
                  source={{ uri: item?.image }}
                />
                {/* Phone Name Text */}
                <Text
                  style={{
                    fontFamily: "poppins-regular",
                    fontSize: wp(3.3),
                    width: wp(48),
                    textAlign: "center",
                  }}
                >
                  {item?.title}
                </Text>

                <Text
                  style={{
                    fontFamily: "poppins-semiBold",
                    fontSize: wp(3.3),
                  }}
                >
                  {item?.size}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Empty Divider */}
          <View
            style={{
              height: 2,
              backgroundColor: "#d0d0d0",
              marginBottom: hp(3),
              marginTop: hp(2),
            }}
          ></View>

          {/* Today's Deal */}
          <Text
            style={{
              fontFamily: "poppins-semiBold",
              fontSize: wp(5),
              padding: wp(3),
              fontWeight: "600",
            }}
          >
            Today's Deal
          </Text>

          {/* Today deal Items */}
          <View
            style={{
              // backgroundColor:'pink',
              justifyContent: "center",
              marginBottom: hp(3),
            }}
          >
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {offers.map((item, index) => (
                <Pressable
                  onPress={() =>
                    navigation.navigate("Info", {
                      item: item, //Full details about Product
                      id: item?.id,
                      title: item?.title,
                      offer: item?.offer,
                      oldPrice: item?.oldPrice,
                      price: item?.price,
                      image: item?.image,
                      carouselImages: item?.carouselImages,
                      color: item?.color,
                      size: item?.size,
                    })
                  }
                  key={index}
                  style={{
                    alignItems: "center",
                    marginVertical: hp(0.9),
                    marginHorizontal: wp(5),
                    margin: wp(3.5),
                    justifyContent: "center",
                  }}
                >
                  <Image
                    style={{
                      width: wp(44),
                      height: wp(44),
                      resizeMode: "contain",
                      // backgroundColor:'gray'
                    }}
                    source={{ uri: item.image }}
                  />
                  <View
                    style={{
                      backgroundColor: "#cd2626",
                      width: wp(32),
                      height: hp(3.5),
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: wp(1.3),
                      marginTop: hp(2),
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontFamily: "poppins-regular",
                        fontSize: wp(3.4),
                        textAlignVertical: "center",
                        marginTop: hp(0.29),
                        textAlign: "center",
                        width: wp(25),
                      }}
                    >
                      Upto {item.offer}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>

            {/* Empty Divider */}
            <View
              style={{
                height: 2,
                backgroundColor: "#d0d0d0",
                marginBottom: hp(4),
                marginTop: hp(2.6),
              }}
            ></View>

            {/* Componenets */}
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignItems: "flex-start", // keeps top alignment clean
                  gap: 10,
                  // backgroundColor:'yellow'
                }}
              >
                <DropDownPicker
                  style={{
                    borderColor: "#7b7b7b",
                    height: hp(2),
                    width: wp(50),
                    marginBottom: open ? hp(22) : hp(2),
                    marginLeft: wp(4),
                  }}
                  textStyle={{
                    fontFamily: "poppins-regular",
                  }}
                  open={open}
                  value={category}
                  items={items}
                  setOpen={setOpen}
                  setValue={setCategory}
                  setItems={setItems}
                  placeholder="Select Category"
                  onOpen={onGenderOpen}
                  listMode="SCROLLVIEW"
                />
              </View>

              {/*Fetched from Website  ==== User Selected         */}
              {products
                ?.filter((item) => item.category === category)
                .map((item, index) => (
                  <ProductItem item={item} key={index} />
                ))}
            </View>
          </View>
        </ScrollView>
      </View>

      <BottomModal
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(false)}
        onBackDropPress={() => setModalVisible(false)}
        onHardwareBackPress={() => setModalVisible(false)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
      >
        <ModalContent
          style={{ width: "100%", height: 400, backgroundColor: "#ffff" }}
        >
          <View>
            <View>
              <Text
                style={{
                  fontFamily: "amazon-bold",
                  fontSize: wp(4.4),
                  marginBottom: hp(1.3),
                }}
              >
                Choose your Location
              </Text>

              <Text
                style={{
                  fontFamily: "amazon-regular",
                  fontSize: wp(4),
                  color: "#8e8e8e",
                  letterSpacing: wp(0.13),
                  lineHeight: hp(2.6),
                  marginBottom: hp(2),
                  // backgroundColor: "yellow",
                }}
              >
                Select a delivery address to see product availablity and
                delivery options
              </Text>
            </View>

            {/*Box select location */}
            <View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {/* Already Address Part */}
                {addresses.map((item, index) => (
                  <Pressable
                    onPress={() => setSelectedAddress(item)}
                    key={index}
                    style={{
                      width: wp(34),
                      height: hp(16),
                      // justifyContent: "center",
                      alignItems: "center",
                      borderWidth: 1.4,
                      borderRadius: wp(3),
                      borderColor: "#c1c1c1",
                      justifyContent: "center",
                      marginRight: wp(2),
                      backgroundColor:
                        selectedAddress === item ? "#e5e5e5" : "#ffff",
                    }}
                  >
                    <View
                      style={{
                        marginTop: hp(0.8),
                        width: wp(27),
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            // textAlign: "center",
                            color: "#292828",
                            fontFamily: "amazon-bold",
                            fontSize: wp(3.4),
                          }}
                        >
                          {item?.name}
                        </Text>
                        <Ionicons
                          style={{}}
                          name="location-sharp"
                          size={18}
                          color="#c22828"
                        />
                      </View>

                      <Text
                        numberOfLines={1}
                        style={{
                          color: "#292828",
                          fontFamily: "amazon-regular",
                          fontSize: wp(3.2),
                        }}
                      >
                        {item?.houseNo}, {item?.street},
                      </Text>

                      <Text
                        numberOfLines={1}
                        style={{
                          color: "#292828",
                          fontFamily: "amazon-regular",
                          fontSize: wp(3.2),
                        }}
                      >
                        {item?.landmark}
                      </Text>

                      <Text
                        numberOfLines={1}
                        style={{
                          color: "#292828",
                          fontFamily: "amazon-regular",
                          fontSize: wp(3.2),
                        }}
                      >
                        Chennai, India
                      </Text>
                      <Text>{item?.postalCode}. </Text>
                    </View>
                  </Pressable>
                ))}

                <Pressable
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate("Address");
                  }}
                  style={{
                    // backgroundColor:'pink',
                    width: wp(34),
                    height: hp(16),
                    justifyContent: "center",
                    borderWidth: 1.4,
                    borderRadius: wp(3),
                    borderColor: "#c1c1c1",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#2c99d6",
                      fontFamily: "amazon-regular",
                      fontSize: wp(3.4),
                    }}
                  >
                    Add an Address or pick-up point
                  </Text>
                </Pressable>
              </ScrollView>
            </View>

            <View
              style={{
                flexDirection: "column",
                marginTop: hp(2),
                gap: hp(1),
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Entypo name="location-pin" size={24} color="#054b73" />
                <Text
                  style={{
                    color: "#2c99d6",
                    fontFamily: "amazon-regular",
                    fontSize: wp(3.6),
                    marginLeft: wp(2),
                  }}
                >
                  Enter your Indian Pincode
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <MaterialIcons name="gps-fixed" size={24} color="#054b73" />
                <Text
                  style={{
                    color: "#2c99d6",
                    fontFamily: "amazon-regular",
                    fontSize: wp(3.6),
                    marginLeft: wp(2),
                  }}
                >
                  Use my current Locations
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: wp(0.3),
                }}
              >
                <Ionicons name="earth-sharp" size={22} color="#054b73" />
                <Text
                  style={{
                    color: "#2c99d6",
                    fontFamily: "amazon-regular",
                    fontSize: wp(3.6),
                    marginLeft: wp(2.5),
                  }}
                >
                  Deliver outside India
                </Text>
              </View>
            </View>
            
          </View>
        </ModalContent>
        
      </BottomModal>
      <DummyTestPage/>
    </View>
    
  );
  
};

export default HomeScreen;

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
    height: hp(10),
    fontFamily: "amazon-bold",
    // textAlignVertical:'center'
  },
  inactiveDot: {
    width: wp(1.6),
    height: hp(0.7),
    borderRadius: wp(20),
    marginHorizontal: wp(2),
  },
  activeDot: {
    width: wp(3),
    height: hp(0.69),
    borderRadius: 4,
    marginHorizontal: wp(4),
  },
});
