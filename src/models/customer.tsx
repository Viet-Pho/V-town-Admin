import {axiosGet} from '../util/callApi';

export async function searchCustomers(query) {
  const response = await axiosGet('/api/customers', query);
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}
