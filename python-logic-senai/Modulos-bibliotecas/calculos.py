#Chamar funções do arquivo calculadora.py
import calculadora
while True:
    print("Escolha a operação: ")
    print("1. Adição")
    print("2. Subtração")
    print("3. Multiplicação")
    print("4. Divisão")
    print("5. Sair")

    print("------------------------------")

    op = float(input("Digite a opção (1/2/3/4/5):"))
    x = float(input("Digite um número:"))
    y = float(input("Digite o segundo número: "))
    print("")

    if op == 1:
        print("Resultado: ",calculadora.adicao(x,y))
    elif op ==2:
        print("Resultado: ",calculadora.subtracao(x,y))
    elif op ==3:
        print("Resultado: ", calculadora.multiplicacao(x,y))
    elif op ==4:
        print("Resultado: ",calculadora.divisao(x,y))
    elif op == 5:
        print("Saindo...")
        break
    else:
        print("Opção inválida, tente novamente.")
    


