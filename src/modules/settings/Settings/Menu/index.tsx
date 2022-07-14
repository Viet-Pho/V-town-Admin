// @ts-nocheck
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  fetchError,
  fetchStart,
  fetchSuccess,
  showMessage,
} from '../../../../redux/actions';
// import TableHeading from './TableHeading';
import {Item} from '../../../types/models/Items';
// import ItemHeader from './ItemsHeader';
// import {searchItems} from '../../../../models/item';
import {fetchItems} from '../../../../models/items';
import AddNewCustomer from './AddNewCustomer';

// MUI
import Button from '@mui/material/Button';
import {alpha, Box} from '@mui/material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

// Crema
import AppInfoView from '../../../../@crema/core/AppInfoView';
import AppsHeader from '@crema/core/AppsContainer/AppsHeader';
import AppGrid from '@crema/core/AppGrid';

interface ItemGridProps {
  items: Item[];
  loading: boolean;
  renderRow: () => JSX.Element;
  data: Item;
  isEditCustomerOpen: boolean;
  onCloseEditCustomer: () => void;
  isCustomerInfoOpen: boolean;
  onCloseCustomerInfo: () => void;
  isAddCustomerOpen: boolean;
  onCloseAddCustomer: () => void;
}

const Menu: React.FC<any> = (props) => {
  const {isEditCustomerOpen, isCustomerInfoOpen} = props;
  const dispatch = useDispatch();

  // console.log('router', router.query);

  const [menu, setMenu] = useState([]);

  const fetchItem = async () => {
    dispatch(fetchStart());
    try {
      const menu = await fetchItems();
      setMenu(menu);

      dispatch(fetchSuccess());
    } catch (e: any) {
      dispatch(fetchError(`${e?.response?.data?.message}`));
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);

  const [isAddCustomerOpen, setAddCustomerOpen] = React.useState(false);

  const onOpenAddCustomer = () => {
    setAddCustomerOpen(true);
  };
  const onCloseAddCustomer = () => {
    setAddCustomerOpen(false);
  };

  return (
    <>
      <AppsHeader>
        <Button variant='contained' color='primary' onClick={onOpenAddCustomer}>
          Add Item
        </Button>
        <br></br>
      </AppsHeader>
      <br></br>
      <Box
        sx={{
          width: '100%',
          flex: 1,
          // display: 'flex',
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
            xs: 4,
            sm: 5,
            xl: 6,
          }}
          data={menu}
          renderRow={(item) => (
            <Card
              sx={{
                // p: 1,
                cursor: 'pointer',
                minHeight: 200,
                display: 'flex',
                flexDirection: 'column',
              }}
              className='item-hover'
              onClick={() => onEditItem(item)}
            >
              <Card
                sx={{
                  mb: 1,
                }}
              >
                {item.wallpaper ? (
                  <img src={item.wallpaper} alt={item.name} />
                ) : (
                  <></>
                )}
                {/* <img src={item.wallpaper} alt={item.name} /> */}
                <Box
                  sx={{
                    mt: -3,
                  }}
                ></Box>
              </Card>
              <Box
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  mr: 2,
                  ml: 2,
                  mb: 2,
                }}
              >
                <Typography align='center'>{item.name}</Typography>
              </Box>
            </Card>
          )}
        />
      </Box>
      <AddNewCustomer
        isCustomerInfoOpen={isCustomerInfoOpen}
        isEditCustomerOpen={isEditCustomerOpen}
        isAddCustomerOpen={isAddCustomerOpen}
        onCloseAddCustomer={onCloseAddCustomer}
      />
      <AppInfoView />
    </>
  );
};

export default Menu;
