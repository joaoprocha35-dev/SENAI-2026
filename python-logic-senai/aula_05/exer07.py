#return com mais de um valor
#Exemplo: tela de cadastro com nome e idade.

def cadastro(nome, idade):
    name = input("Digite seu nome: ")
    age = input("Digite sua idade: ")
    return name, age

print("Iniciando o Cadastro!")
nome, idade = cadastro("","")
print("cadastro concluído!")

print("Seu nome é: ",nome, "e você tem, ", idade, "de idade.")