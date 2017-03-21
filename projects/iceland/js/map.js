var map;

function initMap(){

  var base = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

  map = L.map('map', {
		zoom: 12,
    center: [64.142, -21.906],
		layers: base,
		maxZoom: 17
	});

// boat trip
// golden circle
// Northern lights

//var info = 'Hello' + '<br>' + '<img src="http://i.imgur.com/GiKmoET.jpg" alt="Iceland" height="450" width="300">'
//L.marker([64.142, -21.906]).bindPopup(info).addTo(map);

var boatRide = [];

for (id in iceland){

  if (iceland[id].activity === "Boat Ride"){
    var latlng = new L.latLng(iceland[id].lat, iceland[id].lng);
    boatRide.push(latlng);
  } else {

    var info = iceland[id].activity;

    if (iceland[id].image){

      info+= '<br>' + '<img src=' + iceland[id].image + '>'; 

    }

    var latlng = [iceland[id].lat, iceland[id].lng];

    L.marker(latlng).bindPopup(info).addTo(map);
  }
}

  L.polyline(boatRide).bindPopup("Boat Ride").addTo(map);

}
