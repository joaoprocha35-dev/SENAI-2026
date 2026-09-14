import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar, ActivityIndicator } from 'react-native';
import { Link, useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

import AsyncStorage from '@react-native-async-storage/async-storage'; // Armazenamento local

// 1. Importação do Hook de monitoramento de rede
import { useNetInfo } from '@react-native-community/netinfo';
import api from '../services/api';

export default function TelaLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  
  const router = useRouter();

  // 2. Instância do NetInfo para monitorar a conexão em tempo real
  const netInfo = useNetInfo();

  const fazerLogin = async () => {
    // Vibração tátil ao clicar
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha e-mail e senha.');
      return;
    }
    
    setCarregando(true);
    
    try {
      const resposta = await api.post('/api/auth/login', {
        email: email,
        senha: senha
      });
      
      // Salva o ID e o E-MAIL do usuário autenticado no AsyncStorage
      await AsyncStorage.setItem('usuarioId', String(resposta.data.usuario.id));
      await AsyncStorage.setItem('usuarioEmail', resposta.data.usuario.email); // <-- ESSENCIAL PARA NOTIFICAÇÕES

      Alert.alert('Acesso Permitido', `Bem-vindo(a), ${resposta.data.usuario.nome}`);
      router.replace('/(tabs)/home');

    } catch (erro) {
      console.error(erro);
      if (erro.response) {
        Alert.alert('Acesso Negado', erro.response.data.error);
      } else {
        Alert.alert('Erro', 'Servidor offline ou IP incorreto.');
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* 3. FAIXA DE ALERTA: Exibida apenas quando o celular estiver sem conexão */}
      {netInfo.isConnected === false && (
        <View style={styles.bannerOffline}>
          <Text style={styles.textoOffline}>
            ⚠️ Dispositivo Offline. Verifique sua conexão com a rede da fábrica.
          </Text>
        </View>
      )}

      <Text style={styles.titulo}>Portal do Operador</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail corporativo"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha de acesso"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      {/* 4. BOTÃO DE ENTRAR */}
      <TouchableOpacity 
        style={[
          styles.botao, 
          (carregando || netInfo.isConnected === false) && styles.botaoDesabilitado
        ]} 
        onPress={fazerLogin} 
        disabled={carregando || netInfo.isConnected === false}
      > 
        {carregando ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.textoBotao}>
            {netInfo.isConnected === false ? 'Sem Conexão' : 'ENTRAR'}
          </Text>
        )}
      </TouchableOpacity>

      {/* 5. NAVEGAÇÃO SECUNDÁRIA: Criar Conta, Esqueci a Senha e Suporte Técnico */}
      <View style={styles.linksContainer}>
        <Link href="/cadastro" asChild>
          <TouchableOpacity>
            <Text style={styles.textoLink}>Criar nova conta</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/recuperar" asChild>
          <TouchableOpacity>
            <Text style={styles.textoLink}>Esqueci a senha</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/suporte" asChild>
          <TouchableOpacity>
            <Text style={styles.textoLink}>Suporte técnico</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  bannerOffline: {
    position: 'absolute',
    top: 40,
    left: 15,
    right: 15,
    backgroundColor: '#d32f2f',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    zIndex: 10,
    elevation: 5,
  },
  textoOffline: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
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
    backgroundColor: '#003366',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  botaoDesabilitado: {
    backgroundColor: '#999999',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 25,
    paddingHorizontal: 5,
  },
  textoLink: {
    color: '#003366',
    fontSize: 13,
    fontWeight: '600',
  },
});