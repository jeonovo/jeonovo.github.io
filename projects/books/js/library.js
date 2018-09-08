code = "1gFUU0H8yvV4gRC5Nqm3zf12vdhdYr_oDuJ2tbKR5hiY";
code2 = "19Ma2034WrpjASMByNuB0fL8Fsa8uYgwRvwVg7QimJsE";

var barColour = '#ffbfbf';
var lineColour = '';
var readTarget = 30;
var xAx = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var notOnTarget = '#F2757F';
var onTarget = '#7ff275'
var currentYear = 2018;

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
        var yearRead = [];
        var nat = [];
        var booktypes =[];
        var dqTotal = 0;
        var dqGap = 0;
        var authors = [];
        var pagesRead = [];
        var columns = [
            { "name": "id", "title": "ID"},
            { "name": "book", "title": "Book" },
            { "name": "name", "title": "Name"},
            { "name": "fin", "title": "Finished"},
            { "name": "rating", "title": "Rating"},
            { "name": "grating", "title": "Goodreads"}];
        var rows = [];
        var booksReadTarget = [];
        var booksRead = [];

        for(var i in sheet){

          for (var j in sheet[i]){
            dqTotal +=1;

            if (sheet[i][j] == "None" || sheet[i][j] == "uk"){
              dqGap +=1;
            }

          }
            total +=1;
            if (sheet[i].BookRead == 'y'){
                booksRead.push(sheet[i].DateRead);
                read +=1;
                year = sheet[i].DateRead.substring(0,4);
                var obj ={ "id": sheet[i].BookID, "book": sheet[i].Book, "name":sheet[i].FirstName +" "+ sheet[i].SecondName , "fin": sheet[i].DateRead, "rating":Number(sheet[i].Rating) , "grating": Number(sheet[i].avgrating)}
                rows.push(obj);
                if (year == currentYear){
                    booksReadTarget.push(sheet[i].DateRead);
                    pagesRead.push([sheet[i].DateRead,Number(sheet[i].Pages)]);

                }
                yearRead.push(Number(year));
            }

            nat.push(sheet[i].Nationality);
            authors.push(sheet[i].FirstName + sheet[i].SecondName);
            booktypes.push(sheet[i].BookType);

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
        setAuthors(authors);
        setNat(nat);
        setDQ(dqGap, dqTotal);
        makeChart1(ratings);
        makeChart2(yearRead);
        makeChart3(booktypes);
        makeChart4(pagesRead);
        makeChart5(booksReadTarget);
        makeChart6(pagesRead);
        makeTable1(columns, rows);
        makeChart8(booksRead);

      },
              simpleSheet: true
      });

      Tabletop.init({
        key: code2,
        callback: function(sheet_2, tabletop){

          var current_reading = [];

          for (var j in sheet_2){
              var data = [];

            var b = sheet_2[j].book_name;
            var p = sheet_2[j].current_page;
            var lp = sheet_2[j].total_page;
            //console.log(b);
            data.push(b);
            data.push(p);
            data.push(lp);
            current_reading.push(data);

          }

          makeChart7(current_reading);

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
        rAverage =  Math.round(rSum/t*100)/100;
        document.getElementById('ratingAverage').innerHTML += rAverage;
    }

    function setAuthors(auths){

        var authorCount = getUniqueNames(auths);
        document.getElementById('authTotal').innerHTML += authorCount;

    }

    function setNat(nats){

        var nations = getUniqueNames(nats);
        document.getElementById('natTotal').innerHTML += nations;

    }

    function getUniqueNames(array){


        var data = [];
        for (i in array){
                  if (data.indexOf(array[i]) < 0){
                      data.push(array[i])
                  }
              }
        var unique = data.length;

        return unique
    }

    function setDQ(gap, total){

      var numer = total - gap;
      dq =  Math.round((numer/total*100)*100)/100;
      document.getElementById('dqTotal').innerHTML += dq + "%";
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
            backgroundColor: barColour,
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

function makeChart2(years){

  labels = [];
  data = [];

  for (i in years){
            if (labels.indexOf(years[i]) < 0){
                labels.push(years[i])
            }
        }
  labels.sort(function(a, b){return a-b});

  for (var i in labels){
    currentYear = labels[i];
    count = 0;
    for (var j in years){
      if (years[j] == currentYear){
        count+=1;
      }
    }

    data.push(count);

  }


  var ctx = document.getElementById("chart2").getContext('2d');
  var myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
            label: 'Read',
            data: data,
            pointBackgroundColor: '#92A8D1',
            pointBorderColor: 'black',
            pointBorderWidth: 2,
            pointRadius: 5,
            fill: false,
            borderColor: '#92A8D1'
        }]},
        options: {
          title: {
		       display: true,
		       text: 'Year Read'
		    },
        legend: {
            display: false
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
      //options: options
  }});



}
function makeChart3(bt){

  labels = [];
  data = [];
  for (i in bt){
            if (labels.indexOf(bt[i]) < 0){
                labels.push(bt[i])
            }
        }

        for (var i in labels){
          currentType = labels[i];
          count = 0;
          for (var j in bt){
            if (bt[j] == currentType){
              count+=1;
            }
          }
          data.push(count);
        }

    var ctx = document.getElementById("chart3").getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
    labels: labels,
    datasets: [{
        label: 'Rating',
        data: data,
        backgroundColor: barColour,
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
       text: 'Book Types'
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

function makeChart4(br){

    pytd = getPagesYTD(br);


    var ctx = document.getElementById("chart4").getContext('2d');
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: xAx,
          datasets: [{
              label: 'Read',
              data: pytd,
              pointBackgroundColor: '#92A8D1',
              pointBorderColor: 'black',
              pointBorderWidth: 2,
              pointRadius: 5,
              fill: false,
              borderColor: '#92A8D1'
          }]},
          options: {
            title: {
                 display: true,
                 text: 'Pages Read'
              },
          legend: {
              display: false
          },
          scales: {
              yAxes: [{
                  gridLines:{ display: false},
                  ticks: {
                      beginAtZero:true

                  }
              }],
              xAxes: [{gridLines: {display: false}}]
          }
        //options: options
    }});
}

