const calculateDiffTimePerHour = (startTime: Date, endTime: Date): number => {
  const start = startTime.getTime();
  const end = endTime.getTime();

  const diffTime = +((end - start) / (1000 * 60 * 60)).toFixed(2);

  return diffTime;
};

const addDay = (date: Date, num: number): Date => {
  const dateCloned = new Date(date.getTime());
  dateCloned.setDate(dateCloned.getDate() + num);
  return dateCloned;
};

const changeTimeZone = (date: Date, timeZone: string = 'Australia/Sydney') => {
  return new Date(
    date.toLocaleString('en-US', {
      timeZone,
    }),
  );
};

const changeHourWithTimeZone = (date: Date, timeZone: number = 10) => {
  const dateCloned = new Date(date.getTime());
  dateCloned.setHours(dateCloned.getHours() + timeZone);

  return new Date(dateCloned);
};

export {
  addDay,
  calculateDiffTimePerHour,
  changeTimeZone,
  changeHourWithTimeZone,
};
