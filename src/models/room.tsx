import {axiosGet, axiosPatch, axiosPost} from '../util/callApi';

export async function searchRooms() {
  const response = await axiosGet('/room/room-info');
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}

export async function startRoom(pid, query) {
  const response = await axiosPost(`/room/billing/${pid}`, query);
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}
