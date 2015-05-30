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
          weight: 2,
          opacity: 0.5,
          color: 'black',
          fillOpacity: 0.6,
          fillColor: getColor(feature.properties.quintile)
      };
  }

  // get color depending on value
  function getColor(d) {
      return d === 5  ? '#4dac26' :
          	 d === 4  ? '#b8e186' :
          	 d === 3  ? '#f7f7f7' :
          	 d === 2  ? '#f1b6da' :
          	 '#d01c8b';
  }
  
  function highlightFeature(e) {
      var layer = e.target;
	  info.update(layer.feature.properties);

      layer.setStyle({
          weight: 5,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.7
      });

      if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
      }
  }
  
  // 54.9752342,-1.6512303
  var info = "Newcastle West End Food Bank"; 
  var markerLocation = new L.LatLng(54.9752342,-1.6512303);
  var  marker = new L.Marker(markerLocation).bindPopup(info).addTo(map);  
  var info = "Newcastle East End Food Bank"; 
  var markerLocation = new L.LatLng(54.9797564,-1.5803397);
  var  marker = new L.Marker(markerLocation).bindPopup(info).addTo(map); 
  var geojson; 
  
  function resetHighlight(e) {
      geojson.resetStyle(e.target);
	   info.update();
  }
  
  function zoomToFeature(e) {
      map.fitBounds(e.target.getBounds());
  }
  
  function onEachFeature(feature, layer) {
      layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
      });
  }
  
  
  var info = L.control();

  info.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
      this.update();
      return this._div;
  };

  // method that we will use to update the control based on feature properties passed
  info.update = function (props) {
      this._div.innerHTML = 
	  '<h4>	Newcastle Deprivation Index	</h4>' +  
	  (props ? '<b>' + props.lsoa_name + 
	  '</b><br />' + 'Rank: ' + props.rank + '<br>' +
	  'Score:' + props.index_score
	  
	  : 'Hover over a LSOA');
  };

  info.addTo(map);
  
  
  
  geojson = L.geoJson(newcastle,  {style: getStyle,  onEachFeature: onEachFeature}).addTo(map);
  
	map.fitBounds(geojson.getBounds());

	// Add the geoJSON layer to the map. 
	map.addLayer(geojson);

}