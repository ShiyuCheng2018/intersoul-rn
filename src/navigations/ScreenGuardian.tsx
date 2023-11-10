import React, { useEffect, ComponentType } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/core';
import useUser from "../hooks/aboutUser/useUser";
import useAuth from "../hooks/aboutAuth/useAuth";
import {RootStackParamList} from "./AppNavigator";
import {MainAppParamList} from "./BottomTabNavigator";

// Define a combined type for navigation
type CombinedNavParamList = RootStackParamList & MainAppParamList;

// Define the type for useNavigation specific to your navigation structure
type ScreenGuardianNavigationProp = NavigationProp<CombinedNavParamList>;
// Define the types for the props that you might need to pass to the HOC
interface WithScreenGuardianProps {
    // Add any additional props here if necessary
}

// This function takes a component and returns a new component with added functionality
const ScreenGuardian = <P extends WithScreenGuardianProps>(
    WrappedComponent: ComponentType<P>,
    checkAuth: boolean,
    checkProfileCompletion: boolean
) => {
    // Define the new component
    const ProtectedScreen: React.FC<P> = (props) => {
        const navigation = useNavigation<ScreenGuardianNavigationProp>();
        const {nextOnboardingScreenGetter} = useUser();
        const {jwtGetter} = useAuth();

        useEffect(() => {

            if (checkAuth && !jwtGetter) {
                navigation.navigate('SignIn');
                return;
            }

            if (checkProfileCompletion && nextOnboardingScreenGetter !== "Discover") {
                navigation.navigate(nextOnboardingScreenGetter);
            } else if (checkProfileCompletion) {
                navigation.navigate('MainApp', { screen: 'Discover' });
            }
        }, [nextOnboardingScreenGetter, jwtGetter]); // Re-run the effect if nextScreen changes

        // Render the wrapped component with all its props
        return <WrappedComponent {...props} />;
    };

    return ProtectedScreen;
};

export default ScreenGuardian;
