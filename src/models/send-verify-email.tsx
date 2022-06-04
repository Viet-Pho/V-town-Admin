import {axiosPost} from '../util/callApi';

export async function sendVerifyEmail(requestBody) {
  const response = await axiosPost('/send-verify-email', requestBody);

  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}
