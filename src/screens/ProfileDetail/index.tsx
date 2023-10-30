import React, {useRef} from "react";
import {View, Text, Image, Dimensions, ScrollView} from "react-native";
import {RouteProp, } from "@react-navigation/native";
import Rachel_McAdams from "../../assets/profile/Rachel_McAdams/rachel_mcadams.jpeg";
import Rachel_McAdams_1 from "../../assets/profile/Rachel_McAdams/Rachel_McAdams_1.jpg";
import Rachel_McAdams_2 from "../../assets/profile/Rachel_McAdams/Rachel_McAdams_2.jpeg";
import Rachel_McAdams_3 from "../../assets/profile/Rachel_McAdams/Rachel_McAdams_3.jpeg";
import Rachel_McAdams_5 from "../../assets/profile/Rachel_McAdams/Rachel_McAdams_5.jpeg";
import Rachel_McAdams_6 from "../../assets/profile/Rachel_McAdams/Rachel_McAdams_6.jpeg";
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import CardWithActions, {CardWithActionsPages} from "../../components/CardWithActions";
import {Direction} from "../Discover";
import Swiper from "react-native-deck-swiper";
import {LinearGradient} from "expo-linear-gradient";
import { SafeAreaView } from 'react-native-safe-area-context';
import VerifiedIcon from "../../components/VerifiedIcon";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import useCardActions from "../../hooks/useCardActions";

export type ProfileDetailRouteParams = {
    userId: string;
};


