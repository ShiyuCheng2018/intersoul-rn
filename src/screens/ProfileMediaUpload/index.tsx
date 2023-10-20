import React from "react";
import {Dimensions, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";


const { width, height } = Dimensions.get('window');
const ProfileMediaUpload = () =>{

    return(
            <View className={"h-full flex justify-between items-center"}>
                <View className={"top-10 flex justify-center items-center gap-5"}>
                    <ScrollView horizontal style={{ maxHeight: 130, flexDirection: 'row' }} showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{display:"flex",flexDirection:"row", justifyContent: 'center', alignItems: 'center', gap:5}}>
                        <View className={"rounded-[15px]"} style={{height: 130, width:90}}>
                            <LinearGradient
                                start={{x: 0, y: 0}}
                                end={{x: 1, y: 1}}
                                colors={['#FF7074', '#FEA085']}
                                className={`flex-1 w-full justify-center items-center rounded-[15px]`}  // Here we apply NativeWind styles
                            ></LinearGradient>
                        </View>
                        <View className={"rounded-[15px]"} style={{height: 130, width:90}}>
                            <LinearGradient
                                start={{x: 0, y: 0}}
                                end={{x: 1, y: 1}}
                                colors={['#FF7074', '#FEA085']}
                                className={`flex-1 w-full justify-center items-center rounded-[15px]`}  // Here we apply NativeWind styles
                            ></LinearGradient>
                        </View>
                        <View className={"rounded-[15px]"} style={{height: 130, width:90}}>
                            <LinearGradient
                                start={{x: 0, y: 0}}
                                end={{x: 1, y: 1}}
                                colors={['#FF7074', '#FEA085']}
                                className={`flex-1 w-full justify-center items-center rounded-[15px]`}  // Here we apply NativeWind styles
                            ></LinearGradient>
                        </View>
                        <View className={"rounded-[15px]"} style={{height: 130, width:90}}>
                            <LinearGradient
                                start={{x: 0, y: 0}}
                                end={{x: 1, y: 1}}
                                colors={['#FF7074', '#FEA085']}
                                className={`flex-1 w-full justify-center items-center rounded-[15px]`}  // Here we apply NativeWind styles
                            ></LinearGradient>
                        </View>
                        <View className={"rounded-[15px]"} style={{height: 130, width:90}}>
                            <LinearGradient
                                start={{x: 0, y: 0}}
                                end={{x: 1, y: 1}}
                                colors={['#FF7074', '#FEA085']}
                                className={`flex-1 w-full justify-center items-center rounded-[15px]`}  // Here we apply NativeWind styles
                            ></LinearGradient>
                        </View>
                        <View className={"rounded-[15px]"} style={{height: 130, width:90}}>
                            <LinearGradient
                                start={{x: 0, y: 0}}
                                end={{x: 1, y: 1}}
                                colors={['#FF7074', '#FEA085']}
                                className={`flex-1 w-full justify-center items-center rounded-[15px]`}  // Here we apply NativeWind styles
                            ></LinearGradient>
                        </View>

                    </ScrollView>

                    <View className={"rounded-[15px]"} style={{height: height*0.5, width: width*0.7 }}>
                        <LinearGradient
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 1}}
                            colors={['#FF7074', '#FEA085']}
                            className={`flex-1 w-full justify-center items-center rounded-[15px]`}  // Here we apply NativeWind styles
                        ></LinearGradient>
                    </View>
                </View>

                <View className={"bottom-10"}>
                    <TouchableOpacity className={"w-80 h-12 rounded-[36px] bg-primary flex justify-center items-center"}>
                        <Text className={"text-sm text-gray-50 font-bold text-center"}>Done</Text>
                    </TouchableOpacity>
                </View>

            </View>
    )
}


export default ProfileMediaUpload;
