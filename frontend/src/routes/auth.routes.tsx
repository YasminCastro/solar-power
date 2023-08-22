import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";

const AuthStack = createNativeStackNavigator();

const AuthRoutes: React.FC = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={Login}></AuthStack.Screen>
    <AuthStack.Screen name="SignUp" component={SignUp}></AuthStack.Screen>
  </AuthStack.Navigator>
);

export default AuthRoutes;
