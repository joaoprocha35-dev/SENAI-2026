function sum(a, b){
    return a + b;

}

//Função de subtração
function sub(a,b) {
    return a - b;

}
function mult( a,b){
    return a * b;
}
function div(a, b){

    if(b === 0){
      throw new Error('Divisão por zero não é permitido.')    
    }

    return a / b;
}
function por(a,b){
    return (a / b) * 100
}

function modul(a, b){
    return a % b
}

module.exports = {sum, sub, mult, div, por, modul};