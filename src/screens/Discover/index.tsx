import React, {useEffect, useRef, useState} from "react";
import {View, Dimensions, TouchableOpacity, Text, Platform, Alert, Linking} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import CardDeck from "../../components/CardDeck";
import {useNavigation} from "@react-navigation/native";
import CardWithActions from "../../components/CardWithActions";
import useCardActions from "../../hooks/useCardActions";
import {MainAppParamList} from "../../navigations/BottomTabNavigator";
import useUser from "../../hooks/aboutUser/useUser";
import {PERMISSIONS, request, RESULTS} from "react-native-permissions";
import Geolocation from '@react-native-community/geolocation';
import useUpcomingProfiles from "../../hooks/aboutUpcomingProfiles/useUpcomingProfiles";
import useAuth from "../../hooks/aboutAuth/useAuth";
type DiscoverScreenNavigationProp = StackNavigationProp<MainAppParamList, 'Discover'>;
export type Direction = "RIGHT" | "LEFT" | null;
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

type EnableGeoLocationProps = {
    onLocationObtained: (position: any) => void;
};

const EnableGeoLocation: React.FC<EnableGeoLocationProps> = ({ onLocationObtained }) => {
    const requestLocationPermission = async () => {
        const permission = Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

        try {
            const status = await request(permission);

            if (status === RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(
                    (position:any) => {
                        onLocationObtained(position);
                    },
                    (error:any) => {
                        // Handle error however you need to
                        console.error(error);
                        Alert.alert('Error', 'Could not fetch location');
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
                );
            } else {
                // Permission was denied or the request was not possible
                // Inform the user they need to enable it in settings
                Alert.alert(
                    "Permission Required",
                    "We need access to your location to find profiles nearby.",
                    [
                        { text: "Cancel", style: "cancel" },
                        { text: "Open Settings", onPress: () => Linking.openSettings() }
                    ]
                );
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to request location permission');
        }
    };
    return <TouchableOpacity onPress={requestLocationPermission} className={"w-80 h-12 rounded-[36px] bg-primary flex justify-center items-center"}>
        <Text className={"text-white"}>Enable Geo location</Text>
    </TouchableOpacity>
}

const Discover = ()=>{
    const navigation = useNavigation<DiscoverScreenNavigationProp>();
    const {swipeDirection, setSwipingDirection, swiperRef} = useCardActions();
    const {userGeoLocationGetter, userLocationPoster} = useUser();
    const {upcomingProfilesFetcher, upcomingProfilesGetter} = useUpcomingProfiles();
    const {jwtGetter} = useAuth();

    const handleLocationObtained = (position:any) => {
        console.log(position);
        userLocationPoster({latitude: position.coords.latitude, longitude: position.coords.longitude});
    };

    const viewProfileDetail = (userId:string) => {
        navigation.navigate("ProfileDetail", {userId: userId});
    };

    useEffect(() => {
        console.log("Discover: ", userGeoLocationGetter, jwtGetter)
        if(jwtGetter){
            if(userGeoLocationGetter ){
                upcomingProfilesFetcher();
            }
        }
    }, [userGeoLocationGetter, jwtGetter]);

    return(
        <View className={"flex-1 bg-black items-center justify-center"}>
            {/*profile pictures view*/}
            {
                !!userGeoLocationGetter ?
                    upcomingProfilesGetter.length > 0 && <CardDeck ref={swiperRef} userGeoLocationGetter={userGeoLocationGetter} data={upcomingProfilesGetter} viewProfileDetail={viewProfileDetail} setSwipingDirection={(direction:Direction)=>setSwipingDirection(direction)}/>
                    : <EnableGeoLocation onLocationObtained={handleLocationObtained}/>
            }
            {/*discover options*/}
            {/*<CardWithActions setSwipingDirection={(direction: Direction)=>setSwipingDirection(direction)} swipingDirection={swipeDirection} swiperRef={swiperRef as React.RefObject<Swiper<any>>}/>*/}
        </View>
    )
}

export default Discover;
