//Criando uma função para validar idade
function validarIdade(x){
    if(x < 18){
        throw new Error('Usuário deve ser maior de idade');
    }else if(x >= 18){
        return true;
    }
}

module.exports = {validarIdade};