var code = "1cktGbzgK-rYFBWpWKAN8PL-VMBDLLuZBDmMtZvB9mbU"
var stickerData, jonny, jonathon, chris, dataObject;
var totalStickers = 682;
var jonnyColour = "rgba(255, 99, 132, 0.5)";
var jonathonColour = "rgba(255, 254, 0, 0.5)";
var chrisColour = "rgba(31, 87, 220, 0.5)";
var brintColour = "rgba(169, 69, 169, 0.5)";
var jonnyColour2 = "rgba(255, 99, 132, 1)";
var jonathonColour2 = "rgba(245, 234, 0, 1)";
var chrisColour2 = "rgba(31, 87, 220, 1)";
var brintColour2 = "rgba(169, 69, 169, 1)";

function initGraphs(){

    getData();

  function getData(){

        // loop through spreadsheet with Tabletop
            Tabletop.init({
                key: code,
                callback: function(sheet, tabletop){
                  dataObject = [];
                  stickerData = [];
                  jonny = 0;
                  jonathon = 0;
                  chris = 0;
                  brint = 0;
                  collective = 0;
                  jonnyDupe = 0;
                  jdDupe=0;
                  chrisDupe =0;
                  brintDupe =0;
                  collectiveDupe =0;
                  jbSum = 0;
                  jdSum = 0;
                  cgSum = 0;
                  rbSum =0;
                  colSum = 0;
                  for (var i in sheet){
                    var jb_count = 0;
                    var jd_count = 0;
                    var cg_count = 0;
                    var rb_count = 0;
                    var col_count = 0;

      						if (Number(sheet[i].JB > 0)){
                      jonny +=1;
                      jb_count =1;
                      jbSum = jbSum + Number(sheet[i].JB);
                  }

                  if (Number(sheet[i].JD > 0)){
  							       jonathon +=1;
                       jd_count=1;
                       jdSum = jdSum + Number(sheet[i].JD);
                   }

                   if (Number(sheet[i].CG > 0)){
                       chris +=1;
                       cg_count =1;
                       cgSum = cgSum + Number(sheet[i].CG);
                   }
                   if (Number(sheet[i].RB > 0)){
                       brint +=1;
                       rb_count =1;
                       rbSum = rbSum + Number(sheet[i].RB);
                   }

                   if (Number(sheet[i].Collective > 0)){
                          collective  +=1;
                          col_count = 1;
                          colSum = colSum + Number(sheet[i].Collective);
                      }

                  if (Number(sheet[i].JB) > 1){
                          jonnyDupe +=1;
                          //jbSum = jbSum + Number(sheet[i].JB);
                        }
            			if (Number(sheet[i].JD) > 1){
                          jdDupe +=1;
                      //    jdSum = jdSum + Number(sheet[i].JD);
                        }
            			if (Number(sheet[i].CG) > 1){
                          chrisDupe +=1;
                        //  cgSum = cgSum + Number(sheet[i].CG);
                        }
                        if (Number(sheet[i].RB) > 1){
                          brintDupe +=1;
                        //  cgSum = cgSum + Number(sheet[i].CG);
                        }
            			if (Number(sheet[i].Collective) > 1){
                          collectiveDupe +=1;
                        //  colSum = colSum + Number(sheet[i].Collective);
                        }

                        var the_name = sheet[i].Name;
                        var the_team = sheet[i].Team;


                        if (the_team == "Russia" || the_team == "Saudi Arabia" || the_team == "Egypt" || the_team == "Uruguay"){
                            the_group = "Group A";
                        } else if (the_team == "Portugal" || the_team == "Spain" || the_team == "Morocco" || the_team == "Iran"){
                            the_group = "Group B";
                        } else if (the_team == "France" || the_team == "Australia" || the_team == "Peru" || the_team == "Denmark"){
                            the_group = "Group C";
                        } else if (the_team == "Argentina" || the_team == "Iceland" || the_team == "Croatia" || the_team == "Nigeria"){
                            the_group = "Group D";
                        } else if (the_team == "Brazil" || the_team == "Switzerland" || the_team == "Costa Rica" || the_team == "Serbia"){
                            the_group = "Group E";
                        } else if (the_team == "Germany" || the_team == "Mexico" || the_team == "Sweden" || the_team == "Korea Republic"){
                            the_group = "Group F";
                        } else if (the_team == "Belgium" || the_team == "England" || the_team == "Panama" || the_team == "Tunisia"){
                            the_group = "Group G";
                        } else if (the_team == "Poland" || the_team == "Senegal" || the_team == "Colombia" || the_team == "Japan"){
                            the_group = "Group H";
                        } else {
                            the_group = "Non Team"
                        }




            dataObject.push({"name": the_name, "team":the_team, "group": the_group, "jb": jb_count, "jd": jd_count, "cg": cg_count,"rb":rb_count,
            "cl": col_count, "jbt": sheet[i].JB, "jdt": sheet[i].JD, "cgt": sheet[i].CG, "rbt":sheet[i].RB});


          }

            updateStats(jonny, jonathon, chris, collective, jonnyDupe, jdDupe, chrisDupe, collectiveDupe, jbSum, jdSum, cgSum, colSum, brint, brintDupe, rbSum);
            makeChart(jonny, jonathon, chris, brint);
            makeRatioChart(jonny, jonathon, chris, jbSum, jdSum, cgSum, brint, rbSum);
            makeGroupChart(dataObject);
            makeTeamChart(dataObject);
            setRadarChartValues(dataObject);

				  },
                simpleSheet: true,
            });

    }
	// jonny, jonathon, chris, collective, jonnyDupe, jdDupe, chrisDupe, collectiveDupe, jbSum, jdSum, cgSum, colSum, brint, brintDupe, rbSum
	function updateStats(v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13, v14,v15){

        // jonny
        document.getElementById('jbc').innerHTML = v1;
    	document.getElementById('jbd').innerHTML = v5;
        document.getElementById('jbs').innerHTML = v9;

        // JD
    	document.getElementById('jdc').innerHTML = v2;
    	document.getElementById('jdd').innerHTML = v6;
        document.getElementById('jds').innerHTML = v10;

        // Chris
    	document.getElementById('cgc').innerHTML = v3;
    	document.getElementById('cgd').innerHTML = v7;
        document.getElementById('cgs').innerHTML = v11;

        // Richard
        document.getElementById('rbc').innerHTML = v13;
        document.getElementById('rbd').innerHTML = v14;
        document.getElementById('rbs').innerHTML = v15;

        // Collective
    	document.getElementById('clc').innerHTML = v4;
    	document.getElementById('cld').innerHTML = v8;
        document.getElementById('cls').innerHTML = v12;

	}

	    function makeChart(v1,v2,v3,v4){

			var jb = Math.round((v1/totalStickers*100) * 100) / 100;
			var jd = Math.round((v2/totalStickers*100) * 100) / 100;
			var cg = Math.round((v3/totalStickers*100) * 100) / 100;
            var rb = Math.round((v4/totalStickers*100) * 100) / 100;

        var ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: ["Jonny", "Jonathon", "Chris", "Richard"],
        datasets: [{
            label: '% Got Got Need',
            data: [jb,jd,cg,rb],
            backgroundColor:
                [jonnyColour,jonathonColour,chrisColour, brintColour],
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
                gridLines:{ display: false},
                ticks: {
                    beginAtZero:true,
					          max: 100
                }
            }]
        }
    }
});

    }

    //jb jd cg jbd jdd cgd
  function makeRatioChart(v1, v2, v3, v4, v5, v6, v7, v8){

    var jbTotal = v4;
    var jdTotal = v5;
    var cgTotal = v6;
    var rbTotal = v8;

    var jbsw = (v4 - v1);
    var jdsw = v5 - v2;
    var cgsw = v6 - v3;
    var rbsw = v8 - v7;

    var jb1 = Math.round((v1/jbTotal*100) * 100) / 100;
    var jd1 = Math.round((v2/jdTotal*100) * 100) / 100;
    var cg1 = Math.round((v3/cgTotal*100) * 100) / 100;
    var rb1 = Math.round((v7/rbTotal*100) * 100) / 100;

    var jb2 = Math.round((jbsw/jbTotal*100) * 100) / 100;
    var jd2 = Math.round((jdsw/jdTotal*100) * 100) / 100;
    var cg2 = Math.round((cgsw/cgTotal*100) * 100) / 100;
    var rb2 = Math.round((rbsw/rbTotal*100) * 100) / 100;

    var ctx = document.getElementById("ratioChart").getContext('2d');
      var myChart = new Chart(ctx, {
          type: 'horizontalBar',
          data: {
              labels: ["Jonny", "Jonathon", "Chris", "Richard"],
              datasets: [{
                label: 'Got',
                data: [jb1, jd1, cg1, rb1],
                backgroundColor: "#1a5fb2",
              borderColor: 'black',
              borderWidth: 1

              },{
                label: 'Swap',
                data: [jb2, jd2, cg2, rb2],
                backgroundColor: "#f46b3d",
              borderColor: 'black',
              borderWidth: 1

          }]},
          options: {
      		legend: {
      			display: false
      		},
              title: {
                 display: true,
                 text: 'Got / Swap Ratio'
             },
              scales: {
                yAxes:[{stacked: true, max: 100}],
                  xAxes: [{
                      gridLines:{ display: false},
                    stacked: true,
                      ticks: {
                          beginAtZero:true,
						  max: 100
                      }
                  }]
              }
          }
      });

          }


          function makeTeamChart(team_data){

              /** Chart labels set up **/
              labels = [];
              data = [];
              for (i in team_data){
                  if (team_data[i].team != "World Cup" && team_data[i].team != "Stadium" && team_data[i].team != "Legend"){
                  data.push(team_data[i].team);
                }
            }
              for (i in data){
                  if (labels.indexOf(data[i]) < 0){
                      labels.push(data[i])
                  }
              }

              jbTeamData = [];
              jdTeamData = [];
              cgTeamData = [];
              rbTeamData = [];
              clTeamData = [];



              for (i in labels){
                  currentTeam = labels[i];
                  jbTeamCount = 0;
                  jdTeamCount = 0;
                  cgTeamCount = 0;
                  rbTeamCount = 0;
                  clTeamCount = 0;
                  for (k in team_data){
                      if (team_data[k].team == currentTeam){
                          if (team_data[k].jb > 0){
                              jbTeamCount += 1;
                          }
                          if (team_data[k].jd > 0){
                              jdTeamCount += 1;
                          }
                          if (team_data[k].cg > 0){
                              cgTeamCount += 1;
                          }
                          if (team_data[k].rb > 0){
                              rbTeamCount += 1;
                          }
                          if (team_data[k].cl > 0){
                              clTeamCount += 1;
                          }

                      }


                  }
                  jbTeamData.push(Math.round((jbTeamCount/20*100) * 100) / 100);
                  jdTeamData.push(Math.round((jdTeamCount/20*100) * 100) / 100);
                  cgTeamData.push(Math.round((cgTeamCount/20*100) * 100) / 100);
                  rbTeamData.push(Math.round((rbTeamCount/20*100) * 100) / 100);
                  clTeamData.push(Math.round((clTeamCount/20*100) * 100) / 100);
              }


              var ctx = document.getElementById("teamChart").getContext('2d');
      var myChart = new Chart(ctx, {
          type: 'horizontalBar',
          data: {
              labels: labels,
              datasets:  [{
                label: 'JB',
                data: jbTeamData,
                backgroundColor: jonnyColour,
              borderColor: 'black',
              borderWidth: 0.1
              },{
                label: 'JD',
                data: jdTeamData,
                backgroundColor: jonathonColour,
              borderColor: 'black',
              borderWidth: 0.1

          },{
            label: 'CG',
            data: cgTeamData,
            backgroundColor: chrisColour,
          borderColor: 'black',
          borderWidth: 0.1
          },{
            label: 'RB',
            data: rbTeamData,
            backgroundColor: brintColour,
          borderColor: 'black',
          borderWidth: 0.1
      }, {
            label: 'Collective',
            data: clTeamData,
            backgroundColor: 'rgba(125,125,125,0.5)',
          borderColor: 'black',
          borderWidth: 0.1,
          hidden: true

      }
      ]},
          options: {
            legend: {
                display: true
            },
              title: {
                 display: true,
                 text: 'Team Completion'
             },
              scales: {

                  xAxes: [{
                    gridLines:{ display: false},
                      ticks: {
                          beginAtZero:true,
                        max: 100
                      }
                  }]
              }
          }
      });
          }

          function makeGroupChart(dataObject){
              jbGroupData = [];
              jdGroupData = [];
              cgGroupData = [];
              rbGroupData = [];
              clGroupData = [];

              labels = ["Group A", "Group B", "Group C", "Group D", "Group E", "Group F", "Group G", "Group H"];
              for (i in labels){
                  jbGroupCount = 0;
                  jdGroupCount = 0;
                  cgGroupCount = 0;
                  rbGroupCount = 0;
                  clGroupCount = 0;
                  for (k in dataObject){
                      if (dataObject[k].group == labels[i]){
                          if (dataObject[k].jb > 0){
                              jbGroupCount += 1;
                          }
                          if (dataObject[k].jd > 0){
                              jdGroupCount += 1;
                          }
                          if (dataObject[k].cg > 0){
                              cgGroupCount += 1;
                          }
                          if (dataObject[k].rb > 0){
                               rbGroupCount += 1;
                           }
                          if (dataObject[k].cl > 0){
                              clGroupCount += 1;
                          }

                      }
                  }
                  jbGroupData.push(Math.round((jbGroupCount/80*100) * 100) / 100);
                  jdGroupData.push(Math.round((jdGroupCount/80*100) * 100) / 100);
                  cgGroupData.push(Math.round((cgGroupCount/80*100) * 100) / 100);
                  rbGroupData.push(Math.round((rbGroupCount/80*100) * 100) / 100);
                  clGroupData.push(Math.round((clGroupCount/80*100) * 100) / 100);
              }

    var ctx = document.getElementById("groupChart").getContext('2d');
    var myChart = new Chart(ctx, {
          type: 'horizontalBar',
          data: {
              labels:labels,
              datasets:  [{
                label: 'JB',
                data: jbGroupData,
                backgroundColor: jonnyColour,
              borderColor: 'black',
              borderWidth: 1
              },{
                label: 'JD',
                data: jdGroupData,
                backgroundColor: jonathonColour,
              borderColor: 'black',
              borderWidth: 1
          },{
                label: 'CG',
                data: cgGroupData,
                backgroundColor: chrisColour,
              borderColor: 'black',
              borderWidth: 1
              },
              {
                  label: 'RB',
                data: rbGroupData,
                backgroundColor: brintColour,
                borderColor: 'black',
                borderWidth: 1
              },{
                label: 'Collective',
                data: clGroupData,
                backgroundColor: 'rgba(125,125,125,0.5)',
              borderColor: 'black',
              borderWidth: 1,
              hidden: true
          }
      ]},
          options: {
            legend: {
                display: true
            },
              title: {
                 display: true,
                 text: 'Group Completion'
             },
              scales: {
                  xAxes: [{
                    gridLines:{ display: false},
                      ticks: {
                          beginAtZero:true,
                        max: 100
                      }
                  }]
              }
          }
      });
          }


    function setRadarChartValues(object){

      // % Complete
      // swap ratio
      // sum STICKERS
    //  console.log(object);
      /** get trips value */
      var jbTrips = 0;
      var jdTrips = 0;
      var cgTrips = 0;
      var rbTrips = 0;

      var jbmax = 0;
      var jdmax = 0;
      var cgmax = 0;
      var rbmax = 0;

      var jbSums = 0;
      var jdSums = 0;
      var cgSums = 0;
      var rbSums = 0;

      var jbTotal = 0;
      var jdTotal = 0;
      var cgTotal = 0;
      var rbTotal = 0;


      // dupes over 3 / trips
      for (i in object){

        // JB
        if (object[i].jbt > 0){
          jbTotal += Number(object[i].jbt);
          jbSums +=1;
        }
        if (object[i].jbt > 2){
          jbTrips += 1;
          if (object[i].jbt > jbmax){
            jbmax = Number(object[i].jbt);
          }
        }

        // JD
        if (object[i].jdt > 0){
          jdTotal += Number(object[i].jdt);
          jdSums +=1;
        }
        if (object[i].jdt > 2){
          jdTrips += 1;
          if (object[i].jdt > jdmax){
            jdmax = Number(object[i].jdt);
          }

         }

         // CG
         if (object[i].cgt > 0){
           cgTotal += Number(object[i].cgt);
           cgSums +=1;
         }
         if (object[i].cgt> 2){
           cgTrips += 1;
           if (object[i].cgt > cgmax){
             cgmax = Number(object[i].cgt);
           }

         }

         // RB
         if (object[i].rbt > 0){
           rbTotal += Number(object[i].rbt);
           rbSums +=1;
         }
         if (object[i].rbt > 2){
           rbTrips += 1;
           if (object[i].rbt > rbmax){
             rbmax = Number(object[i].rbt);
           }
         }
      }


      jbr = Math.round((jbSums/jbTotal*100) * 100) / 100;
      jdr = Math.round((jdSums/jdTotal*100) * 100) / 100;
      cgr = Math.round((cgSums/cgTotal*100) * 100) / 100;
      rbr = Math.round((rbSums/rbTotal*100) * 100) / 100;

      var swapratioData = [jbr, jdr, cgr, rbr];
      swapratioData.sort(function(a, b){return b-a});
      var jbsr = swapratioData.indexOf(jbr) + 1;
      var jdsr = swapratioData.indexOf(jdr) + 1;
      var cgsr = swapratioData.indexOf(cgr) + 1;
      var rbsr = swapratioData.indexOf(rbr) + 1;

      var sumsData = [jbSums, jdSums, cgSums, rbSums];
      sumsData.sort(function(a, b){return b-a});
      var jbs = sumsData.indexOf(jbSums) + 1;
      var jds = sumsData.indexOf(jdSums) + 1;
      var cgs = sumsData.indexOf(cgSums) + 1;
      var rbs = sumsData.indexOf(rbSums) + 1;

      var tripsData = [jbTrips, jdTrips, cgTrips, rbTrips];
      tripsData.sort(function(a, b){return a-b});
      var jbt = tripsData.indexOf(jbTrips) + 1;
      var jdt = tripsData.indexOf(jdTrips) + 1;
      var cgt = tripsData.indexOf(cgTrips) + 1;
      var rbt = tripsData.indexOf(rbTrips) + 1;

      var maxData = [jbmax, jdmax, cgmax, rbmax];
      maxData.sort(function(a, b){return a-b});
      var jbm = maxData.indexOf(jbmax) + 1;
      var jdm = maxData.indexOf(jdmax) + 1;
      var cgm = maxData.indexOf(cgmax) + 1;
      var rbm = maxData.indexOf(rbmax) + 1;

      var jbRadarData = [jbs,jbsr,jbt,jbm];
      var jdRadarData = [jds,jdsr,jdt,jdm];
      var cgRadarData = [cgs,cgsr,cgt,cgm];
      var rbRadarData = [rbs,rbsr,rbt,rbm];

      // total, swap ratio, trips, max dupe
      data = [jbRadarData,jdRadarData,cgRadarData,rbRadarData];
      makeRadarChart(data);
    }

    function sortData(){

      // turn the above 4 into 1 function.

    }

    function makeRadarChart(the_data){

      // % Complete
      // swap ratio
      // sum STICKERS
      // dupes over 3 / trips

      var ctx = document.getElementById("radarChart").getContext('2d');
      var myRadarChart = new Chart(ctx, {
    type: 'radar',
        data: {
            labels: ['Total', 'Swap Ratio', 'Trips', 'Max Dupe'],
            datasets:[{
                label: 'JB',
                data: the_data[0],
                borderColor: jonnyColour,
                pointBackgroundColor: jonnyColour2,
                pointRadius: 5,
                pointBorderColor: 'black',
                backgroundColor: "rgba(255,255,255,0)",
                hidden: true
              },{
                label: 'JD',
                data: the_data[1],
                borderColor: jonathonColour,
                pointBackgroundColor: jonathonColour2,
                pointRadius: 5,
                pointBorderColor: 'black',
                backgroundColor: "rgba(255,255,255,0)",
                hidden: true
          },{
                label: 'CG',
                data: the_data[2],
                borderColor: chrisColour,
                pointBackgroundColor: chrisColour2,
                pointRadius: 5,
                pointBorderColor: 'black',
                backgroundColor: "rgba(255,255,255,0)",
                hidden: true
              },
              {
                  label: 'RB',
                data: the_data[3],
                borderColor: brintColour,
                pointBackgroundColor: brintColour2,
                pointRadius: 5,
                pointBorderColor: 'black',
                backgroundColor: "rgba(255,255,255,0)",
                hidden: true
              }
            ]},
    options: {
      title: {
         display: true,
         text: 'Rank Radar'
     },
        scale: {
          pointLabels: {
      fontSize: 11
    },
    angleLines:{
      color: 'lightgrey'
    },
          gridLines:{
            display: false,
          },
            ticks: {
              display: false,
                min: 1,
                max: 5,
                stepSize: 1,
                reverse: true
            }
        }
    }
});
  }
}
