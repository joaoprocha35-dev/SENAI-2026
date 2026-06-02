import { Text, View, StyleSheet, FlatList, Pressable, Switch } from "react-native";
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';  // quando for utilizar o gradient vc precisa abaixar a biblioteca dele np (node_modules).: "npx expo install expo-linear-gradient"
import React, { useState } from "react";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
const DATA = [
  {
    id: '1',
    title: 'Chicago Bulls',
    divisão: 'Divisão Central',
    imagem: 'https://tse2.mm.bing.net/th/id/OIP.flri8bzItKuJGcpFHo3Z9wHaEK?pid=Api&P=0&h=180',

  },
  {
    id: '2',
    title: 'Los Angeles Lakers',
    divisão: 'Divisão do Pacífico',
    imagem: 'https://www.pixelstalk.net/wp-content/uploads/2017/04/Lakes-Logo-Wallpapers-3.png',
  },
  {
    id: '3',
    title: 'Memphis Grizzlies',
    divisão: 'Divisão Sudoeste',
    imagem: 'https://tse1.mm.bing.net/th/id/OIP.D8IVEtdYOyg09STXYPEz2gHaEK?pid=Api&P=0&h=180',
  },
  {
    id: '4',
    title: 'Blazers',
    divisão: 'Divisão do Noroeste',
    imagem: 'https://tse4.mm.bing.net/th/id/OIP.TfddO4P890-iZhrYNjSrcQHaEK?pid=Api&P=0&h=180',
  },
  {
    id: '5',
    title: 'Phoenix Suns',
    divisão: 'Divisão do Pacífico',
    imagem: 'https://tse4.mm.bing.net/th/id/OIP.0xwqTehLS47OxN4KgO0Y5QHaHf?pid=Api&P=0&h=180',
  },
  {
    id: '6',
    title: 'Dallas Mavericks',
    divisão: 'Divisão Sudoeste',
    imagem: 'https://tse2.mm.bing.net/th/id/OIP.JAYRjTAxxYZp8of-I1goJQHaEz?pid=Api&P=0&h=180',
  },
  {
    id: '7',
    title: 'Angeles Clippers',
    divisão: 'Divisão do Pacífico',
    imagem: 'https://tse4.mm.bing.net/th/id/OIP.6sV_oGD29Dn_osHz-XjjbQHaEK?pid=Api&P=0&h=180',
  },
  {
    id: '8',
    title: 'Houston Rockets',
    divisão: 'Divisão Sudoeste',
    imagem: 'https://tse2.mm.bing.net/th/id/OIP.voBaOhC2J6_NgBUFUz8l7QHaEq?pid=Api&P=0&h=180',
  },
  {
    id: '9',
    title: 'Nuggets',
    divisão: 'Divisão Noroeste',
    imagem: 'https://live.staticflickr.com/4102/4801004044_699b01390e_b.jpg',
  },
  {
    id: '10',
    title: 'Boston Celtics',
    divisão: 'Divisão do Atlântico',
    imagem: 'https://wallpapers.com/images/featured/boston-celtics-55ii8dswjev1c8z0.jpg',
  },
  {
    id: '11',
    title: 'Brooklyn Nets',
    divisão: 'Divisão do Atlântico',
    imagem: 'https://wallpaperaccess.com/full/1469453.jpg',
  },
  {
    id: '12',
    title: 'New York Knicks',
    divisão: 'Divisão do Atlântico',
    imagem: 'https://www.pixelstalk.net/wp-content/uploads/2016/06/New-York-Knicks-Logo-HD-Wallpaper.jpg',
  },
  {
    id: '13',
    title: 'Toronto Raptors',
    divisão: 'Divisão do Atlântico',
    imagem: 'https://static.vecteezy.com/system/resources/previews/046/967/878/non_2x/toronto-raptors-logo-american-basketball-free-vector.jpg',
  },
  {
    id: '14',
    title: 'Pelicanslogo',
    divisão: 'Divisão Sudoeste',
    imagem: 'https://tse2.mm.bing.net/th/id/OIP.XBmzg8Xc9BvJsOIzqVakOwHaEK?pid=Api&P=0&h=180',

  },
];

const Item = ({ title, divisão, imagem }) => {

  const [liked, setLinked] = useState(0);

  function numLike() {
    setLinked(liked + 1);
  }
  // View 3
  const [sim,setnão] = useState(false)
    function numtorcer(){
      setnão(!sim);
    }
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.divisão}>{divisão}</Text>
      <Image
        style={styles.imagem}
        source={imagem}
        contentFit="cover"
        transition={1000}
      />
      <View style={styles.divlikd}>
        <Pressable
          onPress={numLike}
          style={styles.button}
        >
          <SimpleLineIcons name="like" size={24} color="black" />

        </Pressable>
        <Text>{liked}</Text>
      </View>

      <View style={styles.divtorcer}>
        <Switch
          value={sim}
          onValueChange={numtorcer}
        />
        <Text>{sim ? 'Sim' : 'Não'}</Text>

      </View>
    </View>
  )
};

export default function Index() {

  return (
    <LinearGradient
      style={styles.container}
      colors={['#170101', '#141456', '#1a1a70', '#0808ac8a', '#0808ac8a', '#7676e1', '#0808ac8a', '#4444c2f9', '#222268', '#0b0856',]}
      start={{ x: 0, y: 0 }}  //começa no topo
      end={{ x: 0, y: 1 }} //termina na base
    >
      <FlatList
        data={DATA}
        numColumns={2}
        renderItem={({ item }) =>
          <Item
            title={item.title}
            divisão={item.divisão}
            imagem={item.imagem}
          />}
        keyExtractor={objeto => objeto.id}
        contentContainerStyle={styles.listContent}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50, // Espaço para não bater no topo da tela
  },
  listContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  item: {
    backgroundColor: 'rgba(162, 13, 231, 0.15)', // Efeito de vidro transparente
    height: 360,
    width: 175,
    marginVertical: 15,
    marginHorizontal: 8,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.93)',

  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  divisão: {
    color: 'rgba(208, 255, 0, 0.93)', // Azul escuro para ler melhor
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 5,
  },
  imagem: {
    height: 200,
    width: '90%',
    borderRadius: 15,
  },

  button: {
    marginTop: 5,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 5,
    color: 'black',

  },
  divlikd: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },

  divtorcer:{
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginTop: 10,
  }

});