export interface ProfileDetailProps {
    route: RouteProp<{ ProfileDetail: ProfileDetailRouteParams }, 'ProfileDetail'>;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const pictures = [Rachel_McAdams, Rachel_McAdams_1, Rachel_McAdams_2, Rachel_McAdams_3, Rachel_McAdams_5, Rachel_McAdams_6]
const ProfileDetailScreen: React.FC<ProfileDetailProps> = ({ route }) => {
    const { userId } = route.params;
    const {swipeDirection, setSwipingDirection, swiperRef} = useCardActions();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }} edges={['top']}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className={" bg-black top-0"} style={{height: screenHeight * (3/5)}}>
                    <SwiperFlatList
                        index={0}
                        showPagination
                        data={pictures}
                        paginationStyle={{
                            top: 0, // adjust as needed
                            left: 0,
                            right: 0,
                            alignItems: 'center', // center the bar horizontally
                        }}
                        renderItem={({ item}:any) => (
                            <View className={"flex-1 f-full w-screen rounded-[16px]"}>
                                <Image source={item} className={"w-full h-full rounded-[16px]"}/>
                                <LinearGradient
                                    colors={['transparent', '#020202']}
                                    style={{height: "30%", width: "100%",bottom: 0,position: "absolute",borderRadius: 16}}  // Here we apply NativeWind styles
                                ></LinearGradient>
                            </View>
                        )}
                    />
                </View>
                <View style={{ backgroundColor: "transparent", marginBottom: 100, padding: 16, display: "flex", flexDirection: "column", gap: 32 }}>

                    {/*basic*/}
                    <View className={"flex flex-col gap-2"}>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap:6,}}>
                            <Text style={{ color: "white", fontSize: 30, fontWeight: "bold"}}>Rachel McAdams, 24</Text>
                            <VerifiedIcon width={25} height={25}/>
                        </View>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap:6,}}>
                            <MaterialIcons name={"work-outline"} size={16} color={"#FF7074"}/>
                            <Text style={{ color: "white", fontSize: 16}}>Software Engineer at Apple</Text>
                        </View>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap:6,}}>
                            <MaterialCommunityIcons name={"book-education-outline"} size={16} color={"#FF7074"}/>
                            <Text style={{ color: "white", fontSize: 16}}>Bachelor's</Text>
                        </View>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap:6,}}>
                            <Icon name={"earth-outline"} size={16} color={"#FF7074"}/>
                            <Text style={{ color: "white", fontSize: 16}}>European</Text>
                        </View>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap:6,}}>
                            <Icon name={"body-outline"} size={16} color={"#FF7074"}/>
                            <Text style={{ color: "white", fontSize: 16}}>168 cm, Slender</Text>
                        </View>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap:6,}}>
                            <Icon name={"rose-outline"} size={16} color={"#FF7074"}/>
                            <Text style={{ color: "white", fontSize: 16}}>Straight</Text>
                        </View>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap:6,}}>
                            <Icon name={"location-outline"} size={16} color={"#FF7074"}/>
                            <Text style={{ color: "white", fontSize: 16}}>Lives in New York, NY</Text>
                        </View>
                    </View>

                    {/*interests, a list of words with colorful blur background badges*/}
                    <View className={"flex flex-col gap-2"}>
                        <Text style={{ color: "white", fontSize: 24, fontWeight: "bold"}}>Interests</Text>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap:6,}}>
                            <Text style={{ color: "#FF7074", fontSize: 16, backgroundColor: "rgba(91,91,91,0.2)", padding: 8, borderRadius: 16, }}>Travel</Text>
                            <Text style={{ color: "#FF7074", fontSize: 16, backgroundColor: "rgba(91,91,91,0.2)", padding: 8, borderRadius: 16}}>Hiking</Text>
                            <Text style={{ color: "#FF7074", fontSize: 16, backgroundColor: "rgba(91,91,91,0.2)", padding: 8, borderRadius: 16}}>Cooking</Text>
                            <Text style={{ color: "#FF7074", fontSize: 16, backgroundColor: "rgba(91,91,91,0.2)", padding: 8, borderRadius: 16}}>Photography</Text>
                        </View>
                    </View>

                    {/*about me*/}
                    <View className={"flex flex-col gap-2"}>
                        <View className={"flex flex-row items-center"}>
                            <Text style={{ color: "white", fontSize: 24, fontWeight: "bold", marginRight: 6}}>About me</Text>
                            <MaterialIcons name={"g-translate"} style={{color: "#FEA085", fontSize: 24, fontWeight: "bold"}}/>
                        </View>
                        <Text style={{ color: "white", fontSize: 16}}>
                            ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisi quis
                            tincidunt venenatis, ipsum quam aliquet odio, quis ultricies massa massa
                            nec sapien. Sed euismod, nisi quis tincidunt venenatis, ipsum quam aliquet
                            odio, quis ultricies massa massa nec sapien. Sed euismod, nisi quis
                        </Text>
                    </View>

                    <View className={"flex flex-col gap-2"}>
                        <Text style={{ color: "white", fontSize: 24, fontWeight: "bold"}}>Looking for</Text>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap:6,}}>
                            <View style={{backgroundColor: "rgba(255,112,116,0.2)", padding: 8, borderRadius: 16 }}>
                                <Text style={{ color: "#FF7074", fontSize: 16, }}>Relationship</Text>
                            </View>
                            <View style={{backgroundColor: "rgba(199,178,255,0.2)", padding: 8, borderRadius: 16 }}>
                                <Text style={{ color: "#c7b2ff", fontSize: 16, }}>Chat</Text>
                            </View>
                            <View style={{backgroundColor: "rgba(30,196,220,0.2)", padding: 8, borderRadius: 16 }}>
                                <Text style={{ color: "#1ec4dc", fontSize: 16}}>Friendship</Text>
                            </View>
                            <View style={{backgroundColor: "rgba(255,194,215,0.2)", padding: 8, borderRadius: 16 }}>
                                <Text style={{ color: "#ffc2d7", fontSize: 16}}>Killing time</Text>
                            </View>
                        </View>
                    </View>

                    <View className={"flex flex-col gap-2"}>
                        <Text style={{ color: "white", fontSize: 24, fontWeight: "bold"}}>Languages</Text>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap:6,}}>
                            <View style={{backgroundColor: "rgba(255,112,116,0.2)", padding: 8, borderRadius: 16 }}>
                                <Text style={{ color: "#FF7074", fontSize: 16, }}>English</Text>
                            </View>
                            <View style={{backgroundColor: "rgba(201,217,255,0.2)", padding: 8, borderRadius: 16 }}>
                                <Text style={{ color: "#c9d9ff", fontSize: 16, }}>Chinese</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap:6, backgroundColor: "rgba(91,91,91,0.2)", padding: 16}}>
                        <Icon name={"location-outline"} size={16} color={"#FF7074"}/>
                        <Text style={{ color: "white", fontSize: 16}}>~4km away, New York, NY</Text>
                    </View>

                    <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap:6, backgroundColor: "rgba(109,53,53,0.2)", padding: 16}}>
                        <MaterialIcons name={"report"} size={16} color={"#FF7074"}/>
                        <Text style={{ color: "white", fontSize: 16}}>Report this user</Text>
                    </View>

                </View>
            </ScrollView>

            <CardWithActions profileId={userId} page={CardWithActionsPages.profileDetail} setSwipingDirection={(direction: Direction) => setSwipingDirection(direction)} zIndex={1} swipingDirection={swipeDirection} swiperRef={swiperRef as  React.RefObject<Swiper<any>>} />

            <LinearGradient
                colors={['transparent', '#020202']}
                style={{ height: "10%", width: "100%", bottom: 0, position: "absolute", borderRadius: 16 }}
            ></LinearGradient>
        </SafeAreaView>
    );
};

export default ProfileDetailScreen;
