import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

// =========================================================================================
// NOTIFICAÇÕES DESATIVADAS PARA COMPATIBILIDADE COM EXPO GO (SDK 53+)
// A biblioteca 'expo-notifications' foi removida do app padrão Expo Go.
// Para reativar notificações Push/Locais no futuro, será necessário criar um Development Build
// (npx expo run:android / npx expo run:ios).
// =========================================================================================
// import * as Notifications from 'expo-notifications';

import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';

/* 
// Handler global de notificações desativado
if (Platform.OS !== 'web') {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}
*/

export default function TelaInicialRestrita() {
  const [comunicadoRecente, setComunicadoRecente] = useState(null);

  useEffect(() => {
    configurarEBuscarNotificacoes();
  }, []);

  const configurarEBuscarNotificacoes = async () => {
    try {
      const emailLogado = await AsyncStorage.getItem('usuarioEmail');

      if (emailLogado) {
        const res = await api.get(`/api/auth/notificacoes/checar/${emailLogado}`);

        if (res.data.temNotificacao) {
          // Atualiza o estado para exibir o card de aviso na interface
          setComunicadoRecente({
            titulo: res.data.titulo,
            mensagem: res.data.mensagem,
          });

          // ===============================================================================
          // DISPARO DE NOTIFICAÇÃO NATIVA (DESATIVADO TEMPORARIAMENTE)
          // ===============================================================================
          /*
          if (Platform.OS !== 'web') {
            const { status: statusExistente } = await Notifications.getPermissionsAsync();
            let statusFinal = statusExistente;

            if (statusExistente !== 'granted') {
              const { status } = await Notifications.requestPermissionsAsync();
              statusFinal = status;
            }

            if (statusFinal === 'granted') {
              await Notifications.scheduleNotificationAsync({
                content: {
                  title: res.data.titulo,
                  body: res.data.mensagem,
                },
                trigger: null,
              });
            }
          }
          */
        }
      }
    } catch (erro) {
      console.error('Erro ao processar notificações:', erro);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Cabeçalho de Boas-vindas */}
      <View style={styles.header}>
        <Text style={styles.saudacao}>Visão Geral</Text>
        <Text style={styles.boasVindas}>Painel de Controle</Text>
      </View>

      {/* Botão para checar manualmente se há novas notificações */}
      <TouchableOpacity style={styles.botaoChecar} onPress={configurarEBuscarNotificacoes}>
        <Text style={styles.textoBotao}>🔄 Checar Novos Avisos do RH</Text>
      </TouchableOpacity>

      {/* Card que aparece quando o RH envia um comunicado específico */}
      {comunicadoRecente && (
        <View style={styles.cardNotificacao}>
          <Text style={styles.tituloNotificacao}>🔔 {comunicadoRecente.titulo}</Text>
          <Text style={styles.textoNotificacao}>{comunicadoRecente.mensagem}</Text>
        </View>
      )}

      <Text style={styles.sectionTitle}>Avisos da Fábrica</Text>

      {/* Card 1: Reunião CIPA (Azul) */}
      <View style={styles.card}>
        <View style={[styles.iconContainer, { backgroundColor: '#e8f0fe' }]}>
          <MaterialIcons name="groups" size={28} color="#1a73e8" />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.tituloCard}>Reunião de CIPA</Text>
          <Text style={styles.textoCard}>Hoje às 14h na Sala de Treinamentos.</Text>
        </View>
      </View>

      {/* Card 2: Manutenção (Laranja/Alerta) */}
      <View style={styles.card}>
        <View style={[styles.iconContainer, { backgroundColor: '#fef0e6' }]}>
          <MaterialIcons name="build" size={28} color="#ea580c" />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.tituloCard}>Manutenção Preventiva</Text>
          <Text style={styles.textoCard}>A fresadora 02 encontra-se inoperante para revisão.</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    marginBottom: 20,
  },
  saudacao: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  boasVindas: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0f172a',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 16,
    marginTop: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  tituloCard: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  textoCard: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  botaoChecar: {
    backgroundColor: '#003366',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  textoBotao: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cardNotificacao: {
    backgroundColor: '#e6f2ff',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 5,
    borderLeftColor: '#003366',
    marginBottom: 15,
  },
  tituloNotificacao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 5,
  },
  textoNotificacao: {
    fontSize: 14,
    color: '#333',
  },
});