import SelectDropdown from "react-native-select-dropdown";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

const SelectInverter: React.FC = () => {
  const countries = ["Egypt", "Canada", "Australia", "Ireland"];

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
      >
        <SelectDropdown
          data={countries}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
          buttonStyle={{
            backgroundColor: "#FFF",
            borderWidth: 1,
            borderRadius: 8,
            borderColor: "#FEBE3D",
          }}
          renderCustomizedButtonChild={(selectedItem, index) => {
            return (
              <View className="flex flex-row items-center justify-between text-2xl font-bold">
                <FontAwesome5 name="solar-panel" size={18} color="#FEBE3D" />
                <Text className="text-solar-100 ">
                  {selectedItem || "teste"}
                </Text>
                <FontAwesome name="chevron-down" size={18} color="#FEBE3D" />
              </View>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default SelectInverter;
