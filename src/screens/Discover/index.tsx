import { View,TouchableOpacity} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../AppNavigator";
import Message from "../../assets/icons/message.svg";
import Retry from "../../assets/icons/retry.svg";
import Dislike from "../../assets/icons/Dislike";
import Swiper from 'react-native-deck-swiper';
import CardDeck from "../../components/CardDeck";
import LikeTheme from "../../assets/icons/LikeTheme";
import React, {useRef, useState} from "react";
import {LinearGradient} from "expo-linear-gradient";
type DiscoverScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Discover'>;

export type Direction = "RIGHT" | "LEFT" | null;

const Discover = ()=>{
    const swiperRef = useRef<Swiper<any>>(null);
    const [swipingDirection, setSwipingDirection] = useState<Direction>(null);

    return(
        <View className={"flex-1 bg-white"}>

            {/*profile pictures view*/}
            <CardDeck ref={swiperRef} setSwipingDirection={(direction:Direction)=>setSwipingDirection(direction)}/>

            {/*discover options*/}
            <View className={"w-full justify-around items-center flex-row absolute bottom-10"}>
                <TouchableOpacity style={{height: 56, width: 56,
                    shadowColor: "rgb(204, 219, 232)",
                    shadowOffset: { width: 3, height: 3 },
                    shadowOpacity: 0.5,
                    shadowRadius: 6,
                    elevation: 4, // This is for Android
                    }} className={"flex justify-center items-center rounded-[36px] bg-white"}>
                    <Retry style={{height: 23, width: 23}}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{setSwipingDirection("LEFT"); swiperRef.current?.swipeLeft()}}  style={{height: 56, width: 56,
                    shadowColor: "rgb(204, 219, 232)",
                    shadowOffset: { width: 3, height: 3 },
                    shadowOpacity: 0.5,
                    shadowRadius: 6,
                    elevation: 4, // This is for Android
                }} className={"flex justify-center items-center rounded-[36px] bg-white"}>
                    {swipingDirection === "LEFT" ?
                    <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 1}}
                        colors={['#FF7074', '#FEA085']}
                        className={`flex-1 w-full justify-center items-center rounded-[36px]`}  // Here we apply NativeWind styles
                    >
                        <Dislike fill={"#FFFFFF"}/>
                    </LinearGradient>:  <Dislike fill={"#FF7074"}/>}
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{setSwipingDirection("RIGHT"); swiperRef.current?.swipeRight()}} style={{height: 56, width: 56,
                    shadowColor: "rgb(204, 219, 232)",
                    shadowOffset: { width: 3, height: 3 },
                    shadowOpacity: 0.5,
                    shadowRadius: 6,
                    elevation: 4, // This is for Android
                }} className={"flex justify-center items-center rounded-[36px] bg-white"}>
                    {
                        swipingDirection === "RIGHT" ?
                        <LinearGradient
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 1}}
                            colors={['#FF7074', '#FEA085']}
                            className={`flex-1 w-full justify-center items-center rounded-[36px]`}  // Here we apply NativeWind styles
                        >
                            <LikeTheme fill={"#FFFFFF"}/>
                        </LinearGradient>:  <LikeTheme fill={"#FF7074"}/>
                    }
                </TouchableOpacity>

                <TouchableOpacity style={{height: 56, width: 56,
                    shadowColor: "rgb(204, 219, 232)",
                    shadowOffset: { width: 3, height: 3 },
                    shadowOpacity: 0.5,
                    shadowRadius: 6,
                    elevation: 4, // This is for Android
                }} className={"flex justify-center items-center rounded-[36px] bg-white"}>
                    <Message style={{height: 23, width: 23}}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}


export default Discover;
