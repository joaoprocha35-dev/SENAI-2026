import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';

export default function LayoutAbas() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#003366', 
        tabBarInactiveTintColor: '#cccccc', 
        headerStyle: { backgroundColor: '#003366' }, 
        headerTintColor: '#ffffff',
        // Essa sombra dá um toque premium na barra inferior
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 5,
        }
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Início', // Isso vai substituir aquele "(tabs)/home" feio!
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="status"
        options={{
          title: 'Meu Status',
          tabBarIcon: ({ color }) => <FontAwesome name="user-circle" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name='localizacao'
        options={{
          title: 'Posto de Trabalho',
          tabBarIcon: ({color, size}) => <Ionicons name= 'location' color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="config"
        options={{
          title: 'Ajustes',
          tabBarIcon: ({ color }) => <FontAwesome name="cog" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}