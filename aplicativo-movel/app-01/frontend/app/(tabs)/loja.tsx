import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator
} from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';

export default function CadastroScreen() {

  // =========================
  // STATES
  // =========================

  const [nome, setNome] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [preco, setPreco] = useState('');
  const [tempoUso, setTempoUso] = useState('');
  const [descricao, setDescricao] = useState('');

  const [enviando, setEnviando] = useState(false);

  // =========================
  // API
  // =========================

  const IP_MAC = "10.90.194.181";

  const API_URL = `http://${IP_MAC}:3000/api/cadastrar`;

  // =========================
  // SALVAR
  // =========================

  const salvarHardware = async () => {

    if (
      !nome ||
      !marca ||
      !modelo ||
      !categoria ||
      !preco ||
      !tempoUso ||
      !descricao
    ) {
      Alert.alert(
        "Atenção",
        "Preencha todos os campos."
      );
      return;
    }

    setEnviando(true);

    try {

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome_item: nome,
          marca: marca,
          modelo: modelo,
          categoria: categoria,
          preco: parseFloat(preco.replace(',', '.')),
          tempo_uso: tempoUso,
          descricao: descricao
        })
      });

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao salvar');
      }

      Alert.alert(
        "Sucesso!",
        "Componente salvo no setup."
      );

      // LIMPAR FORMULÁRIO

      setNome('');
      setMarca('');
      setModelo('');
      setCategoria('');
      setPreco('');
      setTempoUso('');
      setDescricao('');

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Erro",
        error.message
      );

    } finally {
      setEnviando(false);
    }
  };

  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >

      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* HEADER */}

        <View style={styles.header}>

          <FontAwesome5
            name="plus-circle"
            size={40}
            color="#00ff88"
          />

          <Text style={styles.title}>
            Novo Componente
          </Text>

          <Text style={styles.subtitle}>
            Adicione uma peça ao seu setup
          </Text>

        </View>

        {/* FORM */}

        <View style={styles.form}>

          {/* NOME */}

          <Text style={styles.label}>
            Nome do Item
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ex: RTX 4090"
            placeholderTextColor="#666"
            value={nome}
            onChangeText={setNome}
          />

          {/* MARCA E MODELO */}

          <View style={styles.row}>

            <View style={styles.col}>

              <Text style={styles.label}>
                Marca
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Ex: NVIDIA"
                placeholderTextColor="#666"
                value={marca}
                onChangeText={setMarca}
              />

            </View>

            <View style={styles.col}>

              <Text style={styles.label}>
                Modelo
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Ex: Founders"
                placeholderTextColor="#666"
                value={modelo}
                onChangeText={setModelo}
              />

            </View>

          </View>

          {/* CATEGORIA */}

          <Text style={styles.label}>
            Categoria
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ex: GPU"
            placeholderTextColor="#666"
            value={categoria}
            onChangeText={setCategoria}
          />

          {/* PREÇO */}

          <Text style={styles.label}>
            Preço
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ex: 4500"
            placeholderTextColor="#666"
            keyboardType="numeric"
            value={preco}
            onChangeText={setPreco}
          />

          {/* TEMPO DE USO */}

          <Text style={styles.label}>
            Tempo de Uso
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ex: 6 meses"
            placeholderTextColor="#666"
            value={tempoUso}
            onChangeText={setTempoUso}
          />

          {/* DESCRIÇÃO */}

          <Text style={styles.label}>
            Descrição
          </Text>

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descreva o componente..."
            placeholderTextColor="#666"
            multiline
            numberOfLines={5}
            value={descricao}
            onChangeText={setDescricao}
          />

          {/* BOTÃO */}

          <TouchableOpacity
            style={[
              styles.button,
              enviando && styles.buttonDisabled
            ]}
            onPress={salvarHardware}
            disabled={enviando}
          >

            {
              enviando ? (
                <ActivityIndicator color="#000" />
              ) : (
                <>
                  <FontAwesome5
                    name="save"
                    size={18}
                    color="#000"
                    style={{ marginRight: 10 }}
                  />

                  <Text style={styles.buttonText}>
                    SALVAR NO SETUP
                  </Text>
                </>
              )
            }

          </TouchableOpacity>

        </View>

      </ScrollView>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0A0A0A'
  },

  scrollContent: {
    padding: 30,
    paddingTop: 60,
    paddingBottom: 100
  },

  header: {
    alignItems: 'center',
    marginBottom: 40
  },

  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 15
  },

  subtitle: {
    color: '#777',
    fontSize: 14,
    marginTop: 5
  },

  form: {
    width: '100%'
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  col: {
    flex: 1,
    marginRight: 10
  },

  label: {
    color: '#00ff88',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'uppercase'
  },

  input: {
    backgroundColor: '#161616',
    borderRadius: 14,
    padding: 16,
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A'
  },

  textArea: {
    height: 120,
    textAlignVertical: 'top'
  },

  button: {
    backgroundColor: '#37ff00',
    borderRadius: 14,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#00ff88',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5
  },

  buttonDisabled: {
    backgroundColor: '#4aed03'
  },

  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16
  }

});