import React, {useState, useEffect} from 'react';
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
import AppSelect from '@crema/core/AppSelect';

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
  onSearch: (e: string) => void;
  onPageChange: (value: number) => void;
  viewType: VIEW_TYPE;
  // list: RoomData[];
  totalRooms: number;
  page: number;
  roomTypes: any[];
  locations: any[];
  status: any[];
  filterRoom: (filters: any) => void;
}

const RoomHeader: React.FC<RoomHeaderProps> = ({
  onSearch,
  viewType,
  // list,
  page,
  totalRooms,
  onPageChange,
  roomTypes,
  locations,
  status,
  filterRoom,
}) => {
  const dispatch = useDispatch();
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');

  useEffect(() => {
    const type = roomTypes.find((type) => type.name === typeFilter);
    const location = locations.find((location) => location.name === locationFilter);
    const st = status.find((st) => st.name === statusFilter);
    filterRoom({
      status: st.id,
      type: type.id,
      location: location.id,
    });
  }, [statusFilter, typeFilter, locationFilter]);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end',
        gap: '20px',
      }}
    >
      <div>
        <label style={{fontWeight: 'bold'}}>Type:</label>
        <AppSelect
          menus={roomTypes}
          selectionKey='name'
          defaultValue={typeFilter}
          onChange={(e) => {
            setTypeFilter(e);
          }}
        ></AppSelect>
      </div>
      <div>
        <label style={{fontWeight: 'bold'}}>Location:</label>
        <AppSelect
          menus={locations}
          selectionKey='name'
          defaultValue={locationFilter}
          onChange={(e) => {
            setLocationFilter(e);
          }}
        ></AppSelect>
      </div>
      <div>
        <label style={{fontWeight: 'bold'}}>Status:</label>
        <AppSelect
          menus={status}
          selectionKey='name'
          defaultValue={statusFilter}
          onChange={(e) => {
            setStatusFilter(e);
          }}
        ></AppSelect>
      </div>
    </Box>
  );
};

export default RoomHeader;
