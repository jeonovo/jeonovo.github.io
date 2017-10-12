var map;
var code = "https://docs.google.com/spreadsheets/d/1iu4HALT16VaYxQp200oDE8mA6yal_Yf4GsMN9bW7-Z8"

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

  var ds = new Miso.Dataset({
  importer : Miso.Dataset.Importers.GoogleSpreadsheet,
  parser : Miso.Dataset.Parsers.GoogleSpreadsheet,
  key : "1iu4HALT16VaYxQp200oDE8mA6yal_Yf4GsMN9bW7-Z8",
  worksheet : "1"
});

ds.fetch({
  success : function() {
    console.log(ds.columnNames());
  },
  error : function() {
    console.log("Are you sure you are connected to the internet?");
  }
});





}
