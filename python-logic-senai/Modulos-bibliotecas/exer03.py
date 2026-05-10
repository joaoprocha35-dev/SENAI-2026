# Faça um script que peça ao usuário o número de matérias da escola, ou
# seja, um inteiro positivo.
# Em seguida, ele vai digitando o valor de cada nota, de cada matéria e isso
# será armazenado numa lista.
# Ao final, seu script deverá fornecer a média geral do aluno.
# Primeiro, perguntamos ao usuário quantas matérias ele fez provas, e
# armazenamos em n.
# Depois, criamos uma lista vazia, para as notas, bem como inicializamos a
# variável soma com valor 0, ela vai somar todas as notas.
# Dentro do for, temos que preencher n notas, fazemos isso com a função
# range.
# Perguntamos cada nota (imprimimos count+1, para os índices aparecerem
# bonitinho para o usuário, lembre-se que para ele a contagem não começa
# em 0, como começa para nós programadores) e vamos adicionando cada
# nota como uma lista, concatenando na lista maior notas.
# Somamos o valor de soma com cada nota digitada.
# No final, dividimos o valor dessa soma pelo número de matérias que o aluno
# fez provas, e temos a média geral dela.

notas = int(input("Digite o número de matérias: "))

notas_lista = []
soma = 0
for count in range(notas):
    #Usando f-string com formatador :2
    nota = float(input(f"Digite a nota da matéria {count + 1:2}: "))
    notas_lista.append(nota)
    soma += nota
    print(f"\nNotas {notas_lista}")
    #usando f-string para mostrar 2 casas decimais
    print(f"Média geral: {soma / notas:.2f}")
