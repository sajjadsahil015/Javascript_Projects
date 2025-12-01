export const getTransactions = () => {
  const transactions = JSON.parse(localStorage.getItem('transactions'));
  return transactions !== null ? transactions : [];
};

export const saveTransactions = (transactions) => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
};
