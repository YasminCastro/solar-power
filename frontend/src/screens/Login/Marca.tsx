import { View, Text, TextInput, Pressable, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { LoginScreenNavigationProp } from './interface';
import HuaweiLogo from "../../assets/huawei-logo.svg";
import ElginLogo from "../../assets/elgin.svg";


export default function Marca() {

    const navigation = useNavigation<LoginScreenNavigationProp>();

    return(
        <View className="flex-1 items-center justify-center bg-solar-50">
            <View className='w-full max-w-sm p-8 justify-center h-1/3'>
                <Text className="text-center font-title text-4xl  text-white">
                    Qual a marca do seu inversor?
                </Text>
            </View>

            <View className='h-1/3 w-full max-w-sm p-6 '>
                
                <Pressable className="mb-4 flex h-28 items-center justify-center rounded-lg bg-white">
                    <View className="flex flex-row space-x-14 ">
                        <HuaweiLogo></HuaweiLogo>
                            <Text className="text-3xl font-regular text-solar-400">
                                Huawei
                            </Text>
                    </View>
                </Pressable>

                <Pressable className="mb-4 flex h-28 items-center justify-center rounded-lg bg-white">
                    <View className="flex flex-row space-x-14 ">
                        <ElginLogo></ElginLogo>
                            <Text className="text-3xl font-regular text-solar-400">
                                Elgin
                            </Text>
                    </View>
                </Pressable>

            </View>

            <View className='h-1/3 w-full max-w-sm p-6 justify-center'>
                <TouchableOpacity
                className="flex h-12 flex-row items-center justify-center rounded-full bg-solar-100 px-6"
                
            >
                <View className="flex flex-1 items-center">
                <Text className="font-body text-base text-solar-500">Entrar</Text>
                </View>
            </TouchableOpacity>


            </View>

        </View>
    );
}