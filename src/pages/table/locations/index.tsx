import React from 'react';
import AppPage from '../../../@crema/hoc/AppPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';

//../../../modules/customer/CustomerList
const Tables = asyncComponent(
  () => import('../../../modules/Tables/tables/index'),
);
export default AppPage(() => <Tables />);
