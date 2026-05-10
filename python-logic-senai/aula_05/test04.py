# Faça um programa com uma função chamada somaImposto. A função
# possui dois parâmetros formais: taxaImposto, que é a quantia de imposto
# sobre vendas expressa em porcentagem e custo, que é o custo de um item
# antes do imposto. A função “altera” o valor de custo para incluir o imposto
# sobre vendas.

def somaImposto(taxaImposto, custo1):
    custo = custo1 + (custo1 * taxaImposto / 100)
    return custo


cust = float(input("Digite o valor do produto antes do imposto: "))
Imposto = float(input("Digite a taxa de imposto sobre vendas em porcentgem: "))

print("o valor do produto antes do imposto é: ", cust )
print("O valor do produto com o imposto é: ", somaImposto(Imposto, cust))