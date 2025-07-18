import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme';

const procedures = [
  { name: 'Intubation Assist', steps: ['Gather equipment','Position patient','Pre-oxygenate','Assist provider','Confirm placement','Secure tube'] },
  { name: 'Trach Care', steps: ['Prepare supplies','Remove dressing','Clean stoma','Change ties','Replace dressing'] },
  { name: 'Ventilator Setup', steps: ['Select circuit','Attach humidifier','Set initial settings','Connect to patient','Perform leak check'] },
];

export default function ProceduresScreen() {
  const [selected, setSelected] = useState(null);
  const item = selected != null ? procedures[selected] : null;
  return (
    <View style={styles.container}>
      {item ? (
        <View>
          <TouchableOpacity onPress={() => setSelected(null)}><Text style={styles.back}>Back</Text></TouchableOpacity>
          <Text style={styles.title}>{item.name}</Text>
          {item.steps.map((s,i)=>(<Text key={i} style={styles.step}>{i+1}. {s}</Text>))}
        </View>
      ) : (
        <FlatList
          data={procedures}
          renderItem={({item,index})=> (
            <TouchableOpacity style={styles.item} onPress={()=>setSelected(index)}>
              <Text style={styles.label}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles=StyleSheet.create({
  container:{ flex:1, backgroundColor: colors.background, padding:12 },
  item:{ backgroundColor:colors.cardSelected, padding:16, borderRadius:8, marginBottom:12 },
  label:{ fontSize:18, color:colors.textDark },
  title:{ fontSize:20, fontWeight:'700', marginBottom:12, color:colors.textDark },
  step:{ fontSize:16, marginBottom:8, color:colors.textDark },
  back:{ color:colors.accent, marginBottom:12 }
});
