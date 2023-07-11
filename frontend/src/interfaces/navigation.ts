import { StackNavigationProp } from "@react-navigation/stack";

type AuthStackParamList = {
  Login: any;
  SignUp: any;
  Inverter: any;
};

export type AuthScreenNavigationProp = StackNavigationProp<AuthStackParamList>;
