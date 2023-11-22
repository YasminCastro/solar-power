import { Text, View, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { IStepInverter } from "../Index";
import { useForm, Controller } from "react-hook-form";
import { IInverterCreateUpdate } from "../../../../../interfaces/inverter";
import * as invertersApi from "../../../../../services/inverters";

import { Picker } from "@react-native-picker/picker";

import Toast from "react-native-toast-message";

interface IProps {
  setInverterCardActive: React.Dispatch<React.SetStateAction<IStepInverter>>;
}

const CreateInverter = ({ setInverterCardActive }: IProps) => {
  const [loading, setLoading] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IInverterCreateUpdate>();

  const watchModel = watch("model", "");

  const onSubmit = async (data: IInverterCreateUpdate) => {
    setLoading(true);
    try {
      const response = await invertersApi.createInverter(data);
      if (response.message === "Inverter successfully created") {
        Toast.show({
          type: "success",
          text1: "Inversor criado com sucesso.",
        });
        setInverterCardActive("list");
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao criar inversor, tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    register("name");
  }, [register]);

  return (
    <View>
      <View className="flex flex-row items-center justify-between">
        <Text className="font-title text-2xl text-yellow-300">
          Criar inversor
        </Text>
        <Feather
          name="x"
          size={24}
          color="white"
          onPress={() => setInverterCardActive("list")}
        />
      </View>

      <View className="mt-8">
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
            />
          )}
          name="name"
        />

        {errors.cep && <Text className="text-red-500">CEP é obrigatório.</Text>}
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="mb-4 rounded-md bg-white p-3"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="CEP"
              keyboardType="numeric"
            />
          )}
          name="cep"
        />

        {errors.maxRealTimePower && (
          <Text className="text-red-500">Este campo é obrigatório.</Text>
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
              placeholder="Máximo de energia produzida em tempo real"
              keyboardType="numeric"
            />
          )}
          name="maxRealTimePower"
        />

        {errors.model && (
          <Text className="text-red-500">Modelo é obrigatório.</Text>
        )}
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={{
                backgroundColor: "white",
                marginBottom: 10,
              }}
            >
              <Picker.Item label="Selecione o modelo" value="" />
              <Picker.Item label="Elgin" value="elgin" />
              <Picker.Item label="Hawuei" value="hawuei" />
            </Picker>
          )}
          name="model"
        />

        {/* Campos condicionais baseados no modelo escolhido */}
        {watchModel === "elgin" && (
          <>
            {watchModel === "elgin" && (errors.password || errors.username) && (
              <Text className="text-red-500">
                Usuário e senha é obrigatório.
              </Text>
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
                  placeholder="Username"
                />
              )}
              name="username"
            />
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="mb-4 rounded-md bg-white p-3"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Senha"
                  secureTextEntry
                />
              )}
              name="password"
            />
          </>
        )}
        {watchModel === "hawuei" && (
          <>
            {watchModel === "hawuei" && errors.url && (
              <Text className="text-red-500">Url é obrigatório.</Text>
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
                  placeholder="URL"
                />
              )}
              name="url"
            />
          </>
        )}

        <TouchableOpacity
          className="flex h-10 flex-row items-center justify-center rounded-full bg-solar-100 px-6"
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        >
          <View className="flex flex-1 items-center">
            <Text className="font-body text-base text-solar-500">
              {loading ? "Cadastrando inversor..." : "Cadastrar Inversor"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <Toast position="bottom" />
    </View>
  );
};

export default CreateInverter;
