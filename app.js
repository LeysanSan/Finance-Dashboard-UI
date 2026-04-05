let searchQuery = "";
function handleSearch(query) {
    searchQuery = query.toLowerCase();
    renderAll();
}
// Mock data
let transactions = [
    { id: 1, amount: 1000, type: "income", category: "Salary", date: "2026-04-01" },
    { id: 2, amount: 200, type: "expense", category: "Groceries", date: "2026-04-02" },
    { id: 3, amount: 150, type: "expense", category: "Elettricity", date: "2026-04-03" },
    { id: 4, amount: 500, type: "income", category: "Some passive income", date: "2026-04-04" },
    { id: 5, amount: 560, type: "expense", category: "Car Insurance", date: "2026-04-01" },
    { id: 6, amount: 220, type: "expense", category: "Veterinary Bill", date: "2026-04-02" },
    { id: 7, amount: 350, type: "income", category: "Birthday Gift from colleagues", date: "2026-04-03" },
    { id: 8, amount: 50, type: "expense", category: "Petrol", date: "2026-04-04" },
];

let currentFilter = "all";
let lineChart;
let pieChart;

// FILTER FUNCTION
function filterType(type) {
    currentFilter = type;
    renderAll();
}

//  CALCULATIONS
function calculateSummary(data) {
    let income = 0;
    let expenses = 0;

    data.forEach(t => {
        if (t.type === "income") income += t.amount;
        if (t.type === "expense") expenses += t.amount;
    });

    return {
        balance: income - expenses,
        income,
        expenses
    };
}

//  RENDER SUMMARY
function renderSummary(data) {
    const summary = calculateSummary(data);
    const container = document.getElementById("summary");

    container.innerHTML = `
    <div class="col-md-4">
      <div class="card p-3">
        <h6>Total Balance</h6>
        <h4>$${summary.balance}</h4>
      </div>
    </div>

    <div class="col-md-4">
      <div class="card p-3">
        <h6>Income</h6>
        <h4 class="text-success">$${summary.income}</h4>
      </div>
    </div>

    <div class="col-md-4">
      <div class="card p-3">
        <h6>Expenses</h6>
        <h4 class="text-danger">$${summary.expenses}</h4>
      </div>
    </div>
  `;
}

//  RENDER TRANSACTIONS
function renderTransactions(data) {
    const container = document.getElementById("transactions");

    if (data.length === 0) {
        container.innerHTML = "<p>No transactions found.</p>";
        return;
    }

    container.innerHTML = "";

    data.forEach(t => {
        container.innerHTML += `
      <div class="transaction">
        <div>
          <strong>${t.category}</strong><br/>
          <small>${t.date}</small>
        </div>
        <div class="${t.type === "income" ? "text-success" : "text-danger"}">
          ${t.type === "income" ? "+" : "-"}$${t.amount}
        </div>
      </div>
    `;
    });
}

//  MAIN RENDER FUNCTION
function renderAll() {
    let filtered = transactions;

    // filter by type
    if (currentFilter !== "all") {
        filtered = filtered.filter(t => t.type === currentFilter);
    }

    // 🔍 filter by search
    if (searchQuery) {
        filtered = filtered.filter(t =>
            t.category.toLowerCase().includes(searchQuery)
        );
    }

    renderSummary(filtered);
    renderTransactions(filtered);

    // charts
    renderLineChart(transactions); // keep full data
    renderPieChart(filtered);
}

//  INITIAL LOAD renderAll();

let currentRole = "user";

function changeRole(role) {
    currentRole = role;
    localStorage.setItem("role", role);

    const btn = document.getElementById("addBtn");
    btn.style.display = role === "admin" ? "inline-block" : "none";

}
// only Admin can do
function addTransaction() {
    const amount = prompt("Enter amount:");
    const category = prompt("Enter category:");
    const type = prompt("Type: income or expense");

    if (!amount || !category || !type) return;

    // normalize type (important!)
    const normalizedType = type.toLowerCase();

    if (normalizedType !== "income" && normalizedType !== "expense") {
        alert("Type must be 'income' or 'expense'");
        return;
    }

    transactions.push({
        id: Date.now(),
        amount: Number(amount),
        category,
        type: normalizedType,
        date: new Date().toISOString().split("T")[0]
    });

    renderAll(); // 
}
function generateInsights(data) {
    if (data.length === 0) return ["No data available"];

    let categoryTotals = {};
    let income = 0;
    let expenses = 0;

    data.forEach(t => {
        if (t.type === "income") income += t.amount;
        if (t.type === "expense") expenses += t.amount;

        if (!categoryTotals[t.category]) {
            categoryTotals[t.category] = 0;
        }

        categoryTotals[t.category] += t.amount;
    });

    // Find highest category
    let topCategory = "N/A";

    if (Object.keys(categoryTotals).length > 0) {
        topCategory = Object.keys(categoryTotals).reduce((a, b) =>
            categoryTotals[a] > categoryTotals[b] ? a : b
        );
    }

    return [
        `Top category: ${topCategory}`,
        `You spent $${expenses} in total`,
        `You earned $${income}`,
        income > expenses
            ? "You're saving money 👍"
            : "Your expenses are higher than income ⚠️"
    ];
}

function renderInsights(data) {
    function renderInsights(data) {
        console.log("👉 Rendering insights with:", data);

        const container = document.getElementById("insights");

        if (!container) {
            console.log("❌ insights container not found");
            return;
        }

        const insights = generateInsights(data);

        console.log("👉 Insights array:", insights);

        container.innerHTML = "";

        insights.forEach(text => {
            container.innerHTML += `<p>• ${text}</p>`;
        });
    }
    const container = document.getElementById("insights");
    const insights = generateInsights(data);

    container.innerHTML = "";

    insights.forEach(text => {
        container.innerHTML += `<p>• ${text}</p>`;
    });
}

function openInsights() {
    prepareInsights();

    const modalEl = document.getElementById("insightsModal");
    const modal = new bootstrap.Modal(modalEl);

    modal.show();
}
function prepareInsights() {

    let filtered = transactions;

    if (currentFilter !== "all") {
        filtered = transactions.filter(t => t.type === currentFilter);
    }

    renderInsights(filtered);
}

document.addEventListener("DOMContentLoaded", () => {
    const savedRole = localStorage.getItem("role") || "user";
    changeRole(savedRole);
    renderAll();
});