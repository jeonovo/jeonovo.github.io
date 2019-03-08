var code = "1sJnDALGCVLJf1ghSKBlJ_7cMmhvDjh7z47_d9me2qbo";
var code2 = "16NwJpO_O_ZP_pX0kge06I3Kj6c5ahBnmaXv3M7V3s3k";
var code3 = "15VDtKdl_jwGm8gyBU45OEzfVwpDSoen8KuOkslxWaj4";
var code4 = "1AZWrWbR07dp5Qqr0HPspndVBfT_vRhNTCk-8pLBlS8s";
var map;
var points = [];
var runLayer = L.featureGroup();

function init(){

      Tabletop.init({
        key: code,
        callback: function(sheet_3, tabletop){
           var max = 0;
           var runcount = 0;
           var totaldistance = 0;
           var totalseconds = 0;
           var fteendistance = 0;
           var tenkdistance = 0;
           var fivekdistance = 0;
           var fteenseconds = 0;
           var tenkseconds = 0;
           var fivekseconds = 0;
           var fivecount = 0;
           var tencount = 0;
           var fteencount = 0;
           var progress = [];
           var fivekscatter = [];
           var tenkscatter = [];
           var columns = [
              { "name": "Run", "title": "Run"},
              { "name": "RunDate", "title": "RunDate" },
              { "name": "Distance", "title": "Distance"},
              { "name": "MinutesReal", "title": "MinutesReal"},
              { "name": "MinutesDecimalised", "title": "MinutesDecimalised"},
              { "name": "Seconds", "title": "Seconds"},
              { "name": "Metres", "title": "Metres"},
              { "name": "KPM", "title": "KPM"}
            ];

          for (var j in sheet_3){


            if (Number(sheet_3[j].Distance) > max){

              max = Number(sheet_3[j].Distance);
              //console.log(max);
            }

            runcount+=1;

            totaldistance += Number(sheet_3[j].Distance)

            if (Number(sheet_3[j].Distance) > 15){

              fteencount +=1;
              fteenseconds += Number(sheet_3[j].Seconds)
              fteendistance += Number(sheet_3[j].Metres)
              var fteenobj = {x: fteencount, y: Number(sheet_3[j].KPM)}



            } else if (Number(sheet_3[j].Distance) > 10){

              tencount +=1;
              tenkseconds += Number(sheet_3[j].Seconds)
              tenkdistance += Number(sheet_3[j].Metres)
              var tenobj = {x: tencount, y: Number(sheet_3[j].KPM)}
              tenkscatter.push(tenobj);


            } else {
              fivecount +=1;
              fivekseconds += Number(sheet_3[j].Seconds)
              fivekdistance += Number(sheet_3[j].Metres)
              var fiveobj = {x: fivecount, y: Number(sheet_3[j].KPM)}
              fivekscatter.push(fiveobj);
            }

            var obj ={ "Run": Number(sheet_3[j].Run), "RunDate": sheet_3[j].RunDate, "Distance": Number(sheet_3[j].Distance), "MinutesReal": Number(sheet_3[j].MinutesReal), "MinutesDecimalised": Number(sheet_3[j].MinutesDecimalised),"Seconds": Number(sheet_3[j].Seconds),"Metres": Number(sheet_3[j].Metres),"KPM": Number(sheet_3[j].KPM)  }
            progress.push(obj);

          }

            getSplitData();
            getFTSplitData();
            setRuns(runcount);
            setTotalDistance(totaldistance);
            setFive(fivecount, fivekseconds,fivekdistance);
            setTen(tencount,tenkseconds,tenkdistance);
            setFteen(fteencount, fteenseconds, fteendistance);
            makeChart1(max);
            makeChart2(tenkscatter);
            makeTable1(columns, progress);
        },

        simpleSheet: true
      });


    function setRuns(obj){

        document.getElementById('day').innerHTML += "5:40";
          //getRunPoints(1);
    }

    function setTotalDistance(obj){

      obj = Math.round(obj * 100)/100

        document.getElementById('runTotal').innerHTML += obj;
    }

    function setFive(c, t, d){
        kpm = getPace(t,d);
        document.getElementById('fivek').innerHTML += c + " | " + kpm;
    }

    function setTen(c, t, d){

      kpm = getPace(t,d);

        document.getElementById('tenk').innerHTML += c + " | " + kpm;

    }

    function setFteen(c, t,d){

      kpm = getPace(t,d);

        document.getElementById('fifteenk').innerHTML += c + " | " + kpm;

    }

    function getPace(time, distance){

      var decPace = 16.6667 / (distance /  time);

      var floored =  Math.floor(decPace);

      var remainder = Math.round(((decPace - floored) * 60 / 100)*100)/100;

      var kpm = floored + remainder;

      return kpm;


    }

    function getSplitData(){

      Tabletop.init({
        key: code3,
        callback: function(sheet_r, tabletop){

          var runningdataset = [];

          for (var s in sheet_r){
              var runid = sheet_r[s].run;
              //console.log(String(sheet_r[s].one).replace(":","."))
              var pace = [
                Number(String(sheet_r[s].one).replace(":",".")),
                Number(String(sheet_r[s].two).replace(":",".")),
                Number(String(sheet_r[s].three).replace(":",".")),
                Number(String(sheet_r[s].four).replace(":",".")),
                Number(String(sheet_r[s].five).replace(":",".")),
                Number(String(sheet_r[s].six).replace(":",".")),
                Number(String(sheet_r[s].seven).replace(":",".")),
                Number(String(sheet_r[s].eight).replace(":",".")),
                Number(String(sheet_r[s].nine).replace(":",".")),
                Number(String(sheet_r[s].ten).replace(":",".")), ];

                if (runid == "avg"){
                  var obj = { label: runid, data: pace, fill: false, backgroundColor: 'orange', borderColor: 'orange', borderWidth: 3};
                } else {

                  var obj = { label: runid, data: pace, fill: false, borderWidth: 2, borderColor: 'lightgrey', pointHoverBackgroundColor: 'pink', pointRadius: 0 };
                }

              runningdataset.push(obj);
            //  console.log(pace);

          }

          makeChart3(runningdataset);
        },

        simpleSheet: true
      });


    }

    function getFTSplitData(){

      Tabletop.init({
        key: code4,
        callback: function(sheet_r, tabletop){

          var runningdataset = [];

          for (var s in sheet_r){
              var runid = sheet_r[s].run;
              //console.log(String(sheet_r[s].one).replace(":","."))
              var pace = [
                Number(String(sheet_r[s].one).replace(":",".")),
                Number(String(sheet_r[s].two).replace(":",".")),
                Number(String(sheet_r[s].three).replace(":",".")),
                Number(String(sheet_r[s].four).replace(":",".")),
                Number(String(sheet_r[s].five).replace(":",".")),
                Number(String(sheet_r[s].six).replace(":",".")),
                Number(String(sheet_r[s].seven).replace(":",".")),
                Number(String(sheet_r[s].eight).replace(":",".")),
                Number(String(sheet_r[s].nine).replace(":",".")),
                Number(String(sheet_r[s].ten).replace(":",".")),
                Number(String(sheet_r[s].eleven).replace(":",".")),
                Number(String(sheet_r[s].twelve).replace(":",".")),
                Number(String(sheet_r[s].thirteen).replace(":",".")),
                Number(String(sheet_r[s].fourteen).replace(":",".")),
                Number(String(sheet_r[s].fifteen).replace(":","."))];

                if (runid == "avg"){
                  var obj = { label: runid, data: pace, fill: false, backgroundColor: 'red', borderColor: 'red', borderWidth: 3};
                } else {

                  var obj = { label: runid, data: pace, fill: false, borderWidth: 2, borderColor: 'lightgrey', pointHoverBackgroundColor: 'pink', pointRadius: 0 };
                }

              runningdataset.push(obj);
            //  console.log(pace);

          }

          makeChart4(runningdataset);
        },

        simpleSheet: true
      });


    }

    function makeChart1(c,t){

    var currentMax = c
    var  targetM = 21 - c;


var ctx = document.getElementById("chart1").getContext('2d');
      var myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data : {
    datasets: [{
        data: [currentMax, targetM],
        backgroundColor : ['#ffd1dc','lightgrey'],
        borderColor: ['white', 'white']
    }],
    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
        'Furthest Ran',
        'Left To Run'
    ]},
    options: {
      title: {
              display: true,
              text: 'Half Marathon Target'
          },
    legend: {
            display: false
          },
    rotation: -1 * Math.PI ,
    circumference:  Math.PI
    }
});

    }



    function makeChart2(dataset){

      avgdataset = getRunningAverageTime(dataset);

       var ctx = document.getElementById("chart2").getContext('2d');
      var scatterChart = new Chart(ctx, {
    type: 'scatter',
    data: {
      labels: [0,1,2,3,4,5,6,7,8,9],
        datasets: [{
            label: 'Run Pace',
            data: dataset,
            pointBackgroundColor: 'red',
            pointBorderColor:'red',
            pointBorderWidth: 1,
            pointRadius: 5
        },{
          label: 'Avg Pace',
          data: avgdataset,
          pointBackgroundColor: 'blue',
          pointBorderColor:'blue',
          pointBorderWidth: 0,
          pointRadius: 0,
          fill: false,
          borderWidth: 3,
          borderColor: 'blue',
          showLine: true



        }]
    },
    options: {
      title: {
                   display: true,
                   text: '10km Run Pace'
                },
            legend: {
                display: false
            },
        scales: {
            xAxes: [{
              display: false,
                type: 'linear',
                position: 'bottom',
                ticks: {beginAtZero: true,
                max: dataset.length + 1}
              }],
              yAxes: [{
            gridLines: {
                display:false
            }
        }]
        }
    }
});

    }


    function getRunningAverageTime(data){

      var timedata = [];
      var ctimedata = [];
      var avgtimedata = [];
      var returnData = [];


      for (var f in data){

        timedata.push(data[f].y);

      }

      cTime = 0;

      for (var i in timedata){

        cTime += timedata[i];
        ctimedata.push(cTime);
      }

      for (var j in ctimedata){

        var index = Number(j) + 1;

        var t = ctimedata[j]/index;

        var obj = {x: index, y:t }

        returnData.push(obj);

      }



      return returnData;


    }


    function makeChart3(d){



       var ctx = document.getElementById("chart3").getContext('2d');

       var data = {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        datasets: d
    };

    // data { label: run id, data [array]}

    var options = {
      title: {
                   display: true,
                   text: '10km Split Pace'
                },
            legend: {
                display: false
            },
            scales: {
       xAxes: [{
           gridLines: {
               display:false
           }
       }],
       yAxes: [{
           gridLines: {
               display:false
           }
       }]
   }

     };
    var lineChart = new Chart(ctx, {type: 'line', data: data, options: options});

    }



        function makeChart4(d){



           var ctx = document.getElementById("chart4").getContext('2d');

           var data = {
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            datasets: d
        };

        // data { label: run id, data [array]}

        var options = {
          title: {
                       display: true,
                       text: '15km Split Pace'
                    },
                legend: {
                    display: false
                },
                scales: {
       xAxes: [{
           gridLines: {
               display:false
           }
       }],
       yAxes: [{
           gridLines: {
               display:false
           }
       }]
   }

         };
        var lineChart = new Chart(ctx, {type: 'line', data: data, options: options});

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

}


