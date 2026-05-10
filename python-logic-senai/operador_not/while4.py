# crie um programa que peça um numero ao usuario inteiro e imprima todos os números
# os numeros pares da 1 ate o numero fornecido

maximo = int(input('Digite um valor maior que 1: '))
contador = 1
print('números pares entre 1 e',maximo, ':')

while contador <= maximo:
    if contador %2==0:
        print(contador, end=' ')
    contador +=1

