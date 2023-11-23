import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useEffect } from "react";
import { useState } from "react";
import * as achievementsApi from "../../../../services/achievements";
import {
  FontAwesome5,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { IAchievement } from "../../../../interfaces/achievement";

import AchievementsModal from "../../../global/AchievementsModal";

export default function Achievements() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState<IAchievement[]>([]);

  async function loadAchievements() {
    try {
      const data = await achievementsApi.getAchievements();

      setAchievements(data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAchievements();
  }, []);

  if (loading) {
    return <ActivityIndicator size="small" color="#FEBE3D" />;
  }

  return (
    <View className="m-3 rounded-xl bg-black/25">
      <Text className="px-5 py-2 font-title text-2xl text-gray-100">
        Conquistas
      </Text>
      {achievements.length > 0 ? (
        <FlatList
          scrollEnabled={false}
          data={achievements}
          keyExtractor={(item) => item._id}
          numColumns={3}
          contentContainerStyle={{ padding: 4, alignItems: "center" }}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                onPress={() => {
                  setSelectedName(item.name);
                  setSelectedDescription(item.description);
                  setModalVisible(true);
                }}
              >
                <View className="m-2 flex items-center justify-center rounded-full bg-blueDark-400 p-2">
                  <AchievementsIcon icon={achievementsIcon(item.name, 36)} />
                  <Text className="mt-1 w-24 text-center text-sm text-white">
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text className="mt-10 text-center text-lg text-white">
          Nenhuma conquista encontrada.
        </Text>
      )}
      <AchievementsModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        title={selectedName}
        text={selectedDescription}
        icon={achievementsIcon(selectedName, 100)}
      />
    </View>
  );
}

const achievementsIcon = (name: string, size: number) => {
  switch (name) {
    case "Energizador Diário":
      return <Feather name="sunrise" size={size} color="#FFA35A" />;
    case "Produtor Mensal de Alta Voltagem":
      return (
        <MaterialCommunityIcons
          name="solar-power"
          size={size}
          color="#FFA35A"
        />
      );
    case "Campeão Anual de Energia":
      return <FontAwesome5 name="trophy" size={size} color="#FFA35A" />;
    default:
      return <FontAwesome5 name="medal" size={size} color="#FFA35A" />;
  }
};

const AchievementsIcon: React.FC<{ icon: any }> = ({ icon }) => {
  return <View>{icon}</View>;
};
