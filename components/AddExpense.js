import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Input, ListItem, Icon, Avatar } from "react-native-elements";
import {
  getCategoriesFromAsyncStorage,
  updateCategoryInAsyncStorage,
} from "../AsyncStorageHelper";

const AddExpense = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subname, setSubname] = useState("");
  const [amount, setAmount] = useState("");
  const [expanded, setExpanded] = useState(false);

  let focusListener = null;

  async function fetchCategories() {
    const categories = await getCategoriesFromAsyncStorage();
    setCategories(categories);
  }

  useEffect(() => {
    focusListener = navigation.addListener("focus", () => {
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
      <ListItem.Accordion
        content={
          <>
            <Icon name="list" size={30} />
            <ListItem.Content>
              <ListItem.Title>Selecciona una categoría</ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={expanded}
        onPress={() => setExpanded(!expanded)}
      >
        {categories.map((category) => (
          <ListItem
            key={category.id}
            onPress={() => {
              setSelectedCategory(category.name);
              setExpanded(false);
            }}
            bottomDivider
          >
            <Avatar title={category.name[0]} />
            <ListItem.Content>
              <ListItem.Title>{category.name}</ListItem.Title>
            </ListItem.Content>
            {selectedCategory === category.name && <ListItem.Chevron />}
          </ListItem>
        ))}
      </ListItem.Accordion>
      <Input
        style={styles.input}
        placeholder="Subnombre del gasto"
        value={subname}
        onChangeText={(text) => setSubname(text)}
      />
      <Input
        style={styles.input}
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
    marginTop: 20,
  },
  input: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#FFF",
  },
});

export default AddExpense;
