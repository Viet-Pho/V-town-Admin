import {axiosPost} from '../util/callApi';

export async function forgotPasswordRequest(requestBody) {
  const response = await axiosPost('/forgot-password', requestBody);

  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}
