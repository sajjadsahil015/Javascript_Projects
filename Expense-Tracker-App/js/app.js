import { 
  init, 
  handleFormSubmit, 
  removeTransaction, 
  editTransaction, 
  cancelEdit,
  applyFilterAndSort, 
  setFormType,
  changeCurrency,
  loadDemoData,
  exportToCSV,
  clearAllTransactions
} from './transactions.js';

// DOM Elements
const form = document.getElementById('form');
const searchInput = document.getElementById('search-input');
const filterSelect = document.getElementById('filter-type');
const filterCatSelect = document.getElementById('filter-category');
const sortSelect = document.getElementById('sort-type');
const currencySelect = document.getElementById('currency-select');
const demoBtn = document.getElementById('demo-btn');
const exportBtn = document.getElementById('export-btn');
const clearBtn = document.getElementById('clear-btn');
const cancelBtn = document.getElementById('cancel-btn');
const typeButtons = document.querySelectorAll('.type-btn');

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  init();
});

// Event Listeners
if (form) {
  form.addEventListener('submit', handleFormSubmit);
}

if (searchInput) {
  searchInput.addEventListener('input', applyFilterAndSort);
}

if (filterSelect) {
  filterSelect.addEventListener('change', applyFilterAndSort);
}

if (filterCatSelect) {
  filterCatSelect.addEventListener('change', applyFilterAndSort);
}

if (sortSelect) {
  sortSelect.addEventListener('change', applyFilterAndSort);
}

if (currencySelect) {
  currencySelect.addEventListener('change', (e) => {
    changeCurrency(e.target.value);
  });
}

if (cancelBtn) {
  cancelBtn.addEventListener('click', cancelEdit);
}

if (demoBtn) {
  demoBtn.addEventListener('click', loadDemoData);
}

if (exportBtn) {
  exportBtn.addEventListener('click', exportToCSV);
}

if (clearBtn) {
  clearBtn.addEventListener('click', clearAllTransactions);
}

// Income / Expense type toggle buttons
typeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    setFormType(btn.dataset.type);
  });
});

// Make functions available globally for HTML onclick events
window.removeTransaction = removeTransaction;
window.editTransaction = editTransaction;
window.cancelEdit = cancelEdit;