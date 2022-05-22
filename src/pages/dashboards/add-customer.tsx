import React from 'react';
import AppPage from '../../@crema/hoc/AppPage';
import asyncComponent from '../../@crema/utility/asyncComponent';

const AddNewCustomer = asyncComponent(
  () => import('../../modules/addCustomer'),
);
export default AppPage(() => <AddNewCustomer />);
