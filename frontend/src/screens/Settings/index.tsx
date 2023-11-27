import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useMemo, useState } from "react";
import SettingsCard from "../../components/screens/settings/SettingsCard/Index";
import ProfileCard from "../../components/screens/settings/ProfileCard/Index";
import InverterCard from "../../components/screens/settings/InvertersCard/Index";
import NotificationsCard from "../../components/screens/settings/NotificationsCard/Index";
import MoreSettingsCard from "../../components/screens/settings/SettingsCard/MoreSettings";
import AboutScreen from "../../components/screens/settings/SettingsCard/AboutScreen";
import { Animated } from 'react-native';


export type IStepSettings =
  | "settings"
  | "profile"
  | "inverter"
  | "notifications"
  | "moreSettings"
  | "about";

const Settings: React.FC = () => {
  const [cardActive, setCardActive] = useState<IStepSettings>("settings");

  const [fadeAnim] = useState(new Animated.Value(0)); // Inicializa a opacidade em 0

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      
    ]).start();
  }, [cardActive]);

  const Cards = useMemo(
    () => ({
      settings: () => <SettingsCard setCardActive={setCardActive} />,
      profile: () => <ProfileCard setCardActive={setCardActive} />,
      inverter: () => <InverterCard setCardActive={setCardActive} />,
      notifications: () => <NotificationsCard setCardActive={setCardActive} />,
      moreSettings: () => <MoreSettingsCard setCardActive={setCardActive} />,
      about: () => <AboutScreen setCardActive={setCardActive} />,
    }),
    []
  );

  return (
    <SafeAreaView className="flex-1 bg-blueDark-500 p-5">
      {cardActive === 'about' ? (
        <AboutScreen setCardActive={setCardActive} />
      ) : (
        <Animated.View style={{ opacity: fadeAnim }}>
          {Cards[cardActive]()}
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

export default Settings;
