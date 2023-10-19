import React from "react";
import {ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../AppNavigator";
import Male from "../../assets/icons/male.svg";
import Female from "../../assets/icons/female.svg";

type ProfileCreationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileCreation'>;

const ProfileCreation = () =>{
    return (

        <ScrollView className={"h-auto"}>
            <View className={"flex flex-col justify-between items-center bg-white h-auto pb-10"}>
                <View className={"p-5 flex gap-10"}>
                    <View className={"pt-10"}>
                        <View className={"bottom-2"}>
                            <Text className={"text-sm text-primary font-medium"}>Username</Text>
                        </View>
                        <TextInput textContentType={"emailAddress"}
                                   placeholder="Enter username"
                                   className='flex py-3 px-4 bg-gray-50 w-80 h-22 rounded-[36px]'
                        />
                    </View>

                    <View>
                        <View className={"bottom-2"}>
                            <Text className={"text-sm text-primary font-medium"}>Birthday</Text>
                        </View>
                        <TextInput
                            placeholder="Enter birthday"
                            className='flex py-3 px-4 bg-gray-50 w-80 h-22 rounded-[36px]'
                        />
                    </View>

                    <View>
                        <View className={"bottom-2"}>
                            <Text className={"text-sm text-primary font-medium"}>Gernder</Text>
                        </View>
                        <View className={"flex flex-row justify-around items-center"}>
                            <TouchableOpacity style={{height: 60, width: 60}} className={"bg-gray-100 justify-around items-center rounded-[36px]"}>
                                <Male/>
                            </TouchableOpacity>

                            <TouchableOpacity style={{height: 60, width: 60}} className={"bg-gray-100 justify-around items-center rounded-[36px]"}>
                                <Female/>
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View>
                        <View className={"bottom-2"}>
                            <Text className={"text-sm text-primary font-medium"}>Would like to match with</Text>
                        </View>
                        <View className={"flex flex-row justify-around items-center"}>
                            <TouchableOpacity style={{height: 60, width: 60}} className={"bg-gray-100 justify-around items-center rounded-[36px]"}>
                                <Male/>
                            </TouchableOpacity>

                            <TouchableOpacity style={{height: 60, width: 60}} className={"bg-gray-100 justify-around items-center rounded-[36px]"}>
                                <Female/>
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View>
                        <View className={"bottom-2"}>
                            <Text className={"text-sm text-primary font-medium"}>About me</Text>
                        </View>
                        <TextInput style={{height: 5 * 16 + 80}}
                                   placeholder="What would you say about yourslef?" multiline={true} numberOfLines={10} maxLength={100}
                                   className='flex py-3 px-4 bg-gray-50 w-80 h-22 rounded-2xl'
                        />
                    </View>
                </View>


                <View className={"bottom-5 top-1"}>
                    <TouchableOpacity className={"w-80 h-12 rounded-[36px] bg-primary flex justify-center items-center"}>
                        <Text className={"text-sm text-gray-50 font-medium text-center"}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default ProfileCreation;
