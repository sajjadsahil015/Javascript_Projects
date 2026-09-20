import { 
  renderList, 
  updateValues, 
  fillEditForm, 
  resetFormUI, 
  populateCategorySelect, 
  populateFilterCategorySelect,
  showToast 
} from './ui.js';
import { 
  getTransactions, 
  saveTransactions, 
  getCurrency, 
  saveCurrency 
} from './storage.js';

let transactions = getTransactions();
let currency = getCurrency();
let editingId = null;
let currentFormType = 'expense'; // 'income' | 'expense'

export const init = () => {
  // Set date input to today
  const dateInput = document.getElementById('date');
  if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }

  // Set currency selector
  const currencySelect = document.getElementById('currency-select');
  if (currencySelect) {
    currencySelect.value = currency;
  }

  // Populate categories
  populateCategorySelect(currentFormType);
  populateFilterCategorySelect();

  // Initial render
  applyFilterAndSort();
};

export const setFormType = (type) => {
  currentFormType = type;
  document.querySelectorAll('.type-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.type === type);
  });
  populateCategorySelect(type);
};

export const handleFormSubmit = (e) => {
  e.preventDefault();

  const textInput = document.getElementById('text');
  const amountInput = document.getElementById('amount');
  const dateInput = document.getElementById('date');
  const categorySelect = document.getElementById('category');

  const text = textInput ? textInput.value.trim() : '';
  const rawAmount = amountInput ? +amountInput.value : 0;
  const date = dateInput && dateInput.value ? dateInput.value : new Date().toISOString().split('T')[0];
  const category = categorySelect ? categorySelect.value : (currentFormType === 'income' ? 'Salary' : 'Other Expense');

  if (!text) {
    showToast('Please enter a description.', 'error');
    if (textInput) textInput.focus();
    return;
  }

  if (isNaN(rawAmount) || rawAmount <= 0) {
    showToast('Please enter a valid amount greater than 0.', 'error');
    if (amountInput) amountInput.focus();
    return;
  }

  // If type is expense, store amount as negative for consistent calculations
  const finalAmount = currentFormType === 'expense' ? -Math.abs(rawAmount) : Math.abs(rawAmount);

  const transactionData = {
    text,
    amount: finalAmount,
    date,
    type: currentFormType,
    category
  };

  if (editingId !== null) {
    updateTransaction(editingId, transactionData);
    showToast('Transaction updated successfully!', 'success');
  } else {
    createTransaction(transactionData);
    showToast('Transaction added successfully!', 'success');
  }

  resetFormUI();
  editingId = null;
  currentFormType = 'expense';
};

const createTransaction = (data) => {
  const transaction = {
    id: generateID(),
    ...data
  };

  transactions.unshift(transaction);
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
  currentFormType = transaction.type || (transaction.amount < 0 ? 'expense' : 'income');
  fillEditForm(transaction);
  showToast(`Editing "${transaction.text}"`, 'info');
};

export const cancelEdit = () => {
  editingId = null;
  currentFormType = 'expense';
  resetFormUI();
  showToast('Edit cancelled.', 'info');
};

export const removeTransaction = (id) => {
  const item = transactions.find(t => t.id === id);
  const itemTitle = item ? item.text : 'Transaction';

  transactions = transactions.filter(t => t.id !== id);

  if (editingId === id) {
    editingId = null;
    currentFormType = 'expense';
    resetFormUI();
  }

  saveAndRender();
  showToast(`Deleted "${itemTitle}"`, 'info');
};

export const changeCurrency = (newCurrency) => {
  currency = newCurrency;
  saveCurrency(newCurrency);
  applyFilterAndSort();
  showToast(`Currency updated to ${newCurrency}`, 'success');
};

