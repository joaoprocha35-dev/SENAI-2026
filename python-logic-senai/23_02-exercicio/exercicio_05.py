#Você está no Brasil, e para temperatura usamos o grau Celsius.
#Porém, quando você for contrato para trabalhar como programador Python
#no exterior, deverá usar graus Fahrenheit.
#A fórmula da conversão é a seguinte: 
#F=((9/5)*C)+32
#Ou seja, você fornece a temperatura em graus Celsius, e seu script faz a
#conversão para graus Fahrenheit.

temperaturac = float(input("Digite a teperatura "))
f=((9/5)*temperaturac)+32
print("conversão de temperatura em Fahrenheit: ", f)