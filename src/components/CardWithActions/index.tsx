import {Dimensions, TouchableOpacity, View, Text} from "react-native";
import Retry from "../../assets/icons/retry.svg";
import {LinearGradient} from "expo-linear-gradient";
import Dislike from "../../assets/icons/Dislike";
import LikeTheme from "../../assets/icons/LikeTheme";
import Boost from "../../assets/icons/boost.svg";
import React from "react";
import {Direction} from "../../screens/Discover";
import Swiper from "react-native-deck-swiper";
import {DIRECTIONS} from "../../contexts/CardActionsContext";
import {useNavigation} from "@react-navigation/native";


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const CardWithActionsPages:CardWithActionsPages = {
    discover: "DISCOVER",
    profileDetail: "PROFILE_DETAIL",
    likesList: "LIKES_LIST"
}

type CardWithActionsProps = {
    profileId: string,
    page?: "DISCOVER" | "PROFILE_DETAIL" | null,
    setSwipingDirection: (direction: Direction) => void,
    swipingDirection: Direction,
    swiperRef: React.RefObject<Swiper<any>>,
    zIndex?: number
};

export type CardWithActionsPages = {
    discover: "DISCOVER",
    profileDetail: "PROFILE_DETAIL",
    likesList: "LIKES_LIST"
}

const CardWithActions:React.FC<CardWithActionsProps> = ({profileId, page,zIndex = 0, setSwipingDirection, swipingDirection, swiperRef}) => {
    const navigation = useNavigation();
    // @ts-ignore
    const currentSwipeProfileId = swiperRef.current?.props.cards[swiperRef.current?.state.firstCardIndex].id;

    return (
        <View
              style={{bottom: page === CardWithActionsPages.profileDetail? screenHeight * 0.01 : screenHeight * 0.14, width: page === CardWithActionsPages.profileDetail? "100%" : "88%", height: screenHeight*0.07,borderRadius: 16,
                  backgroundColor: 'rgba(91,91,91,0.2)', position: "absolute", flexDirection: "row",
                  justifyContent: "space-around", alignContent: "center", alignItems: "center", zIndex: zIndex
        }}>
            <TouchableOpacity style={{height: 50, width: 50,
                shadowColor: "rgb(204, 219, 232)",
                shadowOffset: { width: 3, height: 3 }, display: "flex",
                shadowOpacity: 0.5,justifyContent: "space-around", alignItems: "center",
                shadowRadius: 6, borderRadius: 36,
                elevation: 4, // This is for Android
            }}>
                <Retry style={{height: 23, width: 23}}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{setSwipingDirection(DIRECTIONS.left); (page === CardWithActionsPages.profileDetail) && navigation.goBack(); profileId === currentSwipeProfileId &&  swiperRef.current?.swipeLeft()}}
              style={{height: 50, width: 50,
                  shadowColor: "rgb(204, 219, 232)",
                  shadowOffset: { width: 3, height: 3 }, display: "flex",
                  shadowOpacity: 0.5,justifyContent: "space-around", alignItems: "center",
                  shadowRadius: 6, borderRadius: 36,
                  elevation: 4, backgroundColor: swipingDirection === "LEFT"? '#ffffff' : "transparent"
              }}>
                {swipingDirection === DIRECTIONS.left ?
                    <LinearGradient
                        start={{x: 0, y: 0}} style={{display: "flex",flex: 1, width: "100%",justifyContent: "space-around", alignItems: "center",borderRadius: 36 }}
                        end={{x: 1, y: 1}}
                        colors={['#FF7074', '#FEA085']}
                    >
                        <Dislike fill={"#FFFFFF"}/>
                    </LinearGradient>:  <Dislike fill={"#FF7074"}/>}
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{setSwipingDirection(DIRECTIONS.right); (page === CardWithActionsPages.profileDetail)  && navigation.goBack(); profileId === currentSwipeProfileId && swiperRef.current?.swipeRight()}}
                              style={{height: 50, width: 50,
                                  shadowColor: "rgb(204, 219, 232)",
                                  shadowOffset: { width: 3, height: 3 }, display: "flex",
                                  shadowOpacity: 0.5,justifyContent: "space-around", alignItems: "center",
                                  shadowRadius: 6, borderRadius: 36,
                                  elevation: 4, backgroundColor: swipingDirection === DIRECTIONS.right? '#ffffff' : "transparent"
                              }}>
                {
                    swipingDirection === DIRECTIONS.right ?
                        <LinearGradient
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 1}}
                            colors={['#FF7074', '#FEA085']}
                            style={{display: "flex",flex: 1, width: "100%",justifyContent: "space-around", alignItems: "center",borderRadius: 36 }}
                        >
                            <LikeTheme fill={"#FFFFFF"}/>
                        </LinearGradient>:  <LikeTheme fill={"#FF7074"}/>
                }
            </TouchableOpacity>

            <TouchableOpacity style={{height: 50, width: 50,
                shadowColor: "rgb(204, 219, 232)",
                shadowOffset: { width: 3, height: 3 }, display: "flex",
                shadowOpacity: 0.5,justifyContent: "space-around", alignItems: "center",
                shadowRadius: 6, borderRadius: 36,
                elevation: 4, // This is for Android
            }}
                              className={"flex justify-center items-center rounded-[36px]"}>
                <Boost/>
            </TouchableOpacity>
        </View>
    )
}

export default CardWithActions
