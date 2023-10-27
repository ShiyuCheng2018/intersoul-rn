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
import Filter from "./assets/icons/filter.svg";
import Like from "./assets/icons/like.svg"
import {View} from "react-native";
import ProfileDetailScreen, { ProfileDetailRouteParams} from "./screens/ProfileDetail";
import Icon from "react-native-vector-icons/Ionicons";

export type RootStackParamList = {
    Onboarding: undefined;
    SignIn: undefined;
    EmailSignIn: undefined;
    ProfileCreation: undefined;
    ProfileMediaUpload: undefined;
    Discover: undefined;
    ProfileDetail: ProfileDetailRouteParams;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    const navigation = useNavigation<SignInNavigationProp>();

    return (
        <Stack.Navigator initialRouteName="Discover" screenOptions={{headerStyle: {backgroundColor: "black", borderBottomWidth: 0, elevation:0, shadowColor: 'transparent'}}}>
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
            <Stack.Screen name={"Discover"} component={Discover}
                          options={{ headerShown: true, headerTitle: 'InterSoul',
                              headerBackTitleVisible: false,
                              headerTintColor: '#ffffff',
                              headerLeft: () => (
                                  <View style={{ marginLeft: 20 }}>
                                      <Icon name={"notifications-outline"} size={28} color={"white"}/>
                                  </View>
                              ),
                              headerRight: () => (
                                  <View style={{ marginRight: 20 }}>
                                      <Filter/>
                                  </View>
                              ),
                              gestureEnabled: false }} />
            <Stack.Screen name={"ProfileDetail"} component={ProfileDetailScreen} options={{
                headerShown: false,
                headerBackTitleVisible: false,
            }}/>


        </Stack.Navigator>
    );
};

export default AppNavigator;
