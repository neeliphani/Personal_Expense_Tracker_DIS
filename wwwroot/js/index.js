document.addEventListener("DOMContentLoaded", () => {
    const expenseReport = document.getElementById("report").querySelector("tbody");
    const expenses = [
        {
            id: 1,
            description: "Hotel Room",
            amount: 200,
            paidBy: "Alice",
            splitBetween: ["Alice", "Bob", "Charlie", "Diana"],
            date: "2023-10-01"
        },
        {
            id: 2,
            description: "Dinner",
            amount: 80,
            paidBy: "Bob",
            splitBetween: ["Alice", "Bob", "Charlie"],
            date: "2023-10-02"
        },
        {
            id: 3,
            description: "Museum Tickets",
            amount: 60,
            paidBy: "Charlie",
            splitBetween: ["Alice", "Charlie", "Diana"],
            date: "2023-10-03"
        },
        {
            id: 4,
            description: "Taxi",
            amount: 40,
            paidBy: "Diana",
            splitBetween: ["Bob", "Charlie"],
            date: "2023-10-04"
        },
        {
            id: 5,
            description: "Lunch",
            amount: 50,
            paidBy: "Alice",
            splitBetween: ["Alice", "Diana"],
            date: "2023-10-05"
        },
        {
            id: 6,
            description: "Bobba",
            amount: 30,
            paidBy: "Vikranth",
            splitBetween: ["Alice", "Diana"],
            date: "2024-06-09"
        },
        {
            id: 7,
            description: "Football match",
            amount: 50,
            paidBy: "Diana",
            splitBetween: ["Alice", "Diana", "Vikranth"],
            date: "2024-09-27"
        },
        {
            id: 8,
            description: "Books",
            amount: 50,
            paidBy: "Vijay",
            splitBetween: ["Ram", "Sai"],
            date: "2023-10-30"
        },
        {
            id: 9,
            description: "Shopping mall",
            amount: 50,
            paidBy: "John",
            splitBetween: ["Alice", "Sai"],
            date: "2024-08-21"
        },
    ];
    let updatedExpenses = JSON.parse(localStorage.getItem('expenses')) || expenses;
    let editMode = false;
    let editExpenseId = null;
    const modal = document.getElementById("expense-modal");
    const addExpenseButton = document.querySelector(".add-expense");
    const closeModal = document.querySelector(".close");
    const expenseForm = document.getElementById("expense-form");

    function renderExpensesTable() {
        expenseReport.innerHTML = updatedExpenses.map((acc, index) => `
            <tr data-id="${acc.id}">
                <td>${index + 1}</td>
                <td>${acc.description}</td>
                <td>${acc.amount}</td>
                <td>${acc.paidBy}</td>
                <td>${acc.splitBetween.join(', ')}</td>
                <td>${acc.date}</td>
                <td>
                    <a href="#form-divison"><button class="btn btn-warning edit" data-id="${acc.id}">Edit Expense</button></a>
                    <button class="btn btn-success delete" data-id="${acc.id}">Settle</button>
                </td>
            </tr>
        `).join('');
    }

    addExpenseButton.addEventListener("click", () => {
        modal.style.display = "block";
        expenseForm.reset();
        editMode = false;
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // Handle form submission for adding or editing expenses
    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const description = document.getElementById("description").value;
        const amount = parseFloat(document.getElementById("amount").value);
        const paidBy = document.getElementById("paidBy").value;
        const splitBetween = document.getElementById("splitBetween").value.split(',').map(name => name.trim());
        const date = document.getElementById("date").value;

        if (editMode) {
            // Editing existing expense
            const expenseIndex = updatedExpenses.findIndex(exp => exp.id === editExpenseId);
            updatedExpenses[expenseIndex] = { id: editExpenseId, description, amount, paidBy, splitBetween, date };
            editMode = false; // Reset edit mode after saving
        } else {
            // Adding new expense
            const newExpense = {
                id: updatedExpenses.length ? updatedExpenses[updatedExpenses.length - 1].id + 1 : 1,
                description,
                amount,
                paidBy,
                splitBetween,
                date
            };
            updatedExpenses.push(newExpense);
        }

        // Save to localStorage
        localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
        renderExpensesTable();

        // Close the modal and reset form
        modal.style.display = "none";
        expenseForm.reset();
    });

    // Handle Edit and Delete actions dynamically
    expenseReport.addEventListener("click", (e) => {
        const target = e.target;
        const expenseId = parseInt(target.dataset.id, 10);
        if (target.classList.contains('edit')) {
            const expenseToEdit = updatedExpenses.find(exp => exp.id === expenseId);
            document.getElementById("description").value = expenseToEdit.description;
            document.getElementById("amount").value = expenseToEdit.amount;
            document.getElementById("paidBy").value = expenseToEdit.paidBy;
            document.getElementById("splitBetween").value = expenseToEdit.splitBetween.join(', ');
            document.getElementById("date").value = expenseToEdit.date;

            modal.style.display = "flex";
            editMode = true;
            editExpenseId = expenseId;
        }

        if (target.classList.contains('delete')) {
            updatedExpenses = updatedExpenses.filter(exp => exp.id !== expenseId);
            localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
            renderExpensesTable();
        }
    });
    renderExpensesTable();
});
document.addEventListener("DOMContentLoaded", () => {
    const expenseReport = document.getElementById("report").querySelector("tbody");
    const expenses = [
        {
            id: 1,
            description: "Hotel Room",
            amount: 200,
            paidBy: "Alice",
            splitBetween: ["Alice", "Bob", "Charlie", "Diana"],
            date: "2023-10-01"
        },
        {
            id: 2,
            description: "Dinner",
            amount: 80,
            paidBy: "Bob",
            splitBetween: ["Alice", "Bob", "Charlie"],
            date: "2023-10-02"
        },
        {
            id: 3,
            description: "Museum Tickets",
            amount: 60,
            paidBy: "Charlie",
            splitBetween: ["Alice", "Charlie", "Diana"],
            date: "2023-10-03"
        },
        {
            id: 4,
            description: "Taxi",
            amount: 40,
            paidBy: "Diana",
            splitBetween: ["Bob", "Charlie"],
            date: "2023-10-04"
        },
        {
            id: 5,
            description: "Lunch",
            amount: 50,
            paidBy: "Alice",
            splitBetween: ["Alice", "Diana"],
            date: "2023-10-05"
        },
        {
            id: 6,
            description: "Bobba",
            amount: 30,
            paidBy: "Vikranth",
            splitBetween: ["Alice", "Diana"],
            date: "2024-06-09"
        },
        {
            id: 7,
            description: "Football match",
            amount: 50,
            paidBy: "Diana",
            splitBetween: ["Alice", "Diana", "Vikranth"],
            date: "2024-09-27"
        },
        {
            id: 8,
            description: "Books",
            amount: 50,
            paidBy: "Vijay",
            splitBetween: ["Ram", "Sai"],
            date: "2023-10-30"
        },
        {
            id: 9,
            description: "Shopping mall",
            amount: 50,
            paidBy: "John",
            splitBetween: ["Alice", "Sai"],
            date: "2024-08-21"
        },
    ];
    let updatedExpenses = JSON.parse(localStorage.getItem('expenses')) || expenses;
    let editMode = false;
    let editExpenseId = null;
    const modal = document.getElementById("expense-form-div");
    const addExpenseButton = document.querySelector(".add-expense");
    const closeModal = document.querySelector(".close");
    const expenseForm = document.getElementById("expense-form");

    function renderExpensesTable() {
        expenseReport.innerHTML = updatedExpenses.map((acc, index) => `
            <tr data-id="${acc.id}">
                <td>${index + 1}</td>
                <td>${acc.description}</td>
                <td>${acc.amount}</td>
                <td>${acc.paidBy}</td>
                <td>${acc.splitBetween.join(', ')}</td>
                <td>${acc.date}</td>
                <td>
                    <a href="#form-divison"><button class="edit" data-id="${acc.id}">Edit Expense</button></a>
                    <button class="delete" data-id="${acc.id}">Settle</button>
                </td>
            </tr>
        `).join('');
    }

    addExpenseButton.addEventListener("click", () => {
        modal.style.display = "flex";
        expenseForm.reset();
        editMode = false;
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // Handle Edit and Delete actions dynamically
    expenseReport.addEventListener("click", (e) => {
        const target = e.target;
        const heading = document.querySelector('.form-header');
        const expenseId = parseInt(target.dataset.id, 10);
        if (target.classList.contains('edit')) {
            const expenseToEdit = updatedExpenses.find(exp => exp.id === expenseId);
            document.getElementById("description").value = expenseToEdit.description;
            document.getElementById("amount").value = expenseToEdit.amount;
            document.getElementById("paidBy").value = expenseToEdit.paidBy;
            document.getElementById("splitBetween").value = expenseToEdit.splitBetween.join(', ');
            document.getElementById("date").value = expenseToEdit.date;

            heading.innerHTML = 'Edit Expense';
            modal.style.display = "flex";
            editMode = true;
            editExpenseId = expenseId;
        }

        if (target.classList.contains('delete')) {
            updatedExpenses = updatedExpenses.filter(exp => exp.id !== expenseId);
            localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
            renderExpensesTable();
        }
    });

    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const description = document.getElementById("description").value;
        const amount = parseFloat(document.getElementById("amount").value);
        const paidBy = document.getElementById("paidBy").value;
        const splitBetween = document.getElementById("splitBetween").value.split(',').map(name => name.trim());
        const date = document.getElementById("date").value;

        if (editMode) {
            // Editing existing expense
            const expenseIndex = updatedExpenses.findIndex(exp => exp.id === editExpenseId);
            updatedExpenses[expenseIndex] = { id: editExpenseId, description, amount, paidBy, splitBetween, date };
            editMode = false; // Reset edit mode after saving
        } else {
            // Adding new expense
            const newExpense = {
                id: updatedExpenses.length ? updatedExpenses[updatedExpenses.length - 1].id + 1 : 1,
                description,
                amount,
                paidBy,
                splitBetween,
                date
            };
            updatedExpenses.push(newExpense);
        }

        localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
        renderExpensesTable();
        modal.style.display = "none";
        expenseForm.reset();
    });
    renderExpensesTable();
});
