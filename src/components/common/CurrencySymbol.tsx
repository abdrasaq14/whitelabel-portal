import React from 'react';

type CurrencyCode = 'NGN' | 'USD' | 'EUR';

interface CurrencySymbolProps {
  currencyCode: CurrencyCode;
}

// Define a function to get the currency symbol
const getCurrencySymbol = (currencyCode: CurrencyCode): string => {
  switch (currencyCode) {
    case 'NGN':
      return '₦';
    case 'USD':
      return '$';
    case 'EUR':
      return '€';
    default:
      return '';
  }
};

// Create a functional component that takes a currency code as a prop
const CurrencySymbol: React.FC<CurrencySymbolProps> = ({ currencyCode }) => {
  return (
    <div className='!text-lg font-semibold'>
      {getCurrencySymbol(currencyCode)}
    </div>
  );
};

export default CurrencySymbol;
