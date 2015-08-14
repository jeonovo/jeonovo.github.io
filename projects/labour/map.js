function initialize() {
	
	

	var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 1,
  maxZoom: 12,
  ext: 'png'
});

	
	// layers from https://github.com/leaflet-extras/leaflet-providers
	
	var map = L.map('map', {
		zoom: 12,
		layers: Stamen_TonerLite,
		maxZoom: 16
	});
	 

  function getStyle(feature) {
      return {
          weight: 1,
          opacity: 0.5,
          color: 'black',
          fillOpacity: 0.9,
          fillColor: getColor(feature.properties.nom)
      };
  }

  // get color depending on value
  function getColor(d) {
      return d === "Jeremy Corbyn"  ? '#fdd66f' :
          	 d === "Liz Kendall" ? '#1f78b4' :
          	 d === "Andy Burnham"  ? '#e31a1c' :
          	 d === "Yvette Cooper"  ? '#33a02c' :
          	 '#c4d4d9';
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
	  '<h4>	Labour MP Nominations	</h4>' +  
	  (props ? '<b>' + props.mp + '<br>' + props.con +
	  '</b><br />' + 'Nominated: ' + props.nom + '<br>' : 'Hover over a con');
  };

  info.addTo(map);
  
  
  
  geojson = L.geoJson(labour, {style: getStyle,  onEachFeature: onEachFeature}).addTo(map);
  
	map.fitBounds(geojson.getBounds());

	// Add the geoJSON layer to the map. 
	map.addLayer(geojson);

}