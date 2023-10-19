import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import SigninBg from "../../assets/bg/signinBg.svg";
import { Dimensions } from 'react-native';
import Phone from "../../assets/icons/phone.svg";
import Send from "../../assets/icons/send.svg";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../AppNavigator";

const { width } = Dimensions.get('window');
type SignInNavigationProp = StackNavigationProp<RootStackParamList, 'SignIn'>;

const SignInScreen = () => {
    const navigation = useNavigation<SignInNavigationProp>();
    const handleEmailSignIn = () => {
        navigation.navigate('EmailSignIn');
    };

    return (
        <View className="flex-1 bg-white relative justify-center items-center">
            <View className={"absolute bottom-0 w-full"}>
                <SigninBg width={width} height={(width * 584) / 375} preserveAspectRatio="xMidYMid meet"/>
            </View>

            <View className={"p-5 top-40"}>
                <View>
                    <Text className={"text-sm text-center font-bold text-gray-50"}>By clicking “Log in”, you agree with our Terms. Learn how we process your data in our Privacy Policy and Cookies Policy.</Text>
                </View>

                <View className={"top-10 flex justify-center items-center gap-5"}>
                    <View>
                        <TouchableOpacity
                            className={"w-80 h-12 rounded-[36px] bg-gray-50 flex justify-center items-center"}
                            style={{ flexDirection: 'row' }}
                        >
                            <Phone width={20} height={20} preserveAspectRatio="xMidYMid meet"/>
                            <Text className={"text-sm font-semibold text-gray-700 ml-2"}>Log in with Phone Number</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity onPress={handleEmailSignIn}
                            className={"w-80 h-12 rounded-[36px] bg-gray-50 flex justify-center items-center"}
                            style={{ flexDirection: 'row' }}
                        >
                            <Send width={20} height={20} preserveAspectRatio="xMidYMid meet"/>
                            <Text className={"text-sm font-semibold text-gray-700 ml-2"}>Log in with Email</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity className={"w-80 h-12 rounded-[36px] bg-gray-50 flex justify-center items-center"}>
                            <Text className={"text-sm font-semibold text-gray-700"}>Log in with Google</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity className={"w-80 h-12 flex justify-center items-center"}>
                            <Text className={"text-sm font-semibold text-gray-50"}>Trouble logging in?</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </View>

                {/* Header */}
                {/*<View className='mb-12'>*/}
                {/*    <Text className='text-4xl font-bold text-gray-800'>Hello</Text>*/}
                {/*    <Text className='text-xl text-gray-600'>Login to your account</Text>*/}
                {/*</View>*/}


            {/*/!* Phone Input *!/*/}
            {/*<View className='flex-row items-center mb-6'>*/}
            {/*    <Image source={{uri: 'YOUR_FLAG_IMAGE_URL'}} className='w-6 h-4 mr-2' />*/}
            {/*    <TextInput*/}
            {/*        placeholder="Enter phone number"*/}
            {/*        className='flex-1 py-3 px-4 bg-gray-200 rounded'*/}
            {/*    />*/}
            {/*</View>*/}

            {/*/!* Next Button *!/*/}
            {/*<TouchableOpacity className='py-3 bg-gray-300 rounded mb-6'>*/}
            {/*    <Text className='text-center text-white font-medium'>Next</Text>*/}
            {/*</TouchableOpacity>*/}

            {/*/!* Divider *!/*/}
            {/*<Text className='text-center text-red-500 mb-4 font-medium'>or connect with</Text>*/}

            {/*/!* Social Media Buttons *!/*/}
            {/*<TouchableOpacity className={'py-3 bg-blue-600 rounded mb-3'}>*/}
            {/*    <Text className='text-center text-white font-medium'>Sign In with Facebook</Text>*/}
            {/*</TouchableOpacity>*/}
            {/*<TouchableOpacity className='py-3 bg-red-500 rounded'>*/}
            {/*    <Text className='text-center text-white font-medium'>Sign In with Google</Text>*/}
            {/*</TouchableOpacity>*/}

        </View>
    );
};

export default SignInScreen;
