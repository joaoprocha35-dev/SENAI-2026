const {validarIdade} = require('../validarIdade')

test('Deve permitir o acesso para maiores de 18 anos', () => {
    expect(validarIdade(20)).toBe(true);
})

//fazendo o test de erro
test('Deve lançar erro para maiores de 18 anos', () => {
    expect(() => validarIdade(15)).toThrow('Usuário deve ser maior de idade')
})
