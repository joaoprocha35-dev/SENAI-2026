// Importação das ferramentas do React
//useEffect: executa automaticamente  ao carregar a tela do aplicativo
import React, { useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';
import { View, Alert, Text, StyleSheet, Pressable, Image, TextInput } from 'react-native';
//Importar a API:
import api from "../../services/api"

// Importação dos componentes do React Native
// Função principal do aplicativo
export default function App() {

  //Criando um vetor de Usuário
  const [Usuário, setUsuario] = useState([])
  //Precisamos de uma fonção

  // ===============================
  // ESTADOS (useState)
  // ===============================

  //imagem
  const [image, setImage] = useState(null); // null:

  const pickImage = async () => {

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permissão do aplicativo', 'Precisa da sua permissão.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  //Função para câmera do celular
  const pickFoto = async () => {

    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permissão do aplicativo', 'Precisa da sua permissão para acessar a Câmera.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // controla se estamos editando ou apenas visualizando o perfil
  const [visivel, setVisivel] = useState(false);

  // estados das informações do jogador
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [cidade, setCidade] = useState("");
  const [time, setTime] = useState("");
  const [altura, setAltura] = useState("");

  //Utilizando o HOOk useEffect para executar automaticamente 
  //a funcao exibir usuarios()

  useEffect(() => {
  exibirUsuario();
}, []);

  //Funcao para criar ou cadastrar dados do usuario
  const criarUsuarios = async () => {
    try {
      await api.post("/usuarios", { nome });
      Alert.alert("Usuário criado com sucesso")
      setNome("");


    } catch (error) {
      Alert.alert("Erro ao criar usuario")
      console.error("Erro ao criar usuario: ", error)

    }
  }


  //Funcao para criar ou cadastrar dados usuário
  const exibirUsuario = async () => {
  try {
    const response = await api.get("/usuarios")
    setUsuario(response.data)
  } catch (error) {
    console.error("Erro: ", error)
  }
}

  // ===============================
  // FUNÇÕES
  // ===============================

  function salvarInformacoes() {
    setVisivel(false);
  }

  function cancelarEdicao() {
    setVisivel(false);
  }

  // ===============================
  // RENDERIZAÇÃO DA TELA
  // ===============================
  return (
    <View style={styles.container}>

      {!visivel ? (

        // ===============================
        // TELA PERFIL DO JOGADOR
        // ===============================

        <View style={styles.card}>

          {/* FOTO DO JOGADOR */}



          {/* Título */}
          <Text style={styles.titulo}>Perfil do Jogador</Text>

          {image && <Image source={{ uri: image }} style={styles.foto} />}

          <View style={styles.caixa1}>

            <Pressable onPress={pickImage} style={styles.btng}>
              <Text>Galeria</Text>
            </Pressable>

            <Pressable onPress={pickFoto} style={styles.btnf}>
              <Text>Foto</Text>

            </Pressable>
          </View>


          {/* Informações */}
          <View style={styles.infoBox}>
            <Text style={styles.label}>Nome</Text>
            <Text style={styles.valor}>{nome}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Idade</Text>
            <Text style={styles.valor}>{idade}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Cidade</Text>
            <Text style={styles.valor}>{cidade}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Time</Text>
            <Text style={styles.valor}>{time}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Altura</Text>
            <Text style={styles.valor}>{altura}</Text>
          </View>

          {/* Botão editar */}
          <Pressable
            style={styles.botaoEditar}
            onPress={() => setVisivel(true)}
          >
            <Text style={styles.textoBotao}>Editar Perfil</Text>
          </Pressable>

        </View>

      ) : (
        <>
          {/* ===============================
          TELA DE EDIÇÃO
          =============================== */}

          <View style={styles.card}>

            <Text style={styles.titulo}>Editar Perfil</Text>

            <View style={styles.campo}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                value={nome}
                onChangeText={setNome}
              />


            </View>

            <View style={styles.campo}>
              <Text style={styles.label}>Idade</Text>
              <TextInput
                style={styles.input}
                value={idade}
                onChangeText={setIdade}
              />
            </View>

            <View style={styles.campo}>
              <Text style={styles.label}>Cidade</Text>
              <TextInput
                style={styles.input}
                value={cidade}
                onChangeText={setCidade}
              />
            </View>

            <View style={styles.campo}>
              <Text style={styles.label}>Time</Text>
              <TextInput
                style={styles.input}
                value={time}
                onChangeText={setTime}
              />
            </View>

            <View style={styles.campo}>
              <Text style={styles.label}>Altura</Text>
              <TextInput
                style={styles.input}
                value={altura}
                onChangeText={setAltura}
              />
            </View>

            {/* Botão salvar */}
            <Pressable
              style={styles.botaoSalvar}
              onPress={salvarInformacoes}
            >
              <Text style={styles.textoBotao}>Salvar</Text>
            </Pressable>
               <Pressable
              style={styles.botaoSalvar} //btncriaruser
              onPress={criarUsuarios}
            >
              <Text style={styles.textoBotao}>Enviar para o banco de dados</Text>
            </Pressable>

            

            {/* Botão cancelar */}
            <Pressable
              style={styles.botaoCancelar}
              onPress={cancelarEdicao}
            >
              <Text style={styles.textoBotao}>Cancelar</Text>
            </Pressable>

          </View>
        </>

      )}


    </View>
  );
}


// ===============================
// ESTILOS
// ===============================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1f3c88"
  },

  card: {
    width: "85%",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 15,
    elevation: 6
  },

  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20
  },

  foto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 20,
    borderColor: 'black',
    borderWidth: 2
  },

  infoBox: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10
  },

  campo: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12
  },

  label: {
    fontSize: 13,
    color: "#666"
  },

  valor: {
    fontSize: 16,
    fontWeight: "bold"
  },

  input: {
    marginTop: 4,
    fontSize: 16
  },

  botaoEditar: {
    backgroundColor: "#0a7f00",
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    alignItems: "center"
  },

  botaoSalvar: {
    backgroundColor: "#0a7f00",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center"
  },

  botaoCancelar: {
    backgroundColor: "#d00000",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center"
  },

  textoBotao: {
    color: "#000000ff",
    fontWeight: "bold"
  },

  btng: {
    height: 40,
    width: 70,
    backgroundColor: '#0a7f00',
    borderRadius: 5,
    textAlign: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  btnf: {
    height: 40,
    width: 70,
    backgroundColor: '#0a7f00',
    borderRadius: 5,
    textAlign: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  caixa1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10
  },



});