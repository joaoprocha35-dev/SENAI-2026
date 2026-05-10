
#Gera números aleatórios entre 1 e 6, como um dado, e pergunta se o usuário deseja gerar outro número ou sair do programa.
#random = módulo para gerar números aleatórios
import random

continuar = 1
while continuar == 1:
    print("Número gerado: ", random.randint(1,6))
    continuar = int(input("Deseja gerar outro número? (1-sim/0-não): "))
    match continuar:
        case 1:
            continue
        case 0:
            print("Saindo...")
            break
        case _:
            print("Opção inválida, saindo...")