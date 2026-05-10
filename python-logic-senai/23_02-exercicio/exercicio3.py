#Você foi contratado pela Caixa Econômica Federal para atualizar seu
#sistema.
#Como primeira tarefa, você vai criar um script que diga quanto cada ganhador da Mega-Sena vai
#receber, ao ter o prêmio dividido com outros ganhadores.
#Solução:
#Faça com que o programa peça um valor (float) ao usuário, que é um valor
#em dinheiro do prêmio.
#Em seguida, peça o número de pessoas (inteiro) que acertaram.
#Por fim, exibimos quanto cada um vai ganhar.

num = float(input("Digite quantas pessoas: "))
#var2 = float(input("Digite o segundo valor: "))
total = float(input("Premio  da mega sena: "))

#print("cada um vai receber com R$ %.3f"% (total/num))

print("O premio total foi de R$%.2f para %d ganhadores, onde cada um ficou com R$%.2f"%(total,num,total/num))