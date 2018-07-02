// World Cup 2018

var code = "1SHPitSHnqpnLwyczI6t4rP7rqEWDg4Pc9jqaTB3YxSQ";


var map;
var pitchModifier = 0.7;
var goalLayer, heatMapLayer;
function kickOff(){

	//Get the data from tabletop
	Tabletop.init({
  key: code,
  callback: function(sheet, tabletop){

	var topscorer = "";

	for (s in sheet.TeamData.elements){
		if (sheet.TeamData.elements[s].TopScorer == 1){
			topscorer += sheet.TeamData.elements[s].Shirt_Name
			+ " " + sheet.TeamData.elements[s].TotalGoals
			+ "<br>";
		}
	}

	var period1 = 0;
	var period2 = 0;
	var period3 = 0;
	var period4 = 0;
	var period5 = 0;
	var period6 = 0;

	var goalMapData = [];
	// player team minute x y

	var totalGoals = sheet.Goals.elements.length;

	 for (g in sheet.Goals.elements){



		 var goalTime = Number(sheet.Goals.elements[g].Minute);

		 if (goalTime < 15){

			period1 = period1 + 1;
		} else if (goalTime < 30){

			period2 = period2 + 1;
		} else if (goalTime < 45){

			period3 = period3 + 1;
		} else if (goalTime < 60){

			period4 = period4 + 1;
		} else if (goalTime < 75){

			period5 = period5 + 1;
		} else if (goalTime < 100){

			period6 = period6 + 1;
		}

	 }

	 // Functions here
	 var goalTimeData = [period1,period2,period3,period4,period5,period6];
	 setTotalGoals(totalGoals);
	 setTopScorer(topscorer);
	 makeGoalTimeChart(goalTimeData);
	 makeMap(sheet.Goals.elements);
	 makeHeatMap(sheet.Goals.elements);

	},
			simpleSheet: false
	});

}
	function makeMap(goals){
	// create the map
	map = L.map('mapid', {
	  minZoom: 3,
	  maxZoom: 3,
	  center: [34, 52.5],
	  zoom: 3,
	  zoomControl: false,
	attributionControl: false,
	  crs: L.CRS.Simple
	});

	map.dragging.disable();

	// dimensions of the image
	var url = 'worldcup/css/pitch.png';

	// Pitch sizes are 68m by 105m
	// Bounds relates to
	//var bounds = [[-1.3,-3],[69.3,108]];
	// divide x and ys by 0.7 - the pitch is 70% of the size

	var bounds = [[0,-2.2],[47.7,75.925]];

	goalLayer = new L.featureGroup();
	heatMapLayer = new L.featureGroup();

	var lPenInfo = "";
	var rPenInfo = "";

	var lPen = L.circleMarker([(33.875*0.7),(14*0.7)],{
		radius: 7,
		fillColor: "#E80000",
		color: "#000",
		weight: 1.5,
		opacity: 1,
		fillOpacity: 0.7,
	});
	var rPen = L.circleMarker([(33.875*0.7),(91*0.7)],{
		radius: 7,
		fillColor: "#E80000",
		color: "#000",
		weight: 1.5,
		opacity: 1,
		fillOpacity: 0.7,
	});


	for (id in goals){

		if (goals[id].Y > 0){

			var x = goals[id].X * pitchModifier;
			var y = goals[id].Y * pitchModifier;

			var scorer = L.circleMarker([y,x],{
				radius: 7,
				fillColor: "#E80000",
				color: "#000",
				weight: 1.5,
				opacity: 1,
				fillOpacity: 0.7,
			});

			if (goals[id].Assist == "Pen" && goals[id].X == 14){

				lPenInfo += goals[id].Player + ": " + goals[id].Opponent + ": " + goals[id].Minute +"<br>";

			} else if (goals[id].Assist == "Pen" && goals[id].X == 91) {

				rPenInfo += goals[id].Player + ": " + goals[id].Opponent + ": " + goals[id].Minute +"<br>";

			}	else {

				var info = goals[id].Player + ": " + goals[id].Opponent + ": " + goals[id].Minute;
				scorer.bindPopup(info);
				goalLayer.addLayer(scorer);


			}




			//scorer.addTo(map);
		}
	}

	lPen.bindPopup(lPenInfo);
	rPen.bindPopup(rPenInfo);
	 goalLayer.addLayer(rPen);
	 goalLayer.addLayer(lPen);
	// 		var polyline;
	// 		scorer.on('popupopen', function(e){
    //
	// 			console.log(e);
	// 			var x;
	// 			var y;
	// 			for (id in nufc_data){
    //
	// 				var matchContent =  nufc_data[id].scorer + ": " + nufc_data[id].opposition + ": " + nufc_data[id].homeOrAway +
	// 		"<br>" + nufc_data[id].y + ", " + nufc_data[id].x;
    //
    //
    //
	// 				if (e.popup._content === matchContent){
    //
	// 					x = nufc_data[id].assisstX;
	// 					y = nufc_data[id].assisstY;
	// 				}
	// 			}
    //
	// 			var latlngs = [e.target._latlng,[y,x]];
    //
	// 			polyline = L.polyline(latlngs, {color:'red'});
    //
	// 			map.addLayer(polyline);
	// 		});
    //
	// 		scorer.on('popupclose', function(e) {
	// 			if (polyline){
	// 				map.removeLayer(polyline);
	// 			}
	// 		});
    //

    //
    //
    //
	// 	}
    //
	// }


	// so that it covers the entire map
	L.imageOverlay(url, bounds).addTo(map);
	// tell leaflet that the map is exactly as big as the image
	map.setMaxBounds(bounds);

	// map.on('click', function(e){
	//
	// 	console.log(e.latlng);
	// 	L.marker(e.latlng).addTo(map);
	//
	// });

	var overlayMaps = {
		"Goals": goalLayer.addTo(map),
		"Heatmap":heatMapLayer
	};

	L.control.layers(overlayMaps, null).addTo(map);

}
	//makeChart();
	//makeHeatMap();


