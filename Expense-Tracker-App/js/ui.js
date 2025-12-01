export const renderList = (transactions) => {
  const list = document.getElementById('list');
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
};

export const addTransactionDOM = (transaction) => {
  const list = document.getElementById('list');
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  const formattedDate = transaction.date ? new Date(transaction.date).toLocaleDateString() : '';

  item.innerHTML = `
    <div class="transaction-info">
        ${transaction.text} <small>${formattedDate}</small>
    </div>
    <span class="amount">${sign}${Math.abs(transaction.amount).toFixed(2)}</span>
    <div class="actions">
        <button class="edit-btn" onclick="editTransaction(${transaction.id})"><i class="fas fa-edit"></i></button>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    </div>
  `;

  list.appendChild(item);
};

export const updateValues = (transactions) => {
  const balance = document.getElementById('balance');
  const money_plus = document.getElementById('money-plus');
  const money_minus = document.getElementById('money-minus');

  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `Rs${total}`;
  money_plus.innerText = `+Rs${income}`;
  money_minus.innerText = `-Rs${expense}`;
};

export const fillEditForm = (transaction) => {
  document.getElementById('text').value = transaction.text;
  document.getElementById('amount').value = transaction.amount;
  document.getElementById('date').value = transaction.date;
  document.getElementById('form-btn').innerText = 'Update Transaction';
};

export const removeTransactionDOM = (id) => {
    // Unused with full re-render approach
}