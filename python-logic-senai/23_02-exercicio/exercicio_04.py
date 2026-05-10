#Escreva um programa que pede o raio de um círculo, e em seguida exiba
#o perímetro e área do círculo.
#Para saber o valor do pi, faça:
#import math
#print(math.pi)
#Pronto, para saber o valor de pi, basta usar 'math.pi', que é um float.

import math
raio = float(input("Digite o raio de um círculo "))

# cálculo10
perimetro = 2 * math.pi * raio
area = math.pi * (raio**2)

print(f"O perímetro do círculo é: {perimetro:.2f}")
print(f"A área do círculo é:{area:.2f} ")

