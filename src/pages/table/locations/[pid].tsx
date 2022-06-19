import React from 'react';
import AppPage from '../../../@crema/hoc/AppPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';

//../../../modules/customer/CustomerList
const Table = asyncComponent(
  () => import('../../../modules/Tables/table/index'),
);
export default AppPage(() => <Table />);
