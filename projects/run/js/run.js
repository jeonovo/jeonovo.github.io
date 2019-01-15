var code = "1sJnDALGCVLJf1ghSKBlJ_7cMmhvDjh7z47_d9me2qbo";
var code2 = "16NwJpO_O_ZP_pX0kge06I3Kj6c5ahBnmaXv3M7V3s3k";
var map;
var points = [];
var runLayer = L.featureGroup();

function init(){

      Tabletop.init({
        key: code,
        callback: function(sheet_3, tabletop){
           var runcount = 0;
           var totaldistance = 0;
           var totalseconds = 0;
           var tenkdistance = 0;
           var fivekdistance = 0;
           var tenkseconds = 0;
           var fivekseconds = 0;
           var fivecount = 0;
           var tencount = 0;
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

            runcount+=1;

            totaldistance += Number(sheet_3[j].Distance)

            if (Number(sheet_3[j].Distance) > 10){

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

            setRuns(runcount);
            setTotalDistance(totaldistance);
            setFive(fivecount);
            setTen(tencount);
            set5kpace(fivekseconds,fivekdistance);
            set10kpace(tenkseconds,tenkdistance);
            makeTable1(columns, progress);
            makeChart1(fivekscatter);
            makeChart2(tenkscatter);
            runChoice(progress);
            setUpMap();


        },

        simpleSheet: true
      });




    function setRuns(obj){

        document.getElementById('day').innerHTML += obj;
          //getRunPoints(1);
    }

    function setTotalDistance(obj){
    
    obj = Math.round(obj * 100)/100

        document.getElementById('readTotal').innerHTML += obj;
    }

    function setFive(obj){

        document.getElementById('readingAverage').innerHTML += obj;
    }

    function setTen(obj){

        document.getElementById('targetTotal').innerHTML += obj;

    }

    function set5kpace(t,d){

      kpm = getPace(t,d);

        document.getElementById('toRead').innerHTML += kpm;

    }

    function set10kpace(t,d){

      kpm = getPace(t,d);

      document.getElementById('mostPages').innerHTML += kpm;
    }

    function getPace(time, distance){

      var decPace = 16.6667 / (distance /  time);

      var floored =  Math.floor(decPace);

      var remainder = Math.round(((decPace - floored) * 60 / 100)*100)/100;

      var kpm = floored + remainder;

      return kpm;


    }



    function makeChart1(dataset){

       var ctx = document.getElementById("chart1").getContext('2d');
      var scatterChart = new Chart(ctx, {
    type: 'scatter',
    data: {
        datasets: [{
            label: 'Scatter Dataset',
            data: dataset,
            pointBackgroundColor: 'red',
                pointBorderColor:'red',
                pointBorderWidth: 1,
                pointRadius: 5
        }]
    },
    options: {
      title: {
                   display: true,
                   text: '5km Run Pace'
                },
            legend: {
                display: false
            },
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom',
                ticks: {
                  beginAtZero: true
                }
            }]
        }
    }
});

    }

    function makeChart2(dataset){

       var ctx = document.getElementById("chart2").getContext('2d');
      var scatterChart = new Chart(ctx, {
    type: 'scatter',
    data: {
        datasets: [{
            label: 'Scatter Dataset',
            data: dataset,
            pointBackgroundColor: 'red',
                pointBorderColor:'red',
                pointBorderWidth: 1,
                pointRadius: 5
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
                type: 'linear',
                position: 'bottom',
                ticks: {beginAtZero: true}
              }]
        }
    }
});

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
