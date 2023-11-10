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
import ScreenGuardian from "../ScreenGuardian";

export type MainAppParamList = {
    Discover: undefined;
    Likes: undefined;
    Messages: undefined;
    Account: undefined;
    ProfileDetail: { userId: string };
};

const Tab = createBottomTabNavigator();

const ProtectedDiscover = ScreenGuardian(Discover, true, true);
const ProtectedLikes = ScreenGuardian(Likes, true, false);
const ProtectedMessages = ScreenGuardian(Messages, true, false);
const ProtectedAccount = ScreenGuardian(Account, true, false);

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName={"Discover"}
            screenOptions={{
                tabBarActiveTintColor: '#FF7074',
                tabBarInactiveTintColor: '#ffffff', tabBarShowLabel: false,
                tabBarStyle: { backgroundColor: 'transparent', position: 'absolute',
                    shadowOpacity: 0,elevation: 0, borderTopWidth: 0}, headerTintColor: 'white',
                headerStyle: { backgroundColor: 'black',  borderBottomWidth: 0,
                    shadowOpacity: 0,elevation: 0,
                },  headerShown: true,
            }}
        >
            <Tab.Screen
                name="Discover"
                component={ProtectedDiscover}
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
                component={ProtectedLikes}
                options={{ tabBarStyle:{backgroundColor: "black", shadowOpacity: 0,elevation: 0, borderTopWidth: 0},
                    tabBarLabel: 'Likes',
                    tabBarIcon: ({ color, size }) => (
                        <LikeTheme height={28} fill={color}/>
                    ),
                }}
            />
            <Tab.Screen
                name="Messages"
                component={ProtectedMessages}
                options={{
                    tabBarLabel: 'Messages',
                    tabBarIcon: ({ color, size }) => (
                        <MessageIcon height={28} fill={color}/>
                    ),
                }}
            />
            <Tab.Screen
                name="Account"
                component={ProtectedAccount}
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
