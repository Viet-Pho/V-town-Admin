import {axiosGet} from '../util/callApi';

export async function searchRooms() {
  const response = await axiosGet('/room/room-info');
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}
