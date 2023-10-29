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

const AppNavigator = () => {
    const navigation = useNavigation<SignInNavigationProp>();

    return (
        <Stack.Navigator initialRouteName={"MainApp"} screenOptions={{headerStyle: {backgroundColor: "black", borderBottomWidth: 0, elevation:0, shadowColor: 'transparent'}}}>
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
                              headerTintColor: 'white',
                              gestureEnabled: false }} />

            <Stack.Screen name={"ProfileMediaUpload"} component={ProfileMediaUpload}
                          options={{ headerShown: true, headerTitle: 'Add profile medias',
                              headerBackTitleVisible: false,
                              headerTintColor: '#616161',
                              gestureEnabled: false }} />
            <Stack.Screen name={"ProfileDetail"} component={ProfileDetailScreen} options={{
                headerShown: false,
                headerBackTitleVisible: false,
            }}/>

            <Stack.Screen name={"MainApp"} component={BottomTabNavigator} options={{ headerShown: false }} />


        </Stack.Navigator>
    );
};

export default AppNavigator;
