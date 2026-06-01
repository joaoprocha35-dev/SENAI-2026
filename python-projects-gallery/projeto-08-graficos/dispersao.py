#Instalaçāo das bibliotecas usadas
#pip3 install pandas
#pip3 install matplotlib

#Importando as Bibliotecas do python
import pandas as pd
import matplotlib.pyplot as plt

#Leitura dos dados a partir do .csv
dados = pd.read_csv('Horas de Estudos.csv')

#Criacao de um grafico de disersao
plt.figure(figsize=(8,6))
plt.scatter(dados['Horas de Estudo'], dados['Nota do Exame'],alpha=0.8) #=> para ficar um pouco trasparente

plt.title('Relaçāo entre Horas de estudos e Notas do exame')

plt.xlabel('Horas de Estudos')
plt.ylabel('Notas de Exame')
plt.grid(True)
plt.show()