import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Data from "../screens/Data";
import Inversors from "../screens/Inversors";
import Settings from "../screens/Settings";

import { Foundation } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const Layout = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              <Foundation name="home" size={24} color="black" />;
            }
            return <Foundation name="home" size={24} color="black" />;
          },
          headerShown: false,
        }}
      />
      <Tab.Screen name="Data" component={Data} />
      <Tab.Screen name="Inversors" component={Inversors} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default Layout;
