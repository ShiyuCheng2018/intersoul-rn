import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from "./screens/SignIn";
import OnboardingScreen from "./screens/Onboarding";

export type RootStackParamList = {
    Onboarding: undefined;
    SignIn: undefined;
    // ... other routes
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Onboarding">
            <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
            {/* Add other screens as necessary */}
        </Stack.Navigator>
    );
};

export default AppNavigator;