function makeHeatMap(heatdata){

	heatgoals = [];

	// Move all the goals to one side
	for (id in heatdata){

		if (heatdata[id].Assist != "Pen"){

		if (heatdata[id].Y > 0){ // remove this when all goals completed

			if (Number(heatdata[id].X) < 52.50001){

					var x = (105.00 * pitchModifier) - (heatdata[id].X * pitchModifier);

					var y = (68.00 *  pitchModifier) - (heatdata[id].Y * pitchModifier);

					var latlng = [y,x,0.75];

					heatgoals.push(latlng);

			} else {

				var latlng = [(heatdata[id].Y * pitchModifier), (heatdata[id].X * pitchModifier),0.75];

				heatgoals.push(latlng);
			}
		}
	}



	}
	var heat = L.heatLayer(heatgoals, {radius: 11});
		heatMapLayer.addLayer(heat);
	}

function setTotalGoals(goals){

	document.getElementById('totalGoals').innerHTML += goals;


}

function setTopScorer(ts){

	document.getElementById('topScorer').innerHTML += ts;


}


function makeGoalTimeChart(goalData){
var ctx = document.getElementById("chart2");
  var myChart = new Chart(ctx, {
	    type: 'bar',
	    data: {
	        labels: ["0 -15", "16 - 30", "31 - 45", "46 - 60", "61 - 75", "75 - 90"],
	        datasets: [{
	            label: '# of Goals',
	            data: goalData,
	            backgroundColor: 'rgba(234,0,0,0.7)',
	            borderColor: 'rgba(0,0,0,1)',
	            borderWidth: 1
	        }]
	    },
	    options: {
			legend: {
				display: false
			},
			title:{
				display: true,
				text: "Goals Scored In Period"
			},
	        scales: {
						xAxes:[{gridLines:{ display: false}}],
	            yAxes: [{
								gridLines:{ display: false},
	                ticks: {
	                    beginAtZero:true
	                }
	            }]
	        }
	    }
	});

}
