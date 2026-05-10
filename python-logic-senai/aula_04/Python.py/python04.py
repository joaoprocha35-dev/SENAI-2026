#Cóodigo que exibe o nome de times, em seguida pergunte ao usuario qual deles é o melhor
print("Digite qual time é melhor")
print("1. Corinthians")
print("2. Flamengo")

resposta = int(input("Qual o melhor time: "))

if resposta == 1:
    print("Você manja de futebol!")
else:
    if resposta == 2:
     print("Você não sabe de nada!")
    else: 
       print("não existe essa opção")