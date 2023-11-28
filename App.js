import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "./components/Home";
import Add from "./components/Add";
import AddExpense from "./components/AddExpense";
import Settings from "./components/Settings";
import Dashboard from "./components/Dashboard";

const Tab = createMaterialBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#f0edf6"
        inactiveColor="#f0edf6"
        barStyle={{ backgroundColor: "#694fad" }}
        screenOptions={({ route }) => ({
          tabBarIcon: () => {
            let iconName;

            if (route.name === 'Inicio') {
              iconName = 'home';
            } else if (route.name === 'Configuracion') {
              iconName = 'settings';
            } else if (route.name === 'Dashboard') {
              iconName = 'stats-chart';
            } else if (route.name === 'Categorias') {
              iconName = 'albums';
            } else if (route.name === 'Gastos') {
              iconName = 'card';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={25} color={'black'} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Inicio" component={Home} />
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="Categorias" component={Add} />
        <Tab.Screen name="Gastos" component={AddExpense} />
        <Tab.Screen name="Configuracion" component={Settings} options={{tabBarBadge: 3}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
