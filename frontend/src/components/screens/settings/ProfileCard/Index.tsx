import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { IStepSettings } from "../../../../screens/Settings";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { IStepInverter } from "../InvertersCard/Index";
import { Controller, useForm } from "react-hook-form";
import { IUser } from "../../../../interfaces/user";
import React, { useState } from "react";
import { IUpdateInverter } from "../../../../interfaces/inverter";
import { useAuth } from "../../../../contexts/auth";

interface IProps {
  setCardActive: React.Dispatch<React.SetStateAction<IStepSettings>>;
  user: IUser;
  //  setInverterCardActive: React.Dispatch<React.SetStateAction<IStepInverter>>;
}

const ProfileCard: React.FC<IProps> = ({ setCardActive }) => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IUpdateInverter>();

  return (
    <View>
      <View className="flex flex-row items-center justify-between">
        <View>
          <View className="flex flex-row gap-3">
            <TouchableOpacity
              onPress={() => setCardActive("settings")}
              className=""
            >
              <AntDesign name="arrowleft" size={30} color="white" />
            </TouchableOpacity>
            <View className="flex-row items-center gap-x-16">
              <Text className="font-title text-3xl text-yellow-300">
                Editar Perfil
              </Text>
              <FontAwesome5 name="user" size={30} color="#febe3d" />
            </View>
          </View>

          <View className="mt-7">
            {errors.name && (
              <Text className="text-red-500">Nome é obrigatório.</Text>
            )}
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="mb-4 rounded-md bg-white p-3"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Nome"
                  defaultValue={user?.name}
                />
              )}
              name="name"
            />

            {/* Campo para editar o e-mail */}
            {errors.email && (
              <Text className="text-red-500">E-mail é obrigatório.</Text>
            )}
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="mb-4 rounded-md bg-white p-3"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="E-mail"
                  defaultValue={user?.email}
                />
              )}
              name="email"
            />
          </View>

          <TouchableOpacity
          className="flex h-10 flex-row items-center justify-center rounded-full bg-solar-100 px-6"
          onPress={handleSubmit((data) => console.log(data))}          disabled={loading}
        >
          <View className="flex flex-1 items-center">
            <Text className="font-body text-base text-solar-500">
              {loading ? "Atualizando perfil..." : "Atualizar perfil"}
            </Text>
          </View>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileCard;
