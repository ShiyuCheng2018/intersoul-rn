import React, {useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../../navigations/AppNavigator";
import useAuth from "../../../hooks/aboutAuth/useAuth";
import {types as authModuleTypes} from "../../../redux/modules/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

type EmailSignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EmailSignIn'>;

const EmailSignIn = ({ navigation}:{ navigation: EmailSignInScreenNavigationProp }) =>{

    const {emailPasswordSignIn, afterLogInScreensGetter, jwtGetter} = useAuth();
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const handleEmailSignIn = async () => {
        const data = await emailPasswordSignIn({email, password});
        await afterLogInScreensGetter;
        if((data as any).type === authModuleTypes.EMAIL_PASSWORD_LOGIN.success() && afterLogInScreensGetter.length > 0){
            console.log("data: ", data)
            // store jwt in AsyncStorage
            const jwt = jwtGetter;
            if(jwt){
                try {
                    await AsyncStorage.setItem('InterSoul_jwt_token', jwt);
                } catch (e) {
                    // reading error
                    console.error("Failed to fetch the JWT from storage.", e);
                }
            }
        }
    };

    useEffect(()=>{
        // next screen
        if(jwtGetter){
            console.log(afterLogInScreensGetter);
            const nextScreen = afterLogInScreensGetter[0];
            if(nextScreen !== "Discover"){
                navigation.navigate(nextScreen);
            }else {
                navigation.navigate('MainApp', { screen: 'Discover' });
            }
        }

    }, [jwtGetter])


    return(
        <View className={"flex flex-col justify-between items-center bg-black h-full"}>
            <View className={"p-10 flex gap-10"}>
                <View>
                    <View className={"bottom-2"}>
                        <Text className={"text-sm text-white font-medium"}>Email</Text>
                    </View>
                    <TextInput textContentType={"emailAddress"} value={email} onChangeText={setEmail}
                        placeholder="Enter email"
                        className='flex py-3 px-4 text-primary bg-gray-200 w-80 h-22 rounded-[36px]'
                    />
                </View>

                <View>
                    <View className={"bottom-2"}>
                        <Text className={"text-sm text-white font-medium"}>Password</Text>
                    </View>
                    <TextInput textContentType={"password"}  secureTextEntry={true}
                        placeholder="Enter password" value={password} onChangeText={setPassword}
                        className='flex py-3 px-4 bg-gray-200 text-primary w-80 h-22 rounded-[36px]'
                    />
                </View>
            </View>

            <View className={"pb-[500px]"}>
                <TouchableOpacity className={"w-80 h-12 rounded-[36px] bg-primary flex justify-center items-center"} onPress={handleEmailSignIn}>
                    <Text className={"text-sm text-gray-50 font-bold text-center"}>Sign in</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default EmailSignIn;
