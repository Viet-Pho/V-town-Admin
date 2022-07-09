// @ts-nocheck
import React, {useEffect, useState} from 'react';
import BillTable from './BillTable';
import AppsContainer from '@crema/core/AppsContainer';
import {useIntl} from 'react-intl';
import {useDispatch, useSelector} from 'react-redux';
import {searchBill} from 'models/bill';
import {Button, Hidden, CircularProgress} from '@mui/material';
import AppsHeader from '@crema/core/AppsContainer/AppsHeader';
import AppsContent from '@crema/core/AppsContainer/AppsContent';
import AppsPagination from '@crema/core/AppsPagination';
import Box from '@mui/material/Box';
import AppInfoView from '@crema/core/AppInfoView';
import AppSearchBar from '@crema/core/AppSearchBar';



const Bill: React.FC<any> = (props) => {
  const {messages} = useIntl();
  const [bills, setBills] = useState([
    {
      id: '',
      billingObject: '',
      orderId: '',
      customerName: '',
      customerId: '',
      serviceTip: '',
      tax: '',
      discount: '',
      pointEarned: '',
      pointUsed: '',
      staffName: '',
      staffId: '',
      totalPrice: '',
      note: '',
      status: '',
    },
  ]);
  const [billCount, setBillCount] = useState(1);
  const [page, setPage] = useState(0);
  const [search, setSearchQuery] = useState<string>('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    console.log('Change', event.target.value);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onPageChange = (
    event: React.ChangeEvent<unknown> | null,
    value: number,
  ) => {
    setPage(value);
  };

  const [loadingData, setLoadingData] = useState(false);

  const fetchBill = async () => {
    setLoadingData(true);
    const {total, bills} = await searchBill({
      searchText: search,
      page: page + 1,
      limit: rowsPerPage,
    });

    setBills(bills);
    setBillCount(total);
    setLoadingData(false);
  };
  useEffect(() => {
    fetchBill();
  }, [page, rowsPerPage]);

  const handleSearchBill = (event) => {
    if (event.key !== 'Enter') return;
    setPage(0);
    fetchBill();
  };

  // const onSearchBill = (value: string) => {
  //   setSearchQuery(value);
  //   setPage(0);
  // };

  return (
    <>
      <AppsContainer
        title={messages['sidebar.ecommerce.bills'] as string}
        fullView
      >
        <AppsHeader>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: 1,
            }}
          >
            <AppSearchBar
              iconPosition='right'
              overlap={false}
              onKeyDown={handleSearchBill}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={messages['common.searchHere'] as string}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                ml: 'auto',
              }}
            >
              <Hidden smDown>
                <AppsPagination
                  rowsPerPage={rowsPerPage}
                  count={billCount}
                  page={page}
                  onPageChange={onPageChange}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Hidden>
            </Box>
          </Box>
        </AppsHeader>

        <AppsContent>
          {loadingData ? (
            <>
              <Box style={{textAlign: 'center'}} sx={{mt: 4}}>
                <CircularProgress />
              </Box>
            </>
          ) : (
            <BillTable fetchBill={fetchBill} bills={bills} />
          )}
          <Hidden smUp>
            <AppsPagination
              rowsPerPage={rowsPerPage}
              count={billCount}
              page={page}
              onPageChange={onPageChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Hidden>
        </AppsContent>
      </AppsContainer>
      <AppInfoView />
    </>
  );
};

export default Bill;
