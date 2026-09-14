import { Stack } from 'expo-router';

// O arquivo _layout.js atua como o container principal do aplicativo.
// O componente <Stack /> gerencia a navegação em pilha (telas sobrepostas).

export default function LayoutRaiz() {
  return (
    <Stack>
      {/* 1. Tela de Login (Início do App) */}
      <Stack.Screen 
        name="index" 
        options={{ title: 'Acesso do Operador' }} 
      />
      {/* 2. Tela de Cadastro de Usuário */}
      <Stack.Screen
        name="cadastro"
        options={{ title: 'Novo Cadastro' }}
      />
      {/* 3. Tela de Recuperação de Senha */}
      <Stack.Screen
        name="recuperar"
        options={{ title: 'Recuperar Senha'}}
      />
      {/* 4. Tela de Suporte Técnico */}
      <Stack.Screen
        name="suporte"
        options={{ title: 'Suporte Técnico'}}
      />
      {/* 5. Grupo de Abas (Área Restrita do Operador) */}
      {/* headerShown: false impede que o cabeçalho da Stack apareça em cima das abas */}
      <Stack.Screen
       name='(tabs)'
       options={{headerShown: false}}
      />
    </Stack>
  );
}