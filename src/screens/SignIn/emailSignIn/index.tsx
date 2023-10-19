import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../../AppNavigator";

type EmailSignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EmailSignIn'>;

const EmailSignIn = ({ navigation}:{ navigation: EmailSignInScreenNavigationProp }) =>{
    return(
        <View className={"flex flex-col justify-between items-center"}>
            <View className={"p-10 flex gap-10"}>
                <View>
                    <View className={"bottom-2"}>
                        <Text className={"text-sm text-primary font-medium"}>Email</Text>
                    </View>
                    <TextInput textContentType={"emailAddress"}
                        placeholder="Enter email"
                        className='flex py-3 px-4 bg-gray-200 w-80 h-22 rounded-[36px]'
                    />
                </View>

                <View>
                    <View className={"bottom-2"}>
                        <Text className={"text-sm text-primary font-medium"}>Password</Text>
                    </View>
                    <TextInput textContentType={"password"}  secureTextEntry={true}
                        placeholder="Enter password"
                        className='flex py-3 px-4 bg-gray-200 w-80 h-22 rounded-[36px]'
                    />
                </View>
            </View>

            <View>
                <TouchableOpacity className={"w-80 h-12 rounded-[36px] bg-primary flex justify-center items-center"}>
                    <Text className={"text-sm text-gray-50 font-medium text-center"}>Sign in</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default EmailSignIn;
