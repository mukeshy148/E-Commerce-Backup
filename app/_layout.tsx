import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
export default function RootLayout() {
  useFonts({
    "amazon-medium": require("@/assets/fonts/amazon-ember-medium.ttf"),
    "amazon-light": require("@/assets/fonts/amazon-ember-light.ttf"),
    "amazon-regular": require("@/assets/fonts/amazon-ember-display-regular.ttf"),
    "amazon-bold": require("@/assets/fonts/amazon-ember-bold.ttf"),  

    "outfit-thin": require("@/assets/fonts/Outfit-Thin.ttf"),
    "outfit-regular": require("@/assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("@/assets/fonts/Outfit-Medium.ttf"),
    "outfit-semiBold": require("@/assets/fonts/Outfit-SemiBold.ttf"),
    "outfit-bold": require("@/assets/fonts/Outfit-Bold.ttf"),
    "outfit-extraBold": require("@/assets/fonts/Outfit-ExtraBold.ttf"),
    "sifonn": require("@/assets/fonts/Sifonn.otf"),
    "telex": require("@/assets/fonts/Telex-Regular.ttf"),
    "roboto": require("@/assets/fonts/Roboto.ttf"),
    "roboto-italic": require("@/assets/fonts/Roboto-Italic.ttf"),
    "poppins-regular": require("@/assets/fonts/Poppins-Medium.ttf"),
    "poppins-semiBold": require("@/assets/fonts/Poppins-SemiBold.ttf"),
    "poppins-bold": require("@/assets/fonts/Poppins-Bold.ttf"),

    "prompt-Black": require("@/assets/fonts/Prompt-Black.ttf"),
    "prompt-bold": require("@/assets/fonts/Prompt-Bold.ttf"),
    "prompt-semiBold": require("@/assets/fonts/Prompt-SemiBold.ttf"),


  });

  return (
    <>
      <StatusBar backgroundColor="black" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

// import { useFonts } from "expo-font";
// import { Stack } from "expo-router";
// import { StatusBar } from "expo-status-bar";
// import { Text } from 'react-native';

// export default function RootLayout() {
//   const [fontsLoaded] = useFonts({
//     'outfit-thin': require('@/assets/fonts/Outfit-Thin.ttf'),
//     'outfit-regular': require('@/assets/fonts/Outfit-Regular.ttf'),
//     'outfit-medium': require('@/assets/fonts/Outfit-Medium.ttf'),
//     'outfit-semiBold': require('@/assets/fonts/Outfit-SemiBold.ttf'),
//     'outfit-bold': require('@/assets/fonts/Outfit-Bold.ttf'),
//     'outfit-extraBold': require('@/assets/fonts/Outfit-ExtraBold.ttf'),
//     'sifonn': require('@/assets/fonts/Sifonn.otf'),
//     'telex': require('@/assets/fonts/Telex-Regular.ttf'),
//     'roboto': require('@/assets/fonts/Roboto.ttf'),
//     'roboto-italic': require('@/assets/fonts/Roboto-Italic.ttf'),
//     'poppins-regular': require('@/assets/fonts/Poppins-Medium.ttf'),
//     'poppins-semiBold': require('@/assets/fonts/Poppins-SemiBold.ttf'),
//     'poppins-bold': require('@/assets/fonts/Poppins-Bold.ttf'),

//     'amazon-medium': require('@/assets/fonts/Amazon Ember Medium.ttf'),
//     'amazon-light': require('@/assets/fonts/Amazon Ember Light.ttf'),
//     'amazon-regular': require('@/assets/fonts/Amazon Ember.ttf'),
//     'amazon-bold': require('@/assets/fonts/Amazon Ember Bold.ttf'),
//   });

//   if (!fontsLoaded) {
//   return <Text style={{ marginTop: 100, textAlign: 'center' }}>Loading fonts...</Text>;
// }

//   return (
//     <>
//       <StatusBar backgroundColor="black" />
//       <Stack>
//         <Stack.Screen name="index" options={{ headerShown: false }} />
//       </Stack>
//     </>
//   );
// }
