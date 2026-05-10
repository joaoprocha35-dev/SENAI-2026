# Faça um programa, com uma função que necessite de três argumentos, e
# que forneça a soma desses três argumentos através de uma função. Seu
# script também deve fornecer a média dos três números, através de uma
# segunda função que chama a primeira.

def soma(a,b,c):
    return a + b + c
def primeira(a,b,c):
    media = soma(a,b,c) /3
    return media
n1 = float(input("Digite o primeiro número: "))
n2 = float(input("Digite o segundo número: "))
n3 = float(input("Digite o terceiro número: "))
print("A soma dos números é: ", soma(n1,n2,n3))
print("A média dos números é: ",primeira(n1,n2,n3))