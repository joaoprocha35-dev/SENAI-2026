//Retornar a leitura da temperatura

function lerTemperatura(sensorAtivo){
    if(!sensorAtivo) return undefined; //Sensor desligado
    return 75.4
}

//Calcular a pressão média de tanques

function calcularPressaoMedia(){
    return (0.1 + 0.2) /2
}
//leitura incorreta para número
function processarSinal(entrada){
    return Number(entrada); //se a entrada for texto, retorna  NaN
}

module.exports = {lerTemperatura, calcularPressaoMedia, processarSinal}