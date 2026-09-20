export const CATEGORIES = {
  income: [
    { name: 'Salary', icon: 'fas fa-money-bill-wave', color: '#10b981' },
    { name: 'Freelance', icon: 'fas fa-laptop-code', color: '#06b6d4' },
    { name: 'Investments', icon: 'fas fa-chart-line', color: '#8b5cf6' },
    { name: 'Gift / Bonus', icon: 'fas fa-gift', color: '#f59e0b' },
    { name: 'Other Income', icon: 'fas fa-wallet', color: '#14b8a6' }
  ],
  expense: [
    { name: 'Food & Dining', icon: 'fas fa-utensils', color: '#f97316' },
    { name: 'Shopping', icon: 'fas fa-bag-shopping', color: '#ec4899' },
    { name: 'Housing & Rent', icon: 'fas fa-house', color: '#6366f1' },
    { name: 'Transportation', icon: 'fas fa-car', color: '#3b82f6' },
    { name: 'Utilities & Bills', icon: 'fas fa-bolt', color: '#eab308' },
    { name: 'Entertainment', icon: 'fas fa-film', color: '#a855f7' },
    { name: 'Health & Medical', icon: 'fas fa-heart-pulse', color: '#ef4444' },
    { name: 'Education', icon: 'fas fa-graduation-cap', color: '#0ea5e9' },
    { name: 'Other Expense', icon: 'fas fa-receipt', color: '#64748b' }
  ]
};

let expenseChart = null;

// Currency Formatting Helper
export const formatAmount = (amount, currency = '$') => {
  const num = Math.abs(amount);
  const formatted = num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return `${currency}${formatted}`;
};

