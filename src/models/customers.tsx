import {axiosGet, axiosPost, axiosPatch, axiosDelete} from '../util/callApi';

export async function searchCustomers(query) {
  const response = await axiosGet('/customers', query);
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}

export async function addNewCustomer(query) {
  const response = await axiosPost('/customer-list/customer-details', query);
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}

export async function editCustomer(pid, query) {
  const response = await axiosPatch(
    `/customer-list/customer-details/${pid}`,
    query,
  );
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}

export async function getCustomerInfoById(query) {
  const response = await axiosGet(`/customer-list/customer-details/${query}`);
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}

export async function deleteCustomerById(pid) {
  const response = await axiosDelete(`/customer-list/customer-details/${pid}`);
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}
