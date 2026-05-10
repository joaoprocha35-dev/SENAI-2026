#Um novo modelo de carro, super econômico foi lançado.
#Ele faz 20 km com 1 litro de combustível.
#Cada litro de combustível custa R$ 5,00.
#Faça um programa que pergunte ao usuário quanto de dinheiro ele tem e em
#seguida diga quantos litros de combustível ele pode comprar e quantos
#quilômetros o carro consegue andar com este tanto de combustível.
#Seu script será usado no computador de bordo do carro.    

reais = float(input("Quantos reais vc tem R$ "))

print("Com R$", reais, " vc compra", reais / 5, " Litros e anda ", (reais / 5) * 20, "KM")