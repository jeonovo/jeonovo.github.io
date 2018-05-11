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

                    jbMostDupe = [];
                    jdMostDupe =[];
                    cgMostDupe = [];
                    rbMostDupe = [];
                    adMostDupe = [];

                    collectiveNeeds = [];
                    collectiveDupes = [];

                    var dupeMax = 0;
                    var jbMax = 0;
                    var jdMax = 0;
                    var cgMax = 0;
                    var rbMax = 0;
                    var adMax = 0;

                    // get max value
                    for (var i in sheet){
                      // Loop thru jonny
          			       if (Number(sheet[i].Collective) == 0){
                          collectiveNeeds.push(sheet[i].Name);
                      }

                      if (Number(sheet[i].Collective) > dupeMax){
                        dupeMax = Number(sheet[i].Collective)
                      }
                      if (Number(sheet[i].JB) > jbMax){
                        jbMax = Number(sheet[i].JB)
                      }
                      if (Number(sheet[i].JD) > jdMax){
                        jdMax = Number(sheet[i].JD)
                      }
                      if (Number(sheet[i].CG) > cgMax){
                        cgMax = Number(sheet[i].CG)
                      }
                      if (Number(sheet[i].RB) > rbMax){
                        rbMax = Number(sheet[i].RB)
                      }
                      if (Number(sheet[i].AD) > adMax){
                        adMax = Number(sheet[i].AD)
                      }


                    }

                    for (i in sheet){

                      if (sheet[i].Collective == dupeMax){
                        collectiveDupes.push(sheet[i].Name);
                      }
                      if (sheet[i].JB == jbMax){
                        jbMostDupe.push(sheet[i].Name);
                      }
                      if (sheet[i].JD == jdMax){
                        jdMostDupe.push(sheet[i].Name);
                      }
                      if (sheet[i].CG == cgMax){
                        cgMostDupe.push(sheet[i].Name);
                      }
                      if (sheet[i].RB == rbMax){
                        rbMostDupe.push(sheet[i].Name);
                      }
                      if (sheet[i].AD == adMax){
                        adMostDupe.push(sheet[i].Name);
                      }
                    }



          updateStats(dupeMax,collectiveDupes, jbMax, jbMostDupe, jdMax, jdMostDupe,cgMax, cgMostDupe,rbMax, rbMostDupe, adMax, adMostDupe);
          updateColNeeds(collectiveNeeds);

				  },
                simpleSheet: true,
            });
    }


	function updateColNeeds(cn){
    var colContent ="<b>Collective Needs - " + cn.length + ":</b><br>";
    for(i in cn){
      colContent += cn[i] + "<br>";
    }
    document.getElementById('colStatArea').innerHTML = colContent;

  }

  // jonny, jonathon, chris, collective, jonnyDupe, jdDupe, chrisDupe, collectiveDupe
  function updateStats(mx,cd, jmx, jbd, jdx, jdd, cgx, cgd, rbx, rbd, adx, add){
    var csContent ="<b>Most Dupe with " + mx +  ":</b><br>";
    for(i in cd){
      csContent += cd[i] + "<br>";
    }

    csContent +="<p><b>Jonny Most Dupe with " + jmx +  ":</b><br>";
    for(i in jbd){
      csContent += jbd[i] + "<br>";
    }

    csContent +="<p><b>JD Most Dupe with " + jdx +  ":</b><br>";
    for(i in jdd){
      csContent += jdd[i] + "<br>";
    }

    csContent +="<p><b>Chris Most Dupe with " + cgx +  ":</b><br>";
    for(i in cgd){
      csContent += cgd[i] + "<br>";
    }

    csContent +="<p><b>Richard Most Dupe with " + rbx +  ":</b><br>";
    for(i in rbd){
      csContent += rbd[i] + "<br>";
    }
    csContent +="<p><b>Andy Most Dupe with " + adx +  ":</b><br>";
    for(i in add){
      csContent += add[i] + "<br>";
    }

    document.getElementById('theStatArea').innerHTML = csContent;




  }


}
