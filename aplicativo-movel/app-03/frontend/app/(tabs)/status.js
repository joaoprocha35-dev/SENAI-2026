import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';

export default function TelaStatus() {
  const [usuario, setUsuario] = useState({});
  const [carregandoFoto, setCarregandoFoto] = useState(false);

  // Estados para a edição do perfil (Atividade 18)
  const [novoSetor, setNovoSetor] = useState('');
  const [novoTurno, setNovoTurno] = useState('');

  // 1. Busca os dados ao abrir a tela
  const carregarPerfil = async () => {
    try {
      const idSalvo = await AsyncStorage.getItem('usuarioId');

      if (!idSalvo) {
        return Alert.alert('Aviso', 'Nenhum usuário logado encontrado.');
      }

      const res = await api.get(`/api/perfil/perfil/${idSalvo}`);
      setUsuario(res.data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os dados.');
    }
  };

  useEffect(() => {
    carregarPerfil();
  }, []);

  // 2. Função para escolher a foto na galeria e enviar ao Backend (PATCH)
  const escolherEEnviarFoto = async () => {
    await Haptics.selectionAsync();

    let resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (resultado.canceled) return;

    setCarregandoFoto(true);

    try {
      const imagemSelecionada = resultado.assets[0];
      const formData = new FormData();

      formData.append('foto', {
        uri: imagemSelecionada.uri,
        name: 'cracha.jpg',
        type: 'image/jpeg',
      });

      const idSalvo = await AsyncStorage.getItem('usuarioId');

      await api.patch(`/api/perfil/perfil/${idSalvo}/foto`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      await Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      );

      Alert.alert('Sucesso', 'Foto atualizada!');
      carregarPerfil();
    } catch (error) {
      console.error(error);
      await Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Error
      );
      Alert.alert('Erro', 'Falha ao enviar a foto para o servidor.');
    } finally {
      setCarregandoFoto(false);
    }
  };

  // 3. Função para atualizar Setor e Turno no Backend (PUT - Atividade 18)
  const salvarAlteracoes = async () => {
    await Haptics.selectionAsync();

    if (!novoSetor || !novoTurno) {
      await Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Warning
      );
      return Alert.alert('Aviso', 'Preencha os campos de Setor e Turno.');
    }

    try {
      const idSalvo = await AsyncStorage.getItem('usuarioId');

      if (!idSalvo) {
        return Alert.alert('Erro', 'Nenhum usuário logado encontrado.');
      }

      // Chamada HTTP PUT para atualizar setor e turno
      await api.put(`api/perfil/perfil/${idSalvo}`, {
        setor: novoSetor,
        turno: novoTurno,
      });

      await Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      );

      Alert.alert('Sucesso', 'Perfil atualizado!');

      // Limpa os campos e recarrega os dados atualizados na tela
      setNovoSetor('');
      setNovoTurno('');
      carregarPerfil();
    } catch (error) {
      console.error(error);
      await Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Error
      );
      Alert.alert('Erro', 'Não foi possível atualizar o perfil.');
    }
  };

  // Define qual imagem mostrar (Base64 do MySQL ou ícone padrão)
  const imagemExibicao = usuario.foto
    ? { uri: `data:image/jpeg;base64,${usuario.foto}` }
    : { uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' };

  return (
    <View style={styles.container}>
      {/* Container da Foto de Perfil */}
      <View style={styles.fotoContainer}>
        <Image source={imagemExibicao} style={styles.foto} />
        <TouchableOpacity style={styles.botaoFoto} onPress={escolherEEnviarFoto} disabled={carregandoFoto}>
          <Text style={styles.botaoFotoTexto}>
            {carregandoFoto ? 'Enviando...' : 'Trocar Foto'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Exibição dos Dados Atuais */}
      <View style={styles.dadosContainer}>
        <Text style={styles.label}>Nome do Operador:</Text>
        <Text style={styles.valor}>{usuario.nome || 'Carregando...'}</Text>

        <Text style={styles.label}>Setor / Área Atual:</Text>
        <Text style={styles.valor}>{usuario.setor || 'Não informado'}</Text>

        <Text style={styles.label}>Turno Atual:</Text>
        <Text style={styles.valor}>{usuario.turno || 'Não informado'}</Text>
      </View>

      {/* Formulário de Edição de Setor e Turno (Atividade 18) */}
      <View style={styles.edicaoContainer}>
        <Text style={styles.tituloEdicao}>Editar Informações de Trabalho</Text>

        <Text style={styles.labelInput}>Novo Setor / Área:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Usinagem / Almoxarifado"
          value={novoSetor}
          onChangeText={setNovoSetor}
        />

        <Text style={styles.labelInput}>Novo Turno:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 1º Turno / Tarde"
          value={novoTurno}
          onChangeText={setNovoTurno}
        />

        <TouchableOpacity style={styles.botaoSalvar} onPress={salvarAlteracoes}>
          <Text style={styles.botaoSalvarTexto}>SALVAR ALTERAÇÕES</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5', alignItems: 'center' },
  fotoContainer: { alignItems: 'center', marginBottom: 20, marginTop: 10 },
  foto: { width: 110, height: 110, borderRadius: 55, borderWidth: 3, borderColor: '#003366' },
  botaoFoto: { marginTop: 10, backgroundColor: '#003366', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 5 },
  botaoFotoTexto: { color: 'white', fontWeight: 'bold', fontSize: 13 },
  dadosContainer: { width: '100%', backgroundColor: 'white', padding: 15, borderRadius: 8, elevation: 2, marginBottom: 15 },
  label: { fontSize: 13, color: '#888', marginTop: 5 },
  valor: { fontSize: 16, color: '#333', fontWeight: 'bold', borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 3 },
  
  // Estilização do formulário de edição (Atividade 18)
  edicaoContainer: { width: '100%', backgroundColor: 'white', padding: 15, borderRadius: 8, elevation: 2 },
  tituloEdicao: { fontSize: 15, fontWeight: 'bold', color: '#003366', marginBottom: 10 },
  labelInput: { fontSize: 12, color: '#555', marginTop: 5, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 8, fontSize: 14, marginTop: 4, backgroundColor: '#fafafa' },
  botaoSalvar: { marginTop: 15, backgroundColor: '#003366', padding: 12, borderRadius: 5, alignItems: 'center' },
  botaoSalvarTexto: { color: 'white', fontWeight: 'bold', fontSize: 14 }
});