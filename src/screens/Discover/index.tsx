import {View, TouchableOpacity, Dimensions, Text} from "react-native";
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
import {useNavigation} from "@react-navigation/native";
import User from "../../assets/icons/user.svg";
import Like from "../../assets/icons/like.svg";
import CardsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Boost from "../../assets/icons/boost.svg";
import CardWithActions from "../../components/CardWithActions";

type DiscoverScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Discover'>;

export type Direction = "RIGHT" | "LEFT" | null;
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Discover = ()=>{
    const navigation = useNavigation<DiscoverScreenNavigationProp>();
    const swiperRef = useRef<Swiper<any>>(null);
    const [swipingDirection, setSwipingDirection] = useState<Direction>(null);

    const viewProfileDetail = (userId:string) => {
        navigation.navigate("ProfileDetail", {userId: userId});
    };

    return(
        <View className={"flex-1 bg-black items-center"}>

            {/*profile pictures view*/}
            <CardDeck ref={swiperRef} viewProfileDetail={viewProfileDetail} setSwipingDirection={(direction:Direction)=>setSwipingDirection(direction)}/>

            {/*discover options*/}
            <CardWithActions setSwipingDirection={(direction: Direction)=>setSwipingDirection(direction)} swipingDirection={swipingDirection} swiperRef={swiperRef}/>
            {/*<View className={"justify-around items-center flex-row absolute flex-1"} style={{bottom: screenHeight * 0.14, width: "88%", height: screenHeight*0.07,borderRadius: 16,backgroundColor: 'rgba(91,91,91,0.2)'}}>*/}
            {/*    <TouchableOpacity style={{height: 50, width: 50,*/}
            {/*        shadowColor: "rgb(204, 219, 232)",*/}
            {/*        shadowOffset: { width: 3, height: 3 },*/}
            {/*        shadowOpacity: 0.5,*/}
            {/*        shadowRadius: 6,*/}
            {/*        elevation: 4, // This is for Android*/}
            {/*        }}*/}
            {/*                      className={"flex justify-center items-center rounded-[36px]"}>*/}
            {/*        <Retry style={{height: 23, width: 23}}/>*/}
            {/*    </TouchableOpacity>*/}

            {/*    <TouchableOpacity onPress={()=>{setSwipingDirection("LEFT"); swiperRef.current?.swipeLeft()}}  style={{height: 50, width: 50,*/}
            {/*        shadowColor: "rgb(7,104,188)",*/}
            {/*        shadowOffset: { width: 3, height: 3 },*/}
            {/*        shadowOpacity: 0.5,*/}
            {/*        shadowRadius: 6,*/}
            {/*        elevation: 4, // This is for Android*/}
            {/*    }} className={`flex justify-center items-center rounded-[36px] ${swipingDirection === "LEFT"? 'bg-white' : ""}`}>*/}
            {/*        {swipingDirection === "LEFT" ?*/}
            {/*        <LinearGradient*/}
            {/*            start={{x: 0, y: 0}}*/}
            {/*            end={{x: 1, y: 1}}*/}
            {/*            colors={['#FF7074', '#FEA085']}*/}
            {/*            className={`flex-1 w-full justify-center items-center rounded-[36px]`}  // Here we apply NativeWind styles*/}
            {/*        >*/}
            {/*            <Dislike fill={"#FFFFFF"}/>*/}
            {/*        </LinearGradient>:  <Dislike fill={"#FF7074"}/>}*/}
            {/*    </TouchableOpacity>*/}

            {/*    <TouchableOpacity onPress={()=>{setSwipingDirection("RIGHT"); swiperRef.current?.swipeRight()}} style={{height: 50, width: 50,*/}
            {/*        shadowColor: "rgb(204, 219, 232)",*/}
            {/*        shadowOffset: { width: 3, height: 3 },*/}
            {/*        shadowOpacity: 0.5,*/}
            {/*        shadowRadius: 6,*/}
            {/*        elevation: 4, // This is for Android*/}
            {/*    }} className={`flex justify-center items-center rounded-[36px] ${ swipingDirection === "RIGHT"? 'bg-white' : ""}`}>*/}
            {/*        {*/}
            {/*            swipingDirection === "RIGHT" ?*/}
            {/*            <LinearGradient*/}
            {/*                start={{x: 0, y: 0}}*/}
            {/*                end={{x: 1, y: 1}}*/}
            {/*                colors={['#FF7074', '#FEA085']}*/}
            {/*                className={`flex-1 w-full justify-center items-center rounded-[36px]`}  // Here we apply NativeWind styles*/}
            {/*            >*/}
            {/*                <LikeTheme fill={"#FFFFFF"}/>*/}
            {/*            </LinearGradient>:  <LikeTheme fill={"#FF7074"}/>*/}
            {/*        }*/}
            {/*    </TouchableOpacity>*/}

            {/*    <TouchableOpacity style={{height: 50, width: 50,*/}
            {/*        shadowColor: "rgb(204, 219, 232)",*/}
            {/*        shadowOffset: { width: 3, height: 3 },*/}
            {/*        shadowOpacity: 0.5,*/}
            {/*        shadowRadius: 6,*/}
            {/*        elevation: 4, // This is for Android*/}
            {/*    }}*/}
            {/*                      className={"flex justify-center items-center rounded-[36px]"}>*/}
            {/*        <Boost/>*/}
            {/*    </TouchableOpacity>*/}
            {/*</View>*/}

            {/*navigation*/}
            <View className={"w-screen absolute bottom-0 pb-10 justify-around flex-row"} style={{height: screenHeight * 0.11,  borderWidth: 1}}>
                <TouchableOpacity style={{height: 50, width: 50}}
                  className={"flex justify-center items-center rounded-[36px]"}>
                    <CardsIcon name={"cards-playing-heart-multiple-outline"} size={28} color={"#FF7074"}/>
                </TouchableOpacity>
                <TouchableOpacity style={{height: 50, width: 50}}
                                  className={"flex justify-center items-center rounded-[36px]"}>
                    <Like/>
                </TouchableOpacity>
                <TouchableOpacity style={{height: 50, width: 50}}
                                  className={"flex justify-center items-center rounded-[36px]"}>
                    <Message style={{height: 23, width: 23}}/>
                </TouchableOpacity>
                <TouchableOpacity style={{height: 50, width: 50}}
                                  className={"flex justify-center items-center rounded-[36px]"}>
                    <User/>
                </TouchableOpacity>
            </View>
        </View>
    )
}


export default Discover;
