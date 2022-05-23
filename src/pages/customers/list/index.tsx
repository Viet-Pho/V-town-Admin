import React from 'react';
import AppPage from '../../../@crema/hoc/AppPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';

//../../../modules/customer/CustomerList
const CustomerList = asyncComponent(
  () => import('../../../modules/customers/index'),
);
export default AppPage(() => <CustomerList />);
