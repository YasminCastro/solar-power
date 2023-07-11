import { Button, View } from "react-native";
import { useAuth } from "../../contexts/auth";

const SignIn: React.FC = () => {
  const { login } = useAuth();

  function handleLogin() {
    login({ email: "yasmincastro@gmail.com", password: "teste1234" });
  }
  return (
    <View className="flex-1 justify-center">
      <Button title="Sign In" onPress={handleLogin} />
    </View>
  );
};

export default SignIn;
