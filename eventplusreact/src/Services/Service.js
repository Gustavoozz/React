import axios from "axios";

export const eventsResource = '/Evento';

export const myEventsResource = '/PresencasEvento/ListarMinhas';

export const nextEventResource = '/Evento/ListarProximos';

export const eventsTypeResource = '/TiposEvento';

export const institutionResource = '/Instituicao';

export const loginResource = '/Login';

const apiPort = "7118";
// const localApi = `https://localhost:${apiPort}/api`
const externalApi =  "https://eventapiwebgustavo.azurewebsites.net";

const api = axios.create({
    baseURL : externalApi
});


export default api;