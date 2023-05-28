import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Data from "../screens/Data";
import Settings from "../screens/Settings";

import { Foundation } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import UserCircle from "../components/Global/BottomTab/UserIcon";
import Inverters from "../screens/Inverters";
import { useUser } from "../contexts/UserContext";
import { View, ActivityIndicator } from "react-native";
import Logo from "../assets/logo.svg";

const Tab = createBottomTabNavigator();

const Layout = () => {
  const { user } = useUser();
  return (
    <>
      {user ? (
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: { backgroundColor: "#23335B", height: 60 },
            headerShown: false,
            tabBarShowLabel: false,
          }}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ color, size, focused }) => {
                if (focused) {
                  return <Foundation name="home" size={30} color="#FFA35A" />;
                }
                return <Foundation name="home" size={30} color="#FEBE3D" />;
              },
            }}
          />
          <Tab.Screen
            name="Data"
            component={Data}
            options={{
              tabBarIcon: ({ color, size, focused }) => {
                if (focused) {
                  return <Entypo name="bar-graph" size={24} color="#FFA35A" />;
                }
                return <Entypo name="bar-graph" size={24} color="#FEBE3D" />;
              },
            }}
          />
          <Tab.Screen
            name="Inverters"
            component={Inverters}
            options={{
              tabBarIcon: ({ color, size, focused }) => {
                if (focused) {
                  return (
                    <FontAwesome5
                      name="solar-panel"
                      size={24}
                      color="#FFA35A"
                    />
                  );
                }
                return (
                  <FontAwesome5 name="solar-panel" size={24} color="#FEBE3D" />
                );
              },
            }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              tabBarIcon: ({ color, size, focused }) => {
                return <UserCircle />;
              },
            }}
          />
        </Tab.Navigator>
      ) : (
        <View className="flex-1 items-center justify-center bg-blueDark-500">
          <Logo width={200} height={200} />
          <ActivityIndicator size="large" color="#FEBE3D" />
        </View>
      )}
    </>
  );
};

export default Layout;
