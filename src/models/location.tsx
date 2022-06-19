import {axiosGet} from 'util/callApi';

export async function getLocations() {
  const response = await axiosGet('/location');
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}
