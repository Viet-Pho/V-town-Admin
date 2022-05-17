import {axiosGet, axiosPost, axiosPatch} from '../util/callApi';

export async function searchCustomers(query) {
  const response = await axiosGet('/api/customers', query);
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}
export async function addNewCustomer(query) {
  const response = await axiosPost(
    '/api/customer-list/customer-details',
    query,
  );
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}

export async function editCustomer(pid, query) {
  const response = await axiosPatch(
    `/api/customer-list/customer-details/${pid}`,
    query,
  );
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}

export async function getCustomerInfoById(query) {
  const response = await axiosGet(
    `/api/customer-list/customer-details/${query}`,
  );
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}
