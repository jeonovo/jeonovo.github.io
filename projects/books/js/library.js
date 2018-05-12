code = "1gFUU0H8yvV4gRC5Nqm3zf12vdhdYr_oDuJ2tbKR5hiY";


function init(){
  Tabletop.init({
    key: code,
    callback: function(sheet, tabletop){

        var total = 0;
        var read = 0;
        var one = 0;
        var two = 0
        var three = 0;
        var four = 0;
        var five = 0;


        for(var i in sheet){
            total +=1;
            if (sheet[i].BookRead == 'y'){
                read +=1;
            }


            switch (Number(sheet[i].Rating)) {
                case 1:
                    one +=1;
                    break;
                case 2:
                    two +=1;
                    break;
                case 3:
                    three +=1;
                    break;
                case 4:
                    four +=1;
                    break;
                case 5:
                    five +=1;
                    break;
                default:


            }

        }

        // Function calls go here
        var ratings = [one, two, three, four, five];
        setTotal(total);
        setRead(total, read);
        setRating(ratings, read);
        makeChart1(ratings);
      },
              simpleSheet: true
      });

    function setTotal(t){
        document.getElementById('headTotal').innerHTML += t;
    }

    function setRead(t,r){
        readPerc = Math.round((r/t*100)*100)/100;
        document.getElementById('readTotal').innerHTML += readPerc + "%";
    }

    function setRating(ratings, t){
        var rSum = 0;
        for (var i in ratings){
            rating = Number(i)+1;
            rSum += (ratings[i] * (rating));
        }
        console.log(rSum);
        rAverage =  Math.round(rSum/t*100)/100;
        document.getElementById('ratingAverage').innerHTML += rAverage;
    }



    function makeChart1(ratings){

        var ctx = document.getElementById("chart1").getContext('2d');
        var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
        labels: ["1", "2", "3", "4", "5"],
        datasets: [{
            label: 'Rating',
            data: ratings,
            backgroundColor: 'blue',
            borderColor: 'black',
            borderWidth: 1
        }]
        },
        options: {
        legend: {
            display: false
        },
        title: {
           display: true,
           text: 'Book Ratings'
        },
        scales: {
            yAxes: [{
                gridLines:{ display: false},
                ticks: {
                    beginAtZero:true,
                    stepSize: 5
                }
            }],
            xAxes: [{gridLines: {display: false}}]
        }
        }
        });

}















}
