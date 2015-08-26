/**
 * @name map.js for Leaflet v0.7.3
 * @version version 1.0
 * @author Jonny Bland
 * @fileOverview 
 * This file creates a map displaying the locations of cafes selling espresso for one euro, wifi hotspots 
 * and a selection of tourist attractions within Paris.
 * This file uses Leaver (2013) Leaflet Marker Cluster. 
 * Leaflet.markercluster is free software, and may be redistributed under the MIT-LICENSE.
 * Also used is modified data from ESRI Open data submitted by user emmanuelfaure (2014). 
 */

var map; // Map object. 
var parisData; // Array for the data taken from server. 
var markerCluster; // Leaflet marker cluster group. 
var cafeMarkers; // Array for the cafes. 
var wifiMarkers; // Array for the wifi hotspots.
var attractionMarkers; // Array for the tourist attractions. 
var geoJsonLayer; // Array for the tourist attractions. 
var selectedLayer; // Selected dropdown layer. 
var layer; // geoJSON layer variable. 

/**
 * Initial function which fetches the data from the server and produces a map. 
 */
function fetchData() {
	
	// Style of the Paris Arrondissement geoJSON layer. 
	var geojsonStyle = {
    "color": "#275583",
    "weight": 4,
    "opacity": 0.8,
	"fillColor":"#275583",
	"fillOpacity":0.05
	};
	
	// Assigning the geoJSON layer to a variable to be called when needed. 
	geoJsonLayer = L.geoJson(paris_arrons, {style: geojsonStyle}); 

	var base = L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
	attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
	// Setting up the map object options. 
	map = L.map('map', {
		center: [48.8610189, 2.3453862],
		zoom: 12,
		layers: base,
		maxZoom: 18
	}); 
	
	// The map will reset the data if the zoom is less than 11. 
	map.on('zoomend', function(e) {
    
		if(map.getZoom() < 11){
			
			resetMap(); 
			
		}
	});
	
	// Assigning an array to the parisData label, storing the php server data request. 
	parisData = new Array();
	
		//Populate tweetData with data
		for (var i = 0; i < data.length; i++ )	{
			parisData.push ({
				name: data[i].name,
				type: data[i].type,
				arron: data[i].arrondissement,
				address1: data[i].address1,
				address2: data[i].address2,
				website: data[i].website,
				lat: data[i].lat, 
				lon: data[i].lon
			}); 
		}
		
		// Calling the method which plots the data. 
		plotData();
		
		// Calling the method which populates the dropdown box. 
		layerChoice(); 
	
	
	/**
	 * Plots markers depicting cafes, wifi hotspots and tourist attractions in Paris on a map. 
	 */
	function plotData()	{
		
		// Creating a marker cluster group. 
		markerCluster = new L.MarkerClusterGroup({ 
		
			disableClusteringAtZoom: 15, // clusters stop at and after zoom
			
			// Create icon for each cluster size. 
			iconCreateFunction: function (cluster) {
				
				// Gets the count of markers within a cluster to be displayed on the cluster image. 
				var childCount = cluster.getChildCount();
				
				// Creating the start of the icon variable. 
				var icon = 'icon-';
		
				if (childCount < 10) {
					
					// Adding the suffix to the icon variable to be used in the CSS file. 
					icon += 'small';
			
				} else if (childCount < 80) {
					
					// Adding the suffix to the icon variable to be used in the CSS file.
					icon += 'medium';
			
				} else {
					
					// Adding the suffix to the icon variable to be used in the CSS file.
					icon += 'large';
				}
				
				// Wrap in html to be identified in CSS. 
				var html = '<div class="circle">' + childCount + '</div>';
				
				// Return the created cluster icon. 
				return L.divIcon({ html: html, className: icon, iconSize: L.point(40, 40)});
			}
		});
		
		// Array for the cafe markers. 
		cafeMarkers = new Array();
		
		// Array for the wifi hotspot markers. 
		wifiMarkers = new Array();
		
		// Array for the tourist attraction markers. 
		attractionMarkers = new Array(); 
		
		// Calling the method which runs through the data assigning each entry to one of the arrays above. 
		getMarkers(); 
		
		// Add the arrays to the marker cluster group. 
		markerCluster.addLayers(wifiMarkers); 
		markerCluster.addLayers(cafeMarkers); 
		markerCluster.addLayers(attractionMarkers); 
		
		// Add the marker cluster group to the map. 
		map.addLayer(markerCluster);
	
	}
}

