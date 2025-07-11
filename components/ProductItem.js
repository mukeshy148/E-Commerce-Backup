import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from '@/Reducer/CartReducer';
import { useEffect, useState } from "react";

const ProductItem = ({ item }) => {

  const dispatch = useDispatch();
  const [addedToCart , setAddedToCart] = useState(false)
  const cartInfo = useSelector((state)=>state.cart.cart)

  useEffect(() => {
    if (cartInfo.length > 0) {
      console.log("Cart Selector Box123 :", cartInfo);
    }
  }, [cartInfo]); 

  const addItemToCart = (itemArgs)=>{
      setAddedToCart(true);
      dispatch(addToCart(itemArgs));
  
      setTimeout(()=>{
        setAddedToCart(false)
      },5000)//  1 Mins later
  
    }
   
  
  return (
    <Pressable
      style={{
        marginHorizontal: wp(2.9),
        height: hp(32),
        justifyContent: "center",
        marginBottom: hp(5),
        alignItems: "center",
        paddingLeft:wp(2.6),
        flexWrap:'wrap',
        // backgroundColor:'pink'
        
      }}
    >
      <Image
        style={{
          width: wp(30),
          height: hp(18),
          resizeMode: "contain",
        }}
        source={{ uri: item.image }}
      />

      <Text
        numberOfLines={1}
        style={{
          width: 150,
          fontFamily: "poppins-semiBold",
          fontSize: wp(3.3),
        }}
      >
        {item?.title}
      </Text>

        {/* Cost & Ratings Text */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100",
          alignItems: "center",
          // backgroundColor:'yellow',
          width: wp(39),
          marginTop:hp(0.4),
        }}
      >
        <Text
          style={{
            fontFamily: "amazon-regular",
            fontSize: wp(3.2),
            color:'#6c6c6c'
          }}
        >
          ₹{Math.floor(item?.price )}
        </Text>
        <Text
          style={{
            fontFamily: "poppins-regular",
            fontSize: wp(3.2),
            color:"#ec9a00"
          }}
        >
          {item?.rating?.rate} ratings
        </Text>
      </View>

      <Pressable onPress={()=>addItemToCart(item)}
       style={{
        marginTop:hp(1),
        paddingVertical:hp(1.2),
        paddingHorizontal:wp(5.2),
        backgroundColor:'yellow',
        borderRadius:wp(10),
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: addedToCart?'#d6d6d6':'#ffde0a'
      }}>
          <Text style={{
            fontFamily:'poppins-regular',
            fontSize:wp(3.5),
            color:'#464646'
          }}>{addedToCart?'Added to Cart':'Add to Cart'} </Text>
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
