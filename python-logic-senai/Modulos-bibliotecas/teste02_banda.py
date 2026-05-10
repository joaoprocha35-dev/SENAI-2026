bandas = []
while True:
    print("1-Adicionar banda.\n2-Exibe banda.\n3-Exibir bandas salvas.\n4-mudar item da lista ")
    op = int(input("Escolha a opção: "))
    if (op == 1):
        bandanome= input("Digite o nome da banda: ")
        bandas.append(bandanome)
    elif (op ==2):
        print("Banda: ", bandanome)

    elif (op == 3):
        print("Tamanho da lista: ",len(bandas), "bandas salvas: ", bandas[len(bandas)-1])
    elif (op ==4):
        
        print("Bandas salvas: ", bandas)
        pos= int(input("Digite a posição da banda que deseja mudar: "))
        if pos < len(bandas):
            nova_banda = input("Digite o novo nome da banda: ")
            bandas[pos] = nova_banda
        else:
            print("Essa posição não existe na lista.")
            
        # del bandas[x]
        # bandas1= ["a", "b"]
        # bandas2= ["c","d"]

        # somabandas = bandas1 + bandas2

        # multiplicacaobandas = bandas1 * 3

        #Inverter uma lista é reverse()
        #Embaralhar uma lista é sort()
        #Apagar uma lista é clear()
        #Copiar ums list: copy()
        # contar quantas vezes um item aparece: count(x)
        # retirar um elemento da lista: pop(x)