function makeChart5(bt){

    var data = [0,0,0,0,0,0,0,0,0,0,0,0];
    var target = [];
    var readYTD = [];

    for (var i in xAx){

      var t = 2.5;
      target.push(Math.floor(t * (Number(i) + 1)));

    }

    for (var i in xAx){

      currentMonth = Number(i) + 1;
    //  console.log(currentMonth);
      count = 0;
      for (var j  in bt){

        readMonth = Number(bt[j].substring(5,7));
        if (readMonth == currentMonth){
          count +=1;
        }
      }
      data[i] = count;
    }

    var runningTotal = 0;
    for (var i in data){
      runningTotal += data[i];
      readYTD.push(runningTotal);

    }

    yes = [];
    no = [];

    for (var i in readYTD){

      if (readYTD[i] >= target[i]){

        yes.push(readYTD[i])
        no.push(0);

      } else {

        yes.push(0);
        no.push(readYTD[i]);

      }

    }

    var ctx = document.getElementById("chart5").getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
    labels: xAx,
    datasets: [{
        label: 'On Target',
        data: yes,
        backgroundColor: onTarget,
        borderColor: 'black',
        borderWidth: 1,
        stack: 1
    },{
      label: 'Not On Target',
      data: no,
      backgroundColor: notOnTarget,
      borderColor: 'black',
      borderWidth: 1,
      stack: 1
    }]
    },
    options: {
    legend: {
        display: false
    },
    title: {
       display: true,
       text: 'Books Read - Target'
    },
    scales: {
        yAxes: [{
            gridLines:{ display: false},
            ticks: {
                max: readTarget,
                beginAtZero:true
            }
        }],
        xAxes: [{
          stacked: true,
          gridLines: {display: false}}]
    }
    }
    });

}

function makeChart6(br){

    var pytdt = getPagesYTD(br);

    var dailyRead = (readTarget * 240)/365
    var months = [31, 28, 31,30,31,30,31,31,30,31,30,31];
    var targetMonthPage =[];
    var endTarget = 0;

    for (i in months){
        var m = dailyRead * months[i];
        endTarget += m;
        targetMonthPage.push(Math.floor(endTarget));
    }

    var projectedPages = [];

    var month = new Date().getMonth()+1;

    var totalPages = pytdt[month-1];

    var sumDays = 0;

    for (i in months){
        if (i <= month){
            sumDays += months[i];
        }
    }

    var projectedDailyRead = totalPages/sumDays;

    var prt = totalPages;

    for (var i in pytd){
        if (i <= month -1){
            totalPages += pytdt[i];
            projectedPages.push(pytdt[i])
        } else {

            var ap = projectedDailyRead*months[i];
            prt+=ap;
            projectedPages.push(Math.floor(prt));

        }
    }



      var ctx = document.getElementById("chart6").getContext('2d');
      var myLineChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: xAx,
            datasets: [{
                label: 'Read',
                data: projectedPages,
                pointBackgroundColor: getPointColour(projectedPages, targetMonthPage),
                pointBorderColor: getPointColour(projectedPages, targetMonthPage),
                pointBorderWidth: 1,
                pointRadius: 5,
                fill: false,
                borderColor: '#92A8D1'
            },{
              label: 'Target',
              data: targetMonthPage,
              pointBackgroundColor: 'lightgrey',
              pointBorderColor: 'black',
              pointBorderWidth: 0,
              pointRadius: 0,
              borderDash: [5,10],
              fill: false,
              borderColor: 'lightgrey'

            }]},
            options: {
              title: {
                   display: true,
                   text: 'Projected Pages Read'
                },
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    gridLines:{ display: false},
                    ticks: {
                        beginAtZero:true

                    }
                }],
                xAxes: [{gridLines: {display: false}}]
            }
          //options: options
      }});

}

