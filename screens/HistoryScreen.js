import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const load = async () => {
      const json = await AsyncStorage.getItem('calcHistory') || '[]';
      setHistory(JSON.parse(json));
    };
    const sub = load();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.formula}</Text>
      <Text style={styles.details}>Inputs: {Object.entries(item.inputs).map(([k,v])=>`${k}=${v}`).join(', ')}</Text>
      <Text style={styles.result}>Result: {item.result}</Text>
      <Text style={styles.time}>{new Date(item.timestamp).toLocaleString()}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={history}
        keyExtractor={(_, idx) => String(idx)}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No history yet.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 12 },
  item: { padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
  title: { fontWeight: '600', fontSize: 16 },
  details: { color: '#555', marginTop: 4 },
  result: { color: '#003300', marginTop: 4, fontWeight: '500' },
  time: { color: '#999', marginTop: 2, fontSize: 12 },
  empty: { textAlign: 'center', marginTop: 40, color: '#999' }
});

