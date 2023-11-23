import { WebView } from "react-native-webview";
import { Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { IStepSettings } from "../../../../screens/Settings";

interface IProps {
  setCardActive: React.Dispatch<React.SetStateAction<IStepSettings>>;
}

const AboutScreen: React.FC<IProps> = ({ setCardActive }) => {
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => setCardActive("settings")}
        className="mr-4"
      >
        <AntDesign name="arrowleft" size={30} color="white" />
      </TouchableOpacity>
      <WebView
        style={{ flex: 1 }}
        source={{ uri: "https://solar-power.vercel.app/" }}
      />
    </View>
  );
};

export default AboutScreen;
