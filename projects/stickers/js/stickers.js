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
          collective = 0;
          jonnyDupe = 0;
		  jdDupe=0;
		  chrisDupe =0;
		  collectiveDupe =0;
                    for (var i in sheet){


						if (Number(sheet[i].JB > 0)){

							jonny +=1;
						}

						if (Number(sheet[i].JD > 0)){

							jonathon +=1;
						}

						if (Number(sheet[i].CG > 0)){

							chris +=1;
						}

            if (Number(sheet[i].Collective > 0)){

              collective  +=1;

            }

            if (Number(sheet[i].JB) > 1){
              jonnyDupe +=1;

            }
			if (Number(sheet[i].JD) > 1){
              jdDupe +=1;

            }
			if (Number(sheet[i].CG) > 1){
              chrisDupe +=1;

            }
			if (Number(sheet[i].Collective) > 1){
              collectiveDupe +=1;

            }



          }

            updateStats(jonny, jonathon, chris, collective, jonnyDupe, jdDupe, chrisDupe, collectiveDupe);
				    makeChart(jonny, jonathon, chris);
            makeRatioChart(jonny, jonathon, chris, jonnyDupe, jdDupe, chrisDupe);
				  },
                simpleSheet: true,
            });

    }
	// jonny, jonathon, chris, collective, jonnyDupe, jdDupe, chrisDupe, collectiveDupe
	function updateStats(value1, value2, value3, value4, value5, value6, value7, value8){


    document.getElementById('jbc').innerHTML = value1;
		document.getElementById('jbd').innerHTML = value5;

		document.getElementById('jdc').innerHTML = value2;
		document.getElementById('jdd').innerHTML = value6;

		document.getElementById('cgc').innerHTML = value3;
		document.getElementById('cgd').innerHTML = value7;

		document.getElementById('clc').innerHTML = value4;
		document.getElementById('cld').innerHTML = value8;

	}

	    function makeChart(v1,v2,v3){

			var jb = Math.round((v1/totalStickers*100) * 100) / 100;
			var jd = Math.round((v2/totalStickers*100) * 100) / 100;
			var cg = Math.round((v3/totalStickers*100) * 100) / 100;

        var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: ["Jonny", "Jonathon", "Chris"],
        datasets: [{
            label: '% Got Got Need',
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

    //jb jd cg jbd jdd cgd
  function makeRatioChart(v1, v2, v3, v4, v5, v6){

    var jbTotal = v1 + v4;
    var jdTotal = v2 + v5;
    var cgTotal = v3 + v6;

    var jb1 = Math.round((v1/jbTotal*100) * 100) / 100;
    var jd1 = Math.round((v2/jdTotal*100) * 100) / 100;
    var cg1 = Math.round((v3/cgTotal*100) * 100) / 100;

    var jb2 = Math.round((v4/jbTotal*100) * 100) / 100;
    var jd2 = Math.round((v5/jdTotal*100) * 100) / 100;
    var cg2 = Math.round((v6/cgTotal*100) * 100) / 100;

    var ctx = document.getElementById("ratioChart").getContext('2d');
      var myChart = new Chart(ctx, {
          type: 'horizontalBar',
          data: {
              labels: ["Jonny", "Jonathon", "Chris"],
              datasets: [{
                label: 'Got',
                data: [jb1, jd1, cg1],
                backgroundColor: "green",
              borderColor: 'black',
              borderWidth: 0.5

              },{
                label: 'Swap',
                data: [jb2, jd2, cg2],
                backgroundColor: "red",
              borderColor: 'black',
              borderWidth: 0.5

          }]},
          options: {
      		legend: {
      			display: false
      		},
              title: {
                 display: true,
                 text: 'Got / Swap Ration'
             },
              scales: {
                yAxes:[{stacked: true}],
                  xAxes: [{
                    stacked: true,
                      ticks: {
                          beginAtZero:true
                      }
                  }]
              }
          }
      });

          }




}
