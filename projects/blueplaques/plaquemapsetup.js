/**
 * @name plaquemapsetup for Google Maps v3
 * @version version 1.0
 * @author Jonny Bland
 * @fileOverview 
 * This file creates a map displaying the locations of blue plaques in Leeds with the data stored in BluePlaqueLocations.js, 
 * this file also uses Stott (2005) JSCoord.js to convert Easting and Northing to Latitude and Longitude, 
 * and Mahe (2014) MarkerClusterer.js to create clusters of the Google maps markers. 
 */
 
var map; // The map object

var myCentreLat = 53.7998438; // Leeds centre Latitude.

var myCentreLong = -1.547019;  // Leeds centre Longitude.

var initialZoom = 12; // Starting zoom level on initialisation of the map.

var marker; // The marker object which will hold the information about blue plaque.

var infowindow; // Holds the Blue Plaque information which will be shown to the user.

var markers = []; // creating empty array to put the markers in, useful for searching through them and also for the marker clusterer.

var youAreHere = [];  // Array to contain the user location data.

var userLocation; // Store the users location. 

var plaquePos; // Store the chosen plaque location. 

var directionsDisplay; // Display the directions on the map. 

var transit = []; // Store the different available Google routes. 


/**
 * Opens the info window to diplay information about the selected blue plaque. 
 * @param infowindow 
 * @param marker 
 * @returns {Function} which opens the infowindow
 */
function infoCallback(infowindow, marker) { 
	return function() { 
	// Calling the infowindow's open method. 
	infowindow.open(map, marker);
	}; 
}

/**
 * Closes an open info window. 
 * @param infowindow
 * @param marker
 * @returns {Function} which closes the infowindow
 */
function infoClose(infowindow, marker) { 
	return function() { 
	// Calling the infowindow's close method. 
	infowindow.close(map, marker);
	};
}

/**
 * Adds a marker to the map containing information taken from BluePlaqueLocations.js. 
 * @param myPos Location of the marker. 
 * @param myTitle Title for the info window.
 * @param myInfo Information to be displayed on the info window: the caption on the blue plaque. 
 */
function addMarker(myPos,myTitle,myInfo) { 
	
	// Light blue colour. 
	myColour = '4d92e1',
	
	// The number displayed on the marker corresponds to the blue plaque id number. 
	myID = os_markers[id].id,
	
	// Setting the marker variable with a position on the map; the marker size, the marker colour, text size, text style and the text itself. 
	marker = new google.maps.Marker({ 	
		position: myPos, 
	   	map: map, 
		title: myTitle, 
		icon:'http://chart.apis.google.com/chart?chst=d_map_spin&chld=0.6|0|'+myColour+'|11|b|'+myID+''
	});  
	
	// Setting up infowindow
	infowindow = new google.maps.InfoWindow({ 
		
		// Content of the info window will be the title of the plaque and its caption. 
		content: myInfo, 
		
		// Sets max width of the info window. 
		maxWidth: 200
	 }); 
	
	// Adds event listener to marker for opening info window when the marker is clicked. 
	google.maps.event.addListener(marker, 'click', infoCallback(infowindow, marker)); 
	
	// Adds event listener to marker to close the info window when the map is dragged.
	google.maps.event.addListener(map, 'dragend', infoClose(infowindow, marker));
	
	// Adds event listener to marker to close the info window when zoom level changed.
	google.maps.event.addListener(map, 'zoom_changed', infoClose(infowindow, marker)); 
	}

	/**
	 * Creates a marker placed at the position taken from the users location. 
	 * @param userPos Location of the user. 
	 */
	function userMarker(userPos){
		
		// Creating a marker to show where the user is. 
		var userLocMarker = new google.maps.Marker(
		{
		position: userPos, 
		map: map, 
		icon: 'http://chart.apis.google.com/chart?chst=d_map_spin&chld=0.8|0|BC1339|10|b|You', 
		animation: google.maps.Animation.DROP
		});
		
		// Add the user location to the you are here array. 
		youAreHere.push(userLocMarker); 
	} 
	
	/**
	 * Called to delete the user location marker so that multiple location markers are not created if the location button is clicked multiple times. 
	 * Only noticeable if the user is on the move. 
	 * @param markerArray 
	 */
	function deleteMarker(markerArray) {
		
	// Loop through the array setting it to null. 
	for (var i = 0; i < markerArray.length; i++) {
		markerArray[i].setMap(null);
	}
}

