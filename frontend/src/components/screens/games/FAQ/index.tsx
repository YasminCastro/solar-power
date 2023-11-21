import React, { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import Accordion from "react-native-collapsible/Accordion";

interface ContentType {
  title: string;
  content: string;
}

const BACON_IPSUM = "Bacon ipsum dolor amet chuck turducken landjaeger...";

const CONTENT: ContentType[] = [
  {
    title: "É normal uma variação na produção de energia durante o ano?",
    content:
      "Sim, é normal haver variação na produção de energia solar ao longo do ano. Isso ocorre devido às mudanças nas condições climáticas e na posição do sol. Geralmente, a produção é maior no verão, quando os dias são mais longos e o sol está mais alto no céu, e menor no inverno, devido aos dias mais curtos e menor intensidade solar. Além disso, condições climáticas como nebulosidade e chuvas também podem afetar temporariamente a eficiência dos painéis.",
  },
  {
    title: "Como faço a manutenção do meu sistema de energia solar?",
    content:
      "A manutenção principal de um sistema de energia solar é a limpeza periódica dos painéis. É recomendável limpar os painéis solares pelo menos uma ou duas vezes por ano para remover poeira, folhas, ou qualquer sujeira que possa obstruir a luz solar. Isso pode ser feito com água e um pano macio ou escova. Além disso, é importante verificar periodicamente se há danos ou desgaste nos painéis e nos componentes do sistema. Para uma manutenção mais detalhada, é aconselhável contratar um profissional especializado.",
  },
  {
    title:
      "O sistema de energia solar requer alguma mudança no meu consumo diário de energia?",
    content:
      "Não é necessário mudar drasticamente seu consumo de energia com um sistema solar, mas pode ser benéfico. Usar aparelhos que consomem mais energia durante o dia, quando os painéis produzem mais, ajuda a aproveitar melhor a energia solar. Além disso, adotar medidas para aumentar a eficiência energética, como usar lâmpadas de LED e termostatos inteligentes, pode maximizar os benefícios do sistema solar e diminuir a dependência de energia convencional.",
  },
  {
    title: "Há incentivos ou benefícios fiscais para quem usa energia solar?",
    content:
      "No Brasil, os incentivos fiscais para energia solar incluem descontos no IPTU para proprietários que instalam sistemas solares, facilitando a aquisição de equipamentos com isenção de imposto de importação e integrando a energia solar ao programa habitacional Minha Casa, Minha Vida. Além disso, a instalação de energia solar pode levar a uma redução no imposto de renda sobre o lucro da venda do imóvel, tornando-a uma opção atrativa tanto para a eficiência energética quanto para benefícios fiscais. Essas medidas refletem o esforço do governo brasileiro para promover a energia solar como uma alternativa sustentável e economicamente viável.",
  },
  {
    title: "Como a companhia de energia calcula a energia que produzo?",
    content:
      "Em sistemas solares que se conectam diretamente à rede elétrica, a companhia de energia utiliza dois medidores distintos: um para medir a energia consumida da rede e outro para medir a energia produzida pelo seu sistema solar. O medidor de consumo registra a quantidade de energia que você utiliza da rede elétrica, enquanto o medidor de produção acompanha a quantidade de energia que seu sistema solar gera e envia de volta para a rede. Ao final do período de faturamento, a companhia de energia compara esses dois valores. Se você produziu mais energia do que consumiu, o excedente é creditado na sua conta, reduzindo o valor da sua fatura. Esse processo garante que você seja cobrado apenas pelo seu consumo líquido de energia e receba créditos pela energia que seu sistema solar contribuiu para a rede.",
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
