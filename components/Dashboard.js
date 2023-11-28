import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, FlatList } from "react-native";
import { LinearProgress, Card } from "@rneui/themed";
import { Text, Icon, Avatar } from "react-native-elements";
import {
  getSalaryFromAsyncStorage,
  getCategoriesFromAsyncStorage,
} from "../AsyncStorageHelper";

function Dashboard({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [salary, setSalary] = useState("0");
  const [loading, setLoading] = useState(true);
  const [categoryProgress, setCategoryProgress] = useState({});
  let focusListener = null;

  async function fetchCategories() {
    try {
      const categories = await getCategoriesFromAsyncStorage();
      setCategories(categories);

      const total = categories.reduce((acc, category) => {
        const categoryTotal = category.expenses.reduce(
          (expenseAcc, expense) => {
            return expenseAcc + expense.amount;
          },
          0
        );
        return acc + categoryTotal;
      }, 0);

      setTotalExpenses(total);

      const progress = {};
      categories.forEach((category) => {
        const categoryTotal = category.expenses.reduce(
          (expenseAcc, expense) => expenseAcc + expense.amount,
          0
        );
        const categoryPercentage = categoryTotal / total;
        progress[category.id] = categoryPercentage;
      });

      setCategoryProgress(progress);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchSalary() {
    const storedSalary = await getSalaryFromAsyncStorage();
    if (storedSalary !== null) {
      setSalary(storedSalary.toString());
    }
  }

  useEffect(() => {
    focusListener = navigation.addListener("focus", () => {
      fetchSalary();
      fetchCategories();
    });

    return function cleanUp() {
      focusListener.remove();
    };
  }, [navigation]);

  const renderCategoryItem = ({ item }) => (
    <Card style={styles.card}>
      <View style={styles.categoryContainer}>
        <Text style={styles.subtitle}>{item.name}</Text>

        <LinearProgress
          value={categoryProgress[item.id] || 0}
          color="red"
          style={styles.progress}
          variant="determinate"
        />

        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>
            {Math.floor(categoryProgress[item.id] * 100)}%
          </Text>
          {categoryProgress[item.id] > 0.5 ? (
            <Image
              source={require("../assets/chinohot.jpeg")}
              style={styles.image}
            />
          ) : (<Image
            source={require("../assets/chinocold.jpeg")}
            style={styles.image}
          />)}
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <View>
        <Text style={styles.subtitle}>Resumen Financiero</Text>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <Icon name="dollar-sign" type="font-awesome-5" />
            <Text>Total Gastado</Text>
            <Text style={styles.summaryValue}>{totalExpenses.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Icon name="piggy-bank" type="font-awesome-5" />
            <Text>Presupuesto Mensual</Text>
            <Text style={styles.summaryValue}>{salary}</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>Categorías</Text>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCategoryItem}
          numColumns={1}
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  summaryItem: {
    alignItems: "center",
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  card: {
    width: '100%',
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  progress: {
    flex: 1,
    marginVertical: 8,
  },
  progressInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 40,
    height: 80,
    marginLeft: 10,
  },
  progressText: {
    fontSize: 14,
  },
  flatListContainer: {
    flexGrow: 1,
  },
});

export default Dashboard;
