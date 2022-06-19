import React, {useEffect, useState} from 'react';
import {fetchAllLocation, addLocation} from 'models/tables';
import {useAuthUser} from '@crema/utility/AuthHooks';
import AppsContent from '@crema/core/AppsContainer/AppsContent';
import AppsHeader from '../../../../@crema/core/AppsContainer/AppsHeader';
import ListEmptyResult from '@crema/core/AppList/ListEmptyResult';
import {AppGrid} from '@crema';
import {
  alpha,
  Box,
  Hidden,
  Button,
  CircularProgress,
  Modal,
} from '@mui/material';
import {useThemeContext} from '../../../../@crema/utility/AppContextProvider/ThemeContextProvider';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {any} from 'prop-types';
import AddLocationModal from '../addLocationModal';
import {useRouter} from 'next/router';

const TableList = () => {
  const [locations, setLocations] = useState(null as any);
  const [loading, setLoading] = useState(false);
  const {theme} = useThemeContext();
  const router = useRouter();
  const fetchAllLocations = async () => {
    setLoading(true);

    const locationData: any = await fetchAllLocation();

    setLocations(locationData as any);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllLocations();
  }, []);

  // Add location modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {loading ? (
        <Box style={{textAlign: 'center'}}>
          {' '}
          <CircularProgress />
        </Box>
      ) : (
        <>
          <AppsHeader>
            <Box
              sx={{
                display: 'flex',
                flex: 1,
                alignItems: 'center',
              }}
            ></Box>
            <Box style={{textAlign: 'right'}}>
              <Button onClick={() => handleOpen()} variant='contained'>
                + Add Location
              </Button>
            </Box>
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
                data={locations?.locations}
                renderRow={(locations) => (
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
                    className='location-hover'
                    onClick={() => router.push(`locations/${locations.id}`)}
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
                        {locations.location}
                      </Box>
                    </Box>
                  </Button>
                )}
                ListEmptyComponent={
                  <ListEmptyResult content='No Tables' loading={loading} />
                }
              />
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
              >
                <AddLocationModal
                  onClose={handleClose}
                  onOpen={handleOpen}
                  fetchLocation={fetchAllLocations}
                />
              </Modal>
            </Box>
          </AppsContent>
        </>
      )}
    </>
  );
};

export default TableList;