export const loadDemoData = () => {
  const today = new Date();
  const formatPastDate = (daysAgo) => {
    const d = new Date(today);
    d.setDate(d.getDate() - daysAgo);
    return d.toISOString().split('T')[0];
  };

  const demoTransactions = [
    { id: generateID(), text: 'Monthly Salary', amount: 3800, type: 'income', category: 'Salary', date: formatPastDate(1) },
    { id: generateID(), text: 'Freelance UI Design', amount: 650, type: 'income', category: 'Freelance', date: formatPastDate(3) },
    { id: generateID(), text: 'Apartment Rent', amount: -950, type: 'expense', category: 'Housing & Rent', date: formatPastDate(4) },
    { id: generateID(), text: 'Supermarket Groceries', amount: -185.50, type: 'expense', category: 'Food & Dining', date: formatPastDate(2) },
    { id: generateID(), text: 'Electricity & Internet', amount: -110.25, type: 'expense', category: 'Utilities & Bills', date: formatPastDate(5) },
    { id: generateID(), text: 'Weekend Dinner & Movies', amount: -75.00, type: 'expense', category: 'Entertainment', date: formatPastDate(6) },
    { id: generateID(), text: 'Gym Membership', amount: -45.00, type: 'expense', category: 'Health & Medical', date: formatPastDate(7) }
  ];

  transactions = demoTransactions;
  if (editingId !== null) {
    editingId = null;
    resetFormUI();
  }
  saveAndRender();
  showToast('Demo data loaded successfully!', 'success');
};

export const clearAllTransactions = () => {
  if (transactions.length === 0) {
    showToast('No transactions to clear.', 'info');
    return;
  }

  if (confirm('Are you sure you want to clear all transactions? This cannot be undone.')) {
    transactions = [];
    if (editingId !== null) {
      editingId = null;
      resetFormUI();
    }
    saveAndRender();
    showToast('All transactions cleared.', 'info');
  }
};

export const exportToCSV = () => {
  if (transactions.length === 0) {
    showToast('No transactions to export.', 'info');
    return;
  }

  const headers = ['ID', 'Date', 'Description', 'Category', 'Type', `Amount (${currency})`];
  const rows = transactions.map(t => [
    t.id,
    `"${t.date || ''}"`,
    `"${(t.text || '').replace(/"/g, '""')}"`,
    `"${(t.category || '').replace(/"/g, '""')}"`,
    t.type || (t.amount < 0 ? 'expense' : 'income'),
    Math.abs(t.amount).toFixed(2)
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(r => r.join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const dateStr = new Date().toISOString().split('T')[0];

  link.setAttribute('href', url);
  link.setAttribute('download', `Expense_Report_${dateStr}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast('Report downloaded as CSV!', 'success');
};

export const generateID = () => {
  return Date.now() + Math.floor(Math.random() * 1000);
};

const saveAndRender = () => {
  saveTransactions(transactions);
  applyFilterAndSort();
};

export const applyFilterAndSort = () => {
  const searchQuery = (document.getElementById('search-input')?.value || '').toLowerCase().trim();
  const filterType = document.getElementById('filter-type')?.value || 'all';
  const filterCategory = document.getElementById('filter-category')?.value || 'all';
  const sortType = document.getElementById('sort-type')?.value || 'date-desc';

  let result = [...transactions];

  // Search by text or category
  if (searchQuery) {
    result = result.filter(t => 
      (t.text && t.text.toLowerCase().includes(searchQuery)) ||
      (t.category && t.category.toLowerCase().includes(searchQuery))
    );
  }

  // Filter by Type
  if (filterType !== 'all') {
    result = result.filter(t => (t.type || (t.amount < 0 ? 'expense' : 'income')) === filterType);
  }

  // Filter by Category
  if (filterCategory !== 'all') {
    result = result.filter(t => t.category === filterCategory);
  }

  // Sort
  result.sort((a, b) => {
    switch (sortType) {
      case 'date-desc':
        return new Date(b.date || 0) - new Date(a.date || 0);
      case 'date-asc':
        return new Date(a.date || 0) - new Date(b.date || 0);
      case 'amount-desc':
        return Math.abs(b.amount) - Math.abs(a.amount);
      case 'amount-asc':
        return Math.abs(a.amount) - Math.abs(b.amount);
      default:
        return 0;
    }
  });

  renderList(result, currency);
  updateValues(transactions, currency);
};