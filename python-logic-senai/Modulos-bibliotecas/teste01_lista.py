#Crie um código em python que peça seu nome,
# idade, altura, peso e true se for casado ou false para solteiro.
# em seguuida,armazene todas estas infos em uma lista chamada Eu. por fim,imprima a lista.

nome = input("Digite seu nome: ")
idade = int(input("Digite sua idade: "))
altura = float(input("Digite sua altura: "))
peso = float(input("Digite seu peso: "))
casado = input("Você é casado? (s/n): ").lower() == 's'
casado_str = "Casado" if casado else "Solteiro"
def Eu():
    return [nome, idade, altura, peso, casado_str]
print(Eu())

print("Nome: ", Eu()[0], "\nIdade: ", Eu()[1], "\nAltura: ", Eu()[2], "\nPeso: ", Eu()[3], "\nEstado Civil: ", Eu()[4])

# op = int(input("Digite a opção:\n1-Casado\n2-Solteiro: "))
# if op == 1:
#     op = "Casado"
# else:
#     op = "Solteiro"
# eu = [nome, idade, altura, peso, op]
# print(eu)