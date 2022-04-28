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
