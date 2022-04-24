import axios from "axios";
import { apiDomain } from '../configs/config'

export const callApi = (method,url,data) => {
  return axios({
    method: method,
    url: `${apiDomain}${url}`,
    data: data,
    headers : {
      'Content-Type': 'application/json'
    }
  });
}
