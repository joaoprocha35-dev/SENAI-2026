import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform, StatusBar, StyleSheet } from 'react-native';
import api from '../services/api'; // Importando nosso arquivo de conexão

export default function TelaCadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [setor, setSetor] = useState("");

  const registrarOperador = async () => {
    if (!nome || !email || !senha || !setor) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
      return;
    }

    try {
      const resposta = await api.post('/api/auth/cadastro', {
        nome: nome,
        email: email,
        senha: senha,
        setor: setor
      });

      Alert.alert('Sucesso!', resposta.data.message);

      setNome("");
      setEmail("");
      setSenha("");
      setSetor("");

    } catch (erro) {
      console.error(erro);

      if (erro.response) {
        Alert.alert('Atenção', erro.response.data.error);
      } else {
        Alert.alert('Erro de Rede', 'Não foi possível conectar ao servidor.');
      }
    }
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <StatusBar barStyle="dark-content" />
        
        <Text style={styles.titulo}>Cadastro de Operador</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TextInput
          style={styles.input}
          placeholder="Setor"
          value={setor}
          onChangeText={setSetor}
        />

        <TouchableOpacity style={styles.botao} onPress={registrarOperador}>
          <Text style={styles.textoBotao}>Cadastrar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Estilos criados diretamente no arquivo
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  botao: {
    width: '100%',
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});