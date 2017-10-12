var map;
var code = "1iu4HALT16VaYxQp200oDE8mA6yal_Yf4GsMN9bW7-Z8"

function initMap(){

  var base = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

  map = L.map('map', {
		zoom: 12,
		center: [53.40, -2.98],
		layers: base
	});

// loop through spreadsheet with Tabletop
    Tabletop.init({
    key: code,
    callback: function(sheet, tabletop){

      for (var i in sheet){
        var data = sheet[i];
          L.marker([data.lat, data.lng])
          .addTo(map)
          .bindPopup(data.pubName);
      }
    },
    simpleSheet: true
  })




}
