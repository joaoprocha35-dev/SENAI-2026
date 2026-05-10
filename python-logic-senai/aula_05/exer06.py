#Crie um programa em python que cria par ou impar, ele deve fazer isso através de uma função que recebe o número true ou false
def par(x):
    if (x%2)==0:
        return True
    else:
        return False
    
num = int(input("Digite um número: "))
if par(num):
    print("O número é par.")
else:
    print("O número é impar.")