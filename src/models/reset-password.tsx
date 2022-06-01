import {axiosPost} from '../util/callApi';

export async function resetPasswordRequest(requestBody) {
  const response = await axiosPost('/reset-password', requestBody);

  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}
