var data, total, info, labels, values, ratings;
var code = "1iu4HALT16VaYxQp200oDE8mA6yal_Yf4GsMN9bW7-Z8"
function initGraphs(){

    getData();

  function getData(value){
        console.log("get data");
        // loop through spreadsheet with Tabletop
            Tabletop.init({
                key: code,
                callback: function(sheet, tabletop){
                    data = [];
                    for (var i in sheet){
                        var rating = Number(sheet[i].pubRating);
                        var region = sheet[i].region;
                        var pub = sheet[i].pubName;
                        data.push(region);
                    }
                    setLabels(data);
                    setValues(data);
                    setStats();
                    makeChart();
                },
                simpleSheet: true,
            });

    }

    function setLabels(data){
        labels =[];

        for (i in data){
            if (labels.indexOf(data[i]) < 0){
                labels.push(data[i])
            }

}
    }

    function setValues(data){
        values = [];
        total = data.length;
        for (i in labels){
            count = 0;
            var region = labels[i];
            for (i in data){
                if (data[i] == region){
                    count+=1;
                }
            }
            values.push(count);
        }

        console.log(values);
    }

    function setStats(){
        content = 'Total of: ' + total;

        document.getElementById('statsArea').innerHTML = content;

    }

    function makeChart(){

        console.log(labels);

        var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: labels,
        datasets: [{
            label: '# of Pubs',
            data: values,
            backgroundColor:
                'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

    }
}
