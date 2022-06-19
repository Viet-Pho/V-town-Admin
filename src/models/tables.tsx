import {
  axiosDelete,
  axiosGet,
  axiosPatch,
  axiosPost,
  axiosPut,
} from '../util/callApi';

export async function fetchAllLocation() {
  const response = await axiosGet('/tables/location/getAllLocation');
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}

// request Body: {location: string}

export async function addLocation(request) {
  const response = await axiosPost(`/tables/location/addLocation/`, request);
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}

export async function getTablesOnLocationId(pid) {
  const response = await axiosGet(`/tables/location/${pid}`);
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}

// add tables
//request: {name: string, position_x: "0", position_y: "0"}
export async function addTables(pid, request) {
  const response = await axiosPost(`/tables/location/${pid}`, request);
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}

// change Availability tables
//request: {name: string, position_x: "0", position_y: "0"}
export async function changeAvailability(pid, request) {
  const response = await axiosPatch(`/tables/location/${pid}`, request);
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}

// Delete tables
//request: {id: string}
export async function deleteTable(pid, tableId) {
  const response = await axiosDelete(`/tables/location/${pid}`, {
    data: {id: tableId},
  });
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}

// change Position tables
//request: {name: string, position_x: "0", position_y: "0"}
export async function changePosition(pid, request) {
  const response = await axiosPatch(`/tables/location/${pid}`, request);
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}

// Clear tables
//no request
export async function clearAllTables(pid) {
  const response = await axiosPut(`/tables/location/${pid}`);
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}
