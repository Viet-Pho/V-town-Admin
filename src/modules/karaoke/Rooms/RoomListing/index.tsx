import React, {useEffect, useState} from 'react';
import AppsHeader from '../../../../@crema/core/AppsContainer/AppsHeader';
import RoomHeader from '../RoomsHeader';
import DialogConfirmCalculateTime from '../DialogConfirmCalculateTime';
import {useDispatch, useSelector} from 'react-redux';
import AppsContent from '../../../../@crema/core/AppsContainer/AppsContent';
import {alpha, Box, Hidden} from '@mui/material';
import {useThemeContext} from '../../../../@crema/utility/AppContextProvider/ThemeContextProvider';
import {setFilters} from '../../../../redux/actions';
import {AppState} from '../../../../redux/store';
import {searchRooms} from '../../../../models/room';
import AppGrid from '../../../../@crema/core/AppGrid';
import ListEmptyResult from '../../../../@crema/core/AppList/ListEmptyResult';
import {Room} from 'types/models/Room';
import {getRoomTypes} from 'models/room-type';
import {getLocations} from 'models/location';
import Button from '@mui/material/Button';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {useRouter} from 'next/router';
import {startRoom} from '../../../../models/room';
import items from 'pages/api/items';
import {useAuthUser} from '@crema/utility/AuthHooks';

interface RoomGridProps {
  room?: Room[];
  loading?: boolean;
  renderRow?: () => JSX.Element;
}
const RoomListing: React.FC<RoomGridProps> = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {theme} = useThemeContext();
  const [page, setPage] = useState<number>(0);
  const [isConfirmCalculateTime, setConfirmCalculateTime] = useState<boolean>(false);
  const [roomSelected, setRoomSelected] = useState<Room>();

  const {viewType, filterData} = useSelector<AppState, AppState['ecommerce']>(({ecommerce}) => ecommerce);
  const [roomStore, setRoomStore] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const initFilter = [{id: -1, name: 'All'}];
  const [roomTypes, setRoomTypes] = useState(initFilter);
  const [locations, setLocations] = useState(initFilter);
  const roomStatus = [
    ...initFilter,
    {
      id: 0,
      name: 'Ocupied',
    },
    {
      id: 1,
      name: 'Available',
    },
  ];

  const fetchRoom = async () => {
    const roomList = await searchRooms();
    setRoomList(roomList);
    setRoomStore(roomList);
  };
  const fetchRoomType = async () => {
    const roomTypes = await getRoomTypes();

    setRoomTypes([...initFilter, ...roomTypes]);
  };
  const fetchLocation = async () => {
    const locations = await getLocations();

    setLocations([...initFilter, ...locations]);
  };
  const filterRoom = async ({status, type, location}) => {
    const roomList = roomStore.filter(
      (room: any) =>
        (status === -1 || room?.availability === status) &&
        (location === -1 || room?.location === location) &&
        (type === -1 || room?.roomType === type),
    );
    setRoomList(roomList);
  };

  useEffect(() => {
    fetchRoom();
    fetchRoomType();
    fetchLocation();
  }, []);

  const openDialogConfirmCalculateTime = (room) => {
    setConfirmCalculateTime(true);
    setRoomSelected(room);
  };

  const {user} = useAuthUser();

  const createNewOrder = async () => {
    console.log(roomSelected);

    const userAuth = {
      userId: user.id,
      userRole: user.role,
    };
    try {
      const response = await startRoom(roomSelected?.id, userAuth);
      if (response.order?.status === 0) {
        router.push({
          pathname: `/karaoke/room/${roomSelected?.id}`,
          query: {
            orderId: response.order?.orderId,
          },
        });
      } else {
        router.push({
          pathname: `/karaoke/room/${roomSelected?.id}`,
          query: {
            orderId: response.order,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const list = roomList,
    total = roomList?.length;
  const {loading} = useSelector<AppState, AppState['common']>(({common}) => common);

  const onPageChange = (value: number) => {
    setPage(value);
  };

  const searchRoom = (title: string) => {
    dispatch(setFilters({...filterData, title}));
  };

  return (
    <>
      <AppsHeader>
        <RoomHeader
          // list={list}
          viewType={viewType}
          page={page}
          totalRooms={total}
          onPageChange={onPageChange}
          onSearch={searchRoom}
          roomTypes={roomTypes}
          locations={locations}
          status={roomStatus}
          filterRoom={filterRoom}
        />
      </AppsHeader>

      <AppsContent
        style={{
          backgroundColor: alpha(theme.palette.background.default, 0.6),
        }}
      >
        <Box
          sx={{
            width: '100%',
            flex: 1,
            display: 'flex',
            py: 2,
            px: 4,
            height: 1,
            '& > div': {
              width: '100%',
            },
          }}
        >
          <AppGrid
            // delay={200}
            responsive={{
              xs: 3,
              sm: 7,
              xl: 9,
            }}
            data={roomList}
            renderRow={(room) => (
              <Button
                sx={{
                  p: 1,
                  cursor: 'pointer',
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: 3,
                }}
                className='room-hover'
                onClick={() => openDialogConfirmCalculateTime(room)}
              >
                <Box
                  sx={{
                    pr: 2,
                    pl: 2,
                  }}
                >
                  <Box
                    sx={{
                      color: 'text.primary',
                      fontWeight: Fonts.BOLD,
                      fontSize: 16,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                    component='h3'
                  >
                    {room.name}
                  </Box>
                  <Box
                    component='p'
                    sx={{
                      color: 'text.secondary',
                      fontSize: 14,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {room.typeName}
                  </Box>
                  <Box
                    component='p'
                    sx={{
                      color: 'text.secondary',
                      fontSize: 14,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {room.availability === 0 ? <>Ocupied</> : <>Available</>}
                  </Box>
                </Box>
              </Button>
            )}
            ListEmptyComponent={<ListEmptyResult content='No product found' loading={loading} />}
          />
        </Box>
      </AppsContent>
      <DialogConfirmCalculateTime
        isConfirmCalculateTime={isConfirmCalculateTime}
        onConfirmCalculateTime={() => createNewOrder()}
        onCloseDialog={() => setConfirmCalculateTime(false)}
      />
    </>
  );
};

export default RoomListing;
