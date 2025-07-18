import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../theme';

export default function PreceptorScreen() {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => { load(); }, []);

  const load = async () => {
    const json = await AsyncStorage.getItem('preceptorNotes');
    if (json) setNotes(JSON.parse(json));
  };
  const save = async n => {
    const arr = [n, ...notes];
    setNotes(arr);
    await AsyncStorage.setItem('preceptorNotes', JSON.stringify(arr));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Student Tracker</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Observation or comment"
          value={note}
          onChangeText={setNote}
        />
        <Button title="Add" onPress={() => { if(note){ save({text:note, time: Date.now()}); setNote(''); } }} />
      </View>
      <FlatList
        data={notes}
        keyExtractor={(_,i)=>String(i)}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.text}</Text>
            <Text style={styles.time}>{new Date(item.time).toLocaleString()}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No notes yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor: colors.background, padding:12 },
  header:{ fontSize:20, fontWeight:'700', marginBottom:12, color:colors.textDark },
  row:{ flexDirection:'row', marginBottom:12 },
  input:{ flex:1, borderWidth:1, borderColor:'#ccc', borderRadius:6, padding:8, marginRight:8, backgroundColor:'#fff' },
  item:{ backgroundColor:colors.cardSelected, padding:12, borderRadius:6, marginBottom:8 },
  time:{ color:'#555', fontSize:12, marginTop:4 },
  empty:{ textAlign:'center', color:'#999', marginTop:40 }
});
