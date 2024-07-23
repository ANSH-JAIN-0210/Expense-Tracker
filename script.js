let amount = 0;
let cashin = 0;
let cashout = 0;
let transactions = [];

function updateLocalStorage() {
  localStorage.setItem("amount", amount.toString());
  localStorage.setItem("cashin", cashin.toString());
  localStorage.setItem("cashout", cashout.toString());
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function retrieveFromLocalStorage() {
  amount = parseInt(localStorage.getItem("amount")) || 0;
  cashin = parseInt(localStorage.getItem("cashin")) || 0;
  cashout = parseInt(localStorage.getItem("cashout")) || 0;
  transactions = JSON.parse(localStorage.getItem("transactions")) || [];
}

function displayTransactions() {
  let transactionList = document.getElementById("transaction-list");
  let gymList = document.getElementById("gym");
  let foodList = document.getElementById("food");
  let travelList = document.getElementById("travel");
  let billList = document.getElementById("bill");
  let otherList = document.getElementById("other");
  transactionList.innerHTML = "";
  gymList.innerHTML = "";

  transactions.forEach((transactionData) => {
    let transaction = createTransactionElement(transactionData);

    transactionList.appendChild(transaction);
    if (transactionData.category === "gym") {
      let transact = createTransactionElement(transactionData);
      gymList.appendChild(transact);
    }
    else if(transactionData.category === "food"){
      let transact = createTransactionElement(transactionData);
      foodList.appendChild(transact);
    }
    else if(transactionData.category === "travel"){
      let transact = createTransactionElement(transactionData);
      travelList.appendChild(transact);
    }
    else if(transactionData.category === "bill"){
      let transact = createTransactionElement(transactionData);
      billList.appendChild(transact);
    }
    else{
      let transact = createTransactionElement(transactionData);
      otherList.appendChild(transact);
    }
  });
}

function createTransactionElement(transactionData) {
  let transaction = document.createElement("div");
  let transaction_amount = document.createElement("div");
  let transaction_naming = document.createElement("div");
  let transaction_category = document.createElement("div");
  let transaction_date = document.createElement("div");

  transaction_amount.textContent = transactionData.amount;
  transaction_naming.textContent = transactionData.name;
  transaction_category.textContent = transactionData.category;
  transaction_date.textContent = transactionData.date;

  transaction.appendChild(transaction_amount);
  transaction.appendChild(transaction_naming);
  transaction.appendChild(transaction_category);
  transaction.appendChild(transaction_date);
  transaction.style.display = "flex";
  transaction.style.justifyContent = "space-between";
  transaction.style.margin = "8px";

  return transaction;
}


document.getElementById("inbtn1").addEventListener("click", () => {
  let entered_amount = parseInt(document.getElementById("amount").value);
  amount += entered_amount;
  cashin += entered_amount;

  document.querySelector(".cash-in").innerHTML = `Total Cash-In: ${cashin}`;
  document.querySelector(".cash").innerHTML = `Total Cash: ${amount}`;
  document.querySelector(".cash-out").innerHTML = `Total Cash-Out: ${cashout}`;

  document.querySelector(".cash").style.color = amount >= 0 ? "green" : "red";

  let transactionData = {
    amount: entered_amount,
    name: document.getElementById("transaction-name").value,
    category: document.getElementById("category").value,
    date: document.getElementById("date").value,
  };
  transactions.push(transactionData);

  updateLocalStorage();
  displayTransactions();
});

document.getElementById("outbtn2").addEventListener("click", () => {
  let entered_amount = parseInt(document.getElementById("amount").value);
  amount -= entered_amount;
  cashout += entered_amount;

  document.querySelector(".cash-in").innerHTML = `Total Cash-In: ${cashin}`;
  document.querySelector(".cash").innerHTML = `Total Cash: ${amount}`;
  document.querySelector(".cash-out").innerHTML = `Total Cash-Out: ${cashout}`;

  document.querySelector(".cash").style.color = amount >= 0 ? "green" : "red";

  let transactionData = {
    amount: -entered_amount,
    name: document.getElementById("transaction-name").value,
    category: document.getElementById("category").value,
    date: document.getElementById("date").value,
  };
  transactions.push(transactionData);

  updateLocalStorage();
  displayTransactions();
});

function initializeApp() {
  retrieveFromLocalStorage();
  displayTransactions();

  document.querySelector(".cash-in").innerHTML = `Total Cash-In: ${cashin}`;
  document.querySelector(".cash").innerHTML = `Total Cash: ${amount}`;
  document.querySelector(".cash-out").innerHTML = `Total Cash-Out: ${cashout}`;

  document.querySelector(".cash").style.color = amount >= 0 ? "green" : "red";
}

window.onload = initializeApp;
