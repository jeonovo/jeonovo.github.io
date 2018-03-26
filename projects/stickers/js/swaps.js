var code = "1cktGbzgK-rYFBWpWKAN8PL-VMBDLLuZBDmMtZvB9mbU"
var stickerData, jonny, jonathon, chris, jonnyNeed;
var totalStickers = 682;

// probability of dupe in next pack
// sum total spent

function initGraphs(){

    getData();

  function getData(){

        // loop through spreadsheet with Tabletop
            Tabletop.init({
                key: code,
                callback: function(sheet, tabletop){
                    jonnySwaps = [];
                    jonathonSwaps =[];
                    chrisSwaps = [];

                    jonnyNeed = [];
                    jonathonNeed = [];
                    chrisNeed = [];

                    jonny = 0;
                    jonathon = 0;
                    chris = 0;
                    collective = 0;
                  //  jonnyDupe = 0;
                    jonathonDupe=0;
                    chrisDupe =0;
                    collectiveDupe =0;

                    for (var i in sheet){

                      // Loop thru jonny
                      if (sheet[i].JB == 0){
                        jonnyNeed.push(sheet[i].Name);
                      }
          						if (sheet[i].JB > 0) {
                        jonny+=1;
                      }
                      if (sheet[i].JB > 1){
                        //jonnyDupe +=1;
                        jonnySwaps.push(sheet[i].Name);
                      }

                      // Loop through JD
                      if (sheet[i].JD == 0){
                        jonathonNeed.push(sheet[i].Name);
                      }
                      if (sheet[i].JD > 0) {
                        jonathon+=1;
                      }
                      if (sheet[i].JD > 1){
                        //jonnyDupe +=1;
                        jonathonSwaps.push(sheet[i].Name);
                      }

                      // loop thru chris
                      if (sheet[i].CG == 0){
                        chrisNeed.push(sheet[i].Name);
                      }
                      if (sheet[i].CG > 0) {
                        chris+=1;
                      }
                      if (sheet[i].CG > 1){
                        //jonnyDupe +=1;
                        chrisSwaps.push(sheet[i].Name);
                      }

                      // Collective
                      if (Number(sheet[i].Collective > 0)){
                        collective  +=1;
                      }

          			      if (Number(sheet[i].Collective) > 1){
                        collectiveDupe +=1;
                      }
              }



          updateStats(jonny, jonathon, chris, collective, jonnySwaps.length, jonathonSwaps.length, chrisSwaps.length, collectiveDupe);
          updateSwaps(jonnySwaps, jonathonSwaps, chrisSwaps, jonnyNeed, jonathonNeed, chrisNeed);



				  },
                simpleSheet: true,
            });

    }
	function updateSwaps(jb, jd, cg, jbn, jdn, cgn){

  /** JB SWAPS **/
  var jbContent ="<b>Jonny Swaps:</b><br>";
  var jbjd =0;
  var jbcg =0;
  var jbjb = 0;

  // JB Swaps
  for (i in jb){

    var cgnValue = 0;
    var jdnValue = 0;
    var whoNeed = "";
    var jbGot = jb[i];

      for (i in cgn){
          if (cgn[i] == jbGot){
            cgnValue = 1;
            jbcg+=1;
          }
      }

      for (i in jdn){
        if (jdn[i] == jbGot){
          jdnValue = 1;
          jbjd+=1;
        }
      }

      if (cgnValue && jdnValue == 1){
        whoNeed = " - Both";
        jbContent += jbGot + whoNeed + "<br>";

      } else if(cgnValue == 1) {
        whoNeed = " - Chris";
        jbContent += jbGot + whoNeed + "<br>";
      } else if(jdnValue == 1){
        whoNeed = " - JD"
        jbContent += jbGot + whoNeed + "<br>";
      } else {
        whoNeed = " - Dupe"
        jbjb +=1;
      }




    }
    document.getElementById('jbjb').innerHTML = jbjb;
    document.getElementById('jbjd').innerHTML = jbjd;
    document.getElementById('jbcg').innerHTML = jbcg;
    document.getElementById('jbArea').innerHTML = jbContent;
    /***********************/

  /** JD SWAPS **/
  var jdContent ="<b>JD Swaps:</b><br>";
  var jdjb =0;
  var jdcg =0;
  var jdjd = 0;

  // JD Swaps
  for (i in jd){

    var jbnValue = 0;
    var cgnValue = 0;
    var whoNeed = "";
    var jdGot = jd[i];

      for (i in jbn){
          if (jbn[i] == jdGot){
            jbnValue = 1;
            jdjb+=1;
          }
      }

      for (i in cgn){
        if (cgn[i] == jdGot){
          cgnValue = 1;
          jdcg+=1;
        }
      }

      if (cgnValue && jbnValue == 1){
        whoNeed = " - Both";
        jdContent += jdGot + whoNeed + "<br>";
      } else if(jbnValue == 1) {
        whoNeed = " - Jonny";
        jdContent += jdGot + whoNeed + "<br>";
      } else if(cgnValue == 1){
        whoNeed = " - Chris"
        jdContent += jdGot + whoNeed + "<br>";
      } else {
        whoNeed = " - Dupe"
        jdjd+=1;
      }


    }
    document.getElementById('jdjb').innerHTML = jdjb;
    document.getElementById('jdcg').innerHTML = jdcg;
    document.getElementById('jdjd').innerHTML = jdjd;
    document.getElementById('jdArea').innerHTML = jdContent;
/***********************/

/** CG Swaps  **/
  var cgContent ="<b>Chris Swaps:</b><br>";
  var cgjb = 0;
  var cgjd = 0;
  var cgcg = 0;

  for (i in cg){

    var jbnValue = 0;
    var jdnValue = 0;
    var whoNeed = "";
    var cgGot = cg[i];

      for (i in jbn){
          if (jbn[i] == cgGot){
            jbnValue = 1;
            cgjb +=1;
          }
      }

      for (i in jdn){
        if (jdn[i] == cgGot){
          jdnValue = 1;
          cgjd +=1;
        }
      }

      if (jbnValue && jdnValue == 1){
        whoNeed = " - Both";
        cgContent += cgGot + whoNeed + "<br>";
      } else if(jbnValue == 1) {
        whoNeed = " - Jonny";
        cgContent += cgGot + whoNeed + "<br>";
      } else if(jdnValue == 1){
        whoNeed = " - JD";
        cgContent += cgGot + whoNeed + "<br>";
      } else {
        whoNeed = " - Dupe"
        cgcg +=1;
      }



    }
    document.getElementById('cgjb').innerHTML = cgjb;
    document.getElementById('cgjd').innerHTML = cgjd;
    document.getElementById('cgcg').innerHTML = cgcg;
    document.getElementById('cgArea').innerHTML = cgContent;
    /***********************/
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
