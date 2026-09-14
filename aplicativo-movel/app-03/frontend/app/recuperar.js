import { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  StatusBar, 
  ActivityIndicator 
} from 'react-native';
import { useRouter } from 'expo-router';

// Importação da instância de API para envio ao backend
import api from '../services/api';

export default function TelaRecuperar() {
  const [email, setEmail] = useState('');
  const [carregando, setCarregando] = useState(false);

  const router = useRouter();

  // Função para enviar a solicitação de redefinição de senha ao backend
  const solicitarNovaSenha = async () => {
    if (!email.trim()) {
      Alert.alert('Atenção', 'Por favor, informe seu e-mail corporativo.');
      return;
    }

    setCarregando(true);

    try {
      // Disparo para o backend
      const resposta = await api.post('/api/auth/recuperar', { email });

      Alert.alert(
        'Solicitação Enviada', 
        resposta.data.message || 'Solicitação enviada com sucesso ao RH.'
      );

      setEmail('');
      router.replace('/'); // Retorna para o login
    } catch (erro) {
      console.error('Erro na solicitação:', erro);

      if (erro.response) {
        Alert.alert('Erro', erro.response.data.error || 'Falha ao solicitar redefinição.');
      } else {
        Alert.alert('Erro de Conexão', 'Servidor offline ou sem conexão com a rede.');
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />

      <Text style={styles.titulo}>Redefinir Senha</Text>
      <Text style={styles.subtitulo}>
        Informe seu e-mail cadastrado. Você receberá as instruções pelo RH.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail corporativo"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity 
        style={[styles.botao, carregando && styles.botaoDesabilitado]} 
        onPress={solicitarNovaSenha}
        disabled={carregando}
      >
        {carregando ? (
          <ActivityIndicator color="#ffffff" size="small" />
        ) : (
          <Text style={styles.botaoTexto}>ENVIAR SOLICITAÇÃO</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkVoltar} onPress={() => router.back()}>
        <Text style={styles.textoLinkVoltar}>Voltar ao Login</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos próprios da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  botao: {
    width: '100%',
    height: 50,
    backgroundColor: '#003366',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  botaoDesabilitado: {
    backgroundColor: '#999999',
  },
  botaoTexto: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  linkVoltar: {
    marginTop: 20,
  },
  textoLinkVoltar: {
    color: '#003366',
    fontSize: 14,
    fontWeight: '600',
  },
});