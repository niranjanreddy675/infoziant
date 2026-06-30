let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const list = document.getElementById("expenseList");
const total = document.getElementById("total");

let chart;

render();

function saveData() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function addExpense() {

    const name = document.getElementById("name").value.trim();
    const amount = parseFloat(document.getElementById("amount").value);
    const category = document.getElementById("category").value;

    if (name === "" || isNaN(amount) || amount <= 0) {
        alert("Enter valid details");
        return;
    }

    expenses.push({
        name,
        amount,
        category
    });

    saveData();

    document.getElementById("name").value = "";
    document.getElementById("amount").value = "";

    render();

}

function deleteExpense(index) {

    expenses.splice(index, 1);

    saveData();

    render();

}

function render() {

    list.innerHTML = "";

    let sum = 0;

    expenses.forEach((expense, index) => {

        sum += expense.amount;

        list.innerHTML += `

        <tr>

        <td>${expense.name}</td>
        <td>${expense.category}</td>
        <td>₹${expense.amount}</td>

        <td>

        <button class="delete" onclick="deleteExpense(${index})">
        Delete
        </button>

        </td>

        </tr>

        `;

    });

    total.textContent = sum;

    updateChart();

}

function updateChart() {

    const categories = {};

    expenses.forEach(expense => {

        if (categories[expense.category]) {
            categories[expense.category] += expense.amount;
        }
        else {
            categories[expense.category] = expense.amount;
        }

    });

    const labels = Object.keys(categories);
    const values = Object.values(categories);

    const ctx = document.getElementById("expenseChart");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {

        type: 'pie',

        data: {

            labels: labels,

            datasets: [{

                data: values,

                backgroundColor: [
                    '#ff6384',
                    '#36a2eb',
                    '#ffcd56',
                    '#4bc0c0',
                    '#9966ff'
                ]

            }]

        }

    });

}