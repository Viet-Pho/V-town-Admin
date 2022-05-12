import React from 'react';
import AppPage from '../../../@crema/hoc/AppPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';

const CustomerList = asyncComponent(
  () => import('../../../modules/customer/CustomerList'),
);
export default AppPage(() => <CustomerList />);
