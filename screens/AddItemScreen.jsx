import React from 'react';
import { Text, ScrollView } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function AddItemScreen() {
    const { themeStyles, user } = useContext(ThemeContext);
  return (
    <ScrollView contentContainerStyle={themeStyles.container}>
        <Text style={themeStyles.title}>Add new item</Text>
    </ScrollView>
  )
}

export default AddItemScreen;
