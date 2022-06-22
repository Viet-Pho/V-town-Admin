import {axiosGet} from '../util/callApi';

export async function searchCustomers(query) {
  const response = await axiosGet('/customers', query);
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}

export async function getCustomerDetail(customerId) {
  const response = await axiosGet(`/customers/${customerId}`);
  if (response.status === 200) {
    return response.data;
  } else {
    return {};
  }
}
