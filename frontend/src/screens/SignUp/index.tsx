import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useAuth } from "../../contexts/auth";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import fieldValidationSchema from "../../validations/loginSchema";
import useYupValidationResolver from "../../validations/useYupValidationResolver";
import { ILoginData, ISignUpData } from "../../interfaces/auth";
import Welcome from "../../components/screens/auth/Welcome";
import { AuthScreenNavigationProp } from "../../interfaces/navigation";
import { useNavigation } from "@react-navigation/native";

//todo: poder ver a senha digitada
//todo: loading no botão de entrar

const SignUp: React.FC = () => {
  const { signUp } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<AuthScreenNavigationProp>();

  const handleSignUp = async (data: ISignUpData) => {
    setLoading(true);
    const { error } = await signUp(data);
    if (error) {
      setErrorMessage("Erro ao fazer cadastrar");
    }
    setLoading(false);
  };

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpData>({
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
    register("name");
  }, [register]);

  const login = () => {
    navigation.navigate("Login");
  };

  return (
    <View className="flex-1 items-center justify-center bg-solar-50">
      {errorMessage ? (
        <View className="absolute top-8 mx-8 w-full max-w-sm rounded-md bg-red-400 p-4">
          <Text className="font-bold text-white">{errorMessage}</Text>
        </View>
      ) : null}

      <View className="h-1/2 w-full max-w-sm justify-center p-8 ">
        <Welcome message="Faça seu Cadastro" />
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
            placeholder="Nome"
            onChangeText={(text) => setValue("name", text)}
          />
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

          <TextInput
            className="mb-4 h-12 w-full rounded-sm border border-x-0 border-t-0 border-white bg-transparent px-4 font-regular text-white"
            placeholderTextColor="#ffff"
            placeholder="Repita a senha"
            secureTextEntry={true}
            onChangeText={(text) => setValue("password", text)}
          />

          <TouchableOpacity
            className="flex h-12 flex-row items-center justify-center rounded-full bg-solar-100 px-6"
            onPress={handleSubmit(async (data) => await handleSignUp(data))}
          >
            <View className="flex flex-1 items-center">
              <Text className="font-body text-base text-solar-500">
                Cadastrar
              </Text>
            </View>
          </TouchableOpacity>
          <Text
            className="text-1xl mt-14 text-center font-regular text-white"
            onPress={login}
          >
            Já tem uma conta? Clique aqui para logar!
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default SignUp;
