var code = "1cktGbzgK-rYFBWpWKAN8PL-VMBDLLuZBDmMtZvB9mbU"
var stickerData, jonny, jonathon, chris;
var totalStickers = 682; 

function initGraphs(){

    getData();

  function getData(){

        // loop through spreadsheet with Tabletop
            Tabletop.init({
                key: code,
                callback: function(sheet, tabletop){
                    stickerData = [];
					jonny = 0; 
					jonathon = 0;
					chris = 0;
                    for (var i in sheet){
						var got = Number(sheet[i].pubRating);
						
						if (Number(sheet[i].JB > 0)){
							
							jonny +=1; 
						}
						
						if (Number(sheet[i].JD > 0)){
							
							jonathon +=1; 
						}
						
						if (Number(sheet[i].CG > 0)){
							
							chris +=1; 
						} 
                        
						
                    }
                   updateStats(jonny, jonathon, chris);
				   makeChart(jonny, jonathon, chris);                 
				  },
                simpleSheet: true,
            });

    }
	
	function updateStats(value1, value2, value3){
		
		content = 'Jonny: ' + value1;
		content += '<br>Jonathon: ' + value2;
		content += '<br>Chris: ' + value3;

        document.getElementById('statsArea').innerHTML = content;	
		
		 
	}
	
	    function makeChart(v1,v2,v3){
			
			var jb = Math.round((v1/totalStickers*100) * 100) / 100;
			console.log(jb); 
			var jd = Math.round((v2/totalStickers*100) * 100) / 100;
			var cg = Math.round((v3/totalStickers*100) * 100) / 100;
			
        var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: ["Jonny", "Jonathon", "Chris"],
        datasets: [{
            label: '% Got Not Got',
            data: [jb,jd,cg],
            backgroundColor:
                ['rgba(255, 99, 132, 0.5)','rgba(255, 254, 0, 0.5)','rgba(31, 87, 220, 0.5)'],
            borderColor: 'black',
            borderWidth: 1
        }]
    },
    options: {
		legend: {
			display: false
		},
        title: {
           display: true,
           text: 'Percentage Complete'
       },
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

    }
	
	
}
