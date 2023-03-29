import { useState } from 'react';

export function useCounter() {
  const [counterNumber, setCounterNumber] = useState(0);

  const handleButtonClick = () => {
    setCounterNumber(counterNumber + 1);
  };

  return {
    counterNumber,
    handleButtonClick,
  };
}