/**
 * Initialises the creation of an embedded Google map displaying markers.
 */	
 function initialize() {
  
	// Creating a Google maps Lat & Long from the instance variables 
    var latlng = new google.maps.LatLng(myCentreLat, myCentreLong);
	
	// Setting up the initial options for the Google base map
    var myOptions = {
		zoom: initialZoom,
      	center: latlng,
      	mapTypeId: google.maps.MapTypeId.ROAD,
	  	mapTypeControl: true,
		scaleControl: true,  // fixed to BOTTOM_RIGHT and shows a scale bar 
    	mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR ,
        position: google.maps.ControlPosition.TOP_LEFT
    	},
		
		// Placing the pan controls to the upper left corner of the Google map. 
   	 	panControl: true,
    	panControlOptions: {
        position: google.maps.ControlPosition.LEFT_TOP
    	},
		
		// Placing the smaller zoom controls to the bottom left corner of the Google map. 
    	zoomControl: true,
    	zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
        position: google.maps.ControlPosition.LEFT_BOTTOM
    	},
		
		// Placing the street view yellow person controls to the bottom right corner of the Google map.
    	streetViewControl: true,
    	streetViewControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM
    	}
    };
	
	// Adding properties to the instance map object.
    map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
	
	// Array for the styles to be stored in, changes the colours and style of Google maps features. 
	var mapStyle = [{
      featureType: 'roads',
      elementType: 'geometry.stroke', 
      stylers: [
		  { color: "#ebe3ee" }   // Pale purple colour.  
      ]
    },{
      featureType: 'landscape.man_made',
      elementType: 'geometry',
      stylers: [
		{ color: '#def6ff' }, // Pale blue colour. 
      ]
    },{
      featureType: 'poi', // Places of Interest. 
      elementType: 'geometry',
      stylers: [
	   { color: '#fde0ff'}, // Light pink colour. 
      ]
    },{
      featureType: 'landscape.natural',
      elementType: 'geometry',
      stylers: [
	   { color: '#e2ffda'}, // Pale green colour. 
	   { lightness: 80   }
      ]
    },{
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
	   { color: '#3F742B'}, // Dark green colour. 
	   { lightness: 80   }
      ]
    },{
      featureType: 'poi.attraction',
      elementType: 'geometry',
      stylers: [
	   { color: '#5b8510'}, // Dark green colour. 
	   { lightness: 80   }
      ]
    },{
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
	   { color: '#0099FF' } // Deep blue colour. 
      ]
    }]
	
	// Set the style options for the map
	map.setOptions({styles: mapStyle});
	
	// Options for the cluster, grid and zoom level which they stop clustering and the cluster icon style
	var mcOptions = {gridSize: 42, maxZoom: 15, styles: [{
		height: 47, 
		url: "blueplaques/images/cluster1.png", // cluster icons created by Jonny Bland
		width: 47
		},
		{
		height: 61,
		url: "blueplaques/images/cluster2.png", // cluster icons created by Jonny Bland
		width: 61
		},]}
	
	// Loop through the data from which the marker information is coming from. os_markers is the data array in BluePlaquesLocations.js. 
	for (id in os_markers) { 
		
		// The info on the infowindow is the blue plaques id number, title and the caption on the plaque. 
		var info = "<div class=infowindow><h3>" + os_markers[id].id + ": " + os_markers[id].title + "</h3><p>" + os_markers[id].caption + "</p></div>";
	
		// Convert co-ords using Stott (2005) JSCoord v1.1.1 
		var osPt = new OSRef(os_markers[id].easting,os_markers[id].northing);
   	 	var llPt = osPt.toLatLng(osPt); llPt.OSGB36ToWGS84();
	
		// Add the marker to the map with the converted lat, converted long, the os_markers title, and the info variable
		addMarker(new google.maps.LatLng(llPt.lat, llPt.lng), os_markers[id].title,info); 
		
		// Add marker to the markerclusterer array. 
		markers.push(marker); 

	}
	
	// Initialises the MarkerClusterer and passes in the map and the markers as parameters
	var mc = new MarkerClusterer(map, markers, mcOptions);  
	
	// Dropdown menu for the searching of a specific marker.
	var selectPlaque = document.getElementById("select");
		
		// Searching the array in which the created markers stored. 
		for (id in markers){

			// Sets the options in the drop down to the title of the plaque from the markers array.
			var dropOpt = os_markers[id].id +": " +markers[id].title;
			// Creates the option element within the html dropdown menu
			var elem = document.createElement("option");
			 // Gets the text. 
			elem.textContent = dropOpt;
			// Creates the value from text. 
			elem.value = dropOpt; 
			// Adds the text value of the markers id number and title  
			selectPlaque.appendChild(elem);
		}
		
	// Array of objects containing the Google maps travel mode. 
	transit = [{
		'id': 'Walking', 'google': google.maps.TravelMode.WALKING
	},{
		'id': 'Driving', 'google': google.maps.TravelMode.DRIVING
	},{ 
		'id': 'Cycling', 'google': google.maps.TravelMode.BICYCLING 
	}]; 
	
	// dropdown menu for the user to chose their route 
	var tranistChoice = document.getElementById("route");
		
	// Searching the array with the Google maps travel modes. 
	for (id in transit) {	
			
		// Option in the dropdown menu is the id of the object in the transit array. 
		var transitOption = transit[id].id; 
		// Create an element for the dropdown menu.
		var element = document.createElement("option");
		// Sets the dropdown option as the text content of the object id. 
		element.textContent = transitOption;
		// Value of the text. 
		element.value = transitOption;
		// Adds the text value of the object id. 
		tranistChoice.appendChild(element);
	}
		
}
	
