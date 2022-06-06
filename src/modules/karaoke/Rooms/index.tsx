import React from 'react';
import RoomListing from './RoomListing';
import {useIntl} from 'react-intl';
import AppsContainer from '../../../@crema/core/AppsContainer';
import AppCard from '@crema/core/AppCard';
import ProductsSidebar from './RoomsSidebar';
import {render} from 'react-dom';

const Rooms = () => {
  const {messages} = useIntl();
  return (
    <AppCard
      title={`${messages['sidebar.ecommerce.billing']}`}
      // sidebarContent={<ProductsSidebar />}
    >
      <RoomListing />
    </AppCard>
  );
};

export default Rooms;
