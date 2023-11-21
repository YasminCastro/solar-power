import { View, Text, FlatList } from "react-native";
import { useEffect } from "react";
import { useState } from "react";
import * as achievementsApi from "../../../../services/achievements";

import { IAchievement } from "../../../../interfaces/achievement";

import Trophy from "../../../../assets/achievements/trophy.svg";

export default function Achievements() {
  const [achievements, setAchievements] = useState<IAchievement[]>([]);

  async function loadAchievements() {
    const data = await achievementsApi.getAchievements();
    setAchievements(data || []);
  }

  useEffect(() => {
    loadAchievements();
  }, []);

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
            <View className="m-2 flex items-center justify-center rounded-full bg-blueDark-400 p-2">
              <Trophy width={40} height={40} />
              <Text className="mt-1 w-24 text-center text-sm text-white">
                {item.name}
              </Text>
            </View>
          )}
        />
      ) : (
        <Text className="mt-10 text-center text-lg text-white">
          Nenhuma conquista encontrada.
        </Text>
      )}
    </View>
  );
}
