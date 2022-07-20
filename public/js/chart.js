console.log("Hello world");

const ctx = document.getElementById('myChart');

const today = new Date();
const date = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();

const pastDays = [];
for(let i = 7; i >= 0; i--) {
  let day = date - i;
  pastDays.push(month + "/" + day + "/" + year);
}

console.log(pastDays)

console.log(date);

// const pastWeek =

const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: pastDays,
        datasets: [{
            label: '# of Complete Tickets',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: '#E85a1e',
            // backgroundColor: [
            //     'rgba(255, 99, 132, 0.2)',
            //     'rgba(54, 162, 235, 0.2)',
            //     'rgba(255, 206, 86, 0.2)',
            //     'rgba(75, 192, 192, 0.2)',
            //     'rgba(153, 102, 255, 0.2)',
            //     'rgba(255, 159, 64, 0.2)'
            // ],
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