import React, {useEffect, useState} from 'react';

import {useIntl} from 'react-intl';
import AppsContainer from '../../../@crema/core/AppsContainer';
import AppCard from '@crema/core/AppCard';

import {render} from 'react-dom';
import {
  getTablesOnLocationId,
  changeAvailability,
  deleteTable,
  changePosition,
  clearAllTables,
} from 'models/tables';
import {useRouter} from 'next/router';
import {useDispatch} from 'react-redux';
import AddTableModal from './AddTableModal';
import {AppConfirmDialog} from '@crema';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {
  alpha,
  Box,
  Hidden,
  Button,
  CircularProgress,
  Modal,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Divider,
} from '@mui/material';
import {fetchError, fetchStart, fetchSuccess, showMessage} from 'redux/actions';
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time
import AppsHeader from '@crema/core/AppsContainer/AppsHeader';
const TableDetail = () => {
  const {messages} = useIntl();
  const router = useRouter();

  const dispatch = useDispatch();

  const locationId = router.query.pid;

  const [tableData, setTableData] = useState(null as any);

  const [loading, setLoading] = useState(false);
  const fetchTablesData = async () => {
    setLoading(true);
    try {
      const fetchData = await getTablesOnLocationId(locationId);

      if (fetchData) {
        setLoading(false);
        setTableData(fetchData);
      }
    } catch (error: any) {
      dispatch(fetchError(`${error?.response?.data?.message}`));
      setLoading(false);
    }
  };

  // handle tracking position_x and position_y
  const [deltaPosition, setDeltaPosition] = useState({x: 0, y: 0});
  const handleStopDragging = (e, ui) => {
    setDeltaPosition({
      x: ui.x,
      y: ui.y,
    });
  };

  const handleClickDrag = async (v) => {
    const requestBody = {
      id: v?.id,
      position_x: deltaPosition.x.toString(),
      position_y: deltaPosition.y.toString(),
      name: v?.name,
      availability: v?.availability,
    };

    try {
      dispatch(fetchStart());
      const response: any = await changePosition(locationId, requestBody);

      if (response) {
        dispatch(fetchSuccess());
        dispatch(showMessage(`Success`));

        setDeltaPosition({
          x: 0,
          y: 0,
        });
      }
    } catch (error: any) {
      dispatch(fetchError(`Error: ${error?.response?.data?.message}`));
      setDeltaPosition({
        x: 0,
        y: 0,
      });
    }
  };

  useEffect(() => {
    fetchTablesData();
  }, []);

  // handle Change Availability
  const handleChangeAvailability = async (value) => {
    const requestBody = {
      id: value?.id,
      position_x: value?.position_x,
      position_y: value?.position_y,
      name: value?.name,
      availability: value?.availability === 0 ? 1 : 0,
    };

    try {
      dispatch(fetchStart());
      const response: any = await changeAvailability(locationId, requestBody);

      if (response) {
        dispatch(fetchSuccess());
        dispatch(showMessage(`Success`));

        fetchTablesData();
      }
    } catch (error: any) {
      dispatch(fetchError(`Error: ${error?.response?.data?.message}`));
    }
  };

  // handle delete Table
  const [deleteId, setDeleteId] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const handleDeleteTable = (tableId) => {
    setDeleteId(tableId);
    setOpenDeleteDialog(true);
  };

  const onConfirmDelete = async () => {
    try {
      dispatch(fetchStart());
      const response: any = await deleteTable(locationId, deleteId);

      if (response) {
        dispatch(fetchSuccess());
        dispatch(showMessage(`Success`));
        fetchTablesData();
        setOpenDeleteDialog(false);
        setDeleteId('');
      }
    } catch (error: any) {
      dispatch(fetchError(`Error: ${error?.response?.data?.message}`));
      setOpenDeleteDialog(false);
      setDeleteId('');
    }
  };

  // clear all Tables
  const [openClearDialog, setOpenClearDialog] = useState(false);
  const handleClearTable = () => {
    setOpenClearDialog(true);
  };

  const onConfirmClearTable = async () => {
    try {
      dispatch(fetchStart());
      const response: any = await clearAllTables(locationId);

      if (response) {
        dispatch(fetchSuccess());
        dispatch(showMessage(`Success`));
        fetchTablesData();
        setOpenClearDialog(false);
      }
    } catch (error: any) {
      dispatch(fetchError(`Error: ${error?.response?.data?.message}`));
      setOpenClearDialog(false);
    }
  };

  //  Add Table modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <AppCard
      title='Table Menu Detail'
      // sidebarContent={<ProductsSidebar />}
    >
      {loading ? (
        <Box style={{textAlign: 'center'}}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box>
            <Typography>
              **note: Red means table is booked and Green means table is
              available
            </Typography>
            <Button
              onClick={() => router.push('/table/locations')}
              sx={{mt: 2}}
              startIcon={<ArrowBackIosIcon />}
            >
              Go Back
            </Button>
          </Box>
          <AppsHeader>
            <Box
              sx={{
                display: 'flex',
                flex: 1,
                alignItems: 'center',
              }}
            ></Box>

            <Box style={{textAlign: 'right'}}>
              <Button onClick={() => handleOpen()}>
                + Add Table to this Location
              </Button>
            </Box>
            <Box
              onClick={() => handleClearTable()}
              style={{textAlign: 'right'}}
            >
              <Button color='warning'> Clear all tables</Button>
            </Box>
          </AppsHeader>
          <div
            className='box'
            style={{
              height: '1000px',
              width: 'auto',
              overflowY: 'scroll',
              overflow: 'scroll',
              position: 'relative',
              padding: '0',
            }}
          >
            {tableData &&
              tableData?.tables.map((v) => {
                return (
                  <Draggable
                    key={v?.id}
                    handle='.handle'
                    defaultPosition={{
                      x: parseInt(v?.position_x),
                      y: parseInt(v?.position_y),
                    }}
                    scale={1}
                    onStop={handleStopDragging}
                  >
                    <div className='box'>
                      <Card style={{width: '20%'}}>
                        <CardContent
                          sx={{
                            backgroundColor:
                              v?.availability === 0 ? 'red' : 'green',
                          }}
                        >
                          <div style={{textAlign: 'center'}}>
                            <Button
                              className='handle'
                              style={{
                                textAlign: 'center',
                                color: 'white',
                              }}
                              onClick={() => handleClickDrag(v)}
                            >
                              {' '}
                              Click to drag change position
                            </Button>
                          </div>

                          <div style={{textAlign: 'center'}}>
                            <Button
                              variant='contained'
                              onClick={() => handleChangeAvailability(v)}
                            >
                              Change Availability
                            </Button>
                          </div>

                          <div style={{textAlign: 'center'}}>
                            <Button
                              sx={{mt: 2}}
                              variant='contained'
                              color='warning'
                              onClick={() => handleDeleteTable(v?.id)}
                            >
                              Delete Table
                            </Button>
                          </div>
                          <br />
                          <div>
                            <Typography
                              color='white'
                              sx={{textAlign: 'center'}}
                            >
                              {tableData?.locationName[0]?.location}
                            </Typography>
                          </div>
                          <br />
                          <Divider style={{backgroundColor: 'white'}} />
                          <div>
                            <br />
                            <Typography
                              color='white'
                              sx={{textAlign: 'center'}}
                            >
                              {v?.name}
                            </Typography>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </Draggable>
                );
              })}

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <AddTableModal
                fetchTable={fetchTablesData}
                onClose={handleClose}
                onOpen={handleOpen}
                pid={locationId as string}
              />
            </Modal>
            <AppConfirmDialog
              open={openDeleteDialog}
              onDeny={setOpenDeleteDialog}
              onConfirm={onConfirmDelete}
              dialogTitle={'Delete this Table'}
              title={'Are you sure you want to delete this table?'}
            />
            <AppConfirmDialog
              open={openClearDialog}
              onDeny={setOpenClearDialog}
              onConfirm={onConfirmClearTable}
              dialogTitle={'Clear All Table'}
              title={
                'You are about to force clear all tables in this location. Are you sure?'
              }
            />
          </div>
        </>
      )}
    </AppCard>
  );
};

export default TableDetail;
