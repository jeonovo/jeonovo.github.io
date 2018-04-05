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
                    brintSwaps = [];

                    jonnyNeed = [];
                    jonathonNeed = [];
                    chrisNeed = [];
                    brintNeed = [];

                    jonny = 0;
                    jonathon = 0;
                    chris = 0;
                    brint = 0;
                    collective = 0;

                    collectiveDupe = 0;


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
                        chrisSwaps.push(sheet[i].Name);
                      }

                      // loop thru brint
                      if (sheet[i].RB == 0){
                        brintNeed.push(sheet[i].Name);
                      }
                      if (sheet[i].RB > 0) {
                        brint+=1;
                      }
                      if (sheet[i].RB > 1){

                        brintSwaps.push(sheet[i].Name);
                      }

                      // Collective
                      if (Number(sheet[i].Collective > 0)){
                        collective  +=1;
                      }

          			      if (Number(sheet[i].Collective) > 1){
                        collectiveDupe +=1;
                      }
              }



          updateStats(jonny, jonathon, chris, collective, jonnySwaps.length, jonathonSwaps.length, chrisSwaps.length, collectiveDupe, brint, brintSwaps.length);
          updateSwaps(jonnySwaps, jonathonSwaps, chrisSwaps, jonnyNeed, jonathonNeed, chrisNeed, brintSwaps, brintNeed);



				  },
                simpleSheet: true,
            });

    }
	function updateSwaps(jb, jd, cg, jbn, jdn, cgn, rb, rbn){

  /** JB SWAPS **/
  var jbContent ="<b>Jonny Swaps:</b><br>";
  var jbjd =0;
  var jbcg =0;
  var jbjb = 0;
  var jbrb = 0;

  // JB Swaps
  for (i in jb){

    var cgnValue = 0;
    var jdnValue = 0;
    var rbnValue = 0;
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
      for (i in rbn){
        if (rbn[i] == jbGot){
          rbnValue = 1;
          jbrb +=1;
        }
      }

      if (jdnValue && cgnValue && rbnValue == 1){
            whoNeed = " - All";
            jbContent += jbGot + whoNeed + "<br>";
     } else if (jdnValue && cgnValue == 1){
            whoNeed = " - JD CG";
            jbContent += jbGot + whoNeed + "<br>";
     } else if (jdnValue && rbnValue  == 1){
            whoNeed = " - JD RB";
            jbContent += jbGot + whoNeed + "<br>";
      } else if (cgnValue && rbnValue  == 1){
            whoNeed = " - CG RB";
            jbContent += jbGot + whoNeed + "<br>";
      } else if(jdnValue == 1) {
            whoNeed = " - JD";
            jbContent += jbGot + whoNeed + "<br>";
        } else if(cgnValue == 1){
            whoNeed = " - CG";
            jbContent += jbGot + whoNeed + "<br>";
     } else if(rbnValue == 1) {
            whoNeed = " - RB";
            jbContent += jbGot + whoNeed + "<br>";
      } else {
            whoNeed = " - Dupe"
	    // jbContent += jbGot + whoNeed + "<br>";
            jbjb +=1;
      }




    }
    document.getElementById('jbjb').innerHTML = jbjb;
    document.getElementById('jbjd').innerHTML = jbjd;
    document.getElementById('jbcg').innerHTML = jbcg;
    document.getElementById('jbrb').innerHTML = jbrb;
    document.getElementById('jbArea').innerHTML = jbContent;
    /***********************/

  /** JD SWAPS **/
  var jdContent ="<b>JD Swaps:</b><br>";
  var jdjb =0;
  var jdcg =0;
  var jdjd = 0;
  var jdrb = 0;

  // JD Swaps
  for (i in jd){

    var jbnValue = 0;
    var cgnValue = 0;
    var rbnValue = 0;
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

      for (i in rbn){
        if (rbn[i] == jdGot){
          rbnValue = 1;
          jdrb +=1;
        }
      }

      if (jbnValue && cgnValue && rbnValue == 1){
            whoNeed = " - All";
            jdContent += jdGot + whoNeed + "<br>";
     } else if (jbnValue && cgnValue == 1){
            whoNeed = " - JB CG";
            jdContent += jdGot + whoNeed + "<br>";
     } else if (jbnValue && rbnValue  == 1){
            whoNeed = " - JB RB";
            jdContent += jdGot + whoNeed + "<br>";;
      } else if (cgnValue && rbnValue  == 1){
            whoNeed = " - CG RB";
            jdContent += jdGot + whoNeed + "<br>";
      } else if(jbnValue == 1) {
            whoNeed = " - JB";
            jdContent += jdGot + whoNeed + "<br>";
        } else if(cgnValue == 1){
            whoNeed = " - CG";
            jdContent += jdGot + whoNeed + "<br>";
     } else if(rbnValue == 1) {
            whoNeed = " - RB";
            jdContent += jdGot + whoNeed + "<br>";
      } else {
            whoNeed = " - Dupe"
	      jdContent += jdGot + whoNeed + "<br>";
            jdjd +=1;
      }


    }
    document.getElementById('jdjb').innerHTML = jdjb;
    document.getElementById('jdcg').innerHTML = jdcg;
    document.getElementById('jdjd').innerHTML = jdjd;
    document.getElementById('jdrb').innerHTML = jdrb;
    document.getElementById('jdArea').innerHTML = jdContent;
/***********************/

/** CG Swaps  **/
  var cgContent ="<b>Chris Swaps:</b><br>";
  var cgjb = 0;
  var cgjd = 0;
  var cgcg = 0;
  var cgrb = 0;

  for (i in cg){

    var jbnValue = 0;
    var jdnValue = 0;
    var rbnValue = 0;
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

      for (i in rbn){
        if (rbn[i] == cgGot){
          rbnValue = 1;
          cgrb +=1;
        }
      }

      if (jbnValue && jdnValue && rbnValue == 1){
        whoNeed = " - All";
        cgContent += cgGot + whoNeed + "<br>";
     } else if (jbnValue && jdnValue == 1){
        whoNeed = " - JB JD";
        cgContent += cgGot + whoNeed + "<br>";
     } else if (jbnValue && rbnValue  == 1){
          whoNeed = " - JB RB";
          cgContent += cgGot + whoNeed + "<br>";
      } else if (jdnValue && rbnValue  == 1){
          whoNeed = " - JD RB";
         cgContent += cgGot + whoNeed + "<br>";
      } else if(jbnValue == 1) {
        whoNeed = " - JB";
    cgContent += cgGot + whoNeed + "<br>";
      } else if(jdnValue == 1){
        whoNeed = " - JD";
    cgContent += cgGot + whoNeed + "<br>";
     } else if(rbnValue == 1) {
          whoNeed = " - RB";
          cgContent += cgGot + whoNeed + "<br>";
      } else {
        whoNeed = " - Dupe";
	cgContent += cgGot + whoNeed + "<br>";
        cgcg +=1;
      }



    }
    document.getElementById('cgjb').innerHTML = cgjb;
    document.getElementById('cgjd').innerHTML = cgjd;
    document.getElementById('cgcg').innerHTML = cgcg;
    document.getElementById('cgrb').innerHTML = cgrb;
    document.getElementById('cgArea').innerHTML = cgContent;
    /***********************/

    /** Brint Swaps  **/
      var rbContent ="<b>Richard Swaps:</b><br>";
      var rbjb = 0;
      var rbjd = 0;
      var rbcg = 0;
      var rbrb =0;

      for (i in rb){

        var jbnValue = 0;
        var jdnValue = 0;
        var cgnValue = 0;
        var whoNeed = "";
        var rbGot = rb[i];

          for (i in jbn){
              if (jbn[i] == rbGot){
                jbnValue = 1;
                rbjb +=1;
              }
          }

          for (i in jdn){
            if (jdn[i] == rbGot){
              jdnValue = 1;
              rbjd +=1;
            }
          }

          for (i in cgn){
            if (cgn[i] == rbGot){
              cgnValue = 1;
              rbcg +=1;
            }
          }

          if (jbnValue && jdnValue && cgnValue == 1){
            whoNeed = " - All";
            rbContent += rbGot + whoNeed + "<br>";
        } else if (jbnValue && jdnValue == 1){
            whoNeed = " - JB JD";
            rbContent += rbGot + whoNeed + "<br>";
        } else if (jbnValue && cgnValue  == 1){
              whoNeed = " - JB CG";
              rbContent += rbGot + whoNeed + "<br>";
          } else if (jdnValue && cgnValue  == 1){
              whoNeed = " - JD CG";
              rbContent += rbGot + whoNeed + "<br>";
          } else if(jbnValue == 1) {
            whoNeed = " - JB";
            rbContent += rbGot + whoNeed + "<br>";
          } else if(jdnValue == 1){
            whoNeed = " - JD";
            rbContent += rbGot + whoNeed + "<br>";
        } else if(cgnValue == 1) {
              whoNeed = " - CG";
              rbContent += rbGot + whoNeed + "<br>";
          } else {
            whoNeed = " - Dupe"
        //    rbContent += rbGot + whoNeed + "<br>";
            rbrb +=1;
          }



        }
        document.getElementById('rbjb').innerHTML = rbjb;
        document.getElementById('rbjd').innerHTML = rbjd;
        document.getElementById('rbcg').innerHTML = rbcg;
        document.getElementById('rbrb').innerHTML = rbrb;
        document.getElementById('rbArea').innerHTML = rbContent;
        /***********************/
  }

  // jonny, jonathon, chris, collective, jonnyDupe, jdDupe, chrisDupe, collectiveDupe
  function updateStats(value1, value2, value3, value4, value5, value6, value7, value8, value9, value10){


    document.getElementById('jbc').innerHTML = value1;
    document.getElementById('jbd').innerHTML = value5;

    document.getElementById('jdc').innerHTML = value2;
    document.getElementById('jdd').innerHTML = value6;

    document.getElementById('cgc').innerHTML = value3;
    document.getElementById('cgd').innerHTML = value7;

    document.getElementById('rbc').innerHTML = value9;
    document.getElementById('rbd').innerHTML = value10;

    document.getElementById('clc').innerHTML = value4;
    document.getElementById('cld').innerHTML = value8;

  }


}
