
# Faça um programa que recebe três números do usuário, e identifica o
# maior através de uma função e o menor número através de outra função.

def maior(n1,n2,n3):
    if n1 > n2 and n1> n3:
        return n1
    elif n2> n1 and n2>n3:
        return n2
    else:
        print("O maior é: ", n3)

def menor(n1,n2,n3):
    if n1<n2 and n1<n3:
        return n1
    elif n2<n1 and n2<n3:
        return n2
    else:
        print("O número menor é: ",n3)

n1 = float(input("Digite o primeiro número: "))
n2 = float(input("Digite o segundo número: "))
n3 = float(input("Digite o terceiro número"))

print("O maior número é: ", maior(n1,n2,n3))
print("O menor número é: ", menor(n1,n2,n3))
