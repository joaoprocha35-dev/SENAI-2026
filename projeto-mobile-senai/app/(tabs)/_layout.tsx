import { Tabs } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabLayout() {
    return (

        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#000000',

                headerStyle: {
                    backgroundColor: '#0010f3',
                },

                headerShadowVisible: false,
                headerTintColor: '#ffffff',

                tabBarStyle: {
                    backgroundColor: '#000000ff',
                },
            }}
        >

            {/* Tela Seleções */}
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Seleções',
                    tabBarIcon: ({ color }) => (
                        <Entypo name="home" size={25} color={color} />
                    )
                }}
            />

            {/* Tela Jogadores */}
            <Tabs.Screen
                name="profileScreen"
                options={{
                    title: 'Jogadores',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="user" size={25} color={color} />
                    )
                }}
            />

            {/* Tela Login */}
            <Tabs.Screen
                name="tela2"
                options={{
                    title: "Sair",
                    tabBarIcon: ({ color }) => (
                        <Entypo name="login" size={24} color={color} />
                    )
                }}
            />

            {/* Tela Testes */}
            <Tabs.Screen
                name="testes"
                options={{
                    title: 'testes',
                    tabBarIcon: ({ color }) => (
                        <Entypo name="home" size={25} color={color} />
                    )
                }}
            />

        <Tabs.Screen
        name='teste02'
        options={{
            title: 'teste02',
             // 🔝 Header (topo)
            headerStyle: {
                backgroundColor: '#000000ff', // vermelho só nessa tela
            },
            headerTintColor: '#ff1111ff',

             // 🔽 Tab (barra de baixo)
            tabBarStyle: {
                backgroundColor: '#000000ff',
            },

            // 🎯 Ícone
            tabBarIcon: ({color}) => (
                <Entypo name='star' size={25} color={color} />
            ),
     
        }}
        
        />

        </Tabs>
        
        
    );
}