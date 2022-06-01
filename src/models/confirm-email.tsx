import {axiosPost} from '../util/callApi';

export async function confirmEmailRequest(requestBody) {
  const response = await axiosPost('/confirm-email', requestBody);

  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}
