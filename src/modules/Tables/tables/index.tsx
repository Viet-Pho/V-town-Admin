import React from 'react';
import TableList from './tableLists';
import {useIntl} from 'react-intl';
import AppsContainer from '../../../@crema/core/AppsContainer';
import AppCard from '@crema/core/AppCard';

import {render} from 'react-dom';

const Tables = () => {
  const {messages} = useIntl();
  return (
    <AppCard
      title='Select Location'
      // sidebarContent={<ProductsSidebar />}
    >
      <TableList />
    </AppCard>
  );
};

export default Tables;