/**
 * Populates the HTML drop down menu with the blue plaques' id and name, then pans the map to a chosen plaque. 
 */
function searchPlaque(){
	
// Linking search button to the html dropdown menu
var dropDown = document.getElementById("select");
	
// The variable equals the dropDown chosen option 
var selectedPlaque = dropDown.options[dropDown.selectedIndex].value;

// Loop through the markers array to search for the selected plaque title 
for (id in markers) {
		
	// The title of the marker equals the variable plaqueTitle
	var plaqueTitle = os_markers[id].id + ": " + markers[id].title;
		
		// The map pans to the position of title which matches that of the title chosen in the dropdown menu
		if (selectedPlaque ===  plaqueTitle) {
			
		// Location of the chosen plaque using Googles getPosition method. 
		plaquePos = markers[id].getPosition();
			
		// Set zoom to level 17, more zoomed in. 
		map.setZoom(17);
			
		// Pan the map to the chosen plaques position. 
		map.panTo(plaquePos);
			
		// Passing the marker object as a parameter for the drop animation function so that the chosen marker stands out. 
		dropAnimation(markers[id]);

		}
	}

	// Clears the route when new plaque is searched for, ensures only one route is displayed at a time. 
	clearRoute();
}
	
/**
 * When a marker is passed in as a parameter the marker's animation will be set to drop. 
 * @param marker The selected blue plaque marker.
 */
function dropAnimation(marker) {
	
	// Sets markers animation to drop. 
	marker.setAnimation(google.maps.Animation.DROP);
}
	
/**
 * Gets the users location through Google's geolocation utility. 
 */
function getUserLocation() {

		// If the user allows the geolocation. 
		if (navigator.geolocation) {
			// Google function to get the position. 
			navigator.geolocation.getCurrentPosition(function(position) {
				
				// Stops multiple markers being created for the user location. 
				deleteMarker(youAreHere);  
			
				// Creates a Google lat long 
				userLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
				
				userMarker(userLocation); 
			
				// Set map centre to the location retrieved from the getCurrentPosition method 
				map.setZoom(15);
				
				// Pan the map to the user location
				map.panTo(userLocation);
			
			})		
	}
}

/**
 * Calculates and displays a route between the chosen plaque and the user location. 
 */
function calcRoute() { 
	
	// Linking search button to the html dropdown menu
	var transitOpt = document.getElementById("route");
	
	// The variable equals the dropDown chosen option 
	var transitChoice = transitOpt.options[transitOpt.selectedIndex].value;
	
	// Variable in which the Google route choice will be stored, created here for scope reasons. 
	var transitRoute; 
	
	// Loops through searching the transit array for the chosen routing option. 
	for (id in transit) { 
		
		if (transitChoice === transit[id].id){
			
			// If the transit id in the array matches that of the dropdown menu the google travel mode is selected to be used in the request sent to Google's services. 
			transitRoute = transit[id].google; 
		
		}
	}
	// Start of the route is the users location created in the getUserLocation method. 
	var start = userLocation;

	// Using the variable storing the plaques position, taken through the getPosition method, as the end of the route. 
	var end =  plaquePos;
	
	// The request which will sent to Google's service. 
	var request = {
		origin:start,
		destination:end,
		travelMode: transitRoute
	};
	
	// Changing the style of the route polyline. 
	var routeStyle = new google.maps.Polyline({
    strokeColor: '#68228B', // Dark purple colour. 
    strokeOpacity: 0.75, 
    strokeWeight: 6 
    });
	
	// Instantiating Googles direction service. 
	var directionsService = new google.maps.DirectionsService(); 
	
	// Googles service which creates the route. 
	directionsService.route(request, function(response, status) {
		
		// If the request is OK the route will be displayed. 
		if (status == google.maps.DirectionsStatus.OK) {
			
			// Rendering the the route on the map; no A to B markers, a draggable route and the style outlined in routeStyle.
			directionsDisplay = new google.maps.DirectionsRenderer({map: map, suppressMarkers: true, draggable: true, polylineOptions: routeStyle});
			// Display the route based on Googles response. 
			directionsDisplay.setDirections(response);
		}
	});

	// Clears the route after use so that multiple routes are not rendered on the map 
	clearRoute(); 
 
}

/**
 * Clears the route so that there is only one route on the map at a time 
 */
function clearRoute(){
	
	// Set directions to null thus removing the polyline rendered. 
	directionsDisplay.setMap(null);
	
}