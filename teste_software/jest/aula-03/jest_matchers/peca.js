function validarPeca(peso, tolerancia = 0.2) {
    if (!peso && peso !== 0) {
        return undefined;
    }

    const pesoNum = Number(peso);
    if (isNaN(pesoNum)) {
        return NaN;
    }

    return pesoNum + (0.1 + 0.2);
}

module.exports = { validarPeca };