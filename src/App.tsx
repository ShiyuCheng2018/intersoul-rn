import registerRootComponent from "expo/build/launch/registerRootComponent";
import AppNavigator from "./AppNavigator";
import {NavigationContainer} from "@react-navigation/native";
import {CardActionsProvider} from "./contexts/CardActionsContext";

export default function App() {
  return (
      <NavigationContainer>
          <CardActionsProvider>
              <AppNavigator />
          </CardActionsProvider>
      </NavigationContainer>
  );
}

registerRootComponent(App);
