export const getTransactions = () => {
  const transactions = JSON.parse(localStorage.getItem('transactions'));
  return Array.isArray(transactions) ? transactions : [];
};

export const saveTransactions = (transactions) => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
};

export const getCurrency = () => {
  return localStorage.getItem('app_currency') || '$';
};

export const saveCurrency = (currency) => {
  localStorage.setItem('app_currency', currency);
};
