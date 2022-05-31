import {axiosPost} from '../util/callApi';
export async function registerStaff(requestBody) {
  const response = await axiosPost('/registerStaff', requestBody);
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}
