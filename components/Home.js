import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import {
  clearAllDataInAsyncStorage,
  getCategoriesFromAsyncStorage,
} from "../AsyncStorageHelper";
import * as Progress from "react-native-progress";

function HomeScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  let focusListener = null;

  async function fetchCategories() {
    const categories = await getCategoriesFromAsyncStorage();
    setCategories(categories);

    // Calcular el total de gastos en todas las categorías
    const total = categories.reduce(
      (acc, category) => acc + category.expenses.length,
      0
    );
    setTotalExpenses(total);
  }

  useEffect(() => {
    focusListener = navigation.addListener("focus", () => {
      console.log("testiando q se borre");
      fetchCategories();
    });
    return function cleanUp() {
      focusListener.remove();
    };
  }, []);

  const handleClearData = () => {
    clearAllDataInAsyncStorage();
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Porcentaje de gastos por categoría:</Text>
      <Button title="Borrar Datos" onPress={handleClearData} />

      {categories.map((category) => (
        <View key={category.id}>
          <Text>{category.name}</Text>
          <Progress.Circle
            progress={category.expenses.length / totalExpenses}
            size={100}
            showsText={true}
            textStyle={{ fontSize: 12 }}
            thickness={20}
          />
        </View>
      ))}
    </View>
  );
}

export default HomeScreen;
