var code = "1cktGbzgK-rYFBWpWKAN8PL-VMBDLLuZBDmMtZvB9mbU"
var stickerData, jonny, jonathon, chris, dataObject;
var totalStickers = 682;
var jonnyColour = "rgba(255, 99, 132, 0.5)";
var jonathonColour = "rgba(255, 254, 0, 0.5)";
var chrisColour = "rgba(31, 87, 220, 0.5)"
var brintColour = "rgba(169, 69, 169, 0.5)"

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




                        dataObject.push({"name": the_name, "team":the_team, "group": the_group, "jb": jb_count, "jd": jd_count, "cg": cg_count,"rb":rb_count,"cl": col_count});


          }

            updateStats(jonny, jonathon, chris, collective, jonnyDupe, jdDupe, chrisDupe, collectiveDupe, jbSum, jdSum, cgSum, colSum, brint, brintDupe, rbSum);
            makeChart(jonny, jonathon, chris, brint);
            makeRatioChart(jonny, jonathon, chris, jonnyDupe, jdDupe, chrisDupe, brint, brintDupe);
            makeGroupChart(dataObject);
            makeTeamChart(dataObject);

				  },
                simpleSheet: true,
            });

    }
	// jonny, jonathon, chris, collective, jonnyDupe, jdDupe, chrisDupe, collectiveDupe
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

    var jbTotal = v1 + v4;
    var jdTotal = v2 + v5;
    var cgTotal = v3 + v6;
    var rbTotal = v7 + v8;

    var jb1 = Math.round((v1/jbTotal*100) * 100) / 100;
    var jd1 = Math.round((v2/jdTotal*100) * 100) / 100;
    var cg1 = Math.round((v3/cgTotal*100) * 100) / 100;
    var rb1 = Math.round((v7/rbTotal*100) * 100) / 100;

    var jb2 = Math.round((v4/jbTotal*100) * 100) / 100;
    var jd2 = Math.round((v5/jdTotal*100) * 100) / 100;
    var cg2 = Math.round((v6/cgTotal*100) * 100) / 100;
    var rb2 = Math.round((v8/rbTotal*100) * 100) / 100;

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
                label: 'Jonny',
                data: jbTeamData,
                backgroundColor: jonnyColour,
              borderColor: 'black',
              borderWidth: 0.1
              },{
                label: 'Jonathon',
                data: jdTeamData,
                backgroundColor: jonathonColour,
              borderColor: 'black',
              borderWidth: 0.1

          },{
            label: 'Chris',
            data: cgTeamData,
            backgroundColor: chrisColour,
          borderColor: 'black',
          borderWidth: 0.1
          },{
            label: 'Richard',
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
                label: 'Jonny',
                data: jbGroupData,
                backgroundColor: jonnyColour,
              borderColor: 'black',
              borderWidth: 1
              },{
                label: 'Jonathon',
                data: jdGroupData,
                backgroundColor: jonathonColour,
              borderColor: 'black',
              borderWidth: 1
          },{
                label: 'Chris',
                data: cgGroupData,
                backgroundColor: chrisColour,
              borderColor: 'black',
              borderWidth: 1
              },
              {
                  label: 'Richard',
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



}
