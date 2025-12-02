import { addTransactionDOM, updateValues, fillEditForm, renderList } from './ui.js';
import { getTransactions, saveTransactions } from './storage.js';

let transactions = getTransactions();
let editingId = null;

export const handleFormSubmit = (e) => {
  e.preventDefault();
  
  const text = document.getElementById('text');
  const amount = document.getElementById('amount');
  const date = document.getElementById('date');

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
    return;
  }

  const transactionData = {
    text: text.value,
    amount: +amount.value,
    date: date.value || new Date().toISOString().split('T')[0],
    type: +amount.value < 0 ? 'expense' : 'income'
  };

  if (editingId) {
    updateTransaction(editingId, transactionData);
  } else {
    createTransaction(transactionData);
  }

  text.value = '';
  amount.value = '';
  date.value = '';
  editingId = null;
  document.getElementById('form-btn').innerText = 'Add Transaction';
};

const createTransaction = (data) => {
  const transaction = {
    id: generateID(),
    ...data
  };

  transactions.push(transaction);
  saveAndRender();
};

const updateTransaction = (id, data) => {
  transactions = transactions.map(t => (t.id === id ? { ...t, ...data, id } : t));
  saveAndRender();
};

export const editTransaction = (id) => {
  const transaction = transactions.find(t => t.id === id);
  if (!transaction) return;
  
  editingId = id;
  fillEditForm(transaction);
};

export const generateID = () => {
  return Math.floor(Math.random() * 100000000);
};

export const removeTransaction = (id) => {
  transactions = transactions.filter(transaction => transaction.id !== id);
  if (editingId === id) {
      editingId = null;
      document.getElementById('form-btn').innerText = 'Add Transaction';
      document.getElementById('form').reset();
  }
  saveAndRender();
};

const saveAndRender = () => {
  saveTransactions(transactions);
  applyFilterAndSort();
};

export const init = () => {
  applyFilterAndSort();
};

export const applyFilterAndSort = () => {
    const filterType = document.getElementById('filter-type')?.value || 'all';
    const sortType = document.getElementById('sort-type')?.value || 'date-desc';

    let result = [...transactions];

    // Filter
    if (filterType !== 'all') {
        result = result.filter(t => t.type === filterType);
    }

    // Sort
    result.sort((a, b) => {
        switch (sortType) {
            case 'date-desc':
                return new Date(b.date) - new Date(a.date);
            case 'date-asc':
                return new Date(a.date) - new Date(b.date);
            case 'amount-desc':
                return Math.abs(b.amount) - Math.abs(a.amount);
            case 'amount-asc':
                return Math.abs(a.amount) - Math.abs(b.amount);
            default:
                return 0;
        }
    });

    renderList(result);
    updateValues(transactions); // Balance should always reflect ALL transactions, or filtered? Usually Balance is global, list is view. Let's keep Balance global.
};