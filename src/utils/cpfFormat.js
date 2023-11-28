function formatarCpf(cpf) {
    let cpf_formatado = ''
    for (let i = 1; i < 12; i++) {
        if (i === 9) {
            cpf_formatado += cpf[i-1];
            cpf_formatado += '-';
        } else if (i % 3 === 0) {
            cpf_formatado += cpf[i-1];
            cpf_formatado += '.';
        } else {
            cpf_formatado += cpf[i-1]
        }
    }
    return cpf_formatado;
}

module.exports = formatarCpf