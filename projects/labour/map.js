var geojson; 
var corbyn;
var cooper;
var kendall;
var burnham; 
var dnv; 
function initialize() {
	
	

	var base = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
  subdomains: 'abcd',
  maxZoom: 18
});

	
	// layers from https://github.com/leaflet-extras/leaflet-providers
	
	var map = L.map('map', {
		center: [53.4252237,-2.0016499],
    zoom: 7,
		layers: base,
		maxZoom:18,
    minZoom: 5
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
          fillOpacity: 0.5
      });

      if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
      }
  }

  
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
	  '</b><br />' + 'Nominated: ' + props.nom + '<br>' : 'Hover over a constituency');
  };

  info.addTo(map);

  geojson = L.geoJson(labour, {style: getStyle,  onEachFeature: onEachFeature}).addTo(map);
  
	// Add the geoJSON layer to the map. 
	map.addLayer(geojson);

  getCounts();
  makeChart(); 

}

function getCounts(){
  corbyn = 0;
  cooper = 0;
  kendall = 0;
  burnham = 0; 
  dnv = 0;

    // Loop through the geoJson layer variable created from the geoJSON data. 
  for (id in geojson._layers){

    candidate = geojson._layers[id].feature.properties.nom
    
    // If the feature properties match what has been selected. 
    if ( candidate === "Jeremy Corbyn"){ 
      corbyn+=1;
    } else if (candidate === "Liz Kendall"){
      kendall+=1
    } else if (candidate === "Yvette Cooper"){
      cooper+=1
    } else if (candidate === "Andy Burnham"){
      burnham+=1
    } else{
      dnv+=1; 
    }
  }
}


function makeChart(){

  var data = {
      labels: ["Corbyn", "Cooper", "Kendall", "Burnham"],
      datasets: [
          {
              label: "Labour Candidates",
              // fillColor: "rgba(22,220,220,0.5)",
              // strokeColor: "rgba(220,220,220,0.8)",
              // highlightFill: "rgba(220,220,220,0.75)",
              // highlightStroke: "rgba(220,220,220,1)",
              data: [corbyn,cooper,kendall,burnham]
          }
      ]
  };

  var ctx = document.getElementById("chart").getContext("2d");

  var myBarChart = new Chart(ctx).Bar(data);

  myBarChart.datasets[0].bars[0].fillColor = "rgba(253,214,111,0.5)";
  myBarChart.datasets[0].bars[1].fillColor = "rgba(51,160,44,0.5)";
  myBarChart.datasets[0].bars[2].fillColor = "rgba(18,108,255,0.5)";
  myBarChart.datasets[0].bars[3].fillColor = "rgba(231,54,29,0.5)";
  myBarChart.datasets[0].bars[0].highlightFill = "rgba(253,214,111,1)";
  myBarChart.datasets[0].bars[1].highlightFill = "rgba(51,160,44,1)";
  myBarChart.datasets[0].bars[2].highlightFill = "rgba(18,108,255,1)";
  myBarChart.datasets[0].bars[3].highlightFill = "rgba(231,54,29,1)";
  myBarChart.update();

}