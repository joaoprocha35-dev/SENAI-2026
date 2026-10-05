const { validarPeca } = require('./peca');

describe('Testes validarPeca', () => {

    test('retorna undefined se nao passar o peso', () => {
        expect(validarPeca()).toBeUndefined();
    });

    test('retorna NaN se for texto', () => {
        expect(validarPeca('abc')).toBeNaN();
    });

    test('valida se esta na faixa de peso', () => {
        const res = validarPeca(5);
        expect(res).toBeGreaterThan(4.8);
        expect(res).toBeLessThan(5.5);
    });

    test('valida o peso ajustado com precisao', () => {
        const res = validarPeca(5);
        expect(res).toBeCloseTo(5.3);
    });

});