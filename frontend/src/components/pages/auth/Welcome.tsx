import { View, Text } from "react-native";

const Welcome: React.FC<{ message: string }> = ({ message }) => {
  return (
    <View>
      <Text className="text-center font-title text-4xl  text-white">
        Bem vindo
      </Text>
      <Text className="text-1xl mb-6 mr-1 text-center font-regular text-gray-100">
        {message}
      </Text>
    </View>
  );
};

export default Welcome;
