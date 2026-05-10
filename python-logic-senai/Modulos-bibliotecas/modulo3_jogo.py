import random
def gera():
    print("Gerando o jogo...")
    return random.randint(1, 5)
def game():
    resposta = gera()
    tentativa = 0
    chute = 0
    print("\nPalpeite um número entre 1 e 100:")
    print("-------------------------------")
    while chute != resposta:
        tentativa += 1
        chute = int(input("Digite seu chute: "))
        if chute > resposta:
            print("[Erro] é um valor menor que ", chute)
        elif chute < resposta:
            print("É um valor maior que ", chute)
        else:
            print("Parabéns! Você acertou o número: ", resposta)
            print("Você precisou de\n", tentativa,"Tentativas para acertar.")
while True:
    game()
    # Pergunta se o jogador deseja jogar novamente, e se a resposta for diferente de 's', o programa é encerrado.
    if input("Deseja jogar novamente? (s/n): ").lower() != 's':
        print("Saindo...")
        break