function makeChart7(cr){

  var booknameAxis = [];
  var readingdone = [];
  var readingtodo = [];

  for (var i in cr){

    booknameAxis.push(cr[i][0]);
    readingdone.push(cr[i][1]);
    readingtodo.push(cr[i][2]);
  }

    var ctx = document.getElementById("chart7").getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
    labels: booknameAxis,
    datasets: [{
        label: 'Pages Read',
        data: readingdone,
        backgroundColor: '#ffbec4',
        borderColor: 'black',
        borderWidth: 1
    },{
      label: 'Pages To Read',
      data: readingtodo,
      backgroundColor: '#f5f5f5',
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
       text: 'Currently Reading'
    },
    scales: {
        yAxes: [{
          stacked: true,
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

function makeTable1(c,r){

    // columns = [{ "name": "id", "title": "ID"}]
   // rows = [ { "id": 1, "firstName": "Dennise", "lastName": "Fuhrman", "jobTitle": "High School History Teacher", "started": "November 8th 2011", "dob": "July 25th 1960" }]
    jQuery(function($){
	$('.table').footable({
        "paging": {
        "enabled": true,
        "size": 5
    },"sorting": {
			"enabled": true
		},
		"columns": c,
		"rows": r
	});
});
}

function makeChart8(br){

    years = [currentYear, currentYear -1, currentYear -2];

    y1 = [];
    y2 = [];
    y3 = [];

    // loop through the 3 year variables want to count for
    for (var i in years){

        cy = years[i];

        var cT = 0;


    for (var j in xAx){

        cm = Number(j)+1

        for (var k in br){

            var mT = 0;
                var year = Number(br[k].substring(0,4));
                var month = Number(br[k].substring(5,7));

                if (year == cy && month == cm){

                    mT+=1;
                } else {
                    mT += 0;
                }

                cT += mT;

                }

                // this is where the month counting happens and the push to array
                if (cy == years[0]){
                    y1.push(cT)
                } else if (cy == years[1]) {

                    y2.push(cT)

                } else if (cy == years[2]){

                    y3.push(cT);
                }
            }

        }

  var ctx = document.getElementById("chart8").getContext('2d');
  var myChart = new Chart(ctx, {
  type: 'line',
  data: {
  labels: xAx,
  datasets: [{
      label: '2018',
      data: y1,
      pointBackgroundColor: 'red',
      pointBorderColor: 'red',
      borderColor: 'pink',
      pointBorderWidth: 1,
      pointRadius: 5,
      fill: false
  },{
    label: '2017',
    data: y2,
    pointBackgroundColor: 'blue',
    pointBorderColor: 'blue',
    borderColor: 'lightblue',
    pointBorderWidth: 1,
    pointRadius: 5,
    fill: false
  },{
    label: '2016',
    data: y3,
    pointBackgroundColor: 'green',
    pointBorderColor: 'green',
    borderColor: 'lightgreen',
    pointBorderWidth: 1,
    pointRadius: 5,
    fill: false
  }]
  },
  options: {
  legend: {
      display: true
  },
  title: {
     display: true,
     text: 'Books Reads - Year'
  },
  scales: {
      yAxes: [{
          gridLines:{ display: false},
          ticks: {
              max: readTarget,
              beginAtZero:true
          }
      }],
      xAxes: [{
        gridLines: {display: false}}]
  }
  }
  });

}


function getPointColour(array, target){
var colours =[];
    for (i in array){
        if(array[i] >= target[i]){
            colours.push(onTarget)
        } else {
            colours.push(notOnTarget)
        }
    }
    return colours;
}

function getPagesYTD(br){
    var data = [0,0,0,0,0,0,0,0,0,0,0,0];
    var pagesYTD = [];
    var runningPageTotal = 0;

    for (var i in xAx){

      currentMonth = Number(i) + 1;
    //  console.log(currentMonth);
      var pageTotal = 0;
      for (var j  in br){


        readMonth = Number(br[j][0].substring(5,7));

        if (readMonth == currentMonth){
          pageTotal += br[j][1];
        }

      }
      data[i] = pageTotal;
    }

    var runningTotal = 0;
    for (var i in data){
      runningPageTotal += data[i];
      pagesYTD.push(runningPageTotal);

    }

    return pagesYTD;
}
}
