const round2Digits = (value) => {
  return Math.round((value + Number.EPSILON) * 100) / 100;
};

export {round2Digits};
