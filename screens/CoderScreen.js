import { Image } from "expo-image";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const CoderScreen = () => {
  return (
    <View
      style={{
        display:'flex',
        flex:1,
        backgroundColor: "#fff",
        alignItems: "center",
        alignSelf: "center",
        
        paddingHorizontal:wp(3)
      }}
    >
      {/* Border Black View Outer */}
      <View
        style={{
          borderWidth: wp(0.34),
          marginTop: hp(16.5),
          height: hp(71.7),
          width: wp(94),
          backgroundColor: "#f8f8f8",
          
        }}
      >
        <Image
          style={{
            height: hp(11.5),
            width: wp(33),
            contentFit:'contain',
            position: "absolute",
            zIndex: 1,
            left: wp(63),
            top: hp(3.8),
            // backgroundColor:'pink'
          }}
          source={require("../assets/images/Mukesh2.jpg")}
        />

        {/* Developer Invoice Heading BOLD */}
        <Text
          style={{
            fontFamily: "prompt-bold",
            fontSize: wp(4.3),
            letterSpacing: wp(0.32),
            color: "#085690",
            marginTop: hp(2.4),
            marginLeft: wp(3),
            marginBottom: hp(1.5),
          }}
        >
          DEVELOPER INVOICE
        </Text>

        {/* Mukesh Details... View */}
        <View
          style={{
            flexDirection: "column",
            // backgroundColor: "#dadada",
            width: wp(55),
          }}
        >
          <Text
            style={[
              styles.subText,
              {
                fontFamily: "poppins-bold",
                fontSize: wp(3.8),
                lineHeight: hp(3.5),
              },
            ]}
          >
            Mukesh Y
          </Text>
          <Text style={styles.subText}>GSTIN : 2313281033020</Text>
          <Text style={styles.subText}>No:13/6, 27th Street,</Text>
          <Text style={styles.subText}>G.K.M.Colony,</Text>
          <Text style={styles.subText}>Chennai-600082.</Text>
          <Text style={styles.subText}>Email : mukesh148y@gmail.com</Text>
        </View>

        {/* Empty View Divider */}
        <View
          style={{
            width: wp(89),
            borderWidth: hp(0.11),
            alignSelf: "center",
            marginTop: hp(4),
            borderColor: "#000",
          }}
        />
        {/* Headings  */}
        <View style={{ flexDirection: "row", marginLeft: wp(3) }}>
          <View
            style={{
              // backgroundColor: "#7dfca3",
              width: wp(24),
            }}
          >
            <Text style={styles.headings}>App Name</Text>
          </View>

          <View
            style={{
              // backgroundColor: "#7db3fc",
              width: wp(25),
            }}
          >
            <Text style={styles.headings}>Duration</Text>
          </View>

          <View
            style={{
              // backgroundColor: "#ff7d63",
              width: wp(39),
            }}
          >
            <Text style={styles.headings}>Tech Stack</Text>
          </View>
        </View>
        {/* Empty View Divider */}
        <View
          style={{
            width: wp(89),
            borderWidth: hp(0.11),
            alignSelf: "center",
            marginBottom: hp(1.6),
            borderColor: "#000",
          }}
        />

        {/* Heading Values   */}
        <View style={{ flexDirection: "row", marginLeft: wp(3) }}>
          <View
            style={{
              // backgroundColor: "#7dfca3",
              width: wp(24),
            }}
          >
            <Text style={styles.headingValues}>Amazon Clone</Text>
          </View>

          <View
            style={{
              // backgroundColor: "#7db3fc",
              width: wp(25),
            }}
          >
            <Text style={[styles.headingValues]}>02/06/2025</Text>
            <Text style={[styles.headingValues]}>To</Text>
            <Text style={[styles.headingValues]}> 09/07/2025</Text>
          </View>

          <View
            style={{
              // backgroundColor: "#ff7d63",
              width: wp(39),
            }}
          >
            <Text style={[styles.headingValues, { lineHeight: hp(1.79) }]}>
              React Native{"\n"}
              JavaScript{"\n"}
              MongoDB{"\n"}
              Axios & AsyncStorage{"\n"}
              Node.js + Express.js{"\n"}
              Redux Toolkit{"\n"}
              JWT Authentication{"\n"}
              Nodemailer{"\n"}
              React Navigation{"\n"}
              REST API Integration
            </Text>
          </View>
        </View>
        {/* Final  View Divider */}
        <View
          style={{
            width: wp(89),
            borderWidth: hp(0.2),
            alignSelf: "center",
            marginBottom: hp(1.6),
            marginTop: hp(3.5),
            borderColor: "#5a5a5a",
          }}
        />

        <Image
          style={{
            height: hp(3.8),
            width: wp(33),
            resizeMode: "contain",
            zIndex: 1,
            alignSelf: "center",
            marginBottom: hp(1.6),

            // backgroundColor:'pink'
          }}
          source={require("../assets/images/Amazon Logo.png")}
        />

        {/* Logos Section */}
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          {/* Instagram LInk QR */}
          <Pressable
            onPress={() =>
              Linking.openURL("https://www.instagram.com/__.m.a.y.h.e.m.__/")
            }
            style={{
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "poppins-regular",
                fontSize: wp(2.7),
                marginBottom:-6
              }}
            >
              Instagram
            </Text>
            <Image
              style={styles.qrImage}
              source={require("../assets/images/Insta QR.png")}
            />
          </Pressable>

          {/* LinkdIn LInk QR */}
          <Pressable
            onPress={() =>
              Linking.openURL("https://www.linkedin.com/in/mukesh-y-7736b4318")
            }
            style={{
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "poppins-regular",
                fontSize: wp(2.7),
                marginBottom:-6
              }}
            >
              LinkdIn
            </Text>
            <Image
              style={styles.qrImage}
              source={require("../assets/images/LinkdIn QR.png")}
            />
          </Pressable>

          {/* Whatsapp LInk QR */}
          <Pressable
            onPress={() =>
              Linking.openURL(
                "https://wa.me/918124563791?text=Hello%20Mukesh%2C%20I%20saw%20your%20app"
              )
            }
            style={{
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "poppins-regular",
                fontSize: wp(2.7),
                marginBottom:-6
              }}
            >
              Whatsapp
            </Text>
            <Image
              style={styles.qrImage}
              source={require("../assets/images/WhatsappQR.png")}
            />
          </Pressable>
        </View>

        <Text
          style={{
            fontFamily: "poppins-semiBold",
            fontSize: wp(2.7),
            textAlign: "center",
            marginTop: hp(1),
            marginLeft:wp(1)
          }}
        >
          Scan / Tap to Connect
        </Text>
      </View>
    </View>
  );
};

export default CoderScreen;

const styles = StyleSheet.create({
  subText: {
    fontFamily: "poppins-regular",
    fontSize: wp(2.7),
    marginLeft: wp(3),
    lineHeight: hp(1.64),
  },
  headings: {
    fontFamily: "poppins-semiBold",
    fontSize: wp(2.8),
    // marginLeft: wp(3),
    textAlign: "center",
  },
  headingValues: {
    fontFamily: "poppins-regular",
    fontSize: wp(2.5),
    lineHeight: hp(1.6),
    textAlign: "center",
  },
  qrImage: {
    height: hp(10),
    width: wp(18.5),
    contentFit: "contain",
    // backgroundColor:'pink'
  },
});
