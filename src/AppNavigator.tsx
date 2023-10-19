import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from "./screens/SignIn";
import OnboardingScreen from "./screens/Onboarding";
import EmailSignIn from "./screens/SignIn/emailSignIn";

export type RootStackParamList = {
    Onboarding: undefined;
    SignIn: undefined;
    EmailSignIn: undefined;
    // ... other routes
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Onboarding">
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
                    headerTintColor: '#616161', // For text and arrow color
                }}
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;
