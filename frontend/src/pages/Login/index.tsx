import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useAuth } from "../../contexts/auth";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import fieldValidationSchema from "../../validations/loginSchema";
import useYupValidationResolver from "../../validations/useYupValidationResolver";
import { ILoginData } from "../../interfaces/auth";

//todo: poder ver a senha digitada
//todo: loading no botão de entrar

const SignIn: React.FC = () => {
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const handleLogin = async (data: ILoginData) => {
    setLoading(true);
    const { error } = await login(data);
    if (error) {
      setErrorMessage("Erro ao fazer login");
    }
    setLoading(false);
  };

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>({
    resolver: useYupValidationResolver(fieldValidationSchema),
  });

  if (errors.email?.message) {
    setErrorMessage(errors.email?.message);
  } else if (errors.password?.message) {
    setErrorMessage(errors.password?.message);
  }

  useEffect(() => {
    register("email");
    register("password");
  }, [register]);

  return (
    <View className="flex-1 items-center justify-center bg-solar-50">
      {errorMessage ? (
        <View className="absolute top-8 mx-8 w-full max-w-sm rounded-md bg-red-400 p-4">
          <Text className="font-bold text-white">{errorMessage}</Text>
        </View>
      ) : null}

      <View className="h-1/2 w-full max-w-sm justify-center p-8 ">
        <View>
          <Text className="text-center font-title text-4xl  text-white">
            Bem vindo
          </Text>
          <Text className="text-1xl mb-6 mr-1 text-center font-regular text-gray-100">
            Faça o Login
          </Text>
        </View>

        <View>
          <Text className="text-1xl mb-6 mr-1 text-center font-regular text-white">
            Ainda não tem uma conta?{" "}
            <Text className="text-solar-600">Cadastre já!</Text>
          </Text>
        </View>
      </View>

      <LinearGradient
        className="h-1/2 w-full rounded-lg  "
        colors={["#B08C09", "#10237A"]}
        start={[0, 0]}
      >
        <View className=" w-full max-w-sm p-6">
          <TextInput
            className="mb-4 h-12 w-full rounded-sm border border-x-0 border-t-0 border-white bg-transparent px-4 font-regular text-white"
            placeholderTextColor="#ffff"
            placeholder="E-mail"
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={(text) => setValue("email", text)}
          />
          <TextInput
            className="mb-4 h-12 w-full rounded-sm border border-x-0 border-t-0 border-white bg-transparent px-4 font-regular text-white"
            placeholderTextColor="#ffff"
            placeholder="Senha"
            secureTextEntry={true}
            onChangeText={(text) => setValue("password", text)}
          />
          <Text className="text-1xl mb-14 mr-1 text-right font-regular text-white">
            Esqueceu a senha?
          </Text>

          <TouchableOpacity
            className="flex h-12 flex-row items-center justify-center rounded-full bg-solar-100 px-6"
            onPress={handleSubmit(async (data) => await handleLogin(data))}
          >
            <View className="flex flex-1 items-center">
              <Text className="font-body text-base text-solar-500">Entrar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

export default SignIn;
