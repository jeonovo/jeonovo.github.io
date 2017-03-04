function makeChart(){
	
	Chart.defaults.global.defaultFontColor = "white";
	Chart.defaults.global.defaultFontStyle = "bold";
	Chart.defaults.global.defaultFontSize = 14;
	
	var goalData = []; 
	var period1 = 0; 
	var period2 = 0; 
	var period3 = 0; 
	var period4 = 0; 
	var period5 = 0; 
	var period6 = 0; 

	for (id in nufc_data){
		
		if (nufc_data[id].minute < 16){
			
			period1 = period1 + 1; 
		} else if (nufc_data[id].minute < 31){
			
			period2 = period2 + 1; 
		} else if (nufc_data[id].minute < 46){
			
			period3 = period3 + 1; 
		} else if (nufc_data[id].minute < 61){
			
			period4 = period4 + 1; 
		} else if (nufc_data[id].minute < 76){
			
			period5 = period5 + 1; 
		} else if (nufc_data[id].minute < 91){
			
			period6 = period6 + 1; 
		} 
		 
	}
	
	goalData.push(period1);
	goalData.push(period2);
	goalData.push(period3);
	goalData.push(period4);
	goalData.push(period5);
    goalData.push(period6);
	
	
    
	var ctx = document.getElementById("goalChart");
	var myChart = new Chart(ctx, {
	    type: 'bar',
	    data: {
	        labels: ["0 -15", "16 - 30", "31 - 45", "46 - 60", "61 - 75", "75 - 90"],
	        datasets: [{
	            label: '# of Goals',
	            data: goalData,
	            backgroundColor: 'rgba(255, 255, 255, 0.7)',
	            borderColor: 'rgba(255,255,255,1)',
	            borderWidth: 1
	        }]
	    },
	    options: {
			legend: {
				display: false
			}, 
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero:true
	                }
	            }]
	        }
	    }
	});
    
}