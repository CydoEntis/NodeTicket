const ctx = document.getElementById('myChart');

const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();

const pastDays = [];
for(let i = 7; i >= 0; i--) {
  let currDay = day - i;
  pastDays.push(month + "/" + currDay + "/" + year);
}

const getWeeklyTasks = async () => {
    let res = await fetch("/weeklyTasks");
    let data = await res.json();

    const weeklyTasks = Object.keys(data).map((val) => data[val])

    return weeklyTasks;
}

const createChart = async () => {
    const weeklyTasks = await getWeeklyTasks();

    const taskChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: pastDays,
            datasets: [{
                label: '# of Complete Tickets',
                data: weeklyTasks,
                backgroundColor: '#E85a1e',
                borderColor: '#E85a1e',
                borderWidth: 3
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

createChart();


