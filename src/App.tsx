import registerRootComponent from "expo/build/launch/registerRootComponent";
import AppNavigator from "./AppNavigator";
import {NavigationContainer} from "@react-navigation/native";

export default function App() {
  return (
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
  );
}

registerRootComponent(App);
