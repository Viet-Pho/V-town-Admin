import React from 'react';
import AppPage from '@crema/hoc/AppPage';
import asyncComponent from '@crema/utility/asyncComponent';

const ManagementBill = asyncComponent(
  () => import('modules/management/bills/index'),
);
export default AppPage(() => <ManagementBill />);
