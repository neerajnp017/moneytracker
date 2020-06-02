// console.log('hello');

const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [

//     { id: 1, text: 'flower', amount: -20 },
//     { id: 1, text: 'flower', amount: 300 },
//     { id: 1, text: 'flower', amount: -100 },
//     { id: 1, text: 'flower', amount: 50 },
// ];
// let transactions = dummyTransactions;

const localStorageTransactions = JSON.parse(
    localStorage.getItem('transactions')
);

let transactions =
    localStorage.getItem('transactions') !== null ? localStorageTransactions : [];



function addTransaction(e) {
    e.preventDefault()

    if (text.value.trim() === "" || amount.value.trim() === "") {
        alert('enter text and amount')
    } else {
        const transaction = {
            id: randomId(),
            text: text.value,
            amount: +amount.value
        };
        transactions.push(transaction)
        addTransactionDom(transaction)
        updateValues();
        updateLocalStorage();
        text.value = "";
        amount.value = "";

    }
}


/********************************* random ID *********************************/
function randomId() {
    return Math.floor(Math.random() * 100000000);
}

/********************************* Remove transaction by ID *********************************/
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();
    runTransaction()

}




function addTransactionDom(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';

    let item = document.createElement('li');

    item.classList.add(transaction.amount > 0 ? 'plus' : 'minus')

    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)} <span><button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>
    `
    list.appendChild(item);
}

/********************************* update balance *********************************/

function updateValues() {
    const amounts = transactions.map(amountValue => amountValue.amount)
//     console.log(amounts)
    const total = amounts.reduce((acc, num) => (acc += num), 0).toFixed(2);
//     console.log(total)
    const income = amounts.filter(item => item > 0).reduce((acc, num) => (acc += num), 0).toFixed(2);
//     console.log(income)
    const expense = (amounts.filter(item => item < 0).reduce((acc, num) => (acc += num), 0) * -1).toFixed(2)
//     console.log(expense)

    balance.innerText = `₹${total}`;
    money_plus.innerText = `₹${income}`
    money_minus.innerText = `₹${expense}`


}


/********************************* Update local storage transactions *********************************/
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}



/********************************* run transaction *********************************/

function runTransaction() {
    list.innerHTML = "";
    transactions.forEach(addTransactionDom);
    updateValues()
}
runTransaction();

/********************************* EventListener *********************************/

form.addEventListener('submit', addTransaction);
