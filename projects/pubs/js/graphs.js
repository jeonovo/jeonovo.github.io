var data, total, info, labels, values, dataObject, regionData;
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
                    dataObject = [];
                    for (var i in sheet){
                        var the_rating = Number(sheet[i].pubRating);
                        var the_region = sheet[i].region;
                        var pub = sheet[i].pubName;
                        data.push(the_region);
                        dataObject.push({region: the_region, pubName  : pub, rating: the_rating});
                    }
                    setLabels(dataObject);
                    setValues(data);
                    setStats();
                    makeChart();

                    setRatingsData(dataObject);
                    makeRatingChart();
                },
                simpleSheet: true,
            });

    }

    function setLabels(dataObject){
        data = [];
        labels =[];
        for (i in dataObject){
            data.push(dataObject[i].region);
        }
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


    }

    function setStats(){
        content = 'Total of: ' + total;

        document.getElementById('statsArea').innerHTML = content;

    }

    function setRatingsData(object){
       
        var ratingsValues = [1,2,3,4,5,6,7,8,9,10];
        regionData = []; // need to rethink the whole thing
        var currentRating = 0;
        // loop through labels
        // need an array for each rating - with each value being the regions count of that rating
        for (var i in ratingsValues){
            var the_rating = [];
            for (var index in labels){
                the_rating.push(0);
            }
            currentRating+=1;
         
            var count = 0;
            for (j in labels){
                currentRegion = labels[j];
                

                for (k in object){
                    if (object[k].region == currentRegion && Math.ceil(object[k].rating)==currentRating){
                        the_rating[j]+=1;
                    }
                }




            }

          // loop through ratings then the regions

          regionData.push(the_rating);
        }
    }

    function makeChart(){
        var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: labels,
        datasets: [{
            label: '# of Pubs',
            data: values,
            backgroundColor:
                'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1
        }]
    },
    options: {
        title: {
           display: true,
           text: 'Count of Pubs per Region'
       },
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

    function getColour(value){

      switch (value) {
        case 1:
          return 'rgba(165,0,38,0.9)'
          break;
        case 2:
          return 'rgba(215,48,39,0.9)'
          break;
        case 3:
          return 'rgba(244,109,67,0.9)'
          break;
        case 4:
          return 'rgba(253,174,97,0.9)'
          break;
        case 5:
          return 'rgba(254,224,139,0.9)'
          break;
        case 6:
         return 'rgba(217,239,139,0.9)'
          break;
        case 7:
          return 'rgba(166,217,106,0.9)'
          break;
        case 8:
          return 'rgba(102,189,99,0.9)'
          break;
        case 9:
         return 'rgba(26,152,80,0.9)'
          break;
        case 10:
          return 'rgba(0,104,55,0.9)'
          break;
        default:
          break;

      }


    }

    function makeRatingChart(){
      
        var ctx = document.getElementById("myRatingChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: labels,
        datasets: [{
            label: '1',
            data: regionData[0],
            backgroundColor: getColour(1),
            borderColor: 'black',
            borderWidth: 0.5
        },{
            label: '2',
            data: regionData[1],
            backgroundColor: getColour(2),
            borderColor: 'black',
            borderWidth: 0.5
        },{
              label: '3',
              data: regionData[2],
              backgroundColor: getColour(3),
              borderColor: 'black',
              borderWidth: 0.5
        },{
              label: '4',
              data: regionData[3],
              backgroundColor: getColour(4),
              borderColor: 'black',
              borderWidth: 0.5
        },{
              label: '5',
              data: regionData[4],
              backgroundColor: getColour(5),
              borderColor: 'black',
              borderWidth: 0.5
        },{
              label: '6',
              data: regionData[5],
              backgroundColor: getColour(6),
              borderColor: 'black',
              borderWidth: 0.5
        },{
              label: '7',
              data: regionData[6],
              backgroundColor: getColour(7),
              borderColor: 'black',
              borderWidth: 0.5
        },{
              label: '8',
              data: regionData[7],
              backgroundColor: getColour(8),
              borderColor: 'black',
              borderWidth: 0.5
        },{
              label: '9',
              data: regionData[8],
              backgroundColor: getColour(9),
              borderColor: 'black',
              borderWidth: 0.5
        },{
              label: '10',
              data: regionData[9],
              backgroundColor: getColour(10),
              borderColor: 'black',
              borderWidth: 0.5
      }
    ]
    },
    options: {
        title: {
           display: true,
           text: 'Ratings of Pubs per Region'
       },
       legend:{
           display: true,
           labels: {
               boxWidth: 10,
               fontSize: 8
           },
       },
        scales: {
            yAxes: [{
                stacked: true,
                ticks: {
                    beginAtZero:true
                }
            }],
            xAxes:[{stacked: true}]
        }
    }
});

    }
}
