let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function addTransaction() {

    const description = document.getElementById("description").value;
    const amount = Number(document.getElementById("amount").value);
    const type = document.getElementById("type").value;
    const category = document.getElementById("category").value;

    if (description === "" || amount <= 0) {
        alert("Please enter valid transaction details.");
        return;
    }

    const transaction = {
        id: Date.now(),
        description: description,
        amount: amount,
        type: type,
        category: category
    };

    transactions.push(transaction);

    saveTransactions();

    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";

    displayTransactions();
}

function deleteTransaction(id) {

    transactions = transactions.filter(transaction => transaction.id !== id);

    saveTransactions();

    displayTransactions();
}

function saveTransactions() {

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

function displayTransactions() {

    const list = document.getElementById("transactionList");

    list.innerHTML = "";

    let income = 0;
    let expense = 0;

    transactions.forEach(transaction => {

        if (transaction.type === "income") {
            income += transaction.amount;
        } else {
            expense += transaction.amount;
        }

        const li = document.createElement("li");

        li.className = "transaction";

        li.innerHTML = `
            <div>
                <strong>${transaction.description}</strong>
                <br>
                <small>${transaction.category}</small>
            </div>

            <div>
                ${transaction.type === "income" ? "+" : "-"}₹${transaction.amount}

                <button
                    class="delete-btn"
                    onclick="deleteTransaction(${transaction.id})">
                    Delete
                </button>
            </div>
        `;

        list.appendChild(li);
    });

    document.getElementById("income").textContent = `₹${income}`;
    document.getElementById("expense").textContent = `₹${expense}`;
    document.getElementById("balance").textContent = `₹${income - expense}`;
}

displayTransactions();