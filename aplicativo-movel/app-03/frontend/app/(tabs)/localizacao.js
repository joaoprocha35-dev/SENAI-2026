import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Platform } from 'react-native';
import * as Location from 'expo-location'; // Módulo nativo de GPS
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api'; // API Gateway (Porta 3000)

// Importação condicional para evitar falha no navegador Web
let MapView, Marker;
if (Platform.OS !== 'web') {
  const Maps = require('react-native-maps');
  MapView = Maps.default;
  Marker = Maps.Marker;
}

export default function TelaLocalizacao() {
  const [localizacao, setLocalizacao] = useState(null);
  const [carregandoGPS, setCarregandoGPS] = useState(true);
  const [enviandoCheckin, setEnviandoCheckin] = useState(false);

  useEffect(() => {
    obterLocalizacaoAtual();
  }, []);

  // 1. Solicita permissão e lê as coordenadas do GPS
  const obterLocalizacaoAtual = async () => {
    setCarregandoGPS(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permissão Negada', 'É necessário autorizar o uso do GPS para registrar presença na fábrica.');
        setCarregandoGPS(false);
        return;
      }

      // Obtém a posição atual com precisão balanceada
      const posicao = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setLocalizacao({
        latitude: posicao.coords.latitude,
        longitude: posicao.coords.longitude,
        latitudeDelta: 0.005, // Nível de zoom aproximado
        longitudeDelta: 0.005,
      });
    } catch (erro) {
      console.error(erro);
      Alert.alert('Erro no GPS', 'Não foi possível capturar sua posição atual.');
    } finally {
      setCarregandoGPS(false);
    }
  };

  // 2. Envia as coordenadas para o backend via API Gateway
  const registrarPresenca = async () => {
    if (!localizacao) {
      return Alert.alert('Aguarde', 'Obtendo sinal de GPS...');
    }

    setEnviandoCheckin(true);

    try {
      const idSalvo = await AsyncStorage.getItem('usuarioId');

      if (!idSalvo) {
        return Alert.alert('Erro', 'Sessão inválida. Faça login novamente.');
      }

      // Envia POST via Gateway para o servico-perfil
      const res = await api.post(`/api/perfil/perfil/${idSalvo}/checkin`, {
        latitude: localizacao.latitude,
        longitude: localizacao.longitude,
      });

      Alert.alert('Sucesso!', res.data.message || 'Check-in realizado com sucesso!');
    } catch (erro) {
      console.error(erro);
      Alert.alert('Erro', 'Falha ao registrar check-in de presença no servidor.');
    } finally {
      setEnviandoCheckin(false);
    }
  };

  return (
    <View style={styles.container}>
      {carregandoGPS ? (
        <View style={styles.centro}>
          <ActivityIndicator size="large" color="#003366" />
          <Text style={styles.textoCarregando}>Buscando sinal de satélite GPS...</Text>
        </View>
      ) : localizacao ? (
        <>
          {/* MAPA NATIVO (Android/iOS) OU PAINEL WEB */}
          {Platform.OS === 'web' ? (
            <View style={styles.webContainer}>
              <Text style={styles.webTitulo}>🌐 Modo Visualização Web</Text>
              <Text style={styles.webSubtitulo}>
                O mapa interativo está disponível no app mobile. Suas coordenadas de GPS foram detectadas via navegador:
              </Text>
              <View style={styles.cardCoordsWeb}>
                <Text style={styles.coordTextoWeb}>📍 Latitude: {localizacao.latitude.toFixed(6)}</Text>
                <Text style={styles.coordTextoWeb}>📍 Longitude: {localizacao.longitude.toFixed(6)}</Text>
              </View>
            </View>
          ) : (
            <MapView 
              style={styles.mapa} 
              initialRegion={localizacao}
              showsUserLocation={true}
            >
              <Marker
                coordinate={{
                  latitude: localizacao.latitude,
                  longitude: localizacao.longitude,
                }}
                title="Você está aqui"
                description="Posto de Operação Industrial"
              />
            </MapView>
          )}

          {/* PAINEL INFERIOR DE CHECK-IN */}
          <View style={styles.painelInferior}>
            <Text style={styles.tituloPainel}>Confirmação de Posto</Text>
            <Text style={styles.coordTexto}>Lat: {localizacao.latitude.toFixed(6)}</Text>
            <Text style={styles.coordTexto}>Lon: {localizacao.longitude.toFixed(6)}</Text>

            <TouchableOpacity 
              style={[styles.botaoCheckin, enviandoCheckin && styles.botaoDesabilitado]} 
              onPress={registrarPresenca}
              disabled={enviandoCheckin}
            >
              {enviandoCheckin ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.textoBotaoCheckin}>📍 REGISTRAR ENTRADA NO TURNO</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoAtualizar} onPress={obterLocalizacaoAtual}>
              <Text style={styles.textoBotaoAtualizar}>🔄 Recalibrar GPS</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.centro}>
          <Text style={styles.textoErro}>GPS não disponível ou permissão recusada.</Text>
          <TouchableOpacity style={styles.botaoAtualizar} onPress={obterLocalizacaoAtual}>
            <Text style={styles.textoBotaoAtualizar}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  centro: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  mapa: { flex: 1 },
  textoCarregando: { marginTop: 10, color: '#666', fontSize: 14 },
  textoErro: { color: '#cc0000', fontSize: 16, textAlign: 'center', marginBottom: 15 },
  painelInferior: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  tituloPainel: { fontSize: 18, fontWeight: 'bold', color: '#003366', marginBottom: 5 },
  coordTexto: { fontSize: 13, color: '#777' },
  botaoCheckin: {
    backgroundColor: '#003366',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  botaoDesabilitado: { backgroundColor: '#888888' },
  textoBotaoCheckin: { color: '#ffffff', fontWeight: 'bold', fontSize: 15 },
  botaoAtualizar: { marginTop: 10, alignItems: 'center', padding: 8 },
  textoBotaoAtualizar: { color: '#0066cc', fontWeight: '600', fontSize: 13 },
  
  // Estilos exclusivos para a visualização na Web
  webContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    backgroundColor: '#eef2f6',
  },
  webTitulo: { fontSize: 20, fontWeight: 'bold', color: '#003366', marginBottom: 10 },
  webSubtitulo: { fontSize: 14, color: '#555', textAlign: 'center', marginBottom: 20, maxWidth: 400 },
  cardCoordsWeb: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    width: '100%',
    maxWidth: 350,
  },
  coordTextoWeb: { fontSize: 15, fontWeight: '600', color: '#1e293b', marginVertical: 4 },
});