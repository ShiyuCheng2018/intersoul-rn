import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen, {SignInNavigationProp} from "../screens/SignIn";
import OnboardingScreen from "../screens/Onboarding";
import EmailSignIn from "../screens/SignIn/emailSignIn";
import ProfileCreation from "../screens/ProfileCreation";
import {useNavigation} from "@react-navigation/native";
import {HeaderBackButton} from "@react-navigation/elements";
import ProfileMediaUpload from "../screens/ProfileMediaUpload";
import ProfileDetailScreen, { ProfileDetailRouteParams} from "../screens/ProfileDetail";
import BottomTabNavigator, {MainAppParamList} from "./BottomTabNavigator";
import ScreenGuardian from "./ScreenGuardian";
import {TouchableOpacity, Text} from "react-native";
import useUser from "../hooks/aboutUser/useUser";

export type RootStackParamList = {
    Onboarding: undefined;
    SignIn: undefined;
    EmailSignIn: undefined;
    ProfileCreation: undefined;
    ProfileMediaUpload: undefined;
    ProfileDetail: ProfileDetailRouteParams;
    MainApp: { screen: keyof MainAppParamList };
};

const Stack = createStackNavigator<RootStackParamList>();

const ProtectedProfileCreation = ScreenGuardian(ProfileCreation, true, true);
const ProtectedProfileMediaUpload = ScreenGuardian(ProfileMediaUpload, true, false);
const ProtectedProfileDetail = ScreenGuardian(ProfileDetailScreen, true, true);

const AppNavigator = () => {
    const navigation = useNavigation<SignInNavigationProp>();
    const {userProfileMediasGetter} = useUser();

    return (
        <Stack.Navigator initialRouteName={"EmailSignIn"} screenOptions={{headerStyle: {backgroundColor: "black", borderBottomWidth: 0, elevation:0, shadowColor: 'transparent'}}}>
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
                    headerTintColor: 'white',
                }}
            />
            <Stack.Screen name={"ProfileCreation"} component={ProtectedProfileCreation}
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
                              headerTintColor: 'white',
                              gestureEnabled: false }} />

            <Stack.Screen name={"ProfileMediaUpload"} component={ProtectedProfileMediaUpload}
                          options={{ headerShown: true, headerTitle: 'Add profile medias',
                              headerBackTitleVisible: false,
                              headerTintColor: '#616161',
                              gestureEnabled: false,
                              headerRight: () => (
                                  <TouchableOpacity disabled={!(userProfileMediasGetter.length > 0)}
                                      onPress={() => {
                                          navigation.navigate('MainApp', { screen: 'Discover' });
                                      }}
                                  >
                                      <Text style={{color: userProfileMediasGetter.length > 0 ? "#ffffff" : '#616161'}}>Done</Text>
                                  </TouchableOpacity>),
                          }}
            />

            <Stack.Screen name={"ProfileDetail"} component={ProtectedProfileDetail} options={{
                headerShown: false,
                headerBackTitleVisible: false,
            }}/>

            <Stack.Screen name={"MainApp"} component={BottomTabNavigator} options={{ headerShown: false }} />


        </Stack.Navigator>
    );
};

export default AppNavigator;
