import Home from "../screens/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Foundation } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Data from "../screens/Data";
import Games from "../screens/Games";
import Settings from "../screens/Settings";

const AppStack = createBottomTabNavigator();

const AppRoutes: React.FC = () => (
  <AppStack.Navigator
    screenOptions={{
      tabBarStyle: { backgroundColor: "#23335B", height: 60 },
      headerShown: false,
      tabBarShowLabel: false,
    }}
  >
    <AppStack.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ focused }) => {
          if (focused) {
            return <Foundation name="home" size={30} color="#FFA35A" style={{
              textShadowColor: 'black',
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 7,
            }} />;
          }
          return <Foundation name="home" size={30} color="#FEBE3D" />;
        },
      }}
    />
    <AppStack.Screen
      name="Data"
      component={Data}
      options={{
        tabBarIcon: ({ focused }) => {
          if (focused) {
            return <Entypo name="bar-graph" size={30} color="#FFA35A" style={{
              textShadowColor: 'black',
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 7,
            }} />;
          }
          return <Entypo name="bar-graph" size={30} color="#FEBE3D" />;
        },
      }}
    />
    <AppStack.Screen
      name="Games"
      component={Games}
      options={{
        tabBarIcon: ({ focused }) => {
          if (focused) {
            return <Ionicons name="people" size={30} style={{
              textShadowColor: 'black',
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 7,
            }} color="#FFA35A" />;
          }
          return <Ionicons name="people" size={30} color="#FEBE3D" />;
        },
      }}
    />
    <AppStack.Screen
      name="Settings"
      component={Settings}
      options={{
        tabBarIcon: ({ focused }) => {
          if (focused) {
            return <Ionicons name="person-circle" size={30} style={{
              textShadowColor: 'black',
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 7,
            }} color="#FFA35A" />;
          }
          return <Ionicons name="person-circle" size={30} color="#FEBE3D" />;
        },
      }}
    />
  </AppStack.Navigator>
);

export default AppRoutes;
