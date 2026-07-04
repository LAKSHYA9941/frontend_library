const form = document.getElementById('transaction-form');
const descInput = document.getElementById('desc');
const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type');
const list = document.getElementById('transaction-list');
const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('income');
const expenseEl = document.getElementById('expense');
const themeBtn = document.getElementById('theme-toggle');
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const nameInput = document.getElementById('user-name');
const currencySelect = document.getElementById('currency-select');
const saveSettingsBtn = document.getElementById('save-settings');
const resetBtn = document.getElementById('reset-data');
const greeting = document.getElementById('greeting');
const filterBtns = document.querySelectorAll('.filter-btn');
const incomeBar = document.getElementById('income-bar');
const expenseBar = document.getElementById('expense-bar');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let profile = JSON.parse(localStorage.getItem('profile')) || { name: 'User', currency: 'USD', dark: false };
let currentFilter = 'all';

const currencySymbols = { USD: '$', EUR: '€', GBP: '£', INR: '₹', JPY: '¥' };

function init() {
    if (profile.dark) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
    greeting.innerText = `Welcome, ${profile.name}`;
    nameInput.value = profile.name;
    currencySelect.value = profile.currency;
    updateDOM();
}

function updateDOM() {
    list.innerHTML = '';
    let filtered = transactions;
    if (currentFilter !== 'all') {
        filtered = transactions.filter(t => t.type === currentFilter);
    }
    filtered.forEach(addTransactionDOM);
    updateValues();
}

function addTransactionDOM(transaction) {
    const el = document.createElement('li');
    el.classList.add(transaction.type === 'income' ? 'income-item' : 'expense-item');
    const sym = currencySymbols[profile.currency];
    el.innerHTML = `
        <span>${transaction.desc}</span>
        <span>${sym}${transaction.amount.toFixed(2)}</span>
        <button class="danger" onclick="removeTransaction(${transaction.id})">X</button>
    `;
    list.appendChild(el);
}

function updateValues() {
    const amounts = transactions.map(t => t.type === 'income' ? t.amount : -t.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);
    
    const sym = currencySymbols[profile.currency];
    balanceEl.innerText = `${sym}${total}`;
    incomeEl.innerText = `${sym}${income}`;
    expenseEl.innerText = `${sym}${expense}`;

    const totalSum = parseFloat(income) + parseFloat(expense);
    if (totalSum > 0) {
        incomeBar.style.width = `${(parseFloat(income) / totalSum) * 100}%`;
        expenseBar.style.width = `${(parseFloat(expense) / totalSum) * 100}%`;
    } else {
        incomeBar.style.width = '0%';
        expenseBar.style.width = '0%';
    }
}

function removeTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    updateDOM();
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const transaction = {
        id: Date.now(),
        desc: descInput.value,
        amount: parseFloat(amountInput.value),
        type: typeSelect.value
    };
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    descInput.value = '';
    amountInput.value = '';
    updateDOM();
});

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    profile.dark = document.body.classList.contains('dark');
    localStorage.setItem('profile', JSON.stringify(profile));
});

settingsBtn.addEventListener('click', () => {
    settingsModal.classList.toggle('hidden');
});

saveSettingsBtn.addEventListener('click', () => {
    profile.name = nameInput.value || 'User';
    profile.currency = currencySelect.value;
    localStorage.setItem('profile', JSON.stringify(profile));
    settingsModal.classList.add('hidden');
    init();
});

resetBtn.addEventListener('click', () => {
    localStorage.clear();
    transactions = [];
    profile = { name: 'User', currency: 'USD', dark: false };
    init();
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.dataset.filter;
        updateDOM();
    });
});

window.removeTransaction = removeTransaction;

init();