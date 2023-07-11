import Home from "../screens/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Foundation } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const AppStack = createBottomTabNavigator();

//todo: parece que não ficou muito bom as cores de quando está selecionado

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
            return <Foundation name="home" size={30} color="#FFA35A" />;
          }
          return <Foundation name="home" size={30} color="#FEBE3D" />;
        },
      }}
    />
    <AppStack.Screen
      name="Data"
      component={Home}
      options={{
        tabBarIcon: ({ focused }) => {
          if (focused) {
            return <Entypo name="bar-graph" size={30} color="#FFA35A" />;
          }
          return <Entypo name="bar-graph" size={30} color="#FEBE3D" />;
        },
      }}
    />
    <AppStack.Screen
      name="Games"
      component={Home}
      options={{
        tabBarIcon: ({ focused }) => {
          if (focused) {
            return <Ionicons name="people" size={30} color="#FFA35A" />;
          }
          return <Ionicons name="people" size={30} color="#FEBE3D" />;
        },
      }}
    />
    <AppStack.Screen
      name="Settings"
      component={Home}
      options={{
        tabBarIcon: ({ focused }) => {
          if (focused) {
            return <Ionicons name="person-circle" size={30} color="#FFA35A" />;
          }
          return <Ionicons name="person-circle" size={30} color="#FEBE3D" />;
        },
      }}
    />
  </AppStack.Navigator>
);

export default AppRoutes;
