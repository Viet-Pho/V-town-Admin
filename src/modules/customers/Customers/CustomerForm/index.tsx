import FormControl from '@mui/material/FormControl';
import {alpha, Box, Select} from '@mui/material';
import {useSelector} from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import Divider from '@mui/material/Divider';
import {useDropzone} from 'react-dropzone';
import Avatar from '@mui/material/Avatar';
import AppCard from '@crema/core/AppCard';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AppGridContainer from '@crema/core/AppGridContainer';
import Grid from '@mui/material/Grid';
import {styled} from '@mui/material/styles';
import React, {useState, useRef} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import MenuItem from '@mui/material/MenuItem';
import {Fonts} from 'shared/constants/AppEnums';
import {AppState} from '../../../../redux/store';
import Alert from '@mui/material/Alert';
import DatePicker from '@mui/lab/DatePicker';
import {Customers} from '../../../../types/models/dashboards/Customers';
import * as yup from 'yup';
import {
  getCustomerInfoById,
  editCustomer,
  addNewCustomer,
} from '../../../../models/customers';

interface CustomersProps {
  customer?: any;
  onClose: () => void;
  refreshData?: any;
  setRefreshData?: any;
  isCustomerInfoOpen: boolean;
  isEditCustomerOpen: boolean;
  isAddCustomerOpen: boolean;
}
const HeaderWrapper = styled('div')(({theme}) => {
  return {
    padding: 20,
    marginLeft: -24,
    marginRight: -24,
    marginTop: -20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.divider}`,
    '& .dropzone': {
      outline: 0,
      '&:hover .edit-icon, &:focus .edit-icon': {
        display: 'flex',
      },
    },
  };
});
const StyledDivider = styled(Divider)(({theme}) => ({
  marginTop: 20,
  marginBottom: 20,
  [theme.breakpoints.up('xl')]: {
    marginTop: 32,
    marginBottom: 32,
  },
}));

const AvatarViewWrapper = styled('div')(({theme}) => {
  return {
    position: 'relative',
    cursor: 'pointer',
    '& .edit-icon': {
      position: 'absolute',
      bottom: 0,
      right: 0,
      zIndex: 1,
      border: `solid 2px ${theme.palette.background.paper}`,
      backgroundColor: alpha(theme.palette.primary.main, 0.7),
      color: theme.palette.primary.contrastText,
      borderRadius: '50%',
      width: 26,
      height: 26,
      display: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.4s ease',
      '& .MuiSvgIcon-root': {
        fontSize: 16,
      },
    },
  };
});

const CustomerForm: React.FC<CustomersProps> = (props) => {
  const {
    customer,
    onClose,
    refreshData,
    setRefreshData,
    isCustomerInfoOpen,
    isEditCustomerOpen,
    isAddCustomerOpen,
    ...other
  } = props;
  console.log(customer);

  const [customerData, setCustomerData] = React.useState(customer);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const pid = 1;
  const [loading, setLoading] = useState(false);
  const handleAddCustomer = async () => {
    try {
      setLoading(true);
      const response: any = await addNewCustomer(customerData);
      if (response) {
        // in need of a toast - to be continue
        console.log('edit', pid);
        if (refreshData !== null && setRefreshData !== null) {
          if (refreshData === true) {
            setRefreshData(false);
          }
          if (refreshData === false) {
            setRefreshData(true);
          }
        }
        setLoading(false);
        setShowSuccessAlert(true);
      }
    } catch (error) {
      // in need of a toast
      console.log(error);
      if (refreshData !== null && setRefreshData !== null) {
        if (refreshData === true) {
          setRefreshData(false);
        }
        if (refreshData === false) {
          setRefreshData(true);
        }
      }
      setLoading(false);
      setShowSuccessAlert(false);
    }
  };
  const handleEditCustomer = async () => {
    try {
      setLoading(true);
      const response: any = await editCustomer(pid, customerData);
      if (response) {
        // in need of a toast - to be continue
        console.log('edit', pid);
        if (refreshData !== null && setRefreshData !== null) {
          if (refreshData === true) {
            setRefreshData(false);
          }
          if (refreshData === false) {
            setRefreshData(true);
          }
        }
        setLoading(false);
        setShowSuccessAlert(true);
      }
    } catch (error) {
      // in need of a toast
      console.log(error);
      if (refreshData !== null && setRefreshData !== null) {
        if (refreshData === true) {
          setRefreshData(false);
        }
        if (refreshData === false) {
          setRefreshData(true);
        }
      }
      setLoading(false);
      setShowSuccessAlert(false);
    }
  };

  const [avatar, setAvatar] = useState('');

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setAvatar(URL.createObjectURL(acceptedFiles[0]));
      console.log('drop1', acceptedFiles[0]);
    },
  });

  const handleChangeAvatar = (event) => {
    setCustomerData((prevState) => {
      return {...prevState, avatar: event.target.value};
    });
  };
  const handleChangeGender = (event) => {
    setCustomerData((prevState) => {
      return {...prevState, gender: event.target.value};
    });
  };

  const handleChangeFirstName = (event) => {
    setCustomerData((prevState) => {
      return {...prevState, firstName: event.target.value};
    });
  };

  const handleChangeLastName = (event) => {
    setCustomerData((prevState) => {
      return {...prevState, lastName: event.target.value};
    });
  };
  const handleChangeEmail = (event) => {
    setCustomerData((prevState) => {
      return {...prevState, email: event.target.value};
    });
  };
  const handleChangePhone = (event) => {
    setCustomerData((prevState) => {
      return {...prevState, phoneNumber: event.target.value};
    });
  };
  const handleChangeAddress = (event) => {
    setCustomerData((prevState) => {
      return {...prevState, address: event.target.value};
    });
  };
  const handleChangeCardId = (event) => {
    setCustomerData((prevState) => {
      return {...prevState, cardId: event.target.value};
    });
  };
  const handleChangeAge = (event) => {
    setCustomerData((prevState) => {
      return {...prevState, age: event.target.value};
    });
  };

  console.log('changes', customerData);
  return (
    <AppCard className='card-hover'>
      <HeaderWrapper>
        <div {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} />
          <label htmlFor='icon-button-file'>
            <AvatarViewWrapper>
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                }}
                src={avatar ? avatar : ''}
                alt='user Image'
              />
              <Box className='edit-icon'>
                <EditIcon />
              </Box>
            </AvatarViewWrapper>
          </label>
        </div>
      </HeaderWrapper>

      <AppGridContainer spacing={5}>
        <Grid item xs={12} md={6}>
          <FormControl
            variant='outlined'
            sx={{
              width: '100%',
            }}
          ></FormControl>
        </Grid>
      </AppGridContainer>

      <AppGridContainer>
        {showSuccessAlert && (
          <Grid item xs={12} md={12} lg={12}>
            <Alert variant='filled' severity='success'>
              Thêm Khách Hàng ${customer.firstName} Thành Công.
            </Alert>
          </Grid>
        )}

        <Grid item xs={12} md={6} lg={6}>
          <FormControl fullWidth sx={{m: 1}}>
            <TextField
              onChange={handleChangeFirstName}
              id='first_name'
              label='First Name'
              value={customerData?.firstName}
              InputProps={{
                readOnly: isCustomerInfoOpen,
              }}
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl fullWidth sx={{m: 1}}>
            <TextField
              id='customer_code'
              label='Last Name'
              value={customerData?.lastName}
              onChange={handleChangeLastName}
              InputProps={{
                readOnly: isCustomerInfoOpen,
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl fullWidth sx={{m: 1}}>
            <TextField
              id='phone_number'
              label='Phone Number'
              value={customerData?.phoneNumber}
              onChange={handleChangePhone}
              InputProps={{
                readOnly: isCustomerInfoOpen,
              }}
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl fullWidth sx={{m: 1}}>
            <TextField
              id='email'
              label='Email'
              value={customerData?.email}
              onChange={handleChangeEmail}
              InputProps={{
                readOnly: isCustomerInfoOpen,
              }}
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <FormControl fullWidth sx={{m: 1}}>
            <DatePicker
              label='Birthday'
              value={customerData?.birthday}
              InputProps={{
                readOnly: isCustomerInfoOpen,
              }}
              onChange={(newValue) => {
                setCustomerData((prevState) => {
                  return {...prevState, birthday: newValue};
                });
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <FormControl fullWidth sx={{m: 1}}>
            <InputLabel id='gender-label'>Gender</InputLabel>
            <Select
              labelId='gender'
              id='gender'
              value={customerData?.gender}
              label='gender'
              onChange={handleChangeGender}
              inputProps={{
                readOnly: isCustomerInfoOpen,
              }}
              required
            >
              <MenuItem value={0}>Male</MenuItem>
              <MenuItem value={1}>Female</MenuItem>
              <MenuItem value={2}>Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <FormControl fullWidth sx={{m: 1}}>
            <TextField
              id='age'
              label='age'
              value={customerData?.age}
              onChange={handleChangeAge}
              InputProps={{
                readOnly: isCustomerInfoOpen,
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <FormControl fullWidth sx={{m: 1}}>
            <TextField
              id='address'
              label='Address'
              value={customerData?.address}
              onChange={handleChangeAddress}
              InputProps={{
                readOnly: isCustomerInfoOpen,
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl fullWidth sx={{m: 1}}>
            <TextField
              id='card_id'
              autoFocus
              label='Card Number'
              value={customerData?.cardId}
              onChange={handleChangeCardId}
              InputProps={{
                readOnly: isCustomerInfoOpen,
              }}
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl fullWidth sx={{m: 1}}>
            <TextField
              id='points'
              label='Point'
              value={customerData?.point}
              // onChange={handleChangePoint}
              InputProps={{
                readOnly: isCustomerInfoOpen,
              }}
            />
          </FormControl>
        </Grid>
        {isCustomerInfoOpen && (
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            style={{
              textAlign: 'right',
            }}
          >
            <StyledDivider />
            <Button
              sx={{width: 1 / 7}}
              color='primary'
              variant='outlined'
              onClick={() => handleEditCustomer()}
              disabled={loading}
            >
              Edit
            </Button>
          </Grid>
        )}
        {isEditCustomerOpen && (
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            style={{
              textAlign: 'right',
            }}
          >
            <StyledDivider />
            <Button
              sx={{width: 1 / 7}}
              color='primary'
              variant='outlined'
              onClick={() => handleEditCustomer()}
              disabled={loading}
            >
              Save
            </Button>
          </Grid>
        )}
        {isAddCustomerOpen && (
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            style={{
              textAlign: 'right',
            }}
          >
            <StyledDivider />
            <Button
              sx={{width: 1 / 7}}
              color='primary'
              variant='outlined'
              onClick={() => handleAddCustomer()}
              disabled={loading}
            >
              Add
            </Button>
          </Grid>
        )}
      </AppGridContainer>
    </AppCard>
  );
};

export default CustomerForm;
