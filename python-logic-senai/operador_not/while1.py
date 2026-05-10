#nota1 = float(input('Nota 1: '))
#nota2 = float(input('Nota 2: '))
#nota3 = float(input('Nota 3: '))
#media = (nota1+nota2+nota3)/3
#print('A média é: ', media)

#------------------------
#Laço de repetição

# 1-Solicita a quantidade de notas
quantidades_notas = int(input('Quantas notas serão? '))

soma = 0
contador = 1

# O laço executa enquanto o contador não atingir
# #o limite definido.

#while em português: enquanto 

while contador <= quantidades_notas:
 #Usamos f-string para numerar a pergunta dinamicamente.
  nota = float(input(f'Digite a nota {contador}: '))
  soma += nota #Adiciona nota ao total acumulado
  contador += 1 #Incrementando o contador para não ficar loop inifinto

  # Cálculo da média final
if quantidades_notas > 0:
        media = soma/ quantidades_notas
        print(f'\nA média das {quantidades_notas} notas é: {media:.2f}')
else:
     print('Nenhuma nota foi inserida!')
