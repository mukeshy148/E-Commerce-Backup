import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
export default function RootLayout() {
  useFonts({
    'outfit-thin' : require('@/assets/fonts/Outfit-Thin.ttf'),
    'outfit-regular' : require('@/assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium' : require('@/assets/fonts/Outfit-Medium.ttf'),
    'outfit-semiBold' : require('@/assets/fonts/Outfit-SemiBold.ttf'),
    'outfit-bold' : require('@/assets/fonts/Outfit-Bold.ttf'),
    'outfit-extraBold' : require('@/assets/fonts/Outfit-ExtraBold.ttf'),
    'sifonn' : require('@/assets/fonts/Sifonn.otf'),
    'telex' : require('@/assets/fonts/Telex-Regular.ttf'),
    'roboto' : require('@/assets/fonts/Roboto.ttf'),
    'roboto-italic' : require('@/assets/fonts/Roboto-Italic.ttf'),
    'poppins-regular' : require('@/assets/fonts/Poppins-Medium.ttf'),
    'poppins-semiBold' : require('@/assets/fonts/Poppins-SemiBold.ttf'),
    'poppins-bold' : require('@/assets/fonts/Poppins-Bold.ttf'),
    'amazon-medium' : require('@/assets/fonts/Amazon Ember Display Medium.ttf'),
    'amazon-light' : require('@/assets/fonts/Amazon Ember Light.ttf'),
    'amazon-regular' : require('@/assets/fonts/Amazon Ember.ttf'),
    'amazon-bold' : require('@/assets/fonts/Amazon Ember V2 Bold.ttf'),

  })
  return(
    <>
      <StatusBar backgroundColor="black"/>
       <Stack>
        <Stack.Screen name="index" options={{headerShown:false}}/>
      </Stack>
    </>
    
   
  )
}
