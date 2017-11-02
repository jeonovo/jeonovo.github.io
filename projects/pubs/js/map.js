var map, data, gj;
var code = "1iu4HALT16VaYxQp200oDE8mA6yal_Yf4GsMN9bW7-Z8"

function initMap(){

  var base = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
});

  map = L.map('map', {
		zoom: 15,
        center: [53.4014, -2.9806],
		layers: base
	});

    setSlider();
    getData(0);

    function getData(value){
        data = [];
        // loop through spreadsheet with Tabletop
            Tabletop.init({
                key: code,
                callback: function(sheet, tabletop){

                for (var i in sheet){
                    var rating = Number(sheet[i].pubRating);
                    if (rating > value){
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
            layer.bindTooltip(feature.properties.title + ": " + feature.properties.rating)
        }

    var geoStyle = {
        radius: 8,
        fillColor: "#ec1022",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity:0.8
    }
    if (typeof gj != "undefined"){
        map.removeLayer(gj);
    }

    gj = L.geoJson(t, {
        onEachFeature: onEachFeature,
        pointToLayer: function(feature, latlng){
        return L.circleMarker(latlng, geoStyle);
        }
    }).addTo(map);

    //map.fitBounds(gj.getBounds());

    gj.on('click', function(e){
        e.layer.closeTooltip()
        var selected = e.layer.feature.properties.title
        var rating = e.layer.feature.properties.rating;
        var lng = e.latlng.lng;
        var lat = e.latlng.lat;
        var targetPoint = turf.point([lng, lat]);
        var searchArray = [];
        for (var i in t.features){
            if (t.features[i].properties.title != selected){
                var marker = turf.point([t.features[i].geometry.coordinates[0],t.features[i].geometry.coordinates[1]],
                  {"title":t.features[i].properties.title, "rating":t.features[i].properties.rating});
                searchArray.push(marker)
            }
        }
        searchCollection = turf.featureCollection(searchArray);
        var nearest = turf.nearest(targetPoint, searchCollection);
        var nearestPub = nearest.properties.title;
        var nearestPubRating = nearest.properties.rating;
        e.layer.setPopupContent(selected + ": " + rating + "<br>Closet is " + nearestPub + ": " + nearestPubRating);
    });

}
function setSlider(){
    $('input[type="range"]').rangeslider({

        // Feature detection the default is `true`.
        // Set this to `false` if you want to use
        // the polyfill also in Browsers which support
        // the native <input type="range"> element.
        polyfill: false,
        // Default CSS classes
    rangeClass: 'rangeslider',
    disabledClass: 'rangeslider--disabled',
    horizontalClass: 'rangeslider--horizontal',
    fillClass: 'rangeslider__fill',
    handleClass: 'rangeslider__handle',

        // Callback function
        onInit: function() {},

        // Callback function
        onSlide: function(position, value) {},

        // Callback function
        onSlideEnd: function(position, value) {

            console.log(value);
            getData(value);
        }
    });
    }

}