function runChoice(data) {




	// Dropdown menu for the searching of a specific marker.
	var selectLayer = document.getElementById("select");

		for (id in data){

			// Sets the options to be the number and name of the arrondissement taken from the geoJSON data.
			var dropOpt = data[id].Run + ": " + data[id].RunDate
			+ ": " +data[id].Distance + "km";

			var elem = document.createElement("option");

			 // Gets the text.
			elem.textContent = dropOpt;

			// Creates the value from text.
			elem.value = dropOpt;

			// Adds the text value of the markers id number and title
			selectLayer.appendChild(elem);
		}
	}

function dropdownChange(){

  //console.log("hello");

        // Get the option that is selected in the HTML dropdown.
    var dropDown = document.getElementById("select");

    // Set the selected layer to the value of the selection.
    var selectedLayer = dropDown.options[dropDown.selectedIndex].value;


    var n = selectedLayer.indexOf(": ");

    var runID = selectedLayer.substring(0,n);

    getMapData(runID);


}

function getMapData(rid){

    runLayer.clearLayers();


  Tabletop.init({
    key: code2,
    callback: function(sheet_2, tabletop){

      points = [];

      for (var k in sheet_2){
         if (rid == sheet_2[k].runkey){

           var latlng = [Number(sheet_2[k].lat), Number(sheet_2[k].lon)];
           //console.log(latlng);
           var marker = L.circleMarker(latlng, getStyle(Number(sheet_2[k].pace)));
           runLayer.addLayer(marker);
         }
      }


      //  runLayer.addLayer(points);
        map.addLayer(runLayer);
        map.fitBounds(runLayer.getBounds());
        //console.log("hello again");

    },

    simpleSheet: true
  });




}

function setUpMap(){
  var base =  L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
minZoom: 0,
maxZoom: 18,
attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});


// layers from https://github.com/leaflet-extras/leaflet-providers

 map = L.map('map', {
  zoom: 12,
  center: [53.3977852, -2.9478918],
  layers: base,
  maxZoom: 18
});
}

function getStyle(feature) {
    return {
        radius: 3,
        weight: 0,
        opacity: 0.5,
        color: 'black',
        fillOpacity: 1,
        fillColor: getColor(feature)
    };
}

// get color depending on value
function getColor(d) {
    return d < 5   ? '#4dac26' :
           d < 5.30     ? '#b8e186' :
           d < 5.45  ? '#f7f7f7' :
           d < 6  ? '#f1b6da' :
           '#d01c8b';
}