/**
 * Runs through the data array assigning each entry to an array based 
 * on the type defined within the data: cafe, wifi or attraction. 
 */
function getMarkers() {
		
		for (id in parisData)	{ 
				
				// Info for the popup 
				var info = "<html><div class=popup>" 
				+ "<div id=name>" + parisData[id].name + "</div>"
				+ "Address: " + parisData[id].address1 + ","
				+ "<br>"
				+ parisData[id].address2
		
			// Create a Leaflet location variable. 
			var markerLocation = new L.LatLng(parisData[id].lat, parisData[id].lon);
			
			
			if (parisData[id].type === "cafe") {
			
						// If its a cafe add extra info to the popup.  
						var info = info += 
						","
						+ "<br>"
						+ "<a href=" + parisData[id].website + ">Website</a>"
						+ "</div></html>"
			
			// Create a marker and attaching information to it: icon and popup info. 
			var  cafeMarker = new L.Marker(markerLocation, {icon: coffeeIcon()}).bindPopup(info);
				
				// Push the markers into the designated array. 
				cafeMarkers.push(cafeMarker); 
		
			} else if (parisData[id].type === "wifi") {
			
				// Create wifi hotspot marker with icon and info attached. 
				var  wifiMarker = new L.Marker(markerLocation, {icon: wifiIcon()}).bindPopup(info); 
				
				// Push the markers into the designated array. 
				wifiMarkers.push(wifiMarker); 
			
			} else if (parisData[id].type === "attraction") {
				
						// If its an attraction add the website to it.  
						var info = info += 
						","
						+ "<br>"
						+ "<a href=" + parisData[id].website + ">Website</a>"
						+ "</div></html>"
				// Create attraction marker with icon and info. 
				var  attractionMarker = new L.Marker(markerLocation, {icon: attractionIcon()}).bindPopup(info);
						
				// Push the markers into the designated array. 
				attractionMarkers.push(attractionMarker); 
	
		}
	}
}

/**
 * Creates and returns an icon depicting a coffee. 
 * @returns icon 
 */
function coffeeIcon() {

	var coffee = L.icon({
				iconUrl: 'paris/icons/coffee1.png',
				iconSize:     [32, 32], // size of the icon
				iconAnchor:   [11, 21], // point of the icon which will correspond to marker's location
				popupAnchor:  [5, -15] // point from which the popup should open relative to the iconAnchor
			});
			return coffee;
}

/**
 * Creates and returns an icon depicting a wifi signal. 
 * @returns icon
 */
function wifiIcon(){

	var wifi = L.icon({
			iconUrl: 'paris/icons/wireless-32.png',
			iconSize:     [24, 24], // size of the icon
			iconAnchor:   [11, 21], // point of the icon which will correspond to marker's location
			popupAnchor:  [0, -20] // point from which the popup should open relative to the iconAnchor
		});
		return wifi; 
		
}

/**
 * Creates and returns an icon depicting a French flag. 
 * @returns icon
 */
function attractionIcon(){

	var attraction = L.icon({
			iconUrl: 'paris/icons/flag.png',
			iconSize:     [48, 48], // size of the icon
			iconAnchor:   [24, 40], // point of the icon which will correspond to marker's location
			popupAnchor:  [0, -10] // point from which the popup should open relative to the iconAnchor
		});
		return attraction; 
		
}

/**
 * Function runs methods depending on the state of the cafe and wifi HTML checkboxes: either adding or removing layers. 
 * @param id of the checkbox in the HTML file.
 */
function checkboxCheck(id){
	
	//If the checkbox is checked, boolean. 
	if (document.getElementById(id).checked) {
 
		   if (id === "Cafe"){
			   
			addLayer(cafeMarkers); 
		
		   } else if (id === "Wifi"){
			
			addLayer(wifiMarkers);   
			
			}
		// If unchecked.  
        } else {
			
			if (id === "Cafe") {
		
			removeLayer(cafeMarkers); 
	
			} else if (id === "Wifi"){
	
			removeLayer(wifiMarkers); 
		
			}
        }
}

