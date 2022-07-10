import {axiosGet, axiosPost} from '../util/callApi';

export async function fetchItems() {
  const response = await axiosGet('/items');
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}

export async function postItem(data) {
  const response = await axiosPost('/items', data);
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}
