import React from 'react';
import AppPage from '../../@crema/hoc/AppPage';
import asyncComponent from '../../@crema/utility/asyncComponent';

const RegisterStaff: any = asyncComponent(
  () => import('../../modules/registerStaff/index'),
);
export default AppPage(() => <RegisterStaff />);
