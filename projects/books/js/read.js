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

        makeTable1(columns, rows);


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
            if (array[i] != 'None'){
                  if (data.indexOf(array[i]) < 0){
                      data.push(array[i])
                    }
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




function makeTable1(c,r){

    // columns = [{ "name": "id", "title": "ID"}]
   // rows = [ { "id": 1, "firstName": "Dennise", "lastName": "Fuhrman", "jobTitle": "High School History Teacher", "started": "November 8th 2011", "dob": "July 25th 1960" }]
    jQuery(function($){
	$('.table').footable({
     "useParentWidth": true,
     "filtering": {
				"enabled": true
			},
        "paging": {
        "enabled": true,
        "size": 10
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
