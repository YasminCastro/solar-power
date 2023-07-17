import { StackNavigationProp } from "@react-navigation/stack";

type StackParamList = {
  Login: any;
  SignUp: any;
  Inverter: any;
  Profile: any;
};

export type AuthScreenNavigationProp = StackNavigationProp<StackParamList>;
