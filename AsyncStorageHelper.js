import AsyncStorage from "@react-native-async-storage/async-storage";

const saveCategoryToAsyncStorage = async (categoryName) => {
  try {
    // Recuperar las categorías existentes de AsyncStorage
    const categories =
      JSON.parse(await AsyncStorage.getItem("categories")) || [];

    // Generar un nuevo ID para la categoría (puedes utilizar una lógica más robusta para crear IDs únicos)
    const newCategoryId = Date.now();

    // Crear la nueva categoría
    const newCategory = {
      id: newCategoryId,
      name: categoryName,
      expenses: [],
    };

    // Agregar la nueva categoría al arreglo de categorías
    categories.push(newCategory);

    // Guardar el arreglo de categorías actualizado en AsyncStorage
    await AsyncStorage.setItem("categories", JSON.stringify(categories));

    console.log("Categoría guardada con éxito:", newCategory);
  } catch (error) {
    console.error("Error al guardar la categoría:", error);
  }
};

async function clearAllDataInAsyncStorage() {
  try {
    await AsyncStorage.clear();
    console.log("Se eliminaron todos los datos guardados en AsyncStorage.");
  } catch (error) {
    console.error("Error al eliminar todos los datos en AsyncStorage:", error);
  }
}

async function getCategoriesFromAsyncStorage() {
  try {
    const categoriesJSON = await AsyncStorage.getItem("categories");
    if (categoriesJSON) {
      return JSON.parse(categoriesJSON);
    }
    return []; // Si no hay categorías almacenadas, devuelve un array vacío
  } catch (error) {
    console.error("Error al obtener las categorías desde AsyncStorage:", error);
    return []; // Manejo de errores
  }
}

const updateCategoryInAsyncStorage = async (updatedCategories) => {
  try {
    // Convierte las categorías actualizadas a formato JSON
    const updatedCategoriesJSON = JSON.stringify(updatedCategories);

    // Guarda las categorías actualizadas en AsyncStorage
    await AsyncStorage.setItem("categories", updatedCategoriesJSON);

    console.log("Categorías actualizadas en AsyncStorage.");
    //console.log(await AsyncStorage.getItem("categories"))
  } catch (error) {
    console.error("Error al actualizar categorías en AsyncStorage: ", error);
  }
};

export {
  saveCategoryToAsyncStorage,
  getCategoriesFromAsyncStorage,
  clearAllDataInAsyncStorage,
  updateCategoryInAsyncStorage,
};
