#Escreva um programa que pede uma senha ao usuario, e só sai do looping quando digitarem corretamente a senha.
senhacorreta = 1234
senha = int(input("Digete sua senha: "))

while senha != senhacorreta:
    print('Senha errada')

    senha = int(input('Digite novamente: '))

print('Senha correta')