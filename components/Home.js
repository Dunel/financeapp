import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, ImageBackground } from 'react-native';

const Home = ({ navigation }) => {
  const autores = [
    'Edily Mora',
    'Abraham Amaya',
    'Moises Fuenmayor',
    'Juan Chacin',
    'Nelson Gutierrez',
    'José Molina',
    'Los otros',
  ];

  const cambiarVista = () => {
    //TODO: Cambiar a la vista "dashboard.js" OJOOOO
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/backImg3.jpg')} 
        style={styles.backgroundImage}
      >
        <View style={styles.card}>
          <Text style={styles.heading}>
            Bienvenido a tu aplicación de finanzas
          </Text>
          <Text style={styles.paragraph}>
            Descubre una nueva forma de gestionar tus finanzas con nuestra 
            aplicación intuitiva y fácil de usar. Registra tus ingresos, 
            realiza un seguimiento de tus gastos y toma el control total de 
            tus transacciones financieras.
          </Text>
          <Button
            title="Ir al Dashboard"
            onPress={cambiarVista}
            color="#0489F8"
            style={styles.button}
          />
          <Text style={styles.authorHeading}>Hecho por:</Text>
          <FlatList
            data={autores}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text style={styles.author}>
                {item}
              </Text>
            )}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Fondo medio transparente claro
    borderRadius: 10,
    padding: 20,
    width: '80%', // anchura de la card
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    width: '30%', // Ancho del botón al 30% de la card
  },
  authorHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
  author: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default Home;