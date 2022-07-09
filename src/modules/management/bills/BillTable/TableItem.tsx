// @ts-nocheck

import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import {styled} from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditBill from '../EditBill';
import BillInfo from '../BillInfo';
import {deleteBill, getBill} from 'models/bill';
import {disableCard} from 'models/card';
import {fetchError, fetchStart, fetchSuccess, showMessage} from 'redux/actions';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import AppConfirmDialog from '@crema/core/AppConfirmDialog';
import {objectBillings, status} from 'constants/bill';

type Bill = {
  id: number;
  billingObject: number;
  orderId: number;
  customerName: string;
  staffName: string;
  totalPrice: number;
  discount: number;
  note: string;
  status: number;
};

const StyledTableCell = styled(TableCell)(() => ({
  fontSize: 14,
  padding: 8,
  '&:first-of-type': {
    paddingLeft: 20,
  },
  '&:last-of-type': {
    paddingRight: 20,
  },
}));

interface TableItemProps {
  data: Bill;
  bill: Bill;
  isEditBillOpen: boolean;
  onCloseEditBill: () => void;
  isBillInfoOpen: boolean;
  onCloseBillInfo: () => void;
  fetchBill: () => void;
  isAddBillOpen: boolean;
  pid: number;
}

const TableItem: React.FC<TableItemProps> = ({bill, fetchBill}) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [isEditBillOpen, setEditBillOpen] = React.useState(false);

  const onOpenEditBill = async () => {
    await getBillDetail();
    setEditBillOpen(true);
  };
  const onCloseEditBill = () => {
    setEditBillOpen(false);
  };

  const [isBillInfoOpen, setBillInfoOpen] = React.useState(false);

  const onOpenBillInfo = async () => {
    await getBillDetail();
    setBillInfoOpen(true);
  };
  const onCloseBillInfo = () => {
    setBillInfoOpen(false);
  };
  const [isDeleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const removeBill = async () => {
    dispatch(fetchStart());
    try {
      const response: any = await deleteBill(bill.id);
      dispatch(fetchSuccess());
      dispatch(showMessage(`${response.message}`));
      setDeleteDialogOpen(false);
      fetchBill();
    } catch (e) {
      dispatch(fetchError(`${e?.response?.data?.message}`));
      setDeleteDialogOpen(false);
    }
  };
  const [billDetail, setBillDetail] = useState(bill);

  const getBillDetail = async () => {
    dispatch(fetchStart());
    try {
      const response: any = await getBill(bill.id);
      if (response) {
        setBillDetail(response.data);
        dispatch(fetchSuccess());
      } else dispatch(fetchError(`An a error occurred while fetching`));
    } catch (error: any) {
      dispatch(
        fetchError(
          error?.response?.data?.message ||
            'An a error occurred while fetching',
        ),
      );
    }
  };

  const [isDisableCardDialogOpen, setDisableCardDialogOpen] =
    React.useState(false);
  const disableBillCard = async () => {
    dispatch(fetchStart());
    try {
      const response: any = await disableCard(bill.cardId);
      dispatch(fetchSuccess());
      dispatch(showMessage(`${response.message}`));
      setDisableCardDialogOpen(false);
    } catch (e) {
      dispatch(fetchError(`${e?.response?.data?.message}`));
      setDisableCardDialogOpen(false);
    }
  };

  return (
    <TableRow key={bill.id} className='item-hover'>
      <StyledTableCell align='left'>
        {bill.billingObject == objectBillings.table ? 'table' : 'room'}
      </StyledTableCell>
      <StyledTableCell component='th' scope='row'>
        <Box
          sx={{
            color: 'primary.main',
            borderBottom: (theme) => `1px solid ${theme.palette.primary.main}`,
            display: 'inline-block',
            cursor: 'pointer',
          }}
          //todo: onClick={gotoOrderDetail}
        >
          {bill.orderId}
        </Box>
      </StyledTableCell>
      <StyledTableCell align='left'>{bill.customerName}</StyledTableCell>
      <StyledTableCell align='left'>{bill.staffName}</StyledTableCell>
      <StyledTableCell align='left'>${bill.totalPrice}</StyledTableCell>
      <StyledTableCell align='left'>
        {bill.status == status.paid ? 'paid' : 'unpaid'}
      </StyledTableCell>
      <StyledTableCell align='left'>{bill.note}</StyledTableCell>
      <StyledTableCell align='right'>
        <Box>
          <IconButton
            aria-controls='alpha-menu'
            aria-haspopup='true'
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id='alpha-menu'
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem style={{fontSize: 14}} onClick={onOpenBillInfo}>
              View Bill
            </MenuItem>
            <MenuItem style={{fontSize: 14}} onClick={onOpenEditBill}>
              Edit
            </MenuItem>
            <MenuItem
              style={{fontSize: 14}}
              onClick={() => setDeleteDialogOpen(true)}
            >
              Delete
            </MenuItem>
            <MenuItem
              disabled={!!bill.cardDeleted}
              style={{fontSize: 14}}
              onClick={() => setDisableCardDialogOpen(true)}
            >
              Disable card
            </MenuItem>
          </Menu>
        </Box>
        <EditBill
          isBillInfoOpen={isBillInfoOpen}
          isEditBillOpen={isEditBillOpen}
          onCloseEditBill={onCloseEditBill}
          bill={billDetail}
          fetchBill={fetchBill}
        />
        <BillInfo
          isEditBillOpen={isEditBillOpen}
          isBillInfoOpen={isBillInfoOpen}
          onCloseBillInfo={onCloseBillInfo}
          bill={billDetail}
        />
        <AppConfirmDialog
          open={isDeleteDialogOpen}
          onDeny={setDeleteDialogOpen}
          onConfirm={removeBill}
          title={'Are you sure you want to delete this bill?'}
          dialogTitle={'Delete bill'}
        />
        <AppConfirmDialog
          open={isDisableCardDialogOpen}
          onDeny={setDisableCardDialogOpen}
          onConfirm={disableBillCard}
          title={`Are you sure you want to disable card ${bill.id} of this Bill?`}
          dialogTitle={'Disable Card Bill'}
        />
      </StyledTableCell>
    </TableRow>
  );
};

export default TableItem;
