const {sum, sub, mult, div, por, modul} = require('./sum');


test('adds 1 + 2 to equal 3', () => { //adds é que a gente está trazendo
  expect(sum(1, 2)).toBe(3);
});

test('substracts 5 - 3 to equal 2', () => {
  expect(sub(5, 3)).toBe(2);
});

test('multiplicação 5 * 5 to equal 25', () => {
    expect(mult(5, 5)).toBe(25);
})

test('divisão 10 / 2 to equal 5', () => {
    expect(div(10, 2)).toBe(5);
});

test('Erro ao tentar dividir por 0', () => {
    expect(() => div(10, 0)).toThrow('Divisão por zero não é permitido')
})

test('Porcentagem de 50% de 100 to equal 50', () => {
    expect(por(50, 100)).toBe(50);
})

test('Modulo de 5 % 2 to equal 1', () => {
    expect(modul(5, 2)).toBe(1)
})
