var code = "1ktP26qK_hnxDTlV1ZQ13ipWcuo7a_7tHeo9af6ncj_Y";
var eng = 0;
var sco = 0;
var wls = 0;

var grtb = 0;
function initialize() {



	var base =  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });


	// layers from https://github.com/leaflet-extras/leaflet-providers

	var map = L.map('map', {
		zoom: 2,
		layers: base,
		maxZoom: 18,
		center: [30,6.9]
	});


    // Tabletop

    Tabletop.init({
      key: code,
      callback: function(sheet, tabletop){

          var data = [];


          for (var i in sheet){

			  var obj ={ "c": sheet[i].c, "t": Number(sheet[i].tn), "r":Number(sheet[i].nr)}
			  data.push(obj);
      }

      makeMap(data);
      },

      simpleSheet: true
    });


function makeMap(nat){

  function getStyle(feature) {
      return {
          weight: getWeight(feature.properties.ACOUNT),
          opacity: getWeight(feature.properties.ACOUNT),
          color: 'black',
          fillOpacity: getOpacity(feature.properties.ACOUNT),
          fillColor: getColor(feature.properties.ACOUNT)
      };
  }

  function getOpacity(d){
      return d > 0 ? 0.6 :
      0
  }

  function getWeight(d){
      return d > 0 ? 1 :
      0
  }

  // get color depending on value
  function getColor(d) {
      return d > 10 ? '#6A002E' :
	  		 d > 8  ? '#980043' :
          	 d > 4  ? '#dd1c77' :
          	 d > 2  ? '#df65b0' :
          	 d > 1  ? '#d7b5d8' :
          	 '#FFFFFFFF';
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
	  '<h4>	Author Count</h4>' +
	  (props ? '<b>' + props.NAME + '</b><br>' + 'Count: ' + props.ACOUNT
	  : 'Hover over a country');
  };

  info.addTo(map);

geojson = L.geoJson(world,  {style: getStyle, onEachFeature: onEachFeature});



 for (i in geojson._layers){

     acount = geojson._layers[i].feature.properties.ACOUNT;
		 n = geojson._layers[i].feature.properties.NAME;

		 // set all to 0
		 if (acount === null){
            geojson._layers[i].feature.properties.ACOUNT = 0;
        }

		// if there is a match
		 for (var j in nat){

			 if (nat[j].c === n){
				 geojson._layers[i].feature.properties.ACOUNT = nat[j].t
			 }
		 }



    // console.log(geojson._layers[i].feature.properties.NAME)

     //can add in field like this -- geojson._layers[i].feature.properties.READ = 'y';

 }

 // Set the style of the choropleth map.
 	geojson.setStyle(getStyle);



	//map.fitBounds(geojson.getBounds());

	// Add the geoJSON layer to the map.
	map.addLayer(geojson);

}

}
