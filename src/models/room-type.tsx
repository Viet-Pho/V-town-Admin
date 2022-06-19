import {axiosGet} from 'util/callApi';

export async function getRoomTypes() {
  const response = await axiosGet('/room-type');
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}
