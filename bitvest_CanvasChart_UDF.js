	/////////////////////////////////////////////// CHART CODE BELOW ####################################################################

	//********************************************* Canvas Charting Functions - Below ***************************************************************
	
	//Above is the minified version of below code

				var dpsProfit = []; // dataPoints
				var dpsBid = []; // dataPoints
				var dpsCurrLoss = []; // dataPoints
				var dpsPredict = []; // dataPoints
				var dpsActual = []; // dataPoints
				var instance = (new Date()).getTime();
				var chart = "";
				var preFillCounter = 0;
				var profitCounter = 0;
				var bidCounter = 0;
				var cLossCounter = 0;
				var predictCounter = 0;
				var actualCounter = 0;
				var profitChartFirstRun = true;
				var bidChartFirstRun = true;
				var predictChartFirstRun = true;
				
				var yVal = [0.0, 0.0, 0.0];
				var updateInterval = 1000;
				var updateCount = 0;
				//var maxDataLength = yVal.length; // number of dataPoints after which the series shifts
				//var time = new Date();
			
				
				//Auto Initialize the Canvas Charts
				//$(document).ready(function() {
				
				function initChart(){
					//Profit Chart
					profitChart = new CanvasJS.Chart("chartContainer1", {
					
						title: {
							text: "Profit Chart",
							fontColor: "green"
						},
						axisX: {
							title: "Bids Count",
							titleFontColor: "red",
							interval: 10
							//title: "Time",
							//valueFormatString: "hh:mm:ss"
						},

						axisY: {
							title: "Amount",
							titleFontColor: "green"
						},
						data: [{
							type: "spline",
							//lineColor: "red",
							dataPoints: dpsProfit
							//markerType: "cross",
							//markerSize: 6,
							//markerColor: "black"
							//xValueType: "dateTime",
						}]
					});
					
					printLog("Debug Chart: Profit Chart Initialised Successfully!!!");
					
					//Bid Chart
					bidChart = new CanvasJS.Chart("chartContainer2", {
					
						title: {
							text: "Bid Chart & Current PNL",
							fontColor: "red"
						},
						axisX: {
							title: "Bids Count",
							titleFontColor: "red",
							interval: 10
							//title: "Time",
							//valueFormatString: "hh:mm:ss"
						},

						axisY: {
							title: "Amount",
							titleFontColor: "green"
						},
						data: [{
							type: "spline",
							lineColor: "black",
							dataPoints: dpsBid
							//markerType: "cross",
							//markerSize: 6,
							//markerColor: "black"
							//xValueType: "dateTime",
						},{
							type: "spline",
							lineColor: "red",
							dataPoints: dpsCurrLoss
							//markerType: "cross",
							//markerSize: 6,
							//markerColor: "black"
							//xValueType: "dateTime",
						}]
					});
					
					printLog("Debug Chart: Bid Chart Initialised Successfully!!!");

					//Predict Chart
					predictChart = new CanvasJS.Chart("chartContainer4", {
						
						backgroundColor: "black",
						
						title: {
							text: "Predict vs Actual Number Chart",
							fontColor: "blue"
						},
						axisX: {
							title: "Bids Count",
							titleFontColor: "red",
							interval: 10,
							labelFontColor: "white"
							//title: "Time",
							//valueFormatString: "hh:mm:ss"
						},

						axisY: {
							title: "Amount",
							titleFontColor: "green",
							labelFontColor: "white"
						},
						data: [{
							type: "spline",
							lineColor: "blue",
							dataPoints: 
								dpsPredict
							//markerType: "cross",
							//markerSize: 6,
							//markerColor: "black"
							//xValueType: "dateTime",
						},{
							type: "spline",
							lineColor: "green",
							dataPoints: 
								dpsActual
							//markerType: "cross",
							//markerSize: 6,
							//markerColor: "black"
							//xValueType: "dateTime",
						}]
					});
					
					printLog("Debug Chart: Predict Chart Initialised Successfully!!!");

					
					//Pre Fill Profit Chart
					preFillChart("profitChart");
					printLog("Debug Chart: PreFilled Profit Chart...");
					
					//Pre Fill Bid & current PNL Chart
					preFillChart("bidChart");
					printLog("Debug Chart: PreFilled Bid & current PNL Chart...");
					
					//Pre Fill Predict vs Actual Chart
					preFillChart("predictChart");
					printLog("Debug Chart: PreFilled Predict vs Actual Chart...");
					
				//});
				};
				
				
				//Init Chart
				//initChart();
				

			
				// generates first set of dataPoints
				function preFillChart(chartName) {
					
					//Init the count to Zero
					preFillCounter = 0;
					
					count = maxDataLength;
					count = count || 1;
					
					if (chartName == "profitChart"){
					
						for (var j = 0; j < count; j++) {
							//time.setSeconds(time.getSeconds() + 1);
							
							//var timeNow = time.getTime();
							preFillCounter = preFillCounter + 1;
							
							yValNow = yVal[updateCount % yVal.length];
							
							printLog("Debug Chart: "+j+" - x, y ==> "+preFillCounter+","+yValNow);
							
							dpsProfit.push({
								x: preFillCounter, //timeNow,
								y: yValNow
							});

							updateCount++;
							
							printLog("Debug Chart: "+j+" - dpsProfit.length "+dpsProfit.length);
							printLog("Debug Chart: "+j+" - maxDataLength "+maxDataLength);

							if (dpsProfit.length > maxDataLength) {
								dpsProfit.shift();
							}
						}
						
						profitChart.render();
						
						return 0;
					
					}else if(chartName == "bidChart"){
					
						for (var j = 0; j < count; j++) {
							//time.setSeconds(time.getSeconds() + 1);
							
							//var timeNow = time.getTime();
							preFillCounter = preFillCounter + 1;
							
							yValNow = yVal[updateCount % yVal.length];
							
							printLog("Debug Chart: "+j+" - x, y ==> "+preFillCounter+","+yValNow);
							
							dpsBid.push({
								x: preFillCounter, //timeNow,
								y: yValNow
							});
							
							dpsCurrLoss.push({
								x: preFillCounter, //timeNow,
								y: yValNow
							});

							updateCount++;
							
							printLog("Debug Chart: "+j+" - dpsBid.length "+dpsBid.length);
							printLog("Debug Chart: "+j+" - maxDataLength "+maxDataLength);

							if (dpsBid.length > maxDataLength) {
								dpsBid.shift();
							}
							
							
						}
						
						bidChart.render();

						return 0;
						
					}else if(chartName == "predictChart"){
					
						for (var j = 0; j < maxDataLengthPredictActualComp; j++) {
							//time.setSeconds(time.getSeconds() + 1);
							
							//var timeNow = time.getTime();
							preFillCounter = preFillCounter + 1;
							
							//yValNow = yVal[updateCount % yVal.length];
							
							//yValNow = yVal[updateCount % yVal.length];
							
							yVal[j] = (updateCount % yVal.length);
							
							printLog("Debug Chart: "+j+" - x, y ==> "+preFillCounter+","+yValNow);
							
							dpsPredict.push({
								x: preFillCounter, //timeNow,
								y: yVal[j]
							});
							
							dpsActual.push({
								x: preFillCounter, //timeNow,
								y: yVal[j]
							});


							updateCount++;
							
							printLog("Debug Chart: "+j+" - dpsPredict.length "+dpsPredict.length);
							printLog("Debug Chart: "+j+" - maxDataLength "+maxDataLengthPredictActualComp);

							if (dpsPredict.length > maxDataLengthPredictActualComp) {
								dpsPredict.shift();
								dpsActual.shift();
							}
						}
						
						predictChart.render();

						return 0;
					}								
					
				 };
				
				//Updates profit chart
				function updateProfitChart2(newValue) {
					
					var maxDataLength2 = maxDataLength - 1;
					
					printLog("Debug Chart: newValue "+newValue);
					
					printLog("Debug Chart: dpsProfit[maxDataLength2-1].y "+dpsProfit[maxDataLength2-1].y);

					//Shift one position of datapoints
					dpsProfit.shift();
					
					//New Value
					if (profitChartFirstRun == true){
					profitCounter = preFillCounter+ 1;
					}else{
					profitCounter = profitCounter + 1;
					}
					profitChartFirstRun = false;
					
					yVal[maxDataLength-1] = newValue;
					
					if ((newValue - dpsProfit[maxDataLength2-1].y) > 0){
					dpsProfit.push({
						  x: profitCounter, 
						  y: yVal[maxDataLength-1], markerType: "triangle", markerColor: "#6B8E23", markerSize: 6
						  //indexLabel: "gain", 
						  })
					 }else{
						  dpsProfit.push({
						  x: profitCounter, 
						  y: yVal[maxDataLength-1], markerType: "cross", markerColor: "tomato", markerSize: 6
						  //indexLabel: "loss", 
						  })
					 }
					
					if (dpsProfit.length > maxDataLength) {
						dpsProfit.shift();
					}
					
					profitChart.render();
					
				 };
				
				//Updates bid & current PNL chart
				 function updateBidChart2() {
					
					var maxDataLength2 = maxDataLength - 1;
					
					//printLog("Debug Chart: newValue "+newValue);

					printLog("Debug Chart: dpsBid[maxDataLength2-1].y "+dpsBid[maxDataLength2-1].y);

					//Shift one position of datapoints
					dpsBid.shift();
					
					//Shift one position of datapoints
					dpsCurrLoss.shift();
					
					//New Value
					if (bidChartFirstRun == true){
					bidCounter = preFillCounter + 1;
					cLossCounter = preFillCounter + 1;
					}else{
					bidCounter = bidCounter + 1;
					cLossCounter = cLossCounter + 1;
					}
					bidChartFirstRun = false;
					
					
					//Prev Bet
					//var currentBetValue = document.getElementById('stat-betAmount').innerHTML;
					newValue = stat2prevBet*100000000;
					
					yVal[maxDataLength-1] = newValue;
					
					if ((newValue - dpsBid[maxDataLength2-1].y) < 0){
					dpsBid.push({
						  x: bidCounter, 
						  y: yVal[maxDataLength-1], markerType: "triangle", markerColor: "#6B8E23", markerSize: 6
						  //indexLabel: "gain", 
						  })
					 }else{
						  dpsBid.push({
						  x: bidCounter, 
						  y: yVal[maxDataLength-1], markerType: "cross", markerColor: "tomato", markerSize: 6
						  //indexLabel: "loss"
						  })
					 }
					
					//newValue = -(currentLoss*100000000);
					var currentLoss = document.getElementById('stat2-currentLoss').innerHTML
					newValue = -(currentLoss*100000000);
					yVal[maxDataLength-1] = newValue;

					if ((newValue - dpsCurrLoss[maxDataLength2-1].y) < 0){
					dpsCurrLoss.push({
						  x: cLossCounter, 
						  y: yVal[maxDataLength-1], markerType: "triangle", markerColor: "#6B8E23", markerSize: 6
						  //indexLabel: "gain", 
						  })
					 }else{
						  dpsCurrLoss.push({
						  x: cLossCounter, 
						  y: yVal[maxDataLength-1], markerType: "cross", markerColor: "tomato", markerSize: 6
						  //indexLabel: "loss"
						  })
					 }
					
					if (dpsCurrLoss.length > maxDataLength) {
						dpsCurrLoss.shift();
					}
					
					if (dpsBid.length > maxDataLength) {
						dpsBid.shift();
					}

					bidChart.render();
					
				 };
				 
				 //Updates predict chart
				 function updatePredictChart2() {
					
					var maxDataLength2 = maxDataLengthPredictActualComp - 1;
					
					//printLog("Debug Chart: newValue "+newValue);
					
					printLog("Debug Chart: dpsPredict[maxDataLength2-1].y "+dpsPredict[maxDataLength2-1].y);

					//Shift one position of datapoints
					dpsPredict.shift();
					dpsActual.shift();
					
					//New Value
					if (predictChartFirstRun == true){
						predictCounter = preFillCounter + 1;
						actualCounter = preFillCounter + 1;
					}else{
					predictCounter = predictCounter + 1;
					actualCounter =  actualCounter + 1;
					}
					
					predictChartFirstRun = false;
					
					
					yVal[maxDataLengthPredictActualComp-1] = Number(stat2predictNo*100);
					if (Number(stat2predictNo*100) >5000){
					dpsPredict.push({
						  x: predictCounter, 
						  y: yVal[maxDataLengthPredictActualComp-1], markerType: "triangle", markerColor: "white", markerSize: 6
						  })
					}else{
						dpsPredict.push({
						  x: predictCounter, 
						  y: yVal[maxDataLengthPredictActualComp-1], markerType: "cross", markerColor: "white", markerSize: 6
						  })
					}
					
					 yVal[maxDataLengthPredictActualComp-1] = Number(objnumber*100);
					 if (Number(objnumber*100) >5000){
					 dpsActual.push({
						  x: actualCounter, 
						  y: yVal[maxDataLengthPredictActualComp-1], markerType: "triangle", markerColor: "#6B8E23", markerSize: 6
						  })
					 }else{
						 dpsActual.push({
						  x: actualCounter, 
						  y: yVal[maxDataLengthPredictActualComp-1], markerType: "cross", markerColor: "red", markerSize: 6
						  })						 
					 }
					
					if (dpsPredict.length > maxDataLengthPredictActualComp) {
						dpsPredict.shift();
					}
					
					if (dpsActual.length > maxDataLengthPredictActualComp) {
						dpsActual.shift();
					}
					
					predictChart.render();
					
				 };
				
				//Updates profit chart on click
				function updateProfitChart() {
					updateProfitChart2(profit2*100000000);
				}
				
				//Updates bid & current PNL chart on click
				function updateBidChart() {
					updateBidChart2();
				}
				
				//Updates curr loss chart on click
				function updatePredictChart() {
					updatePredictChart2();
				}


	//********************************************* Canvas Charting Functions - Above ***************************************************************			

