import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme';

const quiz = [
  {
    q: 'What is a normal pH range?',
    options: ['7.25-7.35','7.35-7.45','7.45-7.55'],
    answer: 1,
  },
  {
    q: 'Which mode provides full support?',
    options: ['CPAP','Assist-Control','SIMV'],
    answer: 1,
  },
];

export default function EducationScreen() {
  const [idx, setIdx] = useState(0);
  const [correct, setCorrect] = useState(0);
  const q = quiz[idx];
  const select = i => {
    if (i === q.answer) setCorrect(c => c+1);
    if (idx+1 < quiz.length) setIdx(idx+1);
    else alert(`Score ${correct+ (i===q.answer?1:0)} / ${quiz.length}`);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.question}>{q.q}</Text>
      {q.options.map((o,i)=>(
        <TouchableOpacity key={i} style={styles.opt} onPress={()=>select(i)}>
          <Text>{o}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles=StyleSheet.create({
  container:{ flex:1, backgroundColor: colors.background, padding:12 },
  question:{ fontSize:18, marginBottom:12, color:colors.textDark },
  opt:{ backgroundColor:colors.cardSelected, padding:12, borderRadius:8, marginBottom:8 }
});
