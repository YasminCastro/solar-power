import React, { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import * as Animatable from "react-native-animatable";
import Accordion from "react-native-collapsible/Accordion";

// Definindo o tipo para os itens do conteúdo
interface ContentType {
  title: string;
  content: string;
}

const BACON_IPSUM = "Bacon ipsum dolor amet chuck turducken landjaeger...";

const CONTENT: ContentType[] = [
  {
    title: "First",
    content: BACON_IPSUM,
  },
  {
    title: "Second",
    content: BACON_IPSUM,
  },
  {
    title: "Third",
    content: BACON_IPSUM,
  },
  {
    title: "Fourth",
    content: BACON_IPSUM,
  },
  {
    title: "Fifth",
    content: BACON_IPSUM,
  },
];

const FAQ: React.FC = () => {
  const [activeSections, setActiveSections] = useState<number[]>([]);

  const setSections = (sections: number[] | undefined[]): void => {
    const filteredSections = sections.filter(
      (section): section is number => section !== undefined
    );
    setActiveSections(filteredSections);
  };

  const renderHeader = (section: ContentType, _: number, isActive: boolean) => {
    return (
      <Animatable.View
        duration={400}
        className={`bg-white p-4 ${isActive ? "bg-white" : "bg-gray-200"}`}
        transition="backgroundColor"
      >
        <Text className="text-center text-lg font-semibold">
          {section.title}
        </Text>
      </Animatable.View>
    );
  };

  const renderContent = (
    section: ContentType,
    _: number,
    isActive: boolean
  ) => {
    return (
      <Animatable.View
        duration={400}
        className={`bg-white p-5 ${isActive ? "bg-white" : "bg-gray-200"}`}
        transition="backgroundColor"
      >
        <Text>{section.content}</Text>
      </Animatable.View>
    );
  };

  return (
    <View className={`flex-1 bg-blue-100 pt-[${Constants.statusBarHeight}px]`}>
      <View className="mt-8 items-center">
        <Text className="text-lg font-bold">FAQ</Text>
      </View>
      <ScrollView className="pt-8">
        <Accordion
          activeSections={activeSections}
          sections={CONTENT}
          touchableComponent={TouchableOpacity}
          renderHeader={renderHeader}
          renderContent={renderContent}
          duration={400}
          onChange={setSections}
          renderAsFlatList={false}
        />
      </ScrollView>
    </View>
  );
};

export default FAQ;
