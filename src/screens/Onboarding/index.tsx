import React, { useEffect } from 'react';
import {View, Text} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import {RootStackParamList} from "../../AppNavigator";
import {LinearGradient} from "expo-linear-gradient";
import Hearts from "../../assets/icons/hearts.svg";

type OnboardingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding'>;

const OnboardingScreen = ({ navigation}:{ navigation: OnboardingScreenNavigationProp }) => {

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigation.replace('SignIn');
        }, 2000);

        return () => clearTimeout(timeout);
    }, [navigation]);

    return (
        <View className={"flex-1 justify-center items-center max-w-full"}>
            <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                colors={['#FF7074', '#FEA085']}
                className={`flex-1 w-full justify-center items-center`}  // Here we apply NativeWind styles
            >
                <View  className={`flex-1 w-full justify-center items-center`} >
                    <Hearts />
                    <Text className='text-24b text-gray-50 font-medium'>Welcome to InterSoul</Text>
                </View>
            </LinearGradient>
        </View>
    );
};

export default OnboardingScreen;
