# faça um script que cria uma lista de 10 elementos, preenchendo eles de 0 a  9,usando o laço de repetiçào FOR.
# Depois,imprime essa lista.

lista = []
for count in range(10):
    lista += [count]
soma = 0
for count in lista:
    print(count)
    soma += count
print("Soma: ", soma)