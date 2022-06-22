import {axiosPost} from '../util/callApi';

export async function createBill(bill) {
  const response = await axiosPost('/bill', bill);
  if (response.status === 200) {
    return response.data;
  } else {
    return {};
  }
}
