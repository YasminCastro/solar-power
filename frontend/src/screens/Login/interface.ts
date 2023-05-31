import { StackNavigationProp } from "@react-navigation/stack";

type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Marca: undefined;
};

export type LoginScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "Login",
  "Marca"

>;
