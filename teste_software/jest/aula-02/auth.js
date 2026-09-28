function validarAutenticar (usuario, senha) {
    //validar o preenchimento dos campos
    if(!usuario || !senha){
        throw new Error("Usuario_senha_obrigatorios")

    }
    //validar o formato do usuario(deve conter o @)
    if(!usuario.includes("@")){
        throw new Error('Formato_Usuario_invalido')
    }
    //validar o tamanho da senha
    if(senha.length < 6){
        throw new Error('senha_curta')
    }
    //simular autentiçǎo em Banco de Dados
    if(usuario === "user@senai.br" && senha === "123456"){
        return {
            autenticado: true,
            usuario: usuario,
            perfil: 'Usuario',
            token: 'token-jwt-simulado-123456'
        }
    }
    //simular autenticação em Banco de dados do Usuario admin
    if(usuario == 'admin@senai.br' && senha === 'admin123'){
        return {
            autenticado: true,
            usuario: usuario,
            perfil: 'Supervisor',
            token: 'token-jwt-simulado-12345'
        }
    }
    //Credenciais incorretas
    throw new Error('Credenciais_Invalidas')

}

module.exports = {validarAutenticar}