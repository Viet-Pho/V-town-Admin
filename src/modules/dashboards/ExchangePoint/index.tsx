import React from 'react';
import ExchangePointForm from './ExchangePointForm';

const ExchangePoint = () => {

  return (
    <>
      <ExchangePointForm
        customer={{
          id: 0,
          cardNumber: '',
          phoneNumber: '',
          firstName: '',
          lastName: '',
          email: '',
          address: '',
          totalPoints: 0
        }}
      />
    </>
  );
};

export default ExchangePoint;
