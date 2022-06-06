import {axiosGet, axiosPatch, axiosPost, axiosDelete} from '../util/callApi';

export async function updateItem(pid, query) {
  const response = await axiosPatch(`/order/${pid}`, query);
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}

export async function addItem(pid, query) {
  const response = await axiosPost(`/order/${pid}`, query);
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}

export async function deleteItem(pid, query) {
  const response = await axiosDelete(`/order/${pid}`, query);
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}

export async function getOrderedItems(pid, query) {
  console.log('query: ', query);
  console.log('pid: ', pid);
  const response = await axiosGet(`/order/${pid}`, query);
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}
