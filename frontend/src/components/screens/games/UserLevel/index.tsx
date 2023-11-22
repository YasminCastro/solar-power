import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useEffect } from "react";
import { useState } from "react";

import CircularProgress from "react-native-circular-progress-indicator";
import { useAuth } from "../../../../contexts/auth";
import * as achievementsApi from "../../../../services/achievements";
import { IRanking } from "../../../../interfaces/achievement";

export default function UserLevel() {
  const { user } = useAuth();
  const [userLevel, setUserLevel] = useState(0);
  const [loading, setLoading] = useState(true);
  const [ranking, setRaking] = useState<IRanking[]>([]);

  const loadUserLevel = async () => {
    if (user && user._id) {
      try {
        const data = await achievementsApi.getRanking(user._id);
        setRaking(data);

        const userFound = data.find((person) => person._id === user._id);
        if (userFound) {
          const level = Math.floor(userFound.level / 100);
          setUserLevel(level);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    loadUserLevel();
  }, []);

  if (loading) {
    return <ActivityIndicator size="small" color="#FEBE3D" />;
  }

  return (
    <View className="m-3 flex flex-row  rounded-xl bg-black/25 p-5">
      <View className="w-1/2  items-center">
        <Text className="pb-4 font-title text-2xl text-gray-100">Nível</Text>
        <CircularProgress
          value={userLevel}
          maxValue={userLevel}
          radius={50}
          delay={5}
          duration={2000}
          progressValueColor="#FFFFFF"
          titleColor={"white"}
          titleStyle={{ fontWeight: "bold" }}
          activeStrokeColor="#FBCF24"
          inActiveStrokeColor="#5E6795"
          inActiveStrokeOpacity={0.5}
          inActiveStrokeWidth={20}
          activeStrokeWidth={20}
          activeStrokeSecondaryColor="#FDA933"
        />
      </View>
      <View className="w-1/2 items-center">
        <Text className="pb-4 font-title text-2xl text-gray-100">Ranking</Text>
        {ranking.length > 0 && (
          <FlatList
            data={ranking}
            renderItem={({ item }) => {
              return (
                <View className="w-full items-center">
                  <Text
                    className={`font-body text-base text-gray-100 ${
                      user && user.name === item.name ? "text-solar-100" : ""
                    }`}
                  >
                    {item.name} - {item.level}
                  </Text>
                </View>
              );
            }}
            scrollEnabled={false}
          />
        )}
      </View>
    </View>
  );
}
