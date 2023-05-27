import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useUser } from "../../contexts/UserContext";
import Inverter from "../../components/Screens/Inverters/Inverter";
import EditInverter from "./EditInverter";

const ListInverters = () => {
  const { userInverters } = useUser();
  const [editItem, setEditItem] = useState<{
    edit: boolean;
    inverterId: number | null;
  }>({ edit: false, inverterId: null });

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-blueDark-500">
      {editItem.edit ? (
        <EditInverter setEditItem={setEditItem} />
      ) : (
        <View>
          <View className="absolute left-8 top-16">
            <Text className="font-title text-3xl text-yellow-300">
              Inversores
            </Text>
            <Text className="font-regular text-gray-200">
              Inversores cadastrados no app
            </Text>
          </View>
          <View>
            {userInverters &&
              userInverters.map((item) => (
                <Inverter
                  key={item.id}
                  inverter={item}
                  setEditItem={setEditItem}
                />
              ))}
          </View>
        </View>
      )}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default ListInverters;
