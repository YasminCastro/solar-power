import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { IStepInverter } from "../Index";
import { useForm } from "react-hook-form";
import { ICreateInverter } from "../../../../../interfaces/inverter";
import SelectDropdown from "react-native-select-dropdown";
import useYupValidationResolver from "../../../../../validations/useYupValidationResolver";
import newInverterSchema from "../../../../../validations/newInverterSchema";

interface IProps {
  setInverterCardActive: React.Dispatch<React.SetStateAction<IStepInverter>>;
}

//TODO: ARRUMAR CSS
//TODO: ARRUMAR MENSAGEM DE ERRO
//TODO: MELHORAR MENSAGENS DE ERRO

const CreateInverter = ({ setInverterCardActive }: IProps) => {
  const [model, setModel] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const invertersType = ["Elgin", "Hauwei"];
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ICreateInverter>({
    resolver: useYupValidationResolver(newInverterSchema),
  });

  const handleCreateInverter = async (data: ICreateInverter) => {
    console.log(data);

    if (!model) {
      setError("root", {
        type: "custom",
        message: "Selecione a marca do inversor para continuar!",
      });
      return;
    }

    if (model === "Hauwei" && !data.url) {
      setError("root", {
        type: "custom",
        message: "A url não pode ser vazio.",
      });
      return;
    }

    if (model === "Elgin" && !data.username && !data.password) {
      setError("root", {
        type: "custom",
        message: "Os campos Usário e Senha não podem estar vazios.",
      });
      return;
    }

    try {
      setLoading(true);
    } catch (error) {}

    // setLoading(true);
    // const { error } = await login(data);
    // if (error) {
    //   setErrorMessage("Erro ao fazer login");
    // }
    // setLoading(false);
  };

  useEffect(() => {
    register("name");
    register("cep");
    register("maxRealTimePower");
  }, [register]);

  useEffect(() => {
    setErrorMessage("");

    if (errors.name?.message) {
      setErrorMessage(errors.name?.message);
    } else if (errors.cep?.message) {
      setErrorMessage(errors.cep?.message);
    } else if (errors.maxRealTimePower?.message) {
      setErrorMessage(errors.maxRealTimePower?.message);
    } else if (errors.root?.message) {
      setErrorMessage(errors.root?.message);
    }
  }, [errors, errorMessage]);

  return (
    <View>
      <View className="flex flex-row items-center justify-between">
        <Text className="font-title text-2xl text-yellow-300">
          Novo inversor
        </Text>
        <Feather
          name="x"
          size={24}
          color="white"
          onPress={() => setInverterCardActive("list")}
        />
      </View>

      <View className=" w-full max-w-sm p-6">
        {errorMessage ? (
          <View className="absolute top-8 mx-8 w-full max-w-sm rounded-md bg-red-400 p-4">
            <Text className="font-bold text-white">{errorMessage}</Text>
          </View>
        ) : null}
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          className="w-full"
        >
          <SelectDropdown
            data={invertersType}
            defaultValue={0}
            onSelect={(selectedItem, index) => {
              setModel(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem) => {
              return selectedItem;
            }}
            rowTextForSelection={(item) => {
              return item;
            }}
            buttonStyle={{
              backgroundColor: "transparent",
              borderWidth: 1,
              borderRadius: 8,
              borderColor: "#FDA933",
            }}
            renderCustomizedButtonChild={(selectedItem) => {
              return (
                <Text className="font-body text-solar-100">
                  {selectedItem || "Selecione marca do inversor.."}
                </Text>
              );
            }}
          />
        </ScrollView>

        <TextInput
          className="mb-4 h-12 w-full rounded-sm border border-x-0 border-t-0 border-white bg-transparent px-4 font-regular text-white"
          placeholderTextColor="#ffff"
          placeholder="Nome"
          onChangeText={(text) => setValue("name", text)}
        />

        {model === "Hauwei" && (
          <View>
            <TextInput
              className="mb-4 h-12 w-full rounded-sm border border-x-0 border-t-0 border-white bg-transparent px-4 font-regular text-white"
              placeholderTextColor="#ffff"
              placeholder="URL"
              onChangeText={(text) => setValue("url", text)}
            />
          </View>
        )}

        {model === "Elgin" && (
          <View>
            <TextInput
              className="mb-4 h-12 w-full rounded-sm border border-x-0 border-t-0 border-white bg-transparent px-4 font-regular text-white"
              placeholderTextColor="#ffff"
              placeholder="Usuário"
              onChangeText={(text) => setValue("username", text)}
            />

            <TextInput
              className="mb-4 h-12 w-full rounded-sm border border-x-0 border-t-0 border-white bg-transparent px-4 font-regular text-white"
              placeholderTextColor="#ffff"
              placeholder="Senha"
              onChangeText={(text) => setValue("password", text)}
            />
          </View>
        )}

        <TextInput
          className="mb-4 h-12 w-full rounded-sm border border-x-0 border-t-0 border-white bg-transparent px-4 font-regular text-white"
          placeholderTextColor="#ffff"
          placeholder="CEP"
          keyboardType="numeric"
          onChangeText={(text) => setValue("cep", text)}
        />

        <TextInput
          className="mb-4 h-12 w-full rounded-sm border border-x-0 border-t-0 border-white bg-transparent px-4 font-regular text-white"
          placeholderTextColor="#ffff"
          placeholder="Máximo de geração em tempo real"
          keyboardType="numeric"
          onChangeText={(text) => setValue("maxRealTimePower", parseInt(text))}
        />
        <TouchableOpacity
          className="flex h-12 flex-row items-center justify-center rounded-full bg-solar-100 px-6"
          onPress={handleSubmit(
            async (data) => await handleCreateInverter(data)
          )}
        >
          <View className="flex flex-1 items-center">
            <Text className="font-body text-base text-solar-500">Criar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateInverter;
