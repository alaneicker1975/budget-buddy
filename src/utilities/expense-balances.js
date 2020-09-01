const calculateTotalBalance = (balances) => {
  return balances.reduce((a, b) => {
    return a + +b.balance;
  }, 0);
};

const calculateUnpaidBalance = (balances) => {
  return balances.reduce((a, b) => {
    return !b.isPaid ? a + +b.balance : a;
  }, 0);
};

const calculatePaidBalance = (balances) => {
  return balances.reduce((a, b) => {
    return b.isPaid ? a + +b.balance : a;
  }, 0);
};

export { calculateTotalBalance, calculateUnpaidBalance, calculatePaidBalance };
