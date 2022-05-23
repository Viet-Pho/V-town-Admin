import React from 'react';
import TablePagination from '@mui/material/TablePagination';

interface AppsPaginationProps {
  count: number;
  page: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number,
  ) => void;
  rowsPerPage?: number;
  onRowsPerPageChange: (event) => void;

  [x: string]: any;
}

const AppsPagination: React.FC<AppsPaginationProps> = ({
  count,
  page,
  onPageChange,
  rowsPerPage = 15,
  onRowsPerPageChange,
  ...rest
}) => {
  return (
    <TablePagination
      component='div'
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      backIconButtonProps={{'aria-label': 'Previous Page'}}
      nextIconButtonProps={{'aria-label': 'Next Page'}}
      onPageChange={onPageChange}
      rowsPerPageOptions={[5, 10, 25]}
      onRowsPerPageChange={onRowsPerPageChange}
      {...rest}
    />
  );
};

export default AppsPagination;
