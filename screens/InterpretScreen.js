import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { colors, spacing, fontSize } from '../theme';

export default function InterpretScreen() {
  const [vals, setVals] = useState({ ph: '', pco2: '', hco3: '', sao2: '', pao2: '' });
  const [out, setOut] = useState('');

  const interpret = () => {
    const pH = parseFloat(vals.ph), PCO2 = parseFloat(vals.pco2), HCO3 = parseFloat(vals.hco3);
    let primary = '', comp = '';
    if (pH < 7.35) primary = PCO2 > 45 ? 'Respiratory Acidosis' : 'Metabolic Acidosis';
    else if (pH > 7.45) primary = PCO2 < 35 ? 'Respiratory Alkalosis' : 'Metabolic Alkalosis';
    else primary = 'Normal pH';

    if (primary.includes('Respiratory')) {
      comp = HCO3 < 22 ? 'Uncompensated' : HCO3 <= 28 ? 'Partially Compensated' : 'Compensated';
    } else if (primary.includes('Metabolic')) {
      comp = PCO2 < 35 ? 'Compensated' : PCO2 <= 45 ? 'Partially Compensated' : 'Uncompensated';
    }
    setOut(`${primary}\n${comp}`);
  };

  return (
    <SafeAreaView style={s.container}>
      <LinearGradient colors={[colors.accent, '#FF6347']} style={s.header}>
        <FontAwesome5 name="notes-medical" size={26} color={colors.textLight} />
        <Text style={s.headerText}>ABG Interpretation</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={s.formContent} keyboardDismissMode="on-drag">
        {[
          { k: 'ph', label: 'pH' },
          { k: 'pco2', label: 'PaCO₂' },
          { k: 'hco3', label: 'HCO₃⁻' },
          { k: 'sao2', label: 'SaO₂ (%)' },
          { k: 'pao2', label: 'PaO₂' }
        ].map(f => (
          <View key={f.k} style={s.group}>
            <Text style={s.label}>{f.label}</Text>
            <TextInput
              style={s.input}
              keyboardType="numeric"
              placeholder="–"
              value={vals[f.k]}
              onChangeText={t => setVals(v => ({ ...v, [f.k]: t }))}
            />
          </View>
        ))}
        <TouchableOpacity style={s.btn} onPress={interpret}>
          <Text style={s.btnText}>Interpret</Text>
        </TouchableOpacity>
        {out ? <Text style={s.output}>{out}</Text> : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container:   { flex:1, backgroundColor: colors.accent },
  header:      { flexDirection:'row', alignItems:'center', padding: spacing.md },
  headerText:  { color: colors.textLight, fontSize: fontSize.large, marginLeft: spacing.sm, fontWeight:'700' },
  formContent: { backgroundColor: colors.background, padding: spacing.md, paddingBottom: spacing.xl },
  group:       { marginBottom: spacing.sm },
  label:       { fontSize: fontSize.base, color: colors.textDark, marginBottom: spacing.xs },
  input:       { backgroundColor: colors.cardSelected, borderRadius: spacing.xs, padding: spacing.sm, fontSize: fontSize.base, borderWidth:1, borderColor:'#ccc' },
  btn:         { backgroundColor: '#FF6347', padding: spacing.md, borderRadius: spacing.sm, alignItems:'center', marginTop: spacing.sm },
  btnText:     { color: colors.textLight, fontWeight:'600', fontSize: fontSize.base },
  output:      { marginTop: spacing.sm, fontSize: fontSize.large, color: colors.accent, fontWeight:'700', textAlign:'center' },
});