// Toast notification helper
export const showToast = (message, type = 'info') => {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = 'fas fa-info-circle';
  if (type === 'success') icon = 'fas fa-check-circle';
  if (type === 'error') icon = 'fas fa-exclamation-triangle';

  toast.innerHTML = `
    <i class="${icon}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
};

// Category Icon & Details Helper
export const getCategoryDetails = (categoryName, type) => {
  const list = type === 'income' ? CATEGORIES.income : CATEGORIES.expense;
  const found = list.find(c => c.name === categoryName);
  if (found) return found;

  // Fallback
  return type === 'income' 
    ? { name: categoryName || 'Other Income', icon: 'fas fa-wallet', color: '#10b981' }
    : { name: categoryName || 'Other Expense', icon: 'fas fa-receipt', color: '#ef4444' };
};

// Render Transaction List
export const renderList = (transactions, currency = '$') => {
  const list = document.getElementById('list');
  const countBadge = document.getElementById('transaction-count');
  if (!list) return;

  if (countBadge) {
    countBadge.textContent = `${transactions.length} ${transactions.length === 1 ? 'transaction' : 'transactions'}`;
  }

  list.innerHTML = '';

  if (transactions.length === 0) {
    list.innerHTML = `
      <li class="empty-state">
        <div class="empty-icon"><i class="fas fa-receipt"></i></div>
        <p class="empty-text">No transactions found</p>
        <span class="empty-subtext">Add a new transaction or load sample data to get started.</span>
      </li>
    `;
    return;
  }

  transactions.forEach(transaction => addTransactionDOM(transaction, currency));
};

export const addTransactionDOM = (transaction, currency = '$') => {
  const list = document.getElementById('list');
  const isIncome = transaction.type === 'income' || transaction.amount > 0;
  const sign = isIncome ? '+' : '-';
  const item = document.createElement('li');

  item.className = `transaction-item ${isIncome ? 'plus' : 'minus'}`;
  item.dataset.id = transaction.id;

  const catDetails = getCategoryDetails(transaction.category, transaction.type);
  const formattedDate = transaction.date ? new Date(transaction.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }) : 'No date';

  item.innerHTML = `
    <div class="item-left">
      <div class="cat-icon-badge" style="background-color: ${catDetails.color}18; color: ${catDetails.color};">
        <i class="${catDetails.icon}"></i>
      </div>
      <div class="transaction-info">
        <strong class="transaction-text">${escapeHTML(transaction.text)}</strong>
        <div class="transaction-meta">
          <span class="category-pill" style="color: ${catDetails.color}; border-color: ${catDetails.color}40;">
            ${catDetails.name}
          </span>
          <span class="date-text"><i class="far fa-calendar-alt"></i> ${formattedDate}</span>
        </div>
      </div>
    </div>
    <div class="item-right">
      <span class="amount ${isIncome ? 'plus' : 'minus'}">
        ${sign}${formatAmount(transaction.amount, currency)}
      </span>
      <div class="actions">
        <button class="action-btn edit-btn" title="Edit Transaction" onclick="editTransaction(${transaction.id})">
          <i class="fas fa-pen"></i>
        </button>
        <button class="action-btn delete-btn" title="Delete Transaction" onclick="removeTransaction(${transaction.id})">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  `;

  list.appendChild(item);
};

// Update Balance, Income, Expense, and Savings Rate
export const updateValues = (transactions, currency = '$') => {
  const balance = document.getElementById('balance');
  const money_plus = document.getElementById('money-plus');
  const money_minus = document.getElementById('money-minus');
  const savingsRateElem = document.getElementById('savings-rate');

  const income = transactions
    .filter(item => item.type === 'income' || item.amount > 0)
    .reduce((acc, item) => acc + Math.abs(item.amount), 0);

  const expense = transactions
    .filter(item => item.type === 'expense' || item.amount < 0)
    .reduce((acc, item) => acc + Math.abs(item.amount), 0);

  const total = income - expense;

  if (balance) {
    const isNegative = total < 0;
    balance.innerText = `${isNegative ? '-' : ''}${formatAmount(total, currency)}`;
    balance.className = `balance-value ${isNegative ? 'negative' : 'positive'}`;
  }

  if (money_plus) {
    money_plus.innerText = `+${formatAmount(income, currency)}`;
  }

  if (money_minus) {
    money_minus.innerText = `-${formatAmount(expense, currency)}`;
  }

  if (savingsRateElem) {
    if (income > 0) {
      const rate = Math.max(0, Math.round(((income - expense) / income) * 100));
      savingsRateElem.innerText = `${rate}%`;
    } else {
      savingsRateElem.innerText = '0%';
    }
  }

  // Update Doughnut Chart
  updateChart(transactions, currency);
};

// Render & Update Chart.js Doughnut Chart
export const updateChart = (transactions, currency = '$') => {
  const chartCanvas = document.getElementById('expense-chart');
  const emptyChartMsg = document.getElementById('empty-chart-msg');
  if (!chartCanvas || typeof Chart === 'undefined') return;

  const expenses = transactions.filter(t => t.type === 'expense' || t.amount < 0);

  if (expenses.length === 0) {
    chartCanvas.style.display = 'none';
    if (emptyChartMsg) emptyChartMsg.style.display = 'flex';
    if (expenseChart) {
      expenseChart.destroy();
      expenseChart = null;
    }
    return;
  }

  chartCanvas.style.display = 'block';
  if (emptyChartMsg) emptyChartMsg.style.display = 'none';

  // Group by category
  const categoryTotals = {};
  const categoryColors = {};

  expenses.forEach(t => {
    const cat = t.category || 'Other Expense';
    const amount = Math.abs(t.amount);
    categoryTotals[cat] = (categoryTotals[cat] || 0) + amount;
    
    const catObj = getCategoryDetails(cat, 'expense');
    categoryColors[cat] = catObj.color;
  });

  const labels = Object.keys(categoryTotals);
  const data = Object.values(categoryTotals);
  const backgroundColors = labels.map(l => categoryColors[l]);

  if (expenseChart) {
    expenseChart.data.labels = labels;
    expenseChart.data.datasets[0].data = data;
    expenseChart.data.datasets[0].backgroundColor = backgroundColors;
    expenseChart.options.plugins.tooltip.callbacks.label = (context) => {
      const val = context.parsed;
      return ` ${context.label}: ${formatAmount(val, currency)}`;
    };
    expenseChart.update();
  } else {
    const ctx = chartCanvas.getContext('2d');
    expenseChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: backgroundColors,
          borderWidth: 2,
          borderColor: '#ffffff',
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 12,
              padding: 12,
              usePointStyle: true,
              pointStyle: 'circle',
              font: {
                family: "'Inter', sans-serif",
                size: 11
              }
            }
          },
          tooltip: {
            backgroundColor: '#1e293b',
            titleFont: { family: "'Inter', sans-serif", size: 12 },
            bodyFont: { family: "'Inter', sans-serif", size: 12 },
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label: (context) => {
                const val = context.parsed;
                return ` ${context.label}: ${formatAmount(val, currency)}`;
              }
            }
          }
        },
        cutout: '66%'
      }
    });
  }
};

// Populate Category Dropdown based on Type
export const populateCategorySelect = (selectedType = 'expense', activeCategory = '') => {
  const categorySelect = document.getElementById('category');
  if (!categorySelect) return;

  const categories = selectedType === 'income' ? CATEGORIES.income : CATEGORIES.expense;

  categorySelect.innerHTML = categories
    .map(c => `<option value="${c.name}" ${c.name === activeCategory ? 'selected' : ''}>${c.name}</option>`)
    .join('');
};

// Populate Filter Category Dropdown
export const populateFilterCategorySelect = () => {
  const filterCat = document.getElementById('filter-category');
  if (!filterCat) return;

  const allCategories = [
    ...CATEGORIES.income.map(c => ({ ...c, type: 'Income' })),
    ...CATEGORIES.expense.map(c => ({ ...c, type: 'Expense' }))
  ];

  let html = '<option value="all">All Categories</option>';
  html += '<optgroup label="Income">';
  CATEGORIES.income.forEach(c => {
    html += `<option value="${c.name}">${c.name}</option>`;
  });
  html += '</optgroup><optgroup label="Expense">';
  CATEGORIES.expense.forEach(c => {
    html += `<option value="${c.name}">${c.name}</option>`;
  });
  html += '</optgroup>';

  filterCat.innerHTML = html;
};

// Form edit helper
export const fillEditForm = (transaction) => {
  const textInput = document.getElementById('text');
  const amountInput = document.getElementById('amount');
  const dateInput = document.getElementById('date');
  const formBtn = document.getElementById('form-btn');
  const cancelBtn = document.getElementById('cancel-btn');
  const formTitle = document.getElementById('form-heading');

  const type = transaction.type || (transaction.amount < 0 ? 'expense' : 'income');

  // Set type buttons
  document.querySelectorAll('.type-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.type === type);
  });

  populateCategorySelect(type, transaction.category);

  if (textInput) textInput.value = transaction.text;
  if (amountInput) amountInput.value = Math.abs(transaction.amount);
  if (dateInput) dateInput.value = transaction.date || '';

  if (formBtn) {
    formBtn.innerHTML = '<i class="fas fa-save"></i> Update Transaction';
    formBtn.classList.add('btn-update');
  }

  if (cancelBtn) cancelBtn.style.display = 'inline-flex';
  if (formTitle) formTitle.innerText = 'Edit Transaction';

  // Smooth scroll to form
  const formSection = document.getElementById('form-container');
  if (formSection) {
    formSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};

export const resetFormUI = () => {
  const formBtn = document.getElementById('form-btn');
  const cancelBtn = document.getElementById('cancel-btn');
  const formTitle = document.getElementById('form-heading');
  const form = document.getElementById('form');

  if (form) form.reset();
  
  // Reset date to today
  const dateInput = document.getElementById('date');
  if (dateInput) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }

  // Set default type to expense
  document.querySelectorAll('.type-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.type === 'expense');
  });
  populateCategorySelect('expense');

  if (formBtn) {
    formBtn.innerHTML = '<i class="fas fa-plus"></i> Add Transaction';
    formBtn.classList.remove('btn-update');
  }
  if (cancelBtn) cancelBtn.style.display = 'none';
  if (formTitle) formTitle.innerText = 'Add New Transaction';
};

// Security helper: prevent XSS in transaction texts
function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}