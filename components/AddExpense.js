import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Picker } from "react-native";
import { Input } from "react-native-elements";
import {
  getCategoriesFromAsyncStorage,
  updateCategoryInAsyncStorage,
} from "../AsyncStorageHelper";

const AddExpense = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subname, setSubname] = useState("");
  const [amount, setAmount] = useState("");
  let focusListener = null;
  
  async function fetchCategories() {
    const categories = await getCategoriesFromAsyncStorage();
    setCategories(categories);
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

  const handleSaveExpense = async () => {
    if (!selectedCategory) {
      alert("Selecciona una categoría antes de guardar el gasto.");
      return;
    }

    const newExpense = {
      subname,
      amount: parseFloat(amount),
      date: new Date(),
    };

    const updatedCategories = [...categories];

    const selectedCategoryIndex = updatedCategories.findIndex(
      (category) => category.name === selectedCategory
    );

    if (selectedCategoryIndex !== -1) {
      updatedCategories[selectedCategoryIndex].expenses.push(newExpense);

      await updateCategoryInAsyncStorage(updatedCategories);

      setSubname("");
      setAmount("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Gasto</Text>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(value) => setSelectedCategory(value)}
      >
        <Picker.Item label="Selecciona una categoría" value="" />
        {categories.map((category) => (
          <Picker.Item
            key={category.id}
            label={category.name}
            value={category.name}
          />
        ))}
      </Picker>
      <Input
        placeholder="Subnombre del gasto"
        value={subname}
        onChangeText={(text) => setSubname(text)}
      />
      <Input
        placeholder="Monto"
        value={amount}
        onChangeText={(text) => setAmount(text)}
        keyboardType="numeric"
      />
      <Button title="Guardar Gasto" onPress={handleSaveExpense} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default AddExpense;
