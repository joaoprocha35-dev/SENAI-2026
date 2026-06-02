import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

// Importamos ícones da biblioteca padrão do Expo para garantir que apareçam
import { FontAwesome5 } from '@expo/vector-icons'; 

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // UX: Definimos uma cor vibrante para o estado ativo e um neutro para o inativo
        tabBarActiveTintColor: '#00ff00', 
        tabBarInactiveTintColor: '#888',
        
        // UI: Estilização do Header (Topo)
        headerShown: true,
        headerStyle: {
          backgroundColor: '#121212',
          borderBottomWidth: 0, // Remove a linha divisória para um look mais clean
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#fff',
        },

        // UI: Estilização da TabBar (Base)
        tabBarStyle: {
          backgroundColor: '#121212',
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 90 : 70, // Ajuste de altura por plataforma
          paddingBottom: Platform.OS === 'ios' ? 30 : 10,
        },
      }}>
      
      {/* FLUXO 1: GESTÃO DE HARDWARE */}
      <Tabs.Screen
        name="setup" // O arquivo deve se chamar setup.tsx
        options={{
          title: 'Meu Setup',
          tabBarIcon: ({ color }) => <FontAwesome5 name="microchip" size={24} color={color} />,
        }}
      />

      {/* FLUXO 2: MARKETPLACE / EXPLORAÇÃO */}
      <Tabs.Screen
        name="loja" // O arquivo deve se chamar loja.tsx
        options={{
          title: 'Peças e Preços',
          tabBarIcon: ({ color }) => <FontAwesome5 name="shopping-cart" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}