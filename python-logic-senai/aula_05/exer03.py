#Programa que calcula o perimetro e área
pi = 3.14

def perimetro(raio):
    print("perimetro: ", 2 * pi * raio)
def area(raio):
    print("area: ", pi * raio**2)
raio = float(input("Raio do circulo: "))
perimetro (raio)
area (raio)