import {axiosDelete} from '../util/callApi';

export async function disableCard(cardId) {
  const response = await axiosDelete(`/cards/${cardId}`);
  if (response.status === 200) {
    return response.data;
  } else {
    return response
  }
}
