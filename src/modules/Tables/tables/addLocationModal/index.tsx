import React, {useState, FC} from 'react';

import {useIntl} from 'react-intl';

import AppCard from '@crema/core/AppCard';

import {render} from 'react-dom';
import {
  alpha,
  Box,
  Hidden,
  Button,
  CircularProgress,
  Card,
  CardHeader,
  CardContent,
  Divider,
  TextField,
} from '@mui/material';

import {addLocation} from 'models/tables';

interface AddLocationModalProps {
  onClose: () => void;
  onOpen: () => void;
  fetchLocation: () => void;
}
import {fetchError, fetchStart, fetchSuccess, showMessage} from 'redux/actions';
import {useDispatch} from 'react-redux';

const AddLocationModal: FC<AddLocationModalProps> = (props) => {
  const {onClose, onOpen, fetchLocation} = props;
  const {messages} = useIntl();
  const dispatch = useDispatch();

  const [locationString, setLocationString] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocationString(event.target.value);
  };
  const [loading, setLoading] = useState(false);

  const handleAddNewLocation = async () => {
    const requestBody = {
      location: locationString,
    };
    try {
      setLoading(true);
      dispatch(fetchStart());
      const response: any = await addLocation(requestBody);

      if (response) {
        console.log('add response', response);
        dispatch(fetchSuccess());
        dispatch(showMessage(`Success`));

        fetchLocation();
        setLoading(false);
        onClose();
      }
    } catch (error: any) {
      dispatch(fetchError(`Error: ${error?.response?.data?.message}`));
      setLoading(false);
    }
  };
  return (
    <Box>
      <Card>
        <CardHeader title='Add a Location'>
          <Box>
            <Button>x</Button>
          </Box>
        </CardHeader>
        <Divider />
        <CardContent>
          <Box>
            <TextField
              id='outlined-textarea'
              label='Location Name'
              fullWidth
              value={locationString}
              onChange={handleChange}
            />
          </Box>
          <Box sx={{mt: 2}} style={{textAlign: 'right'}}>
            <Button
              disabled={loading}
              variant='contained'
              onClick={() => handleAddNewLocation()}
            >
              Add
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddLocationModal;
