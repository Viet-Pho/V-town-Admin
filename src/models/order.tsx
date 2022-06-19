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
  const response = await axiosGet(`/order/${pid}`, query);
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}

const calculateBillRoom = async (orderId: number, requestBody) => {
  const response = await axiosPost(
    `/order/calculate-bill-room/${orderId}`,
    requestBody,
  );
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
};

export {calculateBillRoom};
