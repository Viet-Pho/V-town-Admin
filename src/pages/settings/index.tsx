import React from 'react';
import AppPage from '../../@crema/hoc/AppPage';
import asyncComponent from '../../@crema/utility/asyncComponent';

const Settings = asyncComponent(
  () => import('../../modules/settings/Settings/index'),
);
export default AppPage(() => <Settings />);
