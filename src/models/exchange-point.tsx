import {axiosPost} from '../util/callApi';

export async function createExchangePoint(exchangePoint) {
  const response = await axiosPost('/exchange-points', exchangePoint);

  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}
