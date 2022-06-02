import React, {useEffect, useState} from 'react';
import {Box} from '@mui/material';
import {Fonts} from '../../../../shared/constants/AppEnums';
import Divider from '@mui/material/Divider';
import AppScrollbar from '../../../../@crema/core/AppScrollbar';
import AppList from '../../../../@crema/core/AppList';
import {
  brandData,
  discountList,
  idealFor,
  productColors,
} from '../../../../@crema/services/db/ecommerce/ecommerceData';
import AppGrid from '../../../../@crema/core/AppGrid';
import {useDispatch, useSelector} from 'react-redux';
import {setFilters} from '../../../../redux/actions';
import {AppState} from '../../../../redux/store';
const RoomsSidebar = () => {
  useEffect(() => {}, []);

  return (
    <AppScrollbar>
      <></>
    </AppScrollbar>
  );
};

export default RoomsSidebar;
