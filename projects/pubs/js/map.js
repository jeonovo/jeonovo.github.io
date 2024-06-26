var sheet, map, data, gj, info, sliderValue, noloc;

function initMap(){
	data = [];
	sheet = []; 




    var colour = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

    

    var baseMaps = {
    "Colour": colour
    };




  map = L.map('map', {
		zoom: 6,
                center: [53.8016914,-1.5586626],
		layers: colour
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

}
    function getData(value){
	    
	   noloc = 0; 
        
	    Papa.parse('https://docs.google.com/spreadsheets/d/e/2PACX-1vQtlacn_Wo3gKG7wgmqHdvqo-wvJ65aCMXSK6I8rD5BnXtfxM1D2wAiLQodXyHxyepRxW3OgzB0yGYR/pub?output=csv',{
            download:true,
		    header: true,
		    complete: function(results){
			    sheet = results.data
			    //console.log(sheet)    
		    
                data = [];
                if (typeof gj != "undefined"){
                    map.removeLayer(gj);
                }
                for (var i in sheet){
                    var rating = Number(sheet[i].pubRating);
                    if (rating >= value){
                        var lng = Number(sheet[i].lng);
			    if (lng == 0){noloc = noloc + 1;}
                        var lat = Number(sheet[i].lat);
                        var pub = sheet[i].pubName;
                        var note = sheet[i].notes
                        var marker = turf.point([lng,lat], {"title": pub, "rating":rating, "notes": note});
                        data.push(marker);
			
                    //make them all a turf point
                  //data.addLayer(L.marker([sheet[i].lat, sheet[i].lng]).bindPopup(sheet[i].pubName))
                    }
			
		}
		console.log(data); 
			    console.log(noloc); 
			setData(data);
		    }   
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
            radius: 6,
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
                setSliderValue(value);
                getData(value);
        }
    });
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
