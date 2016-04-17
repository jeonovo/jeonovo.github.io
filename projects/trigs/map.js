var markers;
var cluster;

function initialize() {

  markers = [];
	

	var base =  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

	
	// layers from https://github.com/leaflet-extras/leaflet-providers


	var map = L.map('map', {
		center: [54.9752342,-1.6512303],
    zoom: 10,
		layers: base,
		maxZoom: 18
	});

 geojson = L.geoJson(trigs)
 cluster = new L.MarkerClusterGroup(); 


  addMarkers();
  map.addLayer(cluster); 

  function addMarkers(){

    for (id in geojson._layers){
  
        // Info for the popup 
        var info = "<html><div class=popup>" 
        + "<div id=name>" + geojson._layers[id].feature.properties.tp_name + "</div>"; 
      var markerLocation = new L.LatLng(geojson._layers[id].feature.properties.lat, geojson._layers[id].feature.properties.long);
      
      // do a swicth statement for categories later 
      
      
      // Create marker
      var  marker = new L.Marker(markerLocation, {icon: createIcon()}).bindPopup(info,{maxWidth:150}); 
      
      markers.push(marker); 

      cluster.addLayers(markers); 

    //map.addLayer(marker);

    }
  }

function createIcon() {

  var icon = L.icon({
        iconUrl: 'trigs/trigpoint1.png',
        iconSize:     [24, 24], // size of the icon
        iconAnchor:   [6, 12], // point of the icon which will correspond to marker's location
        popupAnchor:  [6, -12] // point from which the popup should open relative to the iconAnchor
      });
      return icon;
}

}