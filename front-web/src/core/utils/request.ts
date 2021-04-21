import axios, { Method } from 'axios';

type RequestParams = {
    method?: Method;
    url: string;
    data?: object;
    params?: object;
}
// method? ou data? ou params? informa ao sistema que o seu preenchimento não é obrigatório

const BASE_URL = 'http://localhost:3000';

export const makeRequest = ({ method = 'GET', url, data, params }:RequestParams) => {
    return axios({
        method,
        url: `${BASE_URL}${url}`,
        data,
        params
    });
}