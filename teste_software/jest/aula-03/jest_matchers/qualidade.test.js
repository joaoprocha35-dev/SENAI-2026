const { default: expect } = require('expect');
const {lerTemperatura, calcularPressaoMedia, processarSinal} = require('./qualidade')

//descrevendo os testes
describe('Bateria de testes com Matchers', ()=>{
    //Testando os Matchers
    //toBeUndefined() - Verificar se o retorno é indefindo
    test('Deve retornar undefined quando o sensor estiver desligado', ()=>{
        const leitura = lerTemperatura(false)
        expect(leitura).toBeUndefined();
    })
    //comparativos Numéricos(GreaterThan, LessThan, Equal, etc.)
    test('validar limites de segurança de temperatura', ()=> {

        const temp = lerTemperatura(true)
        expect(temp).toBeGreaterThan(70) // toBeGreaterThan(maior que)
        expect(temp).toBeLessThan(80) // igual à
        expect(temp).toBeLessThanOrEqual(75.4) //menor que 
    })
    //toBeCloseto() - testar valor aproximado
    test('Calcular a pressão se o valor está aproximado', ()=>{
        const pressao = calcularPressaoMedia();
        expect(pressao).toBeCloseTo(0.15)
    })
    
    //toBeNaN() - Testar número válido
    test('Retornar NaN ao tentar converter texto em número', ()=>{
        const resultado = processarSinal('Entrada inválida');
        expect(resultado).toBeNaN();
    })

    
})