import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics'; // <-- Importação do Haptics
import api from '../../services/api';

export default function TelaConfig() {
  const router = useRouter();

  // Função 1: Sair do aplicativo com vibração de clique
  const fazerLogout = async () => {
    // <-- Adicionado: Vibração leve ao clicar no botão de Sair
    await Haptics.selectionAsync();

    await AsyncStorage.removeItem('usuarioId');
    router.replace('/');
  };

  // Função 2: Comunica com a API para deletar no banco de dados dinamicamente
  const deletarConta = async () => {
    try {
      const idSalvo = await AsyncStorage.getItem('usuarioId');
      if (!idSalvo) {
        return Alert.alert('Erro', 'Nenhum usuário logado encontrado.');
      }

      await api.delete(`/api/perfil/perfil/${idSalvo}`);
      console.log(`Conta com ID ${idSalvo} excluída com sucesso.`);

      // <-- Vibração de SUCESSO ao deletar
      await Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      );

      Alert.alert('Sucesso', 'Sua conta foi excluída permanentemente.');
      await AsyncStorage.removeItem('usuarioId');
      router.replace('/');
    } catch (erro) {
      console.error(erro);
      
      // <-- Adicionado: Vibração de ERRO caso falhe a exclusão
      await Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Error
      );
      
      Alert.alert('Erro', 'Não foi possível excluir a conta no momento.');
    }
  };

  // Função 3: Alerta de segurança ANTES de chamar a exclusão real
  const confirmarExclusao = async () => {
    // <-- Adicionado: Vibração de alerta ao abrir a caixa de confirmação
    await Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Warning
    );

    Alert.alert(
      'Atenção! Ação Irreversível',
      'Tem certeza que deseja excluir seu perfil corporativo? Você perderá o acesso ao portal.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sim, excluir', style: 'destructive', onPress: deletarConta }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Configurações da Conta</Text>

      {/* Botão de Logout */}
      <TouchableOpacity style={styles.botaoSair} onPress={fazerLogout}>
        <Text style={styles.textoBotaoSair}>Sair do Sistema</Text>
      </TouchableOpacity>

      <View style={styles.linhaDivisoria} />

      {/* Botão de Excluir Conta */}
      <TouchableOpacity style={styles.botaoExcluir} onPress={confirmarExclusao}>
        <Text style={styles.textoBotaoExcluir}>Excluir Minha Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center'
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#003366'
  },
  botaoSair: {
    backgroundColor: '#003366',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center'
  },
  textoBotaoSair: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  linhaDivisoria: {
    height: 1,
    backgroundColor: '#cccccc',
    marginVertical: 40
  },
  botaoExcluir: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#cc0000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center'
  },
  textoBotaoExcluir: {
    color: '#cc0000',
    fontSize: 16,
    fontWeight: 'bold'
  }
});