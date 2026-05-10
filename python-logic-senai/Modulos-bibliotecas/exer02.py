#Faça um script que cria lista de 10 elementos,contados de 1 a 10, depois, dobre cada valor dessa lista.

lista = []
for count in range(1, 11):
    lista += [count]
print("Lista original: ", lista)
for count in range(len(lista)):
    lista[count] *= 2
print("Lista dobrada: ", lista)