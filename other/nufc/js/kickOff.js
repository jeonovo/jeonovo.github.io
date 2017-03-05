var map; 
var goalLayer, heatMapLayer; 
function kickOff(){
	
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

	// dimensions of the image
	var url = 'css/images/pitch.png';

	// Pitch sizes are 68m by 105m
	var bounds = [[-1.3,-3],[69.3,108]]; 
	
	goalLayer = new L.featureGroup();
	heatMapLayer = new L.featureGroup();
	
	chartData = []; 

	for (id in nufc_data){
		
		if (nufc_data[id].y){
		
			var scorer = L.circleMarker([nufc_data[id].y,nufc_data[id].x],{
				radius: 10,
				fillColor: "#37bfe5",
				color: "#000",
				weight: 2,
				opacity: 1,
				fillOpacity: 0.7,
			}); 
			
			var info = nufc_data[id].scorer + ": " + nufc_data[id].opposition + ": " + nufc_data[id].homeOrAway + 
			"<br>" + nufc_data[id].y + ", " + nufc_data[id].x	
			scorer.bindPopup(info); 
		
		//	scorer.addTo(map); 
		
			goalLayer.addLayer(scorer); 
		
		}	 
	
	}

	// add the image overlay, 
	// so that it covers the entire map
	L.imageOverlay(url, bounds).addTo(map);
	// tell leaflet that the map is exactly as big as the image
	map.setMaxBounds(bounds);

	map.on('click', function(e){

		console.log(e.latlng);
		L.marker(e.latlng).addTo(map); 

	});

	var overlayMaps = {
		"Goals": goalLayer.addTo(map),
		"Heatmap":heatMapLayer
	};
	
	L.control.layers(overlayMaps, null).addTo(map);
	
	
	makeChart(); 
	makeHeatMap(); 
}

function makeHeatMap(){
	
	var goals = [];
	// Move all the goals to one side 
	for (id in nufc_data){
		
		if (nufc_data[id].y){ // remove this when all goals completed
			
			if (nufc_data[id].x < 52.50001){
				
					var x = 105 - nufc_data[id].x;
					var y = 68 - nufc_data[id].y;
					var latlng = [y,x,0.75]; 
					goals.push(latlng); 
			} else {
				
				var latlng = [nufc_data[id].y, nufc_data[id].x,0.75]; 
				goals.push(latlng); 
			}
		}
		
		
		 
	}
	var heat = L.heatLayer(goals, {radius: 12});
		heatMapLayer.addLayer(heat);
		console.log("" + goals.length); 
}
