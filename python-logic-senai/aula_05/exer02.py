#Desconto do gerente
desc = 10 #10% gerente

def desconto(valor): #Váriavel global
    global desc
    print("Preço original : R$ ", valor)
    print("Desconto : ", desc,"%")

    desc /= 100
    print("Valor desconto : ", valor*desc)
    print("Desconto : ", valor*(1-desc))

val = float(input("Preço do Produto: R$"))
desconto(val)
