function kickOff(){
	
	// create the map
	var map = L.map('mapid', {
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
	
	
	chartData = []; 

	for (id in nufc_data){
		
		var scorer = L.circleMarker([nufc_data[id].y,nufc_data[id].x],{
        	radius: 10,
        	fillColor: "#696969",
        	color: "#000",
        	weight: 2,
        	opacity: 1,
        	fillOpacity: 0.7,
    	}); 
		
		scorer.bindPopup(nufc_data[id].scorer); 
		
		scorer.addTo(map); 
		
		 
	
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
	
	makeChart(); 


}