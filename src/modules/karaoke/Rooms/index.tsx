import React from 'react';
import RoomListing from './RoomListing';
import {useIntl} from 'react-intl';
import AppsContainer from '../../../@crema/core/AppsContainer';
import ProductsSidebar from './RoomsSidebar';

const Rooms = () => {
  const {messages} = useIntl();
  return (
    <AppsContainer
      title={`${messages['sidebar.ecommerce.billing']}`}
      sidebarContent={<ProductsSidebar />}
    >
      <RoomListing />
    </AppsContainer>
  );
};

export default Rooms;
