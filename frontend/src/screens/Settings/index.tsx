import { SafeAreaView } from "react-native-safe-area-context";
import { useMemo, useState } from "react";
import SettingsCard from "../../components/screens/settings/SettingsCard/Index";
import ProfileCard from "../../components/screens/settings/ProfileCard/Index";
import InverterCard from "../../components/screens/settings/InvertersCard/Index";
import NotificationsCard from "../../components/screens/settings/NotificationsCard/Index";
import MoreSettingsCard from "../../components/screens/settings/SettingsCard/MoreSettings";
import AboutScreen from "../../components/screens/settings/SettingsCard/AboutScreen";

export type IStepSettings =
  | "settings"
  | "profile"
  | "inverter"
  | "notifications"
  | "moreSettings"
  | "about";

const Settings: React.FC = () => {
  const [cardActive, setCardActive] = useState<IStepSettings>("settings");

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
      {Cards[cardActive]()}
    </SafeAreaView>
  );
};

export default Settings;
