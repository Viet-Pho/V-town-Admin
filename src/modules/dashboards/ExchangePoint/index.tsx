import React from 'react';
import ExchangePointForm from './ExchangePointForm';

const ExchangePoint = () => {
  return (
    <>
      <ExchangePointForm
        customer={{
          id: 0,
          cardId: '',
          phoneNumber: '',
          firstName: '',
          lastName: '',
          email: '',
          address: '',
          totalPoints: 0,
          avatar: '',
        }}
        initPoint={0}
      />
    </>
  );
};

export default ExchangePoint;
