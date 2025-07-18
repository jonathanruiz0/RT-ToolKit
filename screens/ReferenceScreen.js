import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme';

const data = [
  { key: 'calc', label: 'Vent & Clinical Calculators', screen: 'Calculator' },
  { key: 'abg', label: 'ABG Interpretation', screen: 'Interpret' },
  { key: 'history', label: 'Calculation History', screen: 'History' },
];

export default function ReferenceScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 12 },
  item: {
    backgroundColor: colors.cardSelected,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  label: { fontSize: 18, color: colors.textDark },
});
