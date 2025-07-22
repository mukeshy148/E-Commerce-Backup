import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AddAddressScreen from "../screens/AddAddressScreen";
import AddressScreen from "../screens/AddressScreen";
import CartScreen from "../screens/CartScreen";
import CoderScreen from "../screens/CoderScreen";
import ConfirmationScreen from "../screens/ConfirmationScreen";
import DummyTestPage from "../screens/DummyTestPage";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import MyOrders from "../screens/MyOrders";
import OrderScreen from "../screens/OrderScreen";
import ProductInfoScreen from "../screens/ProductInfoScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RegisterScreen from "../screens/RegisterScreen";


export default function StackNavigator() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  // function BottomTabs() {
  //   return (
  //     <Tab.Navigator
  //       screenOptions={{
  //         tabBarActiveTintColor: "#00C4CC", // text color when tab is active
  //         tabBarInactiveTintColor: "#808080",
  //       }}
  //     >
  //       {/* Home Screen Tab */}
  //       <Tab.Screen
  //         name="Home"
  //         component={HomeScreen}
  //         options={{
  //           tabBarLabel: "Home",
  //           tabBarLabelStyle: { fontSize: 11 },

  //           headerShown: false,
  //           tabBarIcon: ({ focused }) =>
  //             focused ? (
  //               <Ionicons name="home" size={26} color="#00A6B0" />
  //             ) : (
  //               <Ionicons name="home-outline" size={24} color="#808080" />
  //             ),
  //         }}
  //       />
  //       {/* Profile Screen Tab */}
  //       <Tab.Screen
  //         name="Profile"
  //         component={ProfileScreen}
  //         options={{
  //           tabBarLabel: "Profile",
  //           tabBarLabelStyle: { fontSize: 11 },

  //           // headerShown: false,
  //           tabBarIcon: ({ focused }) =>
  //             focused ? (
  //               <FontAwesome name="user" size={26} color="#00A6B0" />
  //             ) : (
  //               <FontAwesome name="user-o" size={23} color="#808080" />
  //             ),
  //         }}
  //       />
  //       {/* Cart Screen Tab */}
  //       <Tab.Screen
  //         name="Cart"
  //         component={CartScreen}
  //         options={{
  //           tabBarLabel: "Cart",
  //           tabBarLabelStyle: { fontSize: 11 },

  //           headerShown: false,
  //           tabBarIcon: ({ focused }) =>
  //             focused ? (
  //               <Ionicons name="cart-sharp" size={29} color="#00A6B0" />
  //             ) : (
  //               <Ionicons name="cart-outline" size={29} color="#808080" />
  //             ),
  //         }}
  //       />
  //     </Tab.Navigator>
  //   );
  // }

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="LoginScreen"
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="Info" component={ProductInfoScreen} />
      {/* <Stack.Screen name="Main" component={BottomTabs} /> */}
      <Stack.Screen name="Address" component={AddAddressScreen} />
      <Stack.Screen name="Add" component={AddressScreen} />
      <Stack.Screen name="ConfirmScreen" component={ConfirmationScreen} />
      <Stack.Screen name="OrderScreen" component={OrderScreen} />
      <Stack.Screen name="MyOrderScreen" component={MyOrders} />

      <Stack.Screen name="HomeScreen"  component={HomeScreen}/>
      <Stack.Screen name="ProfileScreen"  component={ProfileScreen}/>
      <Stack.Screen name="CartScreen"  component={CartScreen}/>

      <Stack.Screen name="CoderScreen" component={CoderScreen} />
      <Stack.Screen name="DummyTabBar" component={DummyTestPage} />
      {/* Add more screens here */}
    </Stack.Navigator>
  );
}
