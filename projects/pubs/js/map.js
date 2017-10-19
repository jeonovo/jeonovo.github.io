var map, data, gj;
var code = "1iu4HALT16VaYxQp200oDE8mA6yal_Yf4GsMN9bW7-Z8"

function initMap(){

  var base = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	     maxZoom: 18,
	   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

  map = L.map('map', {
		zoom: 15,
        center: [53.4014, -2.9806],
		layers: base
	});

    getData();

    function getData(){
        data = [];
        // loop through spreadsheet with Tabletop
            Tabletop.init({
                key: code,
                callback: function(sheet, tabletop){

                for (var i in sheet){
                    var rating = Number(sheet[i].pubRating);
                    if (rating > 0){
                        var lng = Number(sheet[i].lng);
                        var lat = Number(sheet[i].lat);
                        var pub = sheet[i].pubName;
                        var marker = turf.point([lng,lat], {"title": pub, "rating":rating});
                        data.push(marker);
                    //make them all a turf point
                  //data.addLayer(L.marker([sheet[i].lat, sheet[i].lng]).bindPopup(sheet[i].pubName))
                    }
                }
                setData(data);
                },
                simpleSheet: true
            });
    }

    function setData(dataArray){
        // create a geojson from the features
        var t = turf.featureCollection(dataArray);
        function onEachFeature(feature, layer) {
            layer.bindPopup(feature.properties.title + ": " + feature.properties.rating)
        }
    var geoStyle = {
        radius: 8,
        fillColor: "#ec1022",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity:0.8
    }


    gj = L.geoJson(t, {
        onEachFeature: onEachFeature,
        pointToLayer: function(feature, latlng){
        return L.circleMarker(latlng, geoStyle);
        }
    }).addTo(map);

    //map.fitBounds(gj.getBounds());

    gj.on('click', function(e){
        console.log(e.layer.feature.properties.title)
        var selected = e.layer.feature.properties.title
        var lng = e.latlng.lng;
        var lat = e.latlng.lat;
        var targetPoint = turf.point([lng, lat]);
        var searchArray = [];
        for (var i in t.features){
            if (t.features[i].properties.title != selected){
                var marker = turf.point([t.features[i].geometry.coordinates[0],t.features[i].geometry.coordinates[1]],{"title":t.features[i].properties.title});
                searchArray.push(marker)
            }

        }
        searchCollection = turf.featureCollection(searchArray);
        var nearest = turf.nearest(targetPoint, searchCollection);
        console.log(nearest.properties.title)

    });

   }
}
