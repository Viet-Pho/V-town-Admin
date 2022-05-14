// @ts-nocheck
import axios from 'axios';

export default (method, url, data) => {
  return axios({
    method: method,
    url: `${url}`,
    data: data,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const axiosGet = (url, query = null) => {
  return axios.get(url, {params: query});
};

export const axiosPost = (url, body) => {
  return axios.post(url, body);
};

export const axiosPatch = (url, query) => {
  return axios.patch(url, query);
};
