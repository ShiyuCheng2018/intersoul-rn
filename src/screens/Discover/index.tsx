import React, {useRef, useState} from "react";
import {View, Dimensions, TouchableOpacity, Text} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import Swiper from 'react-native-deck-swiper';
import CardDeck from "../../components/CardDeck";
import {useNavigation} from "@react-navigation/native";
import CardWithActions from "../../components/CardWithActions";
import useCardActions from "../../hooks/useCardActions";
import {MainAppParamList} from "../../navigations/BottomTabNavigator";
import useUser from "../../hooks/aboutUser/useUser";

type DiscoverScreenNavigationProp = StackNavigationProp<MainAppParamList, 'Discover'>;
export type Direction = "RIGHT" | "LEFT" | null;
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


const EnableGeoLocation = () =>{
    return <TouchableOpacity className={"w-80 h-12 rounded-[36px] bg-primary flex justify-center items-center"}>
        <Text className={"text-white"}>Enable Geo location</Text>
    </TouchableOpacity>
}

const Discover = ()=>{
    const navigation = useNavigation<DiscoverScreenNavigationProp>();
    const {swipeDirection, setSwipingDirection, swiperRef} = useCardActions();
    const {userGeoLocationGetter} = useUser();

    const viewProfileDetail = (userId:string) => {
        navigation.navigate("ProfileDetail", {userId: userId});
    };

    return(
        <View className={"flex-1 bg-black items-center justify-center"}>
            {/*profile pictures view*/}
            {
                !!userGeoLocationGetter ?
                    <CardDeck ref={swiperRef} viewProfileDetail={viewProfileDetail} setSwipingDirection={(direction:Direction)=>setSwipingDirection(direction)}/>:
                    <EnableGeoLocation/>
            }
            {/*discover options*/}
            {/*<CardWithActions setSwipingDirection={(direction: Direction)=>setSwipingDirection(direction)} swipingDirection={swipeDirection} swiperRef={swiperRef as React.RefObject<Swiper<any>>}/>*/}
        </View>
    )
}

export default Discover;
