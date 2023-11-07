import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Picker,
  TextInput,
} from "react-native";
import {
  getCategoriesFromAsyncStorage,
  updateCategoryInAsyncStorage,
} from "../AsyncStorageHelper";

const UpdateCategory = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
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

  const handleUpdateCategory = async () => {
    const updatedCategories = categories.map((category) => {
      if (category.id === parseInt(selectedCategory)) {
        category.name = newCategoryName;
        console.log("si");
      }
      return category;
    });

    await updateCategoryInAsyncStorage(updatedCategories);

    setNewCategoryName("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Actualizar Categoría</Text>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(value) => setSelectedCategory(value)}
      >
        <Picker.Item label="Selecciona una categoría" value="" />
        {categories.map((category) => (
          <Picker.Item
            key={category.id}
            label={category.name}
            value={category.id}
          />
        ))}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Nuevo nombre de la categoría"
        value={newCategoryName}
        onChangeText={(text) => setNewCategoryName(text)}
      />
      <Button title="Actualizar" onPress={handleUpdateCategory} />
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
});

export default UpdateCategory;
