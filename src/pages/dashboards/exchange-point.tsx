import React from 'react';
import AppPage from '../../@crema/hoc/AppPage';
import asyncComponent from '../../@crema/utility/asyncComponent';

const ExchangePoint = asyncComponent(
  () => import('../../modules/dashboards/ExchangePoint'),
);
export default AppPage(() => <ExchangePoint />);
