var map, boatRide, pointLayer, photoLayer, groupedOverlays;

// will comment later

function initMap(){

  var base = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

  map = L.map('map', {
		zoom: 12,
		center: [53.40, -2.98],
		layers: base,
		maxZoom: 17
	});
}
