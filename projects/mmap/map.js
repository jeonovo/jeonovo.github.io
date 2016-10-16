function initialize() {
	
	

	var base = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 18,
	ext: 'png'
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
          fillColor: '#d01c8b'
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
	  '<center><h4>	Monkey Map	</h4></center>' +  
	  (props ? '<b>' + props.Genus + 
	  '</b><br />' + 'Species: ' + props.Species + '<br>' +
	  'Sub Species:' + props.SubSpecies
	  
	  : 'Hover over a range');
  };

  info.addTo(map);
  
  
  
  geojson = L.geoJson(gbg_range,  {style: getStyle,  onEachFeature: onEachFeature}).addTo(map);
  
	map.fitBounds(geojson.getBounds());

	// Add the geoJSON layer to the map. 
	map.addLayer(geojson);

}