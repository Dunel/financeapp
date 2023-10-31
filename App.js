import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "./components/Home";
import Test from "./components/Test"

const Tab = createMaterialBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#f0edf6"
        inactiveColor="#f0edf6"
        barStyle={{ backgroundColor: "#694fad" }}
      >
        <Tab.Screen name="Inicio" component={HomeScreen} />
        <Tab.Screen name="prueba" component={Test} />
        <Tab.Screen name="klk" component={HomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
