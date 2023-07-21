import { ActivityIndicator, View } from "react-native";

const LoadingScreen: React.FC = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color="#666" />
    </View>
  );
};

export default LoadingScreen;
