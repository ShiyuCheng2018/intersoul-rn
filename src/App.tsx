import registerRootComponent from "expo/build/launch/registerRootComponent";
import AppNavigator from "./navigations/AppNavigator";
import {NavigationContainer} from "@react-navigation/native";
import {CardActionsProvider} from "./contexts/CardActionsContext";
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";

export default function App() {

  return (
      <ReduxProvider store={store}>
      <NavigationContainer>
          <CardActionsProvider>
              <AppNavigator />
          </CardActionsProvider>
      </NavigationContainer>
      </ReduxProvider>
  );
}

registerRootComponent(App);
