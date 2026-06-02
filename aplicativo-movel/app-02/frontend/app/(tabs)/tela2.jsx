import { Text, View, StyleSheet } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
        <View style={styles.caixa}>
             <Text style={styles.texto}>azul</Text>
        </View>
      <Text style={styles.texto}></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  caixa: {
    flex: 1,
    backgroundColor: 'rgb(0, 0, 0)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    color:"blue",
    alignSelf:"center",
    fontSize:50,
    
  },


 botao:{
  backgroundColor:"white",
  width:"150px",
  borderRadius:5,
  marginTop: 10,
  padding: 10,
 }

});
