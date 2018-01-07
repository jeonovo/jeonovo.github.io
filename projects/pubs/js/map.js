var map, data, gj, info, sliderValue;
var code = "1iu4HALT16VaYxQp200oDE8mA6yal_Yf4GsMN9bW7-Z8"

function initMap(){

  var toner = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
	     attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">'+
        'CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	   subdomains: 'abcd',
	   minZoom: 0,
	   maxZoom: 20,
	   ext: 'png'
    });

    var colour = L.tileLayer('https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
    	maxZoom: 18,
    	attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    var Thunderforest_Pioneer = L.tileLayer('https://{s}.tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey={apikey}', {
	       attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	   apikey: 'a18b589d244e4b968a05cd7c141c190b',
	   maxZoom: 22
    });

    var baseMaps = {
    "Toner": toner,
    "Colour": colour,
    "Pioneer": Thunderforest_Pioneer
    };




  map = L.map('map', {
		zoom: 15,
        center: [53.4014, -2.9806],
		layers: toner
	});

    LayerControl = L.control.layers(baseMaps,null,{position: 'topleft'});
    LayerControl.addTo(map);

    setSlider();
    getData(0);

    info = L.control();

    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    info.update = function () {
        ar =Math.round(getAverageRating()*100)/100
        totalPubs = getCount();
        if (typeof(sliderValue) == 'undefined'){
            sv = 0;
        } else {
            sv = sliderValue;
        }
        this._div.innerHTML = "Slider Rating: " + sv +
        "<br>" + "Total Pubs: " + totalPubs+
        "<br>" + "Average Rating: " + ar;
    };

    info.addTo(map);


    function getData(value){
        data = [];
        // loop through spreadsheet with Tabletop
            Tabletop.init({
                key: code,
                callback: function(sheet, tabletop){

                for (var i in sheet){
                    var rating = Number(sheet[i].pubRating);
                    if (rating >= value){
                        var lng = Number(sheet[i].lng);
                        var lat = Number(sheet[i].lat);
                        var pub = sheet[i].pubName;
                        var note = sheet[i].notes
                        var marker = turf.point([lng,lat], {"title": pub, "rating":rating, "notes": note});
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

        info.update();

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
        var notes = e.layer.feature.properties.notes
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

        var content = selected + ": " + rating + "<br>";
        if (notes != ""){
            content += "Note: " + notes;
        }
        content += "<p><i>Closest is " + nearestPub + ": " + nearestPubRating + "</i>";

        e.layer.setPopupContent(content);
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
        onInit: function(position, value) {
            setSliderValue(value);
        },

        // Callback function
        onSlide: function(position, value) {},

        // Callback function
        onSlideEnd: function(position, value) {
            getData(value);
            setSliderValue(value);
        }
    });
}
function setInfo(){


}


function getCount(){
    return data.length;
}

function getAverageRating(){

    if (data.length == 0){return "";}
    else{
        var total = 0;
        for (var i in data){
            total = total + data[i].properties.rating;
        }
        var avg = total/data.length;
        return avg;
    }
}

function setSliderValue(value){
    sliderValue = value;

}

}
