#Instalaçāo das bibliotecas usadas
#pip3 install pandas
#pip3 install matplotlib

#Importando as Bibliotecas do python
import pandas as pd
import matplotlib.pyplot as plt

#Leitura dos dados a partir do xlsx (excel)
dados = pd.read_excel('Receita de Vendas.xlsx')

#Construcao do gráfico de linhas
plt.figure(figsize=(8,4))

plt.plot(dados['Ano'], dados['Receitas'], marker='o')
plt.xticks(dados['Ano'])
plt.title('Receita ao Longo dos Anos')
plt.xlabel('Ano')
plt.ylabel('Receita (Reais - R$)')

#Grafico de colunas
plt.figure(figsize=(8,4))
plt.bar(dados['Ano'], dados['Receitas'])
plt.title('Receita por Ano')
plt.xlabel('Ano')
plt.ylabel('Receita (Reais - R$)')
plt.show()

#Construcao do gráfico de pizza
plt.figure(figsize=(6,6))
plt.pie(
    dados['Receitas'],
    labels = dados['Ano'],
    autopct = '%1.1f%%'
)
plt.title('Participacao das Receita por Ano:')
plt.show()