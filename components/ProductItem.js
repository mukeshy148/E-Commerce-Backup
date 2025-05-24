import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const ProductItem = ({ item }) => {
  return (
    <Pressable
      style={{
        marginHorizontal: wp(5.5),
        height: hp(32),
        justifyContent: "center",
        marginBottom: hp(5),
        alignItems: "center",
        // backgroundColor:'gray'
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
            fontFamily: "poppins-regular",
            fontSize: wp(3.2),
            color:'#6c6c6c'
          }}
        >
          ₹{Math.floor(item?.price * 25)}
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

      <Pressable style={{
        marginTop:hp(1),
        paddingVertical:hp(1.2),
        paddingHorizontal:wp(5.2),
        backgroundColor:'yellow',
        borderRadius:wp(10),
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ffde0a'
      }}>
          <Text style={{
            fontFamily:'poppins-regular',
            fontSize:wp(3.5),
            color:'#464646'
          }}>Add to Cart</Text>
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
