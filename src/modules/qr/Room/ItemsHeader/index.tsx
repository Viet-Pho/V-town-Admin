import React from 'react';
import {alpha, Box, Hidden, Stack} from '@mui/material';
import AppSearch from '../../../../@crema/core/AppSearchBar';
import ListIcon from '@mui/icons-material/List';
import AppsIcon from '@mui/icons-material/Apps';
import {useDispatch} from 'react-redux';
import {VIEW_TYPE} from '../../../../redux/reducers/Ecommerce';
import IconButton from '@mui/material/IconButton';
import {setViewType} from '../../../../redux/actions';
import {styled} from '@mui/material/styles';
import clsx from 'clsx';
import AppsPagination from '../../../../@crema/core/AppsPagination';
// import {RoomData} from '../../../../types/models/ecommerce/EcommerceApp';

const IconBtn = styled(IconButton)(({theme}) => {
  return {
    color: theme.palette.text.disabled,
    backgroundColor: alpha(theme.palette.primary.main, 0.05),
    padding: 8,
    '&:hover, &:focus': {
      color: theme.palette.primary.main,
    },
    '&.active': {
      color: theme.palette.primary.main,
    },
  };
});

interface RoomHeaderProps {
  // onSearch: (e: string) => void;
  // onPageChange: (value: number) => void;
  // viewType?: VIEW_TYPE;
  // // list: RoomData[];
  // totalItems?: number;
  // page: number;
}

const ItemHeader: React.FC<RoomHeaderProps> = ({
  // onSearch,
  // viewType,
  // // list,
  // page,
  // totalItems,
  // onPageChange,
}) => {
  const dispatch = useDispatch();

  return <Box></Box>;
};

export default ItemHeader;
