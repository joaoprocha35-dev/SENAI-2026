#Programa para saber se a pessoa tem direito a fila preferencial
print("1. Idoso")
print("2. Gestante")
print("3. Cadeirante")
print("4. eu tenho alguma preferência")

respostas = int(input("Você é: "))
if (respostas==1) or (respostas==2) or (respostas==3):
    print("Você tem direito a fila preferencial! " )
elif (respostas==4):
    print("Nunhum direito você tem")

else:
    print("Você não tem direito a fila preferencial! ")