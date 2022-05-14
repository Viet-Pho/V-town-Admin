import callApi from '../util/callApi';

export const getCustomerDetails = async () => {
  return callApi('GET', '/api/customer-list/get', null);
};
