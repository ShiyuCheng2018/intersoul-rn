import React from "react";
import {FlatList, Dimensions, Text, View, StyleSheet, Image, TouchableOpacity} from "react-native";
import ElonMusk from "../../assets/profile/elonMusk/Elon_Musk.jpeg";
import Rachel_McAdams from "../../assets/profile/Rachel_McAdams/rachel_mcadams.jpeg";
import Emma_Watson from "../../assets/profile/Emma_Watson/Emma_Watson.png";
import Tom from "../../assets/profile/Tom/tom.jpeg";
import Anne_Hathaway from "../../assets/profile/Anne_Hathaway/Anne_Hathaway.jpg";
import VerifiedIcon from "../../components/VerifiedIcon";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {MainAppParamList} from "../../navigations/BottomTabNavigator";


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const data = [{
    id:0,
    name: "Elon Mask",
    url: ElonMusk,
    age: 30,
    isVerified: true,
}, {id: 1, name: "Rachel McAdams", url: Rachel_McAdams, age: 24, isVerified: true
}, {id: 2, name: "Emma Watson", url: Emma_Watson, age: 25, isVerified: true},
    {id: 3, name: "Tom Holland", url: Tom, age: 26, isVerified: true},
    {id: 4, name: "Anne Hathaway", url: Anne_Hathaway, age: 27, isVerified: true}]
type LikesScreenNavigationProp = StackNavigationProp<MainAppParamList, 'Likes'>;

const Likes = () => {
    const navigation = useNavigation<LikesScreenNavigationProp>();

    const viewProfileDetail = (userId:string) => {
        navigation.navigate("ProfileDetail", {userId: userId});
    };


    const renderItem = ({ item, index }:any) => {

        return (
            <TouchableOpacity onPress={()=>viewProfileDetail(index.toString())}>
            <View style={{padding: 8,
                height: screenHeight / 3, width: screenWidth/2}}>
                <View style={{backgroundColor: "transparent", height: "100%", width: "100%", borderRadius: 16, position: "relative"}}>
                    <Image style={{height: "100%", width: "100%", borderRadius: 16,  position:"relative", top: 0,}} source={item.url}
                           alt={"pic"}/>

                    <View style={{position: "absolute", bottom: 0, width: "100%", backgroundColor: "rgba(0,0,0,0.35)",
                        padding: 10,
                        borderBottomLeftRadius: 16, borderBottomRightRadius: 16}}>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap:6}}>
                            <Text style={{fontSize: 13, fontWeight: "bold", color: "#ffffff",}}>{item.name+", "+item.age}</Text>
                            {
                                item.isVerified ?  <VerifiedIcon width={14} height={14}/> : ""
                            }
                        </View>
                    </View>
                </View>
            </View>
            </TouchableOpacity>
        );
    };

    return (
        <FlatList
            data={data} style={{backgroundColor: "black"}}
            renderItem={(item)=>renderItem(item)}
            keyExtractor={(item, index) => `${item.name}`}
            numColumns={2}
        />
    );
};

export default Likes;
