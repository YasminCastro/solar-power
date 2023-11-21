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
        className={` p-4 ${isActive ? "" : "bg-black/25"} `}
        transition="backgroundColor"
      >
        <Text className="text-center text-lg font-semibold text-white">
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
        className={`p-5 ${isActive ? "bg-black/25" : "bg-black/25"}`}
        transition="backgroundColor"
      >
        <Text className="text-white">{section.content}</Text>
      </Animatable.View>
    );
  };

  return (
    <View className="m-3 rounded-xl bg-black/25">
      <Text className="px-5 py-2 font-title text-2xl text-gray-100">FAQ</Text>
      <ScrollView>
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
