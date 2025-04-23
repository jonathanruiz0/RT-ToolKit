// 🔧 UI redesign test commit
import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const formulas = [
  { key: 've', name: 'Minute Ventilation', icon: 'ventolin', inputs: [{ k:'tv', l:'Tidal Volume (mL)' },{ k:'rr', l:'Resp Rate (bpm)' }], compute:({tv,rr})=>`${tv*rr} mL/min` },
  { key: 'va', name: 'Alveolar Ventilation', icon: 'lungs', inputs: [{ k:'tv',l:'Tidal Volume (mL)' },{ k:'ds',l:'Dead Space (mL)' },{ k:'rr',l:'Resp Rate (bpm)' }], compute:({tv,ds,rr})=>`${(tv-ds)*rr} mL/min` },
  { key: 'cst', name: 'Static Compliance', icon: 'speedometer', inputs: [{ k:'vt',l:'Vt (mL)' },{ k:'plat',l:'Plateau P (cmH₂O)' },{ k:'peep',l:'PEEP (cmH₂O)' }], compute:({vt,plat,peep})=>`${(vt/(plat-peep)).toFixed(1)} mL/cmH₂O` },
  { key: 'cdyn', name: 'Dynamic Compliance', icon: 'speedometer-medium', inputs:[{k:'vt',l:'Vt (mL)'},{k:'pip',l:'Peak P (cmH₂O)'},{k:'peep',l:'PEEP (cmH₂O)'}], compute:({vt,pip,peep})=>`${(vt/(pip-peep)).toFixed(1)} mL/cmH₂O`},
  { key: 'do2', name: 'O₂ Delivery', icon: 'heart-pulse', inputs:[{k:'co',l:'CO (L/min)'},{k:'cao2',l:'CaO₂ (mL/dL)'}], compute:({co,cao2})=>`${(co*cao2).toFixed(1)} mL O₂/min`},
  { key: 'raw', name: 'Airway Resistance', icon: 'chart-line', inputs:[{k:'deltaP',l:'ΔP (cmH₂O)'},{k:'flow',l:'Flow (L/s)'}], compute:({deltaP,flow})=>`${(deltaP/flow).toFixed(1)} cmH₂O/(L/s)`},
  { key: 'rsbi', name: 'RSBI', icon: 'tachometer-alt', inputs:[{k:'rr',l:'Resp Rate (bpm)'},{k:'vtl',l:'Vt (L)'}], compute:({rr,vtl})=>`${(rr/vtl).toFixed(0)}`},
  { key: 'ibw', name: 'Ideal Body Weight', icon: 'weight', inputs:[{k:'ht',l:'Height (in)'}], compute:({ht})=>`M:${(50+2.3*(ht-60)).toFixed(1)} kg\nF:${(45.5+2.3*(ht-60)).toFixed(1)} kg`},
  { key: 'aa', name: 'A–a Gradient', icon: 'percent', inputs:[{k:'pao2',l:'PAO₂ (mmHg)'},{k:'pao',l:'PaO₂ (mmHg)'}], compute:({pao2,pao})=>`${(pao2-pao).toFixed(1)} mmHg`},
  { key: 'pf', name: 'P/F Ratio', icon: 'percent', inputs:[{k:'pao',l:'PaO₂ (mmHg)'},{k:'fio2',l:'FiO₂ (dec)'}], compute:({pao,fio2})=>`${(pao/fio2).toFixed(0)}`},
  { key: 'vt', name: 'VT by PBW', icon: 'cube', inputs:[{k:'pbw',l:'PBW (kg)'},{k:'mlkg',l:'mL/kg'}], compute:({pbw,mlkg})=>`${(pbw*mlkg).toFixed(0)} mL`},
];

export default function CalculatorScreen() {
  const [idx,setIdx]=useState(0);
  const [vals,setVals]=useState({});
  const [res,setRes]=useState('');
  const fadeAnims = useRef(formulas.map(() => new Animated.Value(0))).current;
  const sel=formulas[idx];

  useEffect(() => {
    // fade in each input row
    Animated.stagger(100, sel.inputs.map((_, i) =>
      Animated.timing(fadeAnims[i], { toValue: 1, duration: 300, useNativeDriver: true })
    )).start();
  }, [idx]);

  const calculate=()=>{
    const args={};
    sel.inputs.forEach(i=>args[i.k]=parseFloat(vals[i.k]||0));
    setRes(sel.compute(args));
  };

  return (
    <SafeAreaView style={s.container}>
      <LinearGradient colors={['#0b3d02','#196f3d']} style={s.header}>
        <MaterialCommunityIcons name="calculator-variant" size={28} color="#fff"/>
        <Text style={s.headerText}>RT Toolkit</Text>
      </LinearGradient>

      <View style={s.pickerBox}>
        <Picker
          selectedValue={idx}
          onValueChange={v=>{setIdx(v);setVals({});setRes('');}}
          style={s.picker}
        >
          {formulas.map((f,i)=>(
            <Picker.Item key={f.key} label={f.name} value={i}/>
          ))}
        </Picker>
      </View>

      <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS==='ios'?'padding':'height'}>
        <ScrollView contentContainerStyle={s.form}>
          {sel.inputs.map((i,j)=>(
            <Animated.View key={i.k} style={[s.group,{opacity:fadeAnims[j]}]}>
              <Text style={s.label}>{i.l}</Text>
              <TextInput
                style={s.input}
                keyboardType="numeric"
                value={vals[i.k]||''}
                onChangeText={t=>setVals(v=>({...v,[i.k]:t}))}
              />
            </Animated.View>
          ))}
          <TouchableOpacity style={s.btn} onPress={calculate}>
            <Text style={s.btnText}>Calculate</Text>
          </TouchableOpacity>
          {res?(
            <Animated.Text style={s.result}>
              {res}
            </Animated.Text>
          ):null}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s=StyleSheet.create({
  container:{flex:1,backgroundColor:'#0b3d02'},
  header:{flexDirection:'row',alignItems:'center',padding:12},
  headerText:{color:'#fff',fontSize:20,fontWeight:'700',marginLeft:8},
  pickerBox:{backgroundColor:'#fff',margin:12,borderRadius:8,borderWidth:1,borderColor:'#ccc'},
  picker:{height:50},
  form:{backgroundColor:'#f9f9f9',borderTopLeftRadius:16,borderTopRightRadius:16,padding:16,paddingBottom:80},
  group:{marginBottom:12},
  label:{fontSize:14,color:'#333',marginBottom:4},
  input:{borderWidth:1,borderColor:'#bbb',borderRadius:6,padding:10,fontSize:18,backgroundColor:'#fff'},
  btn:{backgroundColor:'#196f3d',padding:14,borderRadius:6,alignItems:'center',marginTop:16},
  btnText:{color:'#fff',fontWeight:'600',fontSize:16},
  result:{marginTop:16,fontSize:22,color:'#196f3d',fontWeight:'700',textAlign:'center'}
});
