document.addEventListener("DOMContentLoaded", () => {
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

    // Calculate total expenses by person
    const expensesByPerson = updatedExpenses.reduce((acc, expense) => {
        acc[expense.paidBy] = (acc[expense.paidBy] || 0) + expense.amount;
        return acc;
    }, {});

    // Calculate total expenses by date for Line Chart
    const expensesByDate = updatedExpenses.reduce((acc, expense) => {
        const date = expense.date;
        acc[date] = (acc[date] || 0) + expense.amount;
        return acc;
    }, {});

    // Pie Chart - Distribution of Expenses by Person
    const ctxPerson = document.getElementById('personExpenses').getContext('2d');
    const personExpenses = new Chart(ctxPerson, {
        type: 'pie',
        data: {
            labels: Object.keys(expensesByPerson),
            datasets: [{
                label: 'Expense Distribution (%)',
                data: Object.values(expensesByPerson),
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(50, 205, 50, 1)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(50, 205, 50, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Distribution of Total Expenses by Person',
                    font: {
                        size: 15
                    }
                },
                legend: {
                    display: true,
                    labels: {
                        font: {
                            size: 15
                        }
                    },
                }
            }
        },
    });

    // Line Chart - Trend of Expenses over Time
    const ctxYear = document.getElementById('yearLineChart').getContext('2d');
    const yearLineChart = new Chart(ctxYear, {
        type: 'line',
        data: {
            labels: Object.keys(expensesByDate),
            datasets: [{
                label: 'Total Expenses ($)',
                data: Object.values(expensesByDate),
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Amount in USD'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Trend of Expenses Over Time'
                }
            }
        }
    });

    const ctxBar = document.getElementById('barChart').getContext('2d');
    const expensesByDescription = updatedExpenses.reduce((acc, expense) => {
        const description = expense.description;
        acc[description] = (acc[description] || 0) + expense.amount;
        return acc;
    }, {});
    const barChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: Object.keys(expensesByDescription), // Expense descriptions
            datasets: [{
                label: 'Total Amount Spent ($)',
                data: Object.values(expensesByDescription), // Corresponding total expenses for each description
                backgroundColor: 'rgba(54, 162, 235, 1)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Amount in USD'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Expense Description'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Total Expenses by Description'
                }
            }
        }
    });
});
