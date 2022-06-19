import {milestoneHour, dayOfWeek} from 'constants/room';
import {addDay, calculateDiffTimePerHour, changeHourWithTimeZone} from './time';

type TimeUsingInDay = {
  normalTime: number;
  extraTime: number;
};

type BillUsingRoom = {
  usingTime: number;
  roomPrice: number;
  usingTimeEachDay: object;
  startTime: Date;
  endTime: Date;
};

const calculateHourUsedRoomPrice = (
  start: Date,
  end: Date,
  extraTimeCharge: number,
  weekdayPrice: number,
  weekendPrice: number,
  timeZone: number,
): BillUsingRoom => {
  if (start >= end) {
    return {
      usingTime: 0,
      roomPrice: 0,
      usingTimeEachDay: {},
      startTime: start,
      endTime: end,
    };
  }
  // convert time Follow timeZone
  const startTimeFollowTimeZone = changeHourWithTimeZone(start, timeZone);
  const endTimeFollowTimeZone = changeHourWithTimeZone(end, timeZone);

  // initial tempt variable
  let usingTime = 0;
  let roomPrice = 0;
  const usingTimeEachDay = {};
  let startTempt = startTimeFollowTimeZone;
  let endTempt =
    start.getDate() === end.getDate()
      ? endTimeFollowTimeZone
      : addDay(
          changeHourWithTimeZone(
            new Date(start.toLocaleDateString()),
            timeZone,
          ),
          1,
        );

  while (endTempt <= endTimeFollowTimeZone) {
    const {normalTime, extraTime} = getNormalAndExtraTimeFromUsingTimeEachDay(
      startTempt,
      endTempt,
      timeZone,
    );

    const dayInWeek = startTempt.getDay();
    const isWeekend = [dayOfWeek.sunday, dayOfWeek.saturday].includes(
      dayInWeek,
    );
    const normalPice = isWeekend ? weekendPrice : weekdayPrice;

    usingTime += normalTime + extraTime;
    roomPrice +=
      normalTime * normalPice + extraTime * (normalPice + extraTimeCharge);

    const currentDateFollowTimeZone = startTempt.toISOString().split('T')[0];
    usingTimeEachDay[currentDateFollowTimeZone] = {
      normalTime,
      extraTime,
      normalPice,
      extraTimeCharge,
    };
    startTempt = new Date(endTempt.getTime());
    const nextTemptDay = addDay(endTempt, 1);

    endTempt =
      nextTemptDay > endTimeFollowTimeZone
        ? endTimeFollowTimeZone
        : nextTemptDay;
    if (calculateDiffTimePerHour(startTempt, endTempt) <= 0) break;
  }

  return {
    usingTime,
    roomPrice,
    usingTimeEachDay,
    startTime: startTimeFollowTimeZone,
    endTime: endTimeFollowTimeZone,
  };
};

const getNormalAndExtraTimeFromUsingTimeEachDay = (
  startTime: Date,
  endTime: Date,
  timeZone: number,
): TimeUsingInDay => {
  const totalUsingHourInDay = calculateDiffTimePerHour(startTime, endTime);

  const startHour =
    startTime.getHours() - timeZone >= 0
      ? startTime.getHours() - timeZone
      : startTime.getHours() - timeZone + 24;

  if (startHour < +milestoneHour) {
    const milestoneDay = startTime.toLocaleDateString();
    const milestoneTime = changeHourWithTimeZone(
      new Date(`${milestoneDay}, ${milestoneHour}:00:00 AM`),
      timeZone,
    );

    const extraTime = calculateDiffTimePerHour(startTime, milestoneTime);

    return {
      normalTime:
        totalUsingHourInDay - extraTime > 0
          ? totalUsingHourInDay - extraTime
          : 0,
      extraTime:
        totalUsingHourInDay - extraTime > 0 ? extraTime : totalUsingHourInDay,
    };
  }

  return {
    normalTime: totalUsingHourInDay,
    extraTime: 0,
  };
};

export {calculateHourUsedRoomPrice};
