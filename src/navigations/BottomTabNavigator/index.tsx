import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Discover from "../../screens/Discover";
import Account from "../../screens/Account";
import Messages from "../../screens/Messages";
import CardsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {View} from "react-native";
import React from "react";
import Filter from "../../assets/icons/filter.svg"; // or your preferred icon library
import Likes from "../../screens/Likes";
import LikeTheme from "../../assets/icons/LikeTheme";
import MessageIcon from "../../assets/icons/MessageIcon";
import UserIcon from "../../assets/icons/UserIcon";

export type MainAppParamList = {
    Discover: undefined;
    Likes: undefined;
    Messages: undefined;
    Account: undefined;
    ProfileDetail: { userId: string };
};

const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName={"Discover"}
            screenOptions={{
                tabBarActiveTintColor: '#FF7074',
                tabBarInactiveTintColor: '#ffffff', tabBarShowLabel: false,
                tabBarStyle: { backgroundColor: 'transparent',  borderTopWidth: 0,position: 'absolute',
                    shadowOpacity: 0,elevation: 0, }, headerTintColor: 'white',
                headerStyle: { backgroundColor: 'black',  borderBottomWidth: 0,
                    shadowOpacity: 0,elevation: 0,
                },  headerShown: true,
            }}
        >
            <Tab.Screen
                name="Discover"
                component={Discover}
                options={{
                    tabBarLabel: 'Discover',
                    tabBarIcon: ({ color }) => (
                        <CardsIcon name={"cards-playing-heart-multiple-outline"} size={28} color={color}/>
                    ),
                    headerTitle: 'InterSoul',
                    headerLeft: () => (
                        <View style={{ marginLeft: 20 }}>
                            <Icon name={"notifications-outline"} size={28} color={"white"}/>
                        </View>
                    ),
                    headerRight: () => (
                        <View style={{ marginRight: 20 }}>
                            <Filter/>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Likes"
                component={Likes}
                options={{
                    tabBarLabel: 'Likes',
                    tabBarIcon: ({ color, size }) => (
                        <LikeTheme height={28} fill={color}/>
                    ),
                }}
            />
            <Tab.Screen
                name="Messages"
                component={Messages}
                options={{
                    tabBarLabel: 'Messages',
                    tabBarIcon: ({ color, size }) => (
                        <MessageIcon height={28} fill={color}/>
                    ),
                }}
            />
            <Tab.Screen
                name="Account"
                component={Account}
                options={{
                    tabBarLabel: 'Account',
                    tabBarIcon: ({ color, size }) => (
                        <UserIcon height={28} fill={color}/>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
