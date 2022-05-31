// @ts-nocheck

import jwtAxios from '@crema/services/auth/jwt-auth';

// export default (method, url, data) => {
//   return axios({
//     method: method,
//     url: `${url}`,
//     data: data,
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
// };

export const axiosGet = (url, query = null) => {
  return jwtAxios.get(url, {params: query});
};

export const axiosPost = (url, body) => {
  return jwtAxios.post(url, body);
};

export const axiosPatch = (url, query?) => {
  return jwtAxios.patch(url, query);
};

export const axiosDelete = (url) => {
  return jwtAxios.delete(url);
};
