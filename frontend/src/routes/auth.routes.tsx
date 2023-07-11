import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

const AuthStack = createNativeStackNavigator();

const AuthRoutes: React.FC = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={Login}></AuthStack.Screen>
    <AuthStack.Screen name="SignUp" component={SignUp}></AuthStack.Screen>
  </AuthStack.Navigator>
);

export default AuthRoutes;
