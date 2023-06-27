import { StackNavigationProp } from "@react-navigation/stack";

type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Inverter: undefined;
};

export type AuthScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "Login",
  "Inverter"
>;
