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
                    jonnySwaps = [];
                    jdSwaps =[];
                    chrisSwaps = [];

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
                        jonnySwaps.push(sheet[i].Name);

                      }
          			if (Number(sheet[i].JD) > 1){
                        jdDupe +=1;
                        jdSwaps.push(sheet[i].Name);

                      }
          			if (Number(sheet[i].CG) > 1){
                        chrisDupe +=1;
                        chrisSwaps.push(sheet[i].Name);

                      }
          			if (Number(sheet[i].Collective) > 1){
                        collectiveDupe +=1;

                      }





          }

          updateStats(jonny, jonathon, chris, collective, jonnyDupe, jdDupe, chrisDupe, collectiveDupe);
          updateSwaps(jonnySwaps, jdSwaps, chrisSwaps);


				  },
                simpleSheet: true,
            });

    }
	function updateSwaps(jb, jd, cg){

  var jbContent ="<b>Jonny Swaps:<br>";

  for (i in jb){

      jbContent += jb[i] + "<br>";

    }
    document.getElementById('jbArea').innerHTML = jbContent;


  var jdContent ="<b>JD Swaps:<br>";

  for (i in jd){

      jdContent += jd[i] + "<br>";

    }
    document.getElementById('jdArea').innerHTML = jdContent;


  var cgContent ="<b>Chris Swaps:<br>";

  for (i in cg){

      cgContent += cg[i] + "<br>";

    }
    document.getElementById('cgArea').innerHTML = cgContent;

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
}
