import axios from "axios";

export const eventsResource = '/Evento';

export const nextEventResource = '/Evento/ListarProximos';

export const eventsTypeResource = '/TiposEvento';

export const institutionResource = '/Instituicao';

export const loginResource = '/Login';

const apiPort = "7118";
const localApi = `https://localhost:${apiPort}/api`
const externalApi =  null;

const api = axios.create({
    baseURL : localApi
});


export default api;