/**
 * Runs methods depending on the state of the Layer checkbox. 
 * @param id
 */
function layerCheckBox(id){

		// If the checkbox is checked. 
		if (document.getElementById(id).checked) {
			
			// Add the geojson layer. 
		   map.addLayer(layer); 
			
        } else {
        	
        	// Calls the method which removes the geoJSON layer from the map. 
			deleteLayer(); 
        }
}

/**
 * Populates the HTML dropdown with the 
 */
function layerChoice() {

	
	// Dropdown menu for the searching of a specific marker.
	var selectLayer = document.getElementById("select");
			
		for (id in geoJsonLayer._layers){
			
			// Sets the options to be the number and name of the arrondissement taken from the geoJSON data. 
			var dropOpt = geoJsonLayer._layers[id].feature.properties.C_AR 
			+ ": " +geoJsonLayer._layers[id].feature.properties.L_AROFF;

			var elem = document.createElement("option");
			
			 // Gets the text. 
			elem.textContent = dropOpt;
			
			// Creates the value from text. 
			elem.value = dropOpt; 
			
			// Adds the text value of the markers id number and title  
			selectLayer.appendChild(elem);
		}
	}

/**
 * Sets the map view to the arrondissement chosen and only shows 
 * cafes, wifi hotspots and attractions within that area. 
 */
function dropdownChoice() {
		
		// Get the option that is selected in the HTML dropdown.  
		var dropDown = document.getElementById("select");
		
		// Set the selected layer to the value of the selection. 
		selectedLayer = dropDown.options[dropDown.selectedIndex].value;
		
		// Remove the previous layer (if there is one). 
		deleteLayer(); 
		
		// If there is a selected layer (anything but the "Select and Arrondissement text"). 
		if (selectedLayer !== "") {
		
		// Get the geoJSON layer. 
		layer = new getGeoJson();
		
		// Reset the arrays ready for new data. 
		resetArrays(); 
		
		// Clear the marker cluster of arrays. 
		markerCluster.clearLayers(); 
		
		// Call the method which searches for cafes, hotspots and attractions within the chosen layer. 
		placesWithinLayer();  
		
		// Add the arrays with the data to the marker cluster. 
		markerCluster.addLayers(wifiMarkers); 
		markerCluster.addLayers(cafeMarkers); 
		markerCluster.addLayers(attractionMarkers); 
		
		// Pop up showing how many wifi and cafes in the area. 
		layer.bindPopup("There are " 
		+ wifiMarkers.length 
		+ " Wifi hotspots and  " 
		+ cafeMarkers.length 
		+ " Cafés with €1 coffee in " 
		+ layer.feature.properties.L_AROFF  
		+ ".");
		
		// Sets all checkboxes to checked. 
	 	document.getElementById("Layer").checked = true; 
		document.getElementById("Cafe").checked = true;
		document.getElementById("Wifi").checked = true;
		
		// Zooms to chosen Arrondissement. 
		map.fitBounds(layer.getBounds());
		
		// Add the geoJSON layer to the map. 
		map.addLayer(layer);
		
		} else {
			
			// If the "Select and Arrondissement" text is selected the map resets. 
			resetMap(); 
		}
}

/**
 * Gets the section of the Paris Arrondissement layer which the user has chosen in the dropdown menu. 
 * @ return a section of the geoJSON layer. 
 */
function getGeoJson() {
	
	// Loop through the geoJson layer variable created from the paris_arrons geoJSON data. 
	for (id in geoJsonLayer._layers){
		
		// If the feature properties match what has been selected. 
		if (geoJsonLayer._layers[id].feature.properties.C_AR + ": " + geoJsonLayer._layers[id].feature.properties.L_AROFF === selectedLayer){ 
		
			// Returns the selected Arrondissement layer. 
			return geoJsonLayer._layers[id]; 

		}	
	}
}

/**
 * Searches the data to see if any cafes, wifi hotspots and attractions match the arrondissement chosen. 
 */		
