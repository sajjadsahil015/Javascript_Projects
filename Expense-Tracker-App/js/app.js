import { init, handleFormSubmit, removeTransaction, editTransaction, applyFilterAndSort } from './transactions.js';

const form = document.getElementById('form');
const filterSelect = document.getElementById('filter-type');
const sortSelect = document.getElementById('sort-type');

// Initialize the application
init();

// Event Listeners
form.addEventListener('submit', handleFormSubmit);

if (filterSelect) {
    filterSelect.addEventListener('change', applyFilterAndSort);
}
if (sortSelect) {
    sortSelect.addEventListener('change', applyFilterAndSort);
}

// Make functions available globally for HTML onclick events
window.removeTransaction = removeTransaction;
window.editTransaction = editTransaction;