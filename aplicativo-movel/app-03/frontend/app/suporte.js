import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';

// Importação do serviço de API conforme orientação
import api from '../services/api';
export default function Suporte() {
  const router = useRouter();

  // Estados com os mesmos nomes exigidos pela API
  const [operador, setOperador] = useState('');
  const [setor, setSetor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [carregando, setCarregando] = useState(false);

  // Função assíncrona de envio do chamado
  const enviarChamado = async () => {
    if (!operador.trim() || !setor.trim() || !descricao.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos do formulário.');
      return;
    }

    setCarregando(true);

    try {
      // Envio direto com a assinatura solicitada
      await api.post('/api/auth/suporte', {
        operador,
        setor,
        descricao,
      });

      // Confirmação e limpeza dos campos[cite: 13]
      Alert.alert('Sucesso', 'Chamado aberto na TI!');
      setOperador('');
      setSetor('');
      setDescricao('');
    } catch (erro) {
      console.error('Erro ao enviar chamado: ', erro);

      if (erro.response) {
        Alert.alert('Erro', erro.response.data.error || 'Falha ao registrar chamado.');
      } else {
        Alert.alert('Erro de Conexão', 'Não foi possível conectar ao servidor. Verifique sua rede.');
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.titulo}>Suporte Técnico</Text>

        <Text style={styles.descricao}>
          Encontre os canais de atendimento da TI ou relate um problema
          encontrado durante sua rotina na fábrica.
        </Text>

        <View style={styles.card}>
          <Text style={styles.subtitulo}>Canais de Atendimento</Text>
          <Text style={styles.info}>E-mail da TI: ti@fabrica.com.br</Text>
          <Text style={styles.info}>Ramal do Plantão: 1234</Text>
          <Text style={styles.info}>Horário de Atendimento: Segunda a sexta, das 08h às 18h</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.subtitulo}>Relatar Erro ou Problema</Text>

          <Text style={styles.label}>Nome do Operador ou Matrícula</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome ou matrícula"
            value={operador}
            onChangeText={setOperador}
          />

          <Text style={styles.label}>Setor/Oficina</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Usinagem, Solda ou Manutenção"
            value={setor}
            onChangeText={setSetor}
          />

          <Text style={styles.label}>Descrição do Erro/Problema</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descreva o erro ou problema ocorrido"
            value={descricao}
            onChangeText={setDescricao}
            multiline={true}
            numberOfLines={5}
            textAlignVertical="top"
          />

          <TouchableOpacity
            style={[styles.botao, carregando && styles.botaoDesabilitado]}
            onPress={enviarChamado}
            disabled={carregando}
          >
            {carregando ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Text style={styles.botaoTexto}>ENVIAR CHAMADO</Text>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.linkVoltar} onPress={() => router.back()}>
          <Text style={styles.textoLinkVoltar}>Voltar ao Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 15,
    textAlign: 'center',
  },
  descricao: {
    fontSize: 16,
    color: '#555555',
    textAlign: 'center',
    lineHeight: 23,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 15,
  },
  info: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 12,
    lineHeight: 22,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  botao: {
    backgroundColor: '#003366',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  botaoDesabilitado: {
    backgroundColor: '#999999',
  },
  botaoTexto: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkVoltar: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  textoLinkVoltar: {
    color: '#003366',
    fontSize: 15,
    fontWeight: '600',
  },
});