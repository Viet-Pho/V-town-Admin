import React, {useState, FC} from 'react';

import {useIntl} from 'react-intl';

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

import {addTables} from 'models/tables';

interface addTableModalProps {
  onClose: () => void;
  onOpen: () => void;
  fetchTable: () => void;
  pid: string;
}
import {fetchError, fetchStart, fetchSuccess, showMessage} from 'redux/actions';
import {useDispatch} from 'react-redux';

const AddTableModal: FC<addTableModalProps> = (props) => {
  const {onClose, onOpen, fetchTable, pid} = props;

  const dispatch = useDispatch();

  const [nameString, setNameString] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameString(event.target.value);
  };
  const [loading, setLoading] = useState(false);

  const handleAddNewTable = async () => {
    const requestBody = {
      name: nameString,
      position_x: '60',
      position_y: '0',
    };
    try {
      setLoading(true);
      dispatch(fetchStart());
      const response: any = await addTables(pid, requestBody);

      if (response) {
        console.log('add response', response);
        dispatch(fetchSuccess());
        dispatch(showMessage(`Success`));

        fetchTable();
        setLoading(false);
        onClose();
      }
    } catch (error: any) {
      dispatch(fetchError(`Error: ${error?.response?.data?.message}`));
      setLoading(false);
      onClose();
    }
  };
  return (
    <Box>
      <Card>
        <CardHeader title='Add new Table'>
          <Box>
            <Button>x</Button>
          </Box>
        </CardHeader>
        <Divider />
        <CardContent>
          <Box>
            <TextField
              id='outlined-textarea'
              label='Table Name'
              fullWidth
              value={nameString}
              onChange={handleChange}
            />
          </Box>
          <Box sx={{mt: 2}} style={{textAlign: 'right'}}>
            <Button
              disabled={loading}
              variant='contained'
              onClick={() => handleAddNewTable()}
            >
              Add
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddTableModal;
