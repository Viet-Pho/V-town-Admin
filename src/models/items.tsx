import {axiosGet} from '../util/callApi';

export async function fetchItems() {
  const response = await axiosGet('/items');
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}
