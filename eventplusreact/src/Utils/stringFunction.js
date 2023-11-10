/**
 * FUnção queinverte a data do banco de dados.
 * @param {*} data 
 * @returns 
 */

export const dateFormatDbToView = (data) => {
    // Ex: 2023-09-30T00:00:00 para 30/09/2023.
    data = data.substr(0, 10); // Retorna apenas a data.
    data = data.split("-"); // Retorna um array (2023, 09, 30) - Ordem dos indices = 2, 1, 0.

    return `${data[2]}/${data[1]}/${data[0]}`; // Retorno 30/09/2023.
}
