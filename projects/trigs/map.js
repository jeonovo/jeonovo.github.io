var markers;
var cluster;
var code = "1atk1vdHFDsJCt4J1HyxszwDM8Go_bmD_suajQzhnhwA";
function initialize() {

  markers = [];


	var base =   L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 18,
	ext: 'png'
});




	// layers from https://github.com/leaflet-extras/leaflet-providers

	var map = L.map('map', {
		center: [54.9752342,-1.6512303],
    zoom: 10,
		layers: base,
		maxZoom: 17
	});

     cluster = new L.MarkerClusterGroup();

    // loop through spreadsheet with Tabletop
        Tabletop.init({
            key: code,
            callback: function(sheet, tabletop){

                for (var id in sheet){
                    // Info for the popup
                    var info = "<html><div class=popup>"
                    + "<div id=name>" + sheet[id].tp_name + "</div>";
                  var markerLocation = new L.LatLng(sheet[id].latitude, sheet[id].longitude);

                  // do a swicth statement for categories later


                  // Create marker
                  var  marker = new L.Marker(markerLocation).bindPopup(info,{maxWidth:150});
                  // var  marker = new L.Marker(markerLocation, {icon: createIcon()}).bindPopup(info,{maxWidth:150});

                  markers.push(marker);

                  cluster.addLayers(markers);

                //map.addLayer(marker);

                }


              },
            simpleSheet: true,
        });


// geojson = L.geoJson(trigs)



  //addMarkers();
  map.addLayer(cluster);


function createIcon() {

  var icon = L.icon({
        iconUrl: 'trigs/trigpoint1.png',
        iconSize:     [24, 24], // size of the icon
        iconAnchor:   [6, 12], // point of the icon which will correspond to marker's location
        popupAnchor:  [7, -12] // point from which the popup should open relative to the iconAnchor
      });
      return icon;
}

}
