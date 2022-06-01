import React from 'react';
import AppPage from '../@crema/hoc/DefaultPage/index';
import asyncComponent from '../@crema/utility/asyncComponent';

export default asyncComponent(() => import('../modules/verify-email/index'));
