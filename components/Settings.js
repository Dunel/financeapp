import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Input, ListItem, Icon, Avatar } from "react-native-elements";
import {
  getCategoriesFromAsyncStorage,
  updateCategoryInAsyncStorage,
  clearAllDataInAsyncStorage,
  saveSalaryToAsyncStorage,
  getSalaryFromAsyncStorage,
} from "../AsyncStorageHelper";

const Settings = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [salary, setSalary] = useState("0");
  const [expanded, setExpanded] = useState(false);

  let focusListener = null;

  async function fetchCategories() {
    const categories = await getCategoriesFromAsyncStorage();
    setCategories(categories);
  }

  const handleSaveSalary = async () => {
    const parsedSalary = parseFloat(salary);
    if (isNaN(parsedSalary)) {
      alert("Por favor, ingresa un sueldo válido.");
      return;
    }

    await saveSalaryToAsyncStorage(parsedSalary);
    alert("Sueldo guardado exitosamente.");
  };

  async function fetchSalary() {
    const storedSalary = await getSalaryFromAsyncStorage();
    if (storedSalary !== null) {
      setSalary(storedSalary.toString());
    }
  }

  useEffect(() => {
    focusListener = navigation.addListener("focus", () => {
      fetchCategories();
      fetchSalary();
    });

    return function cleanUp() {
      focusListener.remove();
    };
  }, [navigation]);

  const handleUpdateCategory = async () => {
    const updatedCategories = categories.map((category) => {
      if (category.id === parseInt(selectedCategory)) {
        category.name = newCategoryName;
      }
      return category;
    });

    await updateCategoryInAsyncStorage(updatedCategories);

    setNewCategoryName("");
  };

  const handleClearData = () => {
    clearAllDataInAsyncStorage();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Actualizar Categoría</Text>
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
              setSelectedCategory(category.id);
              setExpanded(false);
            }}
            bottomDivider
          >
            <Avatar title={category.name[0]} />
            <ListItem.Content>
              <ListItem.Title>{category.name}</ListItem.Title>
            </ListItem.Content>
            {selectedCategory === category.id && <ListItem.Chevron />}
          </ListItem>
        ))}
      </ListItem.Accordion>
      <Input
        style={styles.input}
        placeholder="Nuevo nombre de la categoría"
        value={newCategoryName}
        onChangeText={(text) => setNewCategoryName(text)}
      />
      <Button title="Actualizar" onPress={handleUpdateCategory} />
      <Text style={styles.title}>Actualizar Sueldo</Text>
      <Input
        style={styles.input}
        placeholder="Sueldo"
        keyboardType="numeric"
        value={salary}
        onChangeText={(text) => setSalary(text)}
      />
      <Button title="Guardar Sueldo" onPress={handleSaveSalary} />
      <Text style={styles.title}>Reiniciar Datos</Text>
      <Button title="Reiniciar" onPress={handleClearData} />
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

export default Settings;
