import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  Animated,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';

interface HardwareItem {
  id: number;
  nome_item: string;
  marca: string;
  modelo: string;
  categoria: string;
  preco: string | number;
  tempo_uso: string | number;
  descricao: string;
}

export default function SetupScreen() {

  const [componentes, setComponentes] = useState<HardwareItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // =========================
  // API
  // =========================

  const IP_MAC = "10.90.194.181";

  const API_URL = `http://${IP_MAC}:3000/api/listar`;

  // =========================
  // CARREGAR DADOS
  // =========================

  const carregarDados = async () => {

    try {

      const response = await fetch(API_URL);

      const data = await response.json();

      setComponentes(data);

    } catch (error) {

      console.error("Erro API:", error);

    } finally {

      setLoading(false);
      setRefreshing(false);

    }
  };

  // =========================
  // CONFIRMAR EXCLUSÃO
  // =========================

  const confirmarExclusao = (id: number) => {

    Alert.alert(
      "Remover Item",
      "Tem certeza que deseja excluir este hardware do seu setup?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => deletarItem(id)
        }
      ]
    );
  };

  // =========================
  // DELETAR ITEM
  // =========================

  const deletarItem = async (id: number) => {

    try {

      const response = await fetch(
        `http://${IP_MAC}:3000/api/deletar/${id}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {

        setComponentes(prev =>
          prev.filter(item => item.id !== id)
        );

      }

    } catch (error) {

      Alert.alert(
        "Erro",
        "Não foi possível conectar ao servidor."
      );

    }
  };

  // =========================
  // EFFECT
  // =========================

  useEffect(() => {
    carregarDados();
  }, []);

  // =========================
  // CARD COMPONENT
  // =========================

  const RenderItem = ({
    item,
    index
  }: {
    item: HardwareItem,
    index: number
  }) => {

    const fadeAnim = useRef(
      new Animated.Value(0)
    ).current;

    const slideAnim = useRef(
      new Animated.Value(20)
    ).current;

    useEffect(() => {

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true
      }).start();

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true
      }).start();

    }, []);

    return (

      <Animated.View
        style={[
          styles.card,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >

        {/* ÍCONE */}

        <View style={styles.iconContainer}>
          <FontAwesome5
            name="microchip"
            size={20}
            color="#00ff00"
          />
        </View>

        {/* CONTEÚDO */}

        <View style={styles.cardContent}>

          {/* NOME */}

          <Text style={styles.itemNome}>
            {item.nome_item}
          </Text>

          {/* MARCA */}

          <View style={styles.infoRow}>

            <FontAwesome5
              name="copyright"
              size={12}
              color="#00ff00"
            />

            <Text style={styles.infoText}>
              Marca: {item.marca}
            </Text>

          </View>

          {/* MODELO */}

          <View style={styles.infoRow}>

            <FontAwesome5
              name="microchip"
              size={12}
              color="#00ff00"
            />

            <Text style={styles.infoText}>
              Modelo: {item.modelo}
            </Text>

          </View>

          {/* CATEGORIA */}

          <View style={styles.infoRow}>

            <FontAwesome5
              name="layer-group"
              size={12}
              color="#00ff00"
            />

            <Text style={styles.infoText}>
              Categoria: {item.categoria}
            </Text>

          </View>

          {/* TEMPO DE USO */}

          <View style={styles.infoRow}>

            <FontAwesome5
              name="clock"
              size={12}
              color="#00ff00"
            />

            <Text style={styles.infoText}>
              Tempo de uso: {item.tempo_uso}
            </Text>

          </View>

          {/* DESCRIÇÃO */}

          <View style={styles.descriptionBox}>

            <Text style={styles.descriptionTitle}>
              DESCRIÇÃO
            </Text>

            <Text style={styles.descriptionText}>
              {item.descricao}
            </Text>

          </View>

          {/* PREÇO */}

          <View style={styles.priceTag}>

            <Text style={styles.preco}>
              R$ {Number(item.preco).toLocaleString('pt-BR')}
            </Text>

          </View>

        </View>

        {/* BOTÃO DELETE */}

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => confirmarExclusao(item.id)}
        >

          <FontAwesome5
            name="trash-alt"
            size={16}
            color="#ff4444"
          />

        </TouchableOpacity>

      </Animated.View>
    );
  };

  // =========================
  // RENDER
  // =========================

  return (

    <SafeAreaView style={styles.container}>

      <StatusBar barStyle="light-content" />

      {/* HEADER */}

      <View style={styles.header}>

        <View>

          <Text style={styles.greeting}>
            HARDWARE MANAGER
          </Text>

          <Text style={styles.title}>
            BATTLESTATION
          </Text>

        </View>

        <View style={styles.badge}>

          <Text style={styles.badgeText}>
            {componentes.length} ITENS
          </Text>

        </View>

      </View>

      {/* LOADING */}

      {
        loading ? (

          <View style={styles.center}>

            <ActivityIndicator
              size="large"
              color="#00ff00"
            />

          </View>

        ) : (

          <FlatList
            data={componentes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <RenderItem
                item={item}
                index={index}
              />
            )}
            contentContainerStyle={styles.list}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={carregarDados}
                tintColor="#00ff00"
              />
            }
            ListEmptyComponent={

              <View style={styles.center}>

                <FontAwesome5
                  name="ghost"
                  size={50}
                  color="#333"
                />

                <Text style={styles.emptyText}>
                  Seu setup está vazio...
                </Text>

              </View>

            }
          />

        )
      }

    </SafeAreaView>
  );
}

// =========================
// STYLES
// =========================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0A0A0A'
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  header: {
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: '#121212',

    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,

    elevation: 10,

    shadowColor: '#00ff00',
    shadowOpacity: 0.1,
    shadowRadius: 10
  },

  greeting: {
    color: '#888',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 2
  },

  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '900'
  },

  badge: {
    backgroundColor: '#00ff0022',

    paddingHorizontal: 12,
    paddingVertical: 6,

    borderRadius: 20,

    borderWidth: 1,
    borderColor: '#00ff00'
  },

  badgeText: {
    color: '#00ff00',
    fontWeight: 'bold',
    fontSize: 12
  },

  list: {
    padding: 20
  },

  card: {
    backgroundColor: '#161616',

    borderRadius: 20,

    padding: 20,

    marginBottom: 15,

    flexDirection: 'row',

    borderWidth: 1,
    borderColor: '#222',

    position: 'relative'
  },

  iconContainer: {
    width: 50,
    height: 50,

    backgroundColor: '#00ff0011',

    borderRadius: 15,

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 15
  },

  cardContent: {
    flex: 1
  },

  itemNome: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  },

  infoText: {
    color: '#BBBBBB',
    fontSize: 13,
    marginLeft: 8
  },

  descriptionBox: {
    marginTop: 14,

    backgroundColor: '#101010',

    borderWidth: 1,
    borderColor: '#00ff0022',

    borderRadius: 12,

    padding: 12
  },

  descriptionTitle: {
    color: '#00ff00',
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 6,
    letterSpacing: 1,
  },

  descriptionText: {
    color: '#AAAAAA',
    fontSize: 13,
    lineHeight: 20
  },

  priceTag: {
    alignSelf: 'flex-start',

    backgroundColor: '#00ff00',

    paddingHorizontal: 12,
    paddingVertical: 5,

    borderRadius: 8,

    marginTop: 14
  },

  preco: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14
  },

  deleteButton: {
    position: 'absolute',

    top: 20,
    right: 20,

    padding: 10,

    backgroundColor: '#ff444411',

    borderRadius: 10
  },

  emptyText: {
    color: '#444',
    marginTop: 10,
    fontSize: 16
  }

});