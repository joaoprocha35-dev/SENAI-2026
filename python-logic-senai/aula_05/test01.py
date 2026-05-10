#Exercícios de Funções
# 1. Escreva um script que pergunta ao usuário se ele deseja converter uma
# temperatura de grau Celsius para Farenheit ou vice-versa. Para cada opção,
# crie uma função. Crie uma terceira, que é um menu para o usuário escolher a
# opção desejada, onde esse menu chama a função de conversão correta.

# def celsius_para_farenheit(c):
#     return (c * 9/5) + 32

# def farenheit_para_celsius(f):
#     return (f - 32) * 5/9

# def menu():
#     print("1. Celsius para Farenheit")
#     print("2. Farenheit para Celsius")
#     opcao = int(input("Escolha uma opção: "))
#     if opcao == 1:
#         c = float(input("Digite a temperatura em Celsius: "))
#         print("Temperatura em Farenheit: ", celsius_para_farenheit(c))
#     elif opcao == 2:
#         f = float(input("Digite a temperatura em Farenheit: "))
#         print("Temperatura em Celsius: ", farenheit_para_celsius(f))
#     else:
#         print("Opção inválida!")

# menu()
def celsiusParaFarenheit(c):
    return (c * 9/5) * 32
def farenheitParacelsius(f):
    return(f -32) * 5/9

def menu():
    print("1. Celsius para farenheit")
    print("2. farenheit para celsius")
    opcoes = int(float(input("Escolha uma opção: ")))
    if opcoes == 1:
        c = float(input("Digite a temperatura em Celsius:"))
        print("Temperatura de celsius para farenheit é: ", celsiusParaFarenheit(c))
    elif opcoes == 2:
        f = float(input("Digite a temperatura em farenheit: "))
        print("temperatura de farenheit para celsius é: ", farenheitParacelsius(f))
    else:
        print("Opção Inválida!")

menu()
