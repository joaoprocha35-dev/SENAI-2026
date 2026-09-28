const {validarAutenticar } = require('./auth');

//Cenário 1: Login com sucesso

test('Autenticação com sucesso', () => {
    const resultado = validarAutenticar('user@senai.br', '123456')
    // Verifica se a autenticação foi realizada
    expect(resultado.autenticado).toBe(true)

    //Verificar se o usuário autenticado é o esperado
    expect(resultado.perfil).toBe('Usuario');

    //Testa se o token foi gerado
    expect(resultado.token).toBeDefined(); //verifica se o token foi gerado

});

//Cenário 2: verifica se os campos Vazios é nulos
test('Lançar erro se estiver nulo o campo usuario e senha', () => {
    //Verifica se o campo de usuário está nulo, se tiver, ele lança a mensagem no test
    expect(() => validarAutenticar('','123456')).toThrow('Usuario_senha_obrigatorios')
    //Verifica se o campo de senha está nulo, se tiver, ele lança a mensagem no test
    expect(() => validarAutenticar('user@senai.br', '')).toThrow('Usuario_senha_obrigatorios')
})

//Cenário 3: E-mail inválido -> lançar erro se o usuario nao contiver o @
test('Lançar erro se o usuario nao contiver o @', () =>{
    expect(() => {validarAutenticar('usersenai.br', '123456');
    }).toThrow('Formato_Usuario_invalido')
})


//Cenário 4: Senha muito curta -> Lançar erro se a senha estiver menos de 6 caracteres
test('Lançar erro se a senha estiver menos de 6 caracteres', ()=> {
    expect(()=> {
        validarAutenticar('user@senai.br', '123');
    }).toThrow('senha_curta')
})

//Cenário 5: Testar credenciais com login e senha erradas
test('Lançar erro de credenciais com login e senha erradas', ()=>{
    expect(() =>{validarAutenticar('usuario@senai.br', '123456789' )}).toThrow('Credenciais_Invalidas')
})

//Cenário 6: Validar se o usuario é admin
test('Testar se o usuario é admin', ()=>{
    const resultado = validarAutenticar('admin@senai.br','admin123')
    //verifica a autenticação do admin
    expect(resultado.autenticado).toBe(true)

    //Verificar se o usuário autenticado é o esperado
    expect(resultado.perfil).toBe('Supervisor')
    //Testa se o token foi gerado do admin
    expect(resultado.token).toBeDefined();
    
});