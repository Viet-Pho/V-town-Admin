import FormControl from '@mui/material/FormControl';
import {alpha, Box, Select} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {styled} from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import DatePicker from '@mui/lab/DatePicker';
import FormHelperText from '@mui/material/FormHelperText';
import {useDispatch} from 'react-redux';
import {useDropzone} from 'react-dropzone';
import React, {useState} from 'react';
import AppGridContainer from '../../../../@crema/core/AppGridContainer';
import AppCard from '../../../../@crema/core/AppCard';
import {useSelector} from 'react-redux';
import {Customers} from '../../../../types/models/dashboards/Customers';
import IsEmail from 'isemail';
import {
  fetchError,
  fetchStart,
  fetchSuccess,
  showMessage,
} from '../../../../redux/actions';
import {editCustomer, addNewCustomer} from '../../../../models/customers';
import EditCustomer from '../EditCustomer';
import HelperText from 'modules/muiComponents/lab/DatePicker/HelperText';

interface CustomersProps {
  customer: Customers;
  onClose: () => void;
  onCloseEditCustomer: () => void;
  onOpenEditCustomer?: () => void;
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
    isAddCustomerOpen,
    onCloseEditCustomer,
    isEditCustomerOpen,
    ...other
  } = props;
  const dispatch = useDispatch();

  const [customerData, setCustomerData] = React.useState(customer);

  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const validEmail = regex.test(customerData?.email);

  const [loading, setLoading] = useState(false);
  const handleAddCustomer = async () => {
    dispatch(fetchStart());
    try {
      const response: any = await addNewCustomer(customerData);
      if (response && validEmail) {
        if (refreshData !== null && setRefreshData !== null) {
          if (refreshData === true) {
            setRefreshData(false);
          }
          if (refreshData === false) {
            setRefreshData(true);
          }
        }
        dispatch(fetchSuccess());
        dispatch(
          showMessage(`Successfully Added Customer ${customerData.firstName}.`),
        );
      }
    } catch (error: any) {
      if (refreshData !== null && setRefreshData !== null) {
        if (refreshData === true) {
          setRefreshData(false);
        }
        if (refreshData === false) {
          setRefreshData(true);
        }
      }
      dispatch(fetchError(`${error?.response?.data?.message}`));
    }
  };
  const handleEditCustomer = async () => {
    dispatch(fetchStart());
    try {
      setLoading(true);
      const response: any = await editCustomer(customerData.id, customerData);
      if (response && validEmail) {
        if (refreshData !== null && setRefreshData !== null) {
          if (refreshData === true) {
            setRefreshData(false);
          }
          if (refreshData === false) {
            setRefreshData(true);
          }
        }
      }
      dispatch(fetchSuccess());
      dispatch(
        showMessage(
          `Successfully Edited Customer ${customerData.firstName} Information.`,
        ),
      );
    } catch (error: any) {
      if (refreshData !== null && setRefreshData !== null) {
        if (refreshData === true) {
          setRefreshData(false);
        }
        if (refreshData === false) {
          setRefreshData(true);
        }
      }
      dispatch(fetchError(`${error?.response?.data?.message}`));
    }
  };

  const file2Base64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onerror = (error) => reject(error);
      reader.onload = (event) => {
        setCustomerData((prevState) => {
          return {...prevState, avatar: event.target!.result};
        });
      };
    });
  };
  const [avatarError, setAvatarError] = React.useState('');
  const {getRootProps, getInputProps} = useDropzone({
    accept: ['image/jpeg', 'image/png', 'image/jpg'],
    maxSize: 4000000,
    onDrop: async (acceptedFiles, fileRejections) => {
      fileRejections.forEach((file) => {
        file.errors.forEach((err) => {
          if (err.code === 'file-too-large') {
            console.log(`${err.message}`);
            setAvatarError('File is larger than 4MB');
          }
          if (err.code === 'file-invalid-type') {
            setAvatarError(`${err.message}`);
            console.log(`${err.message}`);
          }
        });
      });
      if (fileRejections.length === 0) {
        setAvatarError('');
        const avatar = await file2Base64(acceptedFiles[0]);
        setCustomerData({...customerData, avatar});
      }
    },
  });
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

  return (
    <AppCard className='card-hover'>
      <HeaderWrapper>
        <input
          {...getInputProps()}
          accept='image/jpeg,image/png,image/gif,image/jpg,application/pdf'
        />
        <label htmlFor='icon-button-file'>
          <AvatarViewWrapper {...getRootProps({className: 'dropzone'})}>
            <Avatar
              sx={{
                width: 60,
                height: 60,
              }}
              src={customerData.avatar ? customerData.avatar : ''}
              alt='user Image'
            />
            <Box className='edit-icon'>
              <EditIcon />
            </Box>
          </AvatarViewWrapper>
        </label>
        <FormControl sx={{m: 3}}>
          {<FormHelperText error>{avatarError}</FormHelperText>}
        </FormControl>
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
        <Grid item xs={12} md={6} lg={6}>
          <FormControl fullWidth sx={{m: 1}}>
            <TextField
              error={!customerData.firstName}
              onChange={handleChangeFirstName}
              id='first_name'
              label='First Name'
              value={customerData?.firstName}
              InputProps={{
                readOnly: isCustomerInfoOpen,
              }}
              required
            />
            {!customerData?.firstName ? (
              <FormHelperText error>First Name Can Not Be Blank</FormHelperText>
            ) : (
              <></>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl fullWidth sx={{m: 1}}>
            <TextField
              id='last_name'
              label='Last Name'
              value={customerData?.lastName}
              onChange={handleChangeLastName}
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
              error={!customerData.age}
              id='age'
              label='age'
              value={customerData?.age}
              onChange={handleChangeAge}
              InputProps={{
                readOnly: isCustomerInfoOpen,
              }}
            />
            {!customerData?.age ? (
              <FormHelperText error> Age Can Not Be Blank</FormHelperText>
            ) : (
              <></>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl fullWidth sx={{m: 1}}>
            <TextField
              error={!customerData.phoneNumber}
              id='phone_number'
              label='Phone Number'
              value={customerData?.phoneNumber}
              onChange={handleChangePhone}
              InputProps={{
                readOnly: isCustomerInfoOpen,
              }}
              required
            />
            {!customerData?.phoneNumber ? (
              <FormHelperText error>
                Phone Number Can Not Be Blank
              </FormHelperText>
            ) : (
              <></>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl fullWidth sx={{m: 1}}>
            <TextField
              error={!validEmail && !customerData?.email}
              id='email'
              label='Email'
              value={customerData?.email}
              onChange={handleChangeEmail}
              InputProps={{
                readOnly: isCustomerInfoOpen,
              }}
              required
            />
            {customerData?.email && !validEmail && (
              <FormHelperText error>Invalid Email</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          <FormControl fullWidth sx={{m: 1}}>
            <TextField
              error={!customerData?.address}
              id='address'
              label='Address'
              value={customerData?.address}
              onChange={handleChangeAddress}
              InputProps={{
                readOnly: isCustomerInfoOpen,
              }}
              required
            />
            {!customerData?.address ? (
              <FormHelperText error> Address Can Not Be Blank</FormHelperText>
            ) : (
              <></>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl fullWidth sx={{m: 1}}>
            <TextField
              error={!customerData?.cardId}
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
            {!customerData?.cardId ? (
              <FormHelperText error> Card Id Can Not Be Blank</FormHelperText>
            ) : (
              <></>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl fullWidth sx={{m: 1}}>
            <TextField
              id='points'
              label='Point'
              // value={customerData?.point}
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
              onClick={handleEditCustomer}
              disabled={loading}
            >
              Edit
            </Button>
            <EditCustomer
              customer={customer}
              isAddCustomerOpen={isAddCustomerOpen}
              isCustomerInfoOpen={isCustomerInfoOpen}
              isEditCustomerOpen={isEditCustomerOpen}
              onCloseEditCustomer={onCloseEditCustomer}
            />
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
