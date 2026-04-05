function renderLineChart(data) {

    const ctx = document.getElementById("lineChart").getContext("2d");

    if (!ctx || data.length === 0) return;

    const sorted = [...data].sort((a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    let labels = [];
    let balance = 0;
    let balances = [];

    sorted.forEach(t => {
        if (t.type === "income") balance += t.amount;
        else balance -= t.amount;

        labels.push(t.date);
        balances.push(balance);
    });

    if (lineChart) lineChart.destroy();

    lineChart = new Chart(ctx, {
        type: "line",
        data: {
            labels,
            datasets: [{
                label: "Balance",
                data: balances,
                borderWidth: 2,
                tension: 0.3
            }]
        }
    });
}

function renderPieChart(data) {
    const ctx = document.getElementById("pieChart");

    if (!ctx || data.length === 0) return;

    let categoryTotals = {};

    data.forEach(t => {
        if (t.type === "expense") {
            if (!categoryTotals[t.category]) {
                categoryTotals[t.category] = 0;
            }
            categoryTotals[t.category] += t.amount;
        }
    });

    const labels = Object.keys(categoryTotals);
    const values = Object.values(categoryTotals);

    if (values.length === 0) return;

    if (pieChart) pieChart.destroy();

    pieChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels,
            datasets: [{
                data: values
            }]
        }
    });
}
