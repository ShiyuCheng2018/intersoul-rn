import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen, {SignInNavigationProp} from "./screens/SignIn";
import OnboardingScreen from "./screens/Onboarding";
import EmailSignIn from "./screens/SignIn/emailSignIn";
import ProfileCreation from "./screens/ProfileCreation";
import {useNavigation} from "@react-navigation/native";
import {HeaderBackButton} from "@react-navigation/elements";
import ProfileMediaUpload from "./screens/ProfileMediaUpload";
import Discover from "./screens/Discover";
import User from "./assets/icons/user.svg";
import Like from "./assets/icons/like.svg"
import {View} from "react-native";

export type RootStackParamList = {
    Onboarding: undefined;
    SignIn: undefined;
    EmailSignIn: undefined;
    ProfileCreation: undefined;
    ProfileMediaUpload: undefined;
    Discover: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    const navigation = useNavigation<SignInNavigationProp>();

    return (
        <Stack.Navigator initialRouteName="Discover">
            <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen
                name="EmailSignIn"
                component={EmailSignIn}
                options={{
                    gestureEnabled: false,
                    headerShown: true,
                    headerTitle: 'Email',
                    headerBackTitleVisible: false,
                    headerTintColor: '#616161',
                }}
            />
            <Stack.Screen name={"ProfileCreation"} component={ProfileCreation}
                          options={{ headerShown: true, headerTitle: 'Edit profile',
                              headerBackTitleVisible: false,
                              headerLeft: (props) => (
                                  <HeaderBackButton
                                      {...props}
                                      onPress={() => {
                                          // Override the default back action
                                          navigation.navigate('SignIn')
                                      }}
                                  />),
                              headerTintColor: '#616161',
                              gestureEnabled: false }} />

            <Stack.Screen name={"ProfileMediaUpload"} component={ProfileMediaUpload}
                          options={{ headerShown: true, headerTitle: 'Add profile medias',
                              headerBackTitleVisible: false,
                              headerTintColor: '#616161',
                              gestureEnabled: false }} />
            <Stack.Screen name={"Discover"} component={Discover}
                          options={{ headerShown: true, headerTitle: 'Discover',
                              headerBackTitleVisible: false,
                              headerTintColor: '#616161',
                              headerLeft: () => (
                                  <View style={{ marginLeft: 20 }}>
                                      <Like/>
                                  </View>
                              ),
                              headerRight: () => (
                                  <View style={{ marginRight: 20 }}>
                                      <User/>
                                  </View>
                              ),
                              gestureEnabled: false }} />


        </Stack.Navigator>
    );
};

export default AppNavigator;
