import { useAuth } from "../../contexts/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMemo, useState } from "react";
import SettingsCard from "../../components/screens/settings/SettingsCard/Index";
import ProfileCard from "../../components/screens/settings/ProfileCard/Index";

export type IStepSettings = "settings" | "profile" | "inverter";

const Settings: React.FC = () => {
  const { signOut } = useAuth();
  const [cardActive, setCardActive] = useState<IStepSettings>("settings");

  const Cards = useMemo(
    () => ({
      settings: () => <SettingsCard setCardActive={setCardActive} />,
      profile: () => <ProfileCard setCardActive={setCardActive} />,
      inverter: () => <SettingsCard setCardActive={setCardActive} />,
    }),
    []
  );

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-blueDark-500">
      {Cards[cardActive]()}
    </SafeAreaView>
  );
};

export default Settings;
