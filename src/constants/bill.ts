const objectBillings = {
  table: 1,
  room: 1,
};

const objectBillingOptions = [
  {value: 0, label: 'Room'},
  {value: 1, label: 'Table'},
];

const status = {
  unpaid: 0,
  paid: 1,
};

const statusOptions = [
  {value: 0, label: 'Unpaid'},
  {value: 1, label: 'Paid'},
];

export {objectBillings, statusOptions, objectBillingOptions, status};
