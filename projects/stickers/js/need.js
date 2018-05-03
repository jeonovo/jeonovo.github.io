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
                    collectiveNeed = [];

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
                      if (Number(sheet[i].Collective == 0)){
                        collectiveNeed.push(sheet[i].Name);
                      }

          			      if (Number(sheet[i].Collective) > 1){
                        collectiveDupe +=1;
                      }
              }



          updateStats(jonny, jonathon, chris, collective, jonnyNeed.length, jonathonNeed.length, chrisNeed.length, collectiveNeed.length, brint, brintNeed.length);
          updateSwaps(jonnySwaps, jonathonSwaps, chrisSwaps, jonnyNeed, jonathonNeed, chrisNeed, brintSwaps, brintNeed);



				  },
                simpleSheet: true,
            });

    }
	function updateSwaps(jb, jd, cg, jbn, jdn, cgn, rb, rbn){

  /** JB Need **/
  var jbContent ="<b>Jonny Needs:</b><br>";
  var jbjd =0;
  var jbcg =0;
  var jbjb = 0;
  var jbrb = 0;

  // JB Need
  for (i in jbn){

    var cgnValue = 0;
    var jdnValue = 0;
    var rbnValue = 0;
    var whoGot = "";
    var jbNeed = jbn[i];

      for (i in cg){
          if (cg[i] == jbNeed){
            cgnValue = 1;
            jbcg+=1;
          }
      }

      for (i in jd){
        if (jd[i] == jbNeed){
          jdnValue = 1;
          jbjd+=1;
        }
      }
      for (i in rbn){
        if (rb[i] == jbNeed){
          rbnValue = 1;
          jbrb +=1;
        }
      }

      if (jdnValue && cgnValue && rbnValue == 1){
            whoGot = " - All";
            jbContent += jbNeed + whoGot + "<br>";
     } else if (jdnValue && cgnValue == 1){
            whoGot = " - JD CG";
            jbContent += jbNeed + whoGot + "<br>";
     } else if (jdnValue && rbnValue  == 1){
            whoGot = " - JD RB";
            jbContent += jbNeed + whoGot + "<br>";
      } else if (cgnValue && rbnValue  == 1){
            whoGot = " - CG RB";
            jbContent += jbNeed + whoGot + "<br>";
      } else if(jdnValue == 1) {
            whoGot = " - JD";
            jbContent += jbNeed + whoGot + "<br>";
        } else if(cgnValue == 1){
            whoGot = " - CG";
            jbContent += jbNeed + whoGot + "<br>";
     } else if(rbnValue == 1) {
            whoGot = " - RB";
            jbContent += jbNeed + whoGot + "<br>";
      } else {
            whoGot = "NEED"
	    jbContent += jbNeed + whoNeed + "<br>";
            jbjb +=1;
      }




    }
    document.getElementById('jbjb').innerHTML = jbjb;
    document.getElementById('jbjd').innerHTML = jbjd;
    document.getElementById('jbcg').innerHTML = jbcg;
    document.getElementById('jbrb').innerHTML = jbrb;
    document.getElementById('jbArea').innerHTML = jbContent;
    /***********************/

  /** JD Need **/
  var jdContent ="<b>JD Needs:</b><br>";
  var jdjb =0;
  var jdcg =0;
  var jdjd = 0;
  var jdrb = 0;

  // JD Need
  for (i in jdn){

    var jbnValue = 0;
    var cgnValue = 0;
    var rbnValue = 0;
    var whoGot = "";
    var jdNeed = jdn[i];

      for (i in jb){
          if (jb[i] == jdNeed){
            jbnValue = 1;
            jdjb+=1;
          }
      }

      for (i in cg){
        if (cg[i] == jdNeed){
          cgnValue = 1;
          jdcg+=1;
        }
      }

      for (i in rb){
        if (rb[i] == jdNeed){
          rbnValue = 1;
          jdrb +=1;
        }
      }

      if (jbnValue && cgnValue && rbnValue == 1){
            whoGot = " - All";
            jdContent += jdNeed + whoGot + "<br>";
     } else if (jbnValue && cgnValue == 1){
            whoGot = " - JB CG";
            jdContent += jdNeed + whoGot + "<br>";
     } else if (jbnValue && rbnValue  == 1){
            whoGot = " - JB RB";
            jdContent += jdNeed + whoGot + "<br>";;
      } else if (cgnValue && rbnValue  == 1){
            whoGot = " - CG RB";
            jdContent += jdNeed + whoGot + "<br>";
      } else if(jbnValue == 1) {
            whoGot = " - JB";
            jdContent += jdNeed + whoGot + "<br>";
        } else if(cgnValue == 1){
            whoGot = " - CG";
            jdContent += jdNeed + whoGot + "<br>";
     } else if(rbnValue == 1) {
            whoGot = " - RB";
            jdContent += jdNeed + whoGot + "<br>";
      } else {
            whoGot = "NEED"
	    jdContent += jdNeed + whoNeed + "<br>";
            jdjd +=1;
      }


    }
    document.getElementById('jdjb').innerHTML = jdjb;
    document.getElementById('jdcg').innerHTML = jdcg;
    document.getElementById('jdjd').innerHTML = jdjd;
    document.getElementById('jdrb').innerHTML = jdrb;
    document.getElementById('jdArea').innerHTML = jdContent;
/***********************/

/** CG Need**/
  var cgContent ="<b>Chris Needs:</b><br>";
  var cgjb = 0;
  var cgjd = 0;
  var cgcg = 0;
  var cgrb = 0;

  for (i in cgn){

    var jbnValue = 0;
    var jdnValue = 0;
    var rbnValue = 0;
    var whoGot = "";
    var cgNeed = cgn[i];

      for (i in jb){
          if (jb[i] == cgNeed){
            jbnValue = 1;
            cgjb +=1;
          }
      }

      for (i in jd){
        if (jd[i] == cgNeed){
          jdnValue = 1;
          cgjd +=1;
        }
      }

      for (i in rb){
        if (rb[i] == cgNeed){
          rbnValue = 1;
          cgrb +=1;
        }
      }

      if (jbnValue && jdnValue && rbnValue == 1){
        whoGot = " - All";
        cgContent += cgNeed + whoGot + "<br>";
     } else if (jbnValue && jdnValue == 1){
        whoGot = " - JB JD";
        cgContent += cgNeed + whoGot + "<br>";
     } else if (jbnValue && rbnValue  == 1){
          whoGot = " - JB RB";
          cgContent += cgNeed + whoGot + "<br>";
      } else if (jdnValue && rbnValue  == 1){
          whoGot = " - JD RB";
         cgContent += cgNeed + whoGot + "<br>";
      } else if(jbnValue == 1) {
        whoGot = " - JB";
    cgContent += cgNeed + whoGot + "<br>";
      } else if(jdnValue == 1){
        whoGot = " - JD";
    cgContent += cgNeed + whoGot + "<br>";
     } else if(rbnValue == 1) {
          whoGot = " - RB";
          cgContent += cgNeed + whoGot + "<br>";
      } else {
        whoGot = "NEED"
	cgContent += cgNeed + whoGot + "<br>";
        cgcg +=1;
      }



    }
    document.getElementById('cgjb').innerHTML = cgjb;
    document.getElementById('cgjd').innerHTML = cgjd;
    document.getElementById('cgcg').innerHTML = cgcg;
    document.getElementById('cgrb').innerHTML = cgrb;
    document.getElementById('cgArea').innerHTML = cgContent;
    /***********************/

    /** Brint Need  **/
      var rbContent ="<b>Richard Needs:</b><br>";
      var rbjb = 0;
      var rbjd = 0;
      var rbcg = 0;
      var rbrb =0;
      var swapsAvailable = 0;

      for (i in rbn){

        var jbnValue = 0;
        var jdnValue = 0;
        var cgnValue = 0;

        var whoGot = "";
        var rbNeed = rbn[i];

          for (i in jb){
              if (jb[i] == rbNeed){
                jbnValue = 1;
                rbjb +=1;
              }
          }

          for (i in jd){
            if (jd[i] == rbNeed){
              jdnValue = 1;
              rbjd +=1;
            }
          }

          for (i in cg){
            if (cg[i] == rbNeed){
              cgnValue = 1;
              rbcg +=1;
            }
          }

          if (jbnValue && jdnValue && cgnValue == 1){
            whoGot = " - All";
            swapsAvailable +=1;
            rbContent += rbNeed + whoGot + "<br>";
        } else if (jbnValue && jdnValue == 1){
            whoGot = " - JB JD";
            swapsAvailable +=1;
            rbContent += rbNeed + whoGot + "<br>";
        } else if (jbnValue && cgnValue  == 1){
              whoGot = " - JB CG";
              swapsAvailable +=1;
              rbContent += rbNeed + whoGot + "<br>";
          } else if (jdnValue && cgnValue  == 1){
              whoGot = " - JD CG";
              swapsAvailable +=1;
              rbContent += rbNeed + whoGot + "<br>";
          } else if(jbnValue == 1) {
            whoGot = " - JB";
            swapsAvailable +=1;
            rbContent += rbNeed + whoGot + "<br>";
          } else if(jdnValue == 1){
            whoGot = " - JD";
            swapsAvailable +=1;
            rbContent += rbNeed + whoGot + "<br>";
        } else if(cgnValue == 1) {
              whoGot = " - CG";
              swapsAvailable +=1;
              rbContent += rbNeed + whoGot + "<br>";
          } else {
            whoGot = "NEED"
          rbContent += rbGot + whoNeed + "<br>";
            rbrb +=1;
          }
        }
        // the count of swaps available
      //  console.log(swapsAvailable);
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
