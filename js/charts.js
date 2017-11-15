myApp.onPageInit('charts', function (page) {
    $$('.tab-link').on('click', function(){
        if(charts.myLineChart) {                //Небольшой костыль для показа анимации по переключению между tabs
            charts.myLineChart.destroy();
        }
        if(charts.myBarChart) {
            charts.myBarChart.destroy();
        }
        setTimeout(function(){
            charts.buildCharts();
        },50);
    });
});

var charts = {
    myLineChart: '',
    myBarChart: '',
    datas: [5,10,7,11,5,13,10,5,11,5,12,8],
    buildCharts: function(){
        if(this.myLineChart) {              //Линейный график
            this.myLineChart.destroy();
        }

        var ctx = document.getElementById("myLineChart").getContext("2d");

        this.myLineChart = new Chart(ctx,{
            type: 'line',
            data: {
                labels: [0,1,2,3,4,5,6,7,8,9,10,11],
                datasets: [{
                    data: charts.datas,
                    backgroundColor: 'transparent',
                    borderColor: 'blue'
                }]
            },
            options: {
                responsive: true,
                legend: {
                    display: false
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    xAxes: [{
                        display: true
                    }],
                    yAxes: [{
                        display: true
                    }]
                }
            }
        });

        if(this.myBarChart) {               //Столбчатый график
            this.myBarChart.destroy();
        }

        var ctx2 = document.getElementById("myBarChart").getContext("2d");

        this.myLineChart = new Chart(ctx2,{
            type: 'bar',
            data: {
                labels: [0,1,2,3,4,5,6,7,8,9,10,11],
                datasets: [{
                    data: charts.datas,
                    backgroundColor: 'blue'
                }]
            },
            options: {
                responsive: true,
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        stacked: true
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                }
            }
        });
    }
};