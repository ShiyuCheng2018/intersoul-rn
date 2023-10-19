import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

const SignInScreen = () => {
    return (
        <View className="flex-1 bg-white justify-center px-6">

            {/* Header */}
            <View className='mb-12'>
                <Text className='text-4xl font-bold text-gray-800'>Hello</Text>
                <Text className='text-xl text-gray-600'>Login to your account</Text>
            </View>

            {/* Phone Input */}
            <View className='flex-row items-center mb-6'>
                <Image source={{uri: 'YOUR_FLAG_IMAGE_URL'}} className='w-6 h-4 mr-2' />
                <TextInput
                    placeholder="Enter phone number"
                    className='flex-1 py-3 px-4 bg-gray-200 rounded'
                />
            </View>

            {/* Next Button */}
            <TouchableOpacity className='py-3 bg-gray-300 rounded mb-6'>
                <Text className='text-center text-white font-medium'>Next</Text>
            </TouchableOpacity>

            {/* Divider */}
            <Text className='text-center text-red-500 mb-4 font-medium'>or connect with</Text>

            {/* Social Media Buttons */}
            <TouchableOpacity className={'py-3 bg-blue-600 rounded mb-3'}>
                <Text className='text-center text-white font-medium'>Sign In with Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity className='py-3 bg-red-500 rounded'>
                <Text className='text-center text-white font-medium'>Sign In with Google</Text>
            </TouchableOpacity>

        </View>
    );
};

export default SignInScreen;
