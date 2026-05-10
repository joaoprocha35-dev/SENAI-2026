while True:
    resposta = input("Deseja realizar uma operação? (s/n): ").lower()

    if resposta =='s':

        print("\nEscolha a operação: ")
        print("1. Adição")
        print("2. Subtração")
        print("3. Multiplicação")
        print("4. Divisão")
        print("5. Sair")
        print("------------------------------")
        op = int(input("Digite a opcão: "))
        if op == 5:
            print("Saindo...")
            break
        print("------------------------------")

        n1 = int(input("Digite o primeiro número: "))
        n2 = int(input("Digite o segundo número: "))


        match op:
            case 1:
                print("Resultado: ", n1 + n2)
            case 2:
                print("Resultado: ", n1 - n2)
            case 3:
                print("Resultado: ", n1 * n2)
            case 4:
                if n2 != 0:
                    print(f"Resultado: {n1 / n2:.2f}" )
                else:
                    print("[Erro] Divisão por zero não é permitida.")
            case _:
                print("Opção inválida, tente novamente.")
    elif resposta == 'n':
        print("Saindo...")
        break
    else:
        print("Resposta inválida, tente novamente.")