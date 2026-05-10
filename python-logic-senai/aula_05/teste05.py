#  Faça uma função que informe a quantidade de dígitos de um
# determinado número inteiro informado.
def digitos(numero):
    contador = 0
    while numero > 0:
        numero = numero // 10
        contador = contador + 1
    return contador
    
n1 = int(input("Digite um número: "))
print("O número de dígitos em", n1, "é:", digitos(n1))
