import React, { useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { Input } from 'react-native-elements';
import { saveCategoryToAsyncStorage } from '../AsyncStorageHelper';

const Add = () => {
  const [categoryName, setCategoryName] = useState('');

  const handleSaveCategory = () => {
    saveCategoryToAsyncStorage(categoryName);
    
    setCategoryName('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categoría de Gastos</Text>
      <Input
        style={styles.input}
        placeholder="Nombre de la categoría"
        value={categoryName}
        onChangeText={(text) => setCategoryName(text)}
      />
      <Button title="Guardar" onPress={handleSaveCategory} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

export default Add;
