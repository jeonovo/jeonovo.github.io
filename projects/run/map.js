function initialize() {


	var base =  L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
	minZoom: 0,
	maxZoom: 18,
	attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});


	// layers from https://github.com/leaflet-extras/leaflet-providers

	var map = L.map('map', {
		zoom: 12,
		layers: base,
		maxZoom: 18
	});


  function getStyle(feature) {
      return {
          radius: 3,
					weight: 0,
          opacity: 0.5,
          color: 'black',
          fillOpacity: 1,
          fillColor: getColor(feature.properties.pace)
      };
  }

  // get color depending on value
  function getColor(d) {
      return d < 5   ? '#4dac26' :
          	 d < 5.30     ? '#b8e186' :
          	 d < 6.30  ? '#f7f7f7' :
          	 d < 7  ? '#f1b6da' :
          	 '#d01c8b';
  }

	var legend = L.control({position: 'bottomright'});

	legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
    grades = [0,5,5.30,6.30,7]
    labels = [];
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i]) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;'  + grades[i + 1] + '/km<br>' : '+/km');
}

return div;
};

legend.addTo(map);


  var geojson;

geojson = L.geoJson(rungeo, {
	    pointToLayer: function (feature, latlng) {
			var marker = L.circleMarker(latlng, getStyle(feature))
			var info = feature.properties.pace + " /km"
			marker.bindPopup(info);
	        return marker;
	    }
	}).addTo(map);

	map.fitBounds(geojson.getBounds());

	// Add the geoJSON layer to the map.
	map.addLayer(geojson);

}