function placesWithinLayer(){
 
	for (id in parisData){

				// Create info the markers within this layer. 
				var info = "<html><div class=popup>" 
				+ "<div id=name>" + parisData[id].name + "</div>"
				+ "<br>"
				+ parisData[id].address1 + ","
				+ "<br>"
				+ parisData[id].address2
			
				// If the now casted Arrondissement matches that of the properties within the geoJSON layer. 
				if ( parisData[id].arron === layer.feature.properties.C_AR){
					
					// Create location for the marker. 
					var markerLocation = new L.LatLng(parisData[id].lat, parisData[id].lon);
				
					if (parisData[id].type === "cafe") {
					
						// If its a cafe add the website to it.
						var info = info += 
						","
						+ "<br>"
						+ "<a href=" + parisData[id].website + ">Website</a>"
						+ "</div></html>"
					
					var  cafeMarker = new L.Marker(markerLocation, {icon: coffeeIcon()}).bindPopup(info);
			
						cafeMarkers.push(cafeMarker); 
				
					} else if (parisData[id].type === "wifi") {
					
						var  wifiMarker = new L.Marker(markerLocation, {icon: wifiIcon()}).bindPopup(info); 
						
						wifiMarkers.push(wifiMarker); 
					
					} else {
						
						// If its an attraction add the website to it. 
						var info = info += 
						","
						+ "<br>"
						+ "<a href=" + parisData[id].website + ">Website</a>"
						+ "</div></html>"
				
						var  attractionMarker = new L.Marker(markerLocation, {icon: attractionIcon()}).bindPopup(info);
				
						attractionMarkers.push(attractionMarker); 
			
				}
			} 
	}
}


/**
 * Sets the map view to the attraction selected in the HTML file. 
 * @param imageName which is the 'alt' name of the image.
 */
function searchAttraction(imageName) {
	
	// Reset the map, incase the dropdown was used which only shows markers within a certain area. 
	resetMap();
	
	// Set the layer checkbox to false. 
	document.getElementById("Layer").checked = false;
	
	for (id in parisData){
	
		// Searches for a name match and type match, incase any data has the same name but is not an attraction.
		if (parisData[id].name === imageName && parisData[id].type === "attraction") {
			
			var name = parisData[id].name; 
			
			var location = new L.LatLng(parisData[id].lat, parisData[id].lon);
			
			// Set the map the location of the attraction. 
			map.setView(location, 15); 
			
		}
	}
}

/**
 * Removes the parameter array from the marker cluster. 
 * @param markerArray
 */
function removeLayer(markerArray){
	
	// Calling the marker clusters inherent method of removing an array from the group.  
	markerCluster.removeLayers(markerArray); 
}

/**
 * Removes the geoJSON layer from the map. 
 */
function deleteLayer(){ 
	
	// Checks if it is undefined 
	if (typeof layer !== 'undefined'){
	
		// If layer is defined (not null) then remove it. 
		map.removeLayer(layer); 
	}
}

/**
 * Adds the parameter array from the marker cluster. 
 * @param markersArray
 */
function addLayer(markersArray) {
	removeLayer(markersArray); // remove previous layer before adding, ensuring there is only one of each layer.
	
	markerCluster.addLayers(markersArray); 
}

/**
 * Clears the marker arrays to ensure duplicate data is not added in the script methods. 
 */
function resetArrays() {
	
	// Set all arrays to be empty. 
	attractionMarkers = [];
	cafeMarkers = [];
	wifiMarkers = [];

}

/**
 * Resets the map to show all the markers and set the checkboxes to origianl state. 
 */
function resetMap() {

			deleteLayer(); // removes geoJSON layer. 
			resetArrays(); // Clears the arrays. 
			markerCluster.clearLayers(); // Clears the marker cluster. 
			getMarkers(); // Gets the markers. 
			addLayer(cafeMarkers); // Add array the marker cluster. 
			addLayer(wifiMarkers); // Add array the marker cluster. 
			addLayer(attractionMarkers); // Add array the marker cluster. 
			document.getElementById("Cafe").checked = true; // Set checkbox to checked. 
			document.getElementById("Wifi").checked = true; // Set checkbox to checked. 
			document.getElementById("Layer").checked = false; // Set checkbox to unchecked. 
}