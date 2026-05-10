#Crie um código python que peça o nome e sobre nome do usúario e depois mostra na tela o nome ivertido

def inverte(nome,sobrenome):
    nomeInverso = sobrenome + "," + nome
    return nomeInverso
nome = input("Digite seu nome: ")
sobrenome = input("Digite seu sobrenome: ")
invertido = inverte(nome,sobrenome)
print("Olá ", invertido)