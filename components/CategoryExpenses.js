import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
//import { getFormattedCategoriesForRendering } from '../AsyncStorageHelper';

const CategoryExpenses = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Obtener categorías formateadas desde AsyncStorage al cargar el componente
    async function fetchFormattedCategories() {
      const formattedCategories = await getFormattedCategoriesForRendering();
      setCategories(formattedCategories);
    }
    fetchFormattedCategories();
  }, []);

  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <View key={category.id} style={styles.categoryContainer}>
          <Text style={styles.categoryName}>{category.name}</Text>
          <View>
            {category.expenses.map((expense, index) => (
              <View key={index} style={styles.expenseItem}>
                <Text style={styles.expenseSubname}>Subnombre: {expense.subname}</Text>
                <Text style={styles.expenseAmount}>Monto: {expense.amount}</Text>
                <Text style={styles.expenseDate}>Fecha: {expense.date}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  expenseItem: {
    marginLeft: 10,
    marginTop: 10,
  },
  expenseSubname: {
    fontSize: 16,
  },
  expenseAmount: {
    fontSize: 14,
  },
  expenseDate: {
    fontSize: 14,
  },
});

export default CategoryExpenses;
