import React from 'react';
import AppPage from '../../../@crema/hoc/AppPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';

//../../../modules/customer/CustomerList
const Rooms = asyncComponent(
  () => import('../../../modules/karaoke/Room/index'),
);
export default AppPage(() => <Rooms />);
