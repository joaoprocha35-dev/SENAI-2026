#Uso de return

#DIFERENÇA ENTRE PRINT E RUTURN

#PRINT É O TELÃO É O QUE MOSTRA O QUE SE PASSA LA DENTRO.

#RETURNE É QUEM ENTREGA O RESULTADO#código que recebe dois números e calcula a conta

def soma(x,y):
    result = x + y
    return result

a = int(input("Digite o primeiro número: "))
b = int(input("Digite o segundo número: "))
c = soma(a,b)
print("A soma é: ", c)