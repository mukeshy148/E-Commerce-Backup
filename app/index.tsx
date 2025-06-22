import store from "@/store";
import { BackHandler } from "react-native";
import { ModalPortal } from "react-native-modals";
import { Provider } from "react-redux";
import StackNavigator from "../navigation/StackNavigator";
import { UserContext } from "../UserContext";

export default function Index() {
  if (!(BackHandler as any).removeEventListener) {
    (BackHandler as any).removeEventListener = () => {}; // bypass TS error
  }

  return (
    <>
      <Provider store={store}>
        <UserContext>
          <StackNavigator />
          <ModalPortal />
        </UserContext>
      </Provider>
    </>
  );
}

/*Provider is like an access pass or key that lets all parts of your React app use and share the Redux store data easily.

Without Provider, your app components wouldn’t know how to get the shared data. */
