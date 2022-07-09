import {axiosPost, axiosPut, axiosGet, axiosDelete} from '../util/callApi';

export async function createBill(bill) {
  const response = await axiosPost('/bill', bill);
  if (response.status === 200) {
    return response.data;
  } else {
    return {};
  }
}

export async function updateBill(id, bill) {
  const response = await axiosPut(`/bill/${id}`, bill);
  if (response.status === 200) {
    return response.data;
  } else {
    return {};
  }
}

export async function getBill(id) {
  const response = await axiosGet(`/bill/${id}`);
  if (response.status === 200) {
    return response.data;
  } else {
    return {};
  }
}
export async function searchBill(query) {
  const response = await axiosGet('/bill', query);
  if (response.status === 200) {
    return response.data;
  } else {
    return {};
  }
}
export async function deleteBill(id) {
  const response = await axiosDelete(`/bill/${id}`);
  if (response.status === 200) {
    return response.data;
  } else {
    return {};
  }
}
