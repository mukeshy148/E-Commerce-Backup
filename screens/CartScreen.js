import { Platform, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CartScreen = () => {
  return (
    <SafeAreaView style={{
      paddingTop: Platform.OS === 'android' ? 45 : 50,
      flex:1,
      backgroundColor:'white',
      
    }}>
      <Text>CartScreen</Text>
    </SafeAreaView>
  )
}

export default CartScreen

const styles = StyleSheet.create({})