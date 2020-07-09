	/////////////////////////////////////////////// CHART CODE BELOW ####################################################################

	//********************************************* Canvas Charting Functions - Below ***************************************************************
	
	//Above is the minified version of below code

				var dpsProfit = []; // dataPoints
				var dpsBid = []; // dataPoints
				var dpsCurrLoss = []; // dataPoints
				var dpsPredict = []; // dataPoints
				var dpsActual = []; // dataPoints
				var dpsActive = []; //dataPoints
				var dpsHiSide = [];
				var dpsLoSide = [];
				var dpsHiSideBreak = [];
				var dpsLoSideBreak = [];
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

					//ConditionsTrack Chart
					conditionsTrackChart = new CanvasJS.Chart("chartContainer5", {
						
						animationEnabled: false,
						
						backgroundColor: "black",
						
						title: {
							text: "Conditions Success Rate",
							fontColor: "white"
						},
						axisX: {
							//title: "Conditions",
							titleFontColor: "green",
							labelFontColor: "white"
						},
						axisY: {
							title: "Count",
							titleFontColor: "red",
							labelFontColor: "white"
							//interval: 10
						},
						legend: {
							cursor:"pointer",
							itemclick : toggleDataSeries
						},
						toolTip: {
							shared: true,
							content: toolTipFormatter
						},
						data: [{
							type: "bar",
							showInLegend: true,
							color: "green",
							name: "winCount",
							dataPoints: [
							{y: conditionsTrack.cond1.winCount, label: "cond1"},
							{y: conditionsTrack.cond2.winCount, label: "cond2"},
							{y: conditionsTrack.cond3.winCount, label: "cond3"},
							{y: conditionsTrack.cond4.winCount, label: "cond4"},
							{y: conditionsTrack.cond5.winCount, label: "cond5"},
							{y: conditionsTrack.cond6.winCount, label: "cond6"}
							]
						},{
							type: "bar",
							showInLegend: true,
							color: "red",
							name: "lossCount",
							dataPoints: [
							{y: conditionsTrack.cond1.lossCount, label: "cond1"},
							{y: conditionsTrack.cond2.lossCount, label: "cond2"},
							{y: conditionsTrack.cond3.lossCount, label: "cond3"},
							{y: conditionsTrack.cond4.lossCount, label: "cond4"},
							{y: conditionsTrack.cond5.lossCount, label: "cond5"},
							{y: conditionsTrack.cond6.lossCount, label: "cond6"}
							]
						}]
					});
					
					printLog("Debug Chart: conditionsTrack Chart Initialised Successfully!!!");

					var dpsHiSide = [];
					
					for (i = 0; i < winCountLoaderHiSide.length; i++){
						dpsHiSide.push(winCountLoaderHiSide[i]);
					}
					
					for (i = 0; i < currLossCountLoaderHiSide.length; i++){
						dpsHiSide.push(currLossCountLoaderHiSide[i]);
					}
					
					for (i = 0; i < maxLossCountLoaderHiSide.length; i++){
						dpsHiSide.push(maxLossCountLoaderHiSide[i]);
					}

					//hiSideTrack Chart
					hiSideChart = new CanvasJS.Chart("chartContainer6", {
						
						
						animationEnabled: false,
						
						backgroundColor: "black",
						
						title: {
							text: "Hi Side Chart",
							fontColor: "white"
						},
						axisX: {
							//title: "Conditions",
							titleFontColor: "green",
							//interval: 500,
							labelFontColor: "white"
						},
						axisY: {
							title: "Count",
							titleFontColor: "red",
							labelFontColor: "white"
							//interval: 10
						},
						legend: {
							cursor:"pointer",
							itemclick : toggleDataSeries
						},
						toolTip: {
							shared: true,
							content: toolTipFormatter
						},
						data: dpsHiSide
					});
					
					printLog("Debug Chart: Hi Side Chart Initialised Successfully!!!");

					var dpsLoSide = [];
					
					for (i = 0; i < winCountLoaderLoSide.length; i++){
						dpsLoSide.push(winCountLoaderLoSide[i]);
					}
					
					for (i = 0; i < currLossCountLoaderLoSide.length; i++){
						dpsLoSide.push(currLossCountLoaderLoSide[i]);
					}
					
					for (i = 0; i < maxLossCountLoaderLoSide.length; i++){
						dpsLoSide.push(maxLossCountLoaderLoSide[i]);
					}
					
					//loSideTrack Chart
					loSideChart = new CanvasJS.Chart("chartContainer7", {
						
						
						animationEnabled: false,
						
						backgroundColor: "black",
						
						title: {
							text: "Lo Side Chart",
							fontColor: "white"
						},
						axisX: {
							//title: "Conditions",
							titleFontColor: "green",
							//interval: 500,
							labelFontColor: "white"
						},
						axisY: {
							title: "Count",
							titleFontColor: "red",
							labelFontColor: "white"
							//interval: 10
						},
						legend: {
							cursor:"pointer",
							itemclick : toggleDataSeries
						},
						toolTip: {
							shared: true,
							content: toolTipFormatter
						},
						data: dpsLoSide
					});
					
					printLog("Debug Chart: Lo Side Chart Initialised Successfully!!!");
					
					//Pre Fill Profit Chart
					preFillChart("profitChart");
					printLog("Debug Chart: PreFilled Profit Chart...");
					
					//Pre Fill Bid & current PNL Chart
					preFillChart("bidChart");
					printLog("Debug Chart: PreFilled Bid & current PNL Chart...");
					
					//Pre Fill Predict vs Actual Chart
					preFillChart("predictChart");
					printLog("Debug Chart: PreFilled Predict vs Actual Chart...");
					
					//Pre Fill Predict vs Actual Chart
					preFillChart("conditionsTrackChart");
					printLog("Debug Chart: PreFilled conditionsTrackChart..");
					
					//Pre Fill Hi Side Chart
					preFillChart("hiSideChart");
					printLog("Debug Chart: PreFilled hiSideChart..");
					
					//Pre Fill Lo Side Chart
					preFillChart("loSideChart");
					printLog("Debug Chart: PreFilled loSideChart..");
					
				//});
				};
				
				
				//Init Chart
				//initChart();
				

			
				// generates first set of dataPoints
				function preFillChart(chartName) {
					
					//Init the count to Zero
					preFillCounter = 0;
					
					count = canvasChart_X_Val1;
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
							printLog("Debug Chart: "+j+" - canvasChart_X_Val1 "+canvasChart_X_Val1);

							if (dpsProfit.length > canvasChart_X_Val1) {
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
							printLog("Debug Chart: "+j+" - canvasChart_X_Val1 "+canvasChart_X_Val1);

							if (dpsBid.length > canvasChart_X_Val1) {
								dpsBid.shift();
							}
							
							
						}
						
						bidChart.render();

						return 0;
						
					}else if(chartName == "predictChart"){
					
						for (var j = 0; j < canvasChart_X_Val2; j++) {
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
							printLog("Debug Chart: "+j+" - canvasChart_X_Val2 "+canvasChart_X_Val2);

							if (dpsPredict.length > canvasChart_X_Val2) {
								dpsPredict.shift();
								dpsActual.shift();
							}
						}
						
						predictChart.render();

						return 0;
					}else if(chartName == "conditionsTrackChart"){
						conditionsTrackChart.render();
					}else if(chartName == "hiSideChart"){
						hiSideChart.render();
					}else if(chartName == "loSideChart"){
						loSideChart.render();
					}
					
				 };
				
				//Updates profit chart
				function updateProfitChart2(newValue) {
					
					var maxDataLength2 = canvasChart_X_Val1 - 1;
					
					printLog("Debug Chart: newValue "+newValue);
					
					printLog("Debug Chart: dpsProfit[maxDataLength2-1].y "+dpsProfit[maxDataLength2-1].y);

					//Shift one position of datapoints
					dpsProfit.shift();
					
					//New Value
					if (profitChartFirstRun == true){
					profitCounter = canvasChart_X_Val1+ 1;
					}else{
					profitCounter = profitCounter + 1;
					}
					profitChartFirstRun = false;
					
					yVal[canvasChart_X_Val1-1] = newValue;
					
					if ((newValue - dpsProfit[maxDataLength2-1].y) > 0){
					dpsProfit.push({
						  x: profitCounter, 
						  y: yVal[canvasChart_X_Val1-1], markerType: "triangle", markerColor: "#6B8E23", markerSize: 6
						  //indexLabel: "gain", 
						  })
					 }else{
						  dpsProfit.push({
						  x: profitCounter, 
						  y: yVal[canvasChart_X_Val1-1], markerType: "cross", markerColor: "tomato", markerSize: 6
						  //indexLabel: "loss", 
						  })
					 }
					
					if (dpsProfit.length > canvasChart_X_Val1) {
						dpsProfit.shift();
					}
					
					profitChart.render();
					
				 };
				
				//Updates bid & current PNL chart
				 function updateBidChart2() {
					
					var maxDataLength2 = canvasChart_X_Val1 - 1;
					
					//printLog("Debug Chart: newValue "+newValue);

					printLog("Debug Chart: dpsBid[maxDataLength2-1].y "+dpsBid[maxDataLength2-1].y);

					//Shift one position of datapoints
					dpsBid.shift();
					
					//Shift one position of datapoints
					dpsCurrLoss.shift();
					
					//New Value
					if (bidChartFirstRun == true){
					bidCounter = canvasChart_X_Val1 + 1;
					cLossCounter = canvasChart_X_Val1 + 1;
					}else{
					bidCounter = bidCounter + 1;
					cLossCounter = cLossCounter + 1;
					}
					bidChartFirstRun = false;
					
					
					//Prev Bet
					//var currentBetValue = document.getElementById('stat-betAmount').innerHTML;
					newValue = stat2prevBet*100000000;
					
					yVal[canvasChart_X_Val1-1] = newValue;
					
					if ((newValue - dpsBid[maxDataLength2-1].y) < 0){
					dpsBid.push({
						  x: bidCounter, 
						  y: yVal[canvasChart_X_Val1-1], markerType: "triangle", markerColor: "#6B8E23", markerSize: 6
						  //indexLabel: "gain", 
						  })
					 }else{
						  dpsBid.push({
						  x: bidCounter, 
						  y: yVal[canvasChart_X_Val1-1], markerType: "cross", markerColor: "tomato", markerSize: 6
						  //indexLabel: "loss"
						  })
					 }
					
					//newValue = -(currentLoss*100000000);
					var currentLoss = document.getElementById('stat2-currentLoss').innerHTML
					newValue = -(currentLoss*100000000);
					yVal[canvasChart_X_Val1-1] = newValue;

					if ((newValue - dpsCurrLoss[maxDataLength2-1].y) < 0){
					dpsCurrLoss.push({
						  x: cLossCounter, 
						  y: yVal[canvasChart_X_Val1-1], markerType: "triangle", markerColor: "#6B8E23", markerSize: 6
						  //indexLabel: "gain", 
						  })
					 }else{
						  dpsCurrLoss.push({
						  x: cLossCounter, 
						  y: yVal[canvasChart_X_Val1-1], markerType: "cross", markerColor: "tomato", markerSize: 6
						  //indexLabel: "loss"
						  })
					 }
					
					if (dpsCurrLoss.length > canvasChart_X_Val1) {
						dpsCurrLoss.shift();
					}
					
					if (dpsBid.length > canvasChart_X_Val1) {
						dpsBid.shift();
					}

					bidChart.render();
					
				 };
				 
				 //Updates predict chart
				 function updatePredictChart2() {
					
					var maxDataLength2 = canvasChart_X_Val2 - 1;
					
					//printLog("Debug Chart: newValue "+newValue);
					
					printLog("Debug Chart: dpsPredict[maxDataLength2-1].y "+dpsPredict[maxDataLength2-1].y);

					//Shift one position of datapoints
					dpsPredict.shift();
					dpsActual.shift();
					
					//New Value
					if (predictChartFirstRun == true){
						predictCounter = canvasChart_X_Val2 + 1;
						actualCounter = canvasChart_X_Val2 + 1;
					}else{
					predictCounter = predictCounter + 1;
					actualCounter =  actualCounter + 1;
					}
					
					predictChartFirstRun = false;
					
					
					yVal[canvasChart_X_Val2-1] = Number(stat2predictNo*100);
					//if (Number(stat2predictNo*100) >5000){
					if (Number(replaceAll(histHiLo, "-","").split("|")[0]) == 1){
					dpsPredict.push({
						  x: predictCounter, 
						  y: yVal[canvasChart_X_Val2-1], markerType: "triangle", markerColor: "white", markerSize: 6
						  })
					}else{
						dpsPredict.push({
						  x: predictCounter, 
						  y: yVal[canvasChart_X_Val2-1], markerType: "cross", markerColor: "white", markerSize: 6
						  })
					}
					
					 yVal[canvasChart_X_Val2-1] = Number(objnumber*100);
					 if (Number(objnumber*100) >5000){
					 dpsActual.push({
						  x: actualCounter, 
						  y: yVal[canvasChart_X_Val2-1], markerType: "triangle", markerColor: "#6B8E23", markerSize: 6
						  })
					 }else{
						 dpsActual.push({
						  x: actualCounter, 
						  y: yVal[canvasChart_X_Val2-1], markerType: "cross", markerColor: "red", markerSize: 6
						  })						 
					 }
					
					if (dpsPredict.length > canvasChart_X_Val2) {
						dpsPredict.shift();
					}
					
					if (dpsActual.length > canvasChart_X_Val2) {
						dpsActual.shift();
					}
					
					predictChart.render();
					
				 };
				 
				 //Update Conditions Track Chart
				 function updateConditionsTrackChart2(){
					
					var temp = getDpsActive();
					
					var myData = 	[{
										type: "bar",
										showInLegend: true,
										color: "blue",
										name: "Active",
										dataPoints: dpsActive
									}, {
										type: "bar",
										showInLegend: true,
										color: "green",
										name: "winCount",
										dataPoints: [
										{y: conditionsTrack.cond1.winCount, label: "cond1"},
										{y: conditionsTrack.cond2.winCount, label: "cond2"},
										{y: conditionsTrack.cond3.winCount, label: "cond3"},
										{y: conditionsTrack.cond4.winCount, label: "cond4"},
										{y: conditionsTrack.cond5.winCount, label: "cond5"},
										{y: conditionsTrack.cond6.winCount, label: "cond6"}
										]
									},{
										type: "bar",
										showInLegend: true,
										color: "red",
										name: "lossCount",
										dataPoints: [
										{y: conditionsTrack.cond1.lossCount, label: "cond1"},
										{y: conditionsTrack.cond2.lossCount, label: "cond2"},
										{y: conditionsTrack.cond3.lossCount, label: "cond3"},
										{y: conditionsTrack.cond4.lossCount, label: "cond4"},
										{y: conditionsTrack.cond5.lossCount, label: "cond5"},
										{y: conditionsTrack.cond6.lossCount, label: "cond6"}
										]
									}];
			
					// Options to display value on top of bars
					var myoption = {
						tooltips: {
							enabled: true
						},
						hover: {
							animationDuration: 1
						},
						animation: {
						duration: 1,
						onComplete: function () {
							var chartInstance = this.chart,
								ctx = chartInstance.ctx;
								ctx.textAlign = 'center';
								ctx.fillStyle = "rgba(0, 0, 0, 1)";
								ctx.textBaseline = 'bottom';
								this.data.datasets.forEach(function (dataset, i) {
									var meta = chartInstance.controller.getDatasetMeta(i);
									meta.data.forEach(function (bar, index) {
										var data = dataset.data[index];
										ctx.fillText(data, bar._model.x, bar._model.y - 5);
									});
								});
							}
						}
					};
					
					
					conditionsTrackChart = new CanvasJS.Chart("chartContainer5", {
									
									backgroundColor: "black",
									
									title: {
										text: "Conditions Success Rate",
										fontColor: "white"
									},
									axisX: {
										//title: "Conditions",
										titleFontColor: "green",
										labelFontColor: "white"
									},
									axisY: {
										title: "Count",
										titleFontColor: "red",
										labelFontColor: "white"
										//interval: 10
									},
									legend: {
										cursor:"pointer",
										itemclick : toggleDataSeries
									},
									toolTip: {
										shared: true,
										content: toolTipFormatter
									},
									data: myData,    	// Chart data
									options: myoption 	// Chart Options [This is optional paramenter use to add some extra things in the chart].
					});
					
					conditionsTrackChart.render();
					
					
				 }
				 
				function updateHiSideChart2(){
						
						reInitChartVariables();
						
						dpsHiSide = [];
					
					
						for (i = 0; i < winCountLoaderHiSide.length; i++){
							dpsHiSide.push(winCountLoaderHiSide[i]);
						}
						
						for (i = 0; i < currLossCountLoaderHiSide.length; i++){
							dpsHiSide.push(currLossCountLoaderHiSide[i]);
						}
						
						for (i = 0; i < maxLossCountLoaderHiSide.length; i++){
							dpsHiSide.push(maxLossCountLoaderHiSide[i]);
						}
					
						hiSideChart = new CanvasJS.Chart("chartContainer6", {
							
							animationEnabled: false,
							
							backgroundColor: "black",
							
							title: {
								text: "Hi Side Chart",
								fontColor: "white"
							},
							axisX: {
								//title: "Conditions",
								titleFontColor: "green",
								//interval: 500,
								labelFontColor: "white"
							},
							axisY: {
								title: "Count",
								titleFontColor: "red",
								labelFontColor: "white"
								//interval: 10
							},
							legend: {
								cursor:"pointer",
								itemclick : toggleDataSeries
							},
							toolTip: {
								shared: true,
								content: toolTipFormatter
							},
							data: dpsHiSide
						});
						
					hiSideChart.render();
						
				}
				
				function updateLoSideChart2(){
					
						reInitChartVariables();
						
						dpsLoSide = [];
					
					
						for (i = 0; i < winCountLoaderLoSide.length; i++){
							dpsLoSide.push(winCountLoaderLoSide[i]);
						}
						
						for (i = 0; i < currLossCountLoaderLoSide.length; i++){
							dpsLoSide.push(currLossCountLoaderLoSide[i]);
						}
						
						for (i = 0; i < maxLossCountLoaderLoSide.length; i++){
							dpsLoSide.push(maxLossCountLoaderLoSide[i]);
						}
						
						loSideChart = new CanvasJS.Chart("chartContainer7", {
							
							animationEnabled: false,
							
							backgroundColor: "black",
							
							title: {
								text: "Lo Side Chart",
								fontColor: "white"
							},
							axisX: {
								//title: "Conditions",
								titleFontColor: "green",
								//interval: 500,
								labelFontColor: "white"
							},
							axisY: {
								title: "Count",
								titleFontColor: "red",
								labelFontColor: "white"
								//interval: 10
							},
							legend: {
								cursor:"pointer",
								itemclick : toggleDataSeries
							},
							toolTip: {
								shared: true,
								content: toolTipFormatter
							},
							data: dpsLoSide
						});
					
					loSideChart.render();
					
				}
				

				function updateHiSideBreakChart2(){
					
						reInitChartVariables();
					
						dpsHiSideBreak = [];
						
						for (i = 0; i < aboutToBreakLoaderHiSide.length; i++){
							dpsHiSideBreak.push(aboutToBreakLoaderHiSide[i]);
						}
						
						for (i = 0; i < reductionInDiffLoaderHiSide.length; i++){
							dpsHiSideBreak.push(reductionInDiffLoaderHiSide[i]);
						}
						
						/*
						for (i = 0; i < breakDiffLoaderHiSide.length; i++){
							dpsHiSideBreak.push(breakDiffLoaderHiSide[i]);
						}
						
						for (i = 0; i < maxBreakDiffLoaderHiSide.length; i++){
							dpsHiSideBreak.push(maxBreakDiffLoaderHiSide[i]);
						}
						
						for (i = 0; i < breakPriorityLoaderHiSide.length; i++){
							dpsHiSideBreak.push(breakPriorityLoaderHiSide[i]);
						}						
						*/

						hiSideBreakChart = new CanvasJS.Chart("chartContainer8", {
							
							animationEnabled: false,
							
							backgroundColor: "black",
							
							title: {
								text: "Hi Side Break Chart",
								fontColor: "white"
							},
							axisX: {
								//title: "Conditions",
								titleFontColor: "green",
								//interval: 500,
								labelFontColor: "white"
							},
							axisY: {
								title: "Count",
								titleFontColor: "red",
								labelFontColor: "white"
								//interval: 10
							},
							legend: {
								cursor:"pointer",
								itemclick : toggleDataSeries
							},
							toolTip: {
								shared: true,
								content: toolTipFormatter
							},
							data: dpsHiSideBreak
						});
						
					hiSideBreakChart.render();
						
				}
				
				function updateLoSideBreakChart2(){
					
						reInitChartVariables();
					
						dpsLoSideBreak = [];
						
						for (i = 0; i < aboutToBreakLoaderLoSide.length; i++){
							dpsLoSideBreak.push(aboutToBreakLoaderLoSide[i]);
						}
						
						for (i = 0; i < reductionInDiffLoaderLoSide.length; i++){
							dpsLoSideBreak.push(reductionInDiffLoaderLoSide[i]);
						}
						
						/*
						for (i = 0; i < breakDiffLoaderLoSide.length; i++){
							dpsLoSideBreak.push(breakDiffLoaderLoSide[i]);
						}
						
						for (i = 0; i < maxBreakDiffLoaderLoSide.length; i++){
							dpsLoSideBreak.push(maxBreakDiffLoaderLoSide[i]);
						}
						
						for (i = 0; i < breakPriorityLoaderLoSide.length; i++){
							dpsLoSideBreak.push(breakPriorityLoaderLoSide[i]);
						}						
						*/
						
						loSideBreakChart = new CanvasJS.Chart("chartContainer9", {
							
							animationEnabled: false,
							
							backgroundColor: "black",
							
							title: {
								text: "Lo Side Break Chart",
								fontColor: "white"
							},
							axisX: {
								//title: "Conditions",
								titleFontColor: "green",
								//interval: 500,
								labelFontColor: "white"
							},
							axisY: {
								title: "Count",
								titleFontColor: "red",
								labelFontColor: "white"
								//interval: 10
							},
							legend: {
								cursor:"pointer",
								itemclick : toggleDataSeries
							},
							toolTip: {
								shared: true,
								content: toolTipFormatter
							},
							data: dpsLoSideBreak
						});
						
					loSideBreakChart.render();
						
				}
		 
		
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

				//Updates conditionsTrack chart on click
				function updateConditionsTrackChart() {
					updateConditionsTrackChart2();
				}
				
				//Updates hiSide chart on click
				function updateHiSideChart() {
					handleHiSideTrack(2);
					updateHiSideChart2();
				}
				
				//Updates loSide chart on click
				function updateLoSideChart() {
					handleLoSideTrack(2);
					updateLoSideChart2();
				}
				
				//Updates hiSide break chart on click
				function updateHiSideBreakChart() {
					handleHiSideTrack(3);
					updateHiSideBreakChart2();
				}
				
				//Updates loSide break chart on click
				function updateLoSideBreakChart() {
					handleLoSideTrack(3);
					updateLoSideBreakChart2();
				}
				
	
				function toolTipFormatter(e) {
				var str = "";
				var total = 0 ;
				var str3;
				var str2 ;
				for (var i = 0; i < e.entries.length; i++){
					var str1 = "<span style= \"color:"+e.entries[i].dataSeries.color + "\">" + e.entries[i].dataSeries.name + "</span>: <strong>"+  e.entries[i].dataPoint.y + "</strong> <br/>" ;
					total = e.entries[i].dataPoint.y + total;
					str = str.concat(str1);
				}
				str2 = "<strong>" + e.entries[0].dataPoint.label + "</strong> <br/>";
				str3 = "<span style = \"color:Tomato\">Total: </span><strong>" + total + "</strong><br/>";
				return (str2.concat(str)).concat(str3);
				}

				function toggleDataSeries(e) {
				if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
					e.dataSeries.visible = false;
				}
				else {
					e.dataSeries.visible = true;
				}
				conditionsTrackChart.render();
				}
				
				function getDpsActive(){
					
					var chartKey = handleConditionsTrack(2);
					printLog("Debug: ConditionsTrack: chartKey = "+chartKey);
					dpsActive = [];
					
					 if (chartKey == "cond1"){
								 dpsActive.push({y: conditionsTrack.cond1.lossCount,label: "cond1"},
												{y: 0,label: "cond2"},
												{y: 0,label: "cond3"},
												{y: 0,label: "cond4"},
												{y: 0,label: "cond5"},
												{y: 0,label: "cond6"},
												);
					 }else if (chartKey == "cond2"){
								 dpsActive.push({y: 0,label: "cond1"},
												{y: conditionsTrack.cond2.lossCount,label: "cond2"},
												{y: 0,label: "cond3"},
												{y: 0,label: "cond4"},
												{y: 0,label: "cond5"},
												{y: 0,label: "cond6"},
												);
					 }else if (chartKey == "cond3"){
								 dpsActive.push({y: 0,label: "cond1"},
												{y: 0,label: "cond2"},
												{y: conditionsTrack.cond3.lossCount,label: "cond3"},
												{y: 0,label: "cond4"},
												{y: 0,label: "cond5"},
												{y: 0,label: "cond6"},
												);
					 }else if (chartKey == "cond4"){
								 dpsActive.push({y: 0,label: "cond1"},
												{y: 0,label: "cond2"},
												{y: 0,label: "cond3"},
												{y: conditionsTrack.cond4.lossCount,label: "cond4"},
												{y: 0,label: "cond5"},
												{y: 0,label: "cond6"},
												);
					 }else if (chartKey == "cond5"){
								 dpsActive.push({y: 0,label: "cond1"},
												{y: 0,label: "cond2"},
												{y: 0,label: "cond3"},
												{y: 0,label: "cond4"},
												{y: conditionsTrack.cond5.lossCount,label: "cond5"},
												{y: 0,label: "cond6"},
												);
					 }else if (chartKey == "cond6"){
								 dpsActive.push({y: 0,label: "cond1"},
												{y: 0,label: "cond2"},
												{y: 0,label: "cond3"},
												{y: 0,label: "cond4"},
												{y: 0,label: "cond5"},
												{y: conditionsTrack.cond6.lossCount,label: "cond6"},
												);
					 }else if (chartKey == "cond1"){
								 dpsActive.push({y: conditionsTrack.cond1.lossCount,label: "cond1"},
												{y: 0,label: "cond2"},
												{y: 0,label: "cond3"},
												{y: 0,label: "cond4"},
												{y: 0,label: "cond5"},
												{y: 0,label: "cond6"},
												);
					 } 
					 return dpsActive;
				 }

	//********************************************* Canvas Charting Functions - Above ***************************************************************

	//********************************************************************************************************************************************************************


	function reInitChartVariables(){
					
					//******************************************************** HI SIDE VARS DECLARATION *******************************************************************

				    winCountLoaderHiSide = [{
								type: "bar",
								showInLegend: true,
								color: "green",
								name: "winCount",
								dataPoints: [
									{y: hiSideTrack[500].winCount, label: 500},
									{y: hiSideTrack[1000].winCount, label: 1000},
									{y: hiSideTrack[1500].winCount, label: 1500},
									{y: hiSideTrack[2000].winCount, label: 2000},
									{y: hiSideTrack[2500].winCount, label: 2500},
									{y: hiSideTrack[3000].winCount, label: 3000},
									{y: hiSideTrack[3500].winCount, label: 3500},
									{y: hiSideTrack[4000].winCount, label: 4000},
									{y: hiSideTrack[4500].winCount, label: 4500},
									{y: hiSideTrack[5000].winCount, label: 5000},
									{y: hiSideTrack[5500].winCount, label: 5500},
									{y: hiSideTrack[6000].winCount, label: 6000},
									{y: hiSideTrack[6500].winCount, label: 6500},
									{y: hiSideTrack[7000].winCount, label: 7000},
									{y: hiSideTrack[7500].winCount, label: 7500},
									{y: hiSideTrack[8000].winCount, label: 8000},
									{y: hiSideTrack[8500].winCount, label: 8500},
									{y: hiSideTrack[9000].winCount, label: 9000},
									{y: hiSideTrack[9500].winCount, label: 9500}
								]
								}];
								
				    currLossCountLoaderHiSide = [{
								type: "bar",
								showInLegend: true,
								color: "#009999", //"grey"
								name: "currLossCount",
								dataPoints: [
									{y: hiSideTrack[500].currLossCount, label: 500},
									{y: hiSideTrack[1000].currLossCount, label: 1000},
									{y: hiSideTrack[1500].currLossCount, label: 1500},
									{y: hiSideTrack[2000].currLossCount, label: 2000},
									{y: hiSideTrack[2500].currLossCount, label: 2500},
									{y: hiSideTrack[3000].currLossCount, label: 3000},
									{y: hiSideTrack[3500].currLossCount, label: 3500},
									{y: hiSideTrack[4000].currLossCount, label: 4000},
									{y: hiSideTrack[4500].currLossCount, label: 4500},
									{y: hiSideTrack[5000].currLossCount, label: 5000},
									{y: hiSideTrack[5500].currLossCount, label: 5500},
									{y: hiSideTrack[6000].currLossCount, label: 6000},
									{y: hiSideTrack[6500].currLossCount, label: 6500},
									{y: hiSideTrack[7000].currLossCount, label: 7000},
									{y: hiSideTrack[7500].currLossCount, label: 7500},
									{y: hiSideTrack[8000].currLossCount, label: 8000},
									{y: hiSideTrack[8500].currLossCount, label: 8500},
									{y: hiSideTrack[9000].currLossCount, label: 9000},
									{y: hiSideTrack[9500].currLossCount, label: 9500}
								]
								}];								

				    maxLossCountLoaderHiSide = [{
								type: "bar",
								showInLegend: true,
								color: "red",
								name: "maxLossCount",
								dataPoints: [
									{y: hiSideTrack[500].maxLossCount, label: 500},
									{y: hiSideTrack[1000].maxLossCount, label: 1000},
									{y: hiSideTrack[1500].maxLossCount, label: 1500},
									{y: hiSideTrack[2000].maxLossCount, label: 2000},
									{y: hiSideTrack[2500].maxLossCount, label: 2500},
									{y: hiSideTrack[3000].maxLossCount, label: 3000},
									{y: hiSideTrack[3500].maxLossCount, label: 3500},
									{y: hiSideTrack[4000].maxLossCount, label: 4000},
									{y: hiSideTrack[4500].maxLossCount, label: 4500},
									{y: hiSideTrack[5000].maxLossCount, label: 5000},
									{y: hiSideTrack[5500].maxLossCount, label: 5500},
									{y: hiSideTrack[6000].maxLossCount, label: 6000},
									{y: hiSideTrack[6500].maxLossCount, label: 6500},
									{y: hiSideTrack[7000].maxLossCount, label: 7000},
									{y: hiSideTrack[7500].maxLossCount, label: 7500},
									{y: hiSideTrack[8000].maxLossCount, label: 8000},
									{y: hiSideTrack[8500].maxLossCount, label: 8500},
									{y: hiSideTrack[9000].maxLossCount, label: 9000},
									{y: hiSideTrack[9500].maxLossCount, label: 9500}
								]
								}];
								
				    aboutToBreakLoaderHiSide = [{
								type: "bar",
								showInLegend: true,
								color: "green",
								name: "aboutToBreak",
								dataPoints: [
									{y: hiSideTrack[500].aboutToBreak, label: 500},
									{y: hiSideTrack[1000].aboutToBreak, label: 1000},
									{y: hiSideTrack[1500].aboutToBreak, label: 1500},
									{y: hiSideTrack[2000].aboutToBreak, label: 2000},
									{y: hiSideTrack[2500].aboutToBreak, label: 2500},
									{y: hiSideTrack[3000].aboutToBreak, label: 3000},
									{y: hiSideTrack[3500].aboutToBreak, label: 3500},
									{y: hiSideTrack[4000].aboutToBreak, label: 4000},
									{y: hiSideTrack[4500].aboutToBreak, label: 4500},
									{y: hiSideTrack[5000].aboutToBreak, label: 5000},
									{y: hiSideTrack[5500].aboutToBreak, label: 5500},
									{y: hiSideTrack[6000].aboutToBreak, label: 6000},
									{y: hiSideTrack[6500].aboutToBreak, label: 6500},
									{y: hiSideTrack[7000].aboutToBreak, label: 7000},
									{y: hiSideTrack[7500].aboutToBreak, label: 7500},
									{y: hiSideTrack[8000].aboutToBreak, label: 8000},
									{y: hiSideTrack[8500].aboutToBreak, label: 8500},
									{y: hiSideTrack[9000].aboutToBreak, label: 9000},
									{y: hiSideTrack[9500].aboutToBreak, label: 9500}
								]
								}];								
								
				    breakDiffLoaderHiSide = [{
								type: "bar",
								showInLegend: true,
								color: "#66b0ff", //"grey"
								name: "breakDiff",
								dataPoints: [
									{y: hiSideTrack[500].breakDiff, label: 500},
									{y: hiSideTrack[1000].breakDiff, label: 1000},
									{y: hiSideTrack[1500].breakDiff, label: 1500},
									{y: hiSideTrack[2000].breakDiff, label: 2000},
									{y: hiSideTrack[2500].breakDiff, label: 2500},
									{y: hiSideTrack[3000].breakDiff, label: 3000},
									{y: hiSideTrack[3500].breakDiff, label: 3500},
									{y: hiSideTrack[4000].breakDiff, label: 4000},
									{y: hiSideTrack[4500].breakDiff, label: 4500},
									{y: hiSideTrack[5000].breakDiff, label: 5000},
									{y: hiSideTrack[5500].breakDiff, label: 5500},
									{y: hiSideTrack[6000].breakDiff, label: 6000},
									{y: hiSideTrack[6500].breakDiff, label: 6500},
									{y: hiSideTrack[7000].breakDiff, label: 7000},
									{y: hiSideTrack[7500].breakDiff, label: 7500},
									{y: hiSideTrack[8000].breakDiff, label: 8000},
									{y: hiSideTrack[8500].breakDiff, label: 8500},
									{y: hiSideTrack[9000].breakDiff, label: 9000},
									{y: hiSideTrack[9500].breakDiff, label: 9500}
								]
								}];								
								
				    breakPriorityLoaderHiSide = [{
								type: "bar",
								showInLegend: true,
								color: "red",
								name: "breakPriority",
								dataPoints: [
									{y: hiSideTrack[500].breakPriority, label: 500},
									{y: hiSideTrack[1000].breakPriority, label: 1000},
									{y: hiSideTrack[1500].breakPriority, label: 1500},
									{y: hiSideTrack[2000].breakPriority, label: 2000},
									{y: hiSideTrack[2500].breakPriority, label: 2500},
									{y: hiSideTrack[3000].breakPriority, label: 3000},
									{y: hiSideTrack[3500].breakPriority, label: 3500},
									{y: hiSideTrack[4000].breakPriority, label: 4000},
									{y: hiSideTrack[4500].breakPriority, label: 4500},
									{y: hiSideTrack[5000].breakPriority, label: 5000},
									{y: hiSideTrack[5500].breakPriority, label: 5500},
									{y: hiSideTrack[6000].breakPriority, label: 6000},
									{y: hiSideTrack[6500].breakPriority, label: 6500},
									{y: hiSideTrack[7000].breakPriority, label: 7000},
									{y: hiSideTrack[7500].breakPriority, label: 7500},
									{y: hiSideTrack[8000].breakPriority, label: 8000},
									{y: hiSideTrack[8500].breakPriority, label: 8500},
									{y: hiSideTrack[9000].breakPriority, label: 9000},
									{y: hiSideTrack[9500].breakPriority, label: 9500}
								]
								}];
								
				    maxBreakDiffLoaderHiSide = [{
								type: "bar",
								showInLegend: true,
								color: "red",
								name: "maxBreakDiff",
								dataPoints: [
									{y: hiSideTrack[500].maxBreakDiff, label: 500},
									{y: hiSideTrack[1000].maxBreakDiff, label: 1000},
									{y: hiSideTrack[1500].maxBreakDiff, label: 1500},
									{y: hiSideTrack[2000].maxBreakDiff, label: 2000},
									{y: hiSideTrack[2500].maxBreakDiff, label: 2500},
									{y: hiSideTrack[3000].maxBreakDiff, label: 3000},
									{y: hiSideTrack[3500].maxBreakDiff, label: 3500},
									{y: hiSideTrack[4000].maxBreakDiff, label: 4000},
									{y: hiSideTrack[4500].maxBreakDiff, label: 4500},
									{y: hiSideTrack[5000].maxBreakDiff, label: 5000},
									{y: hiSideTrack[5500].maxBreakDiff, label: 5500},
									{y: hiSideTrack[6000].maxBreakDiff, label: 6000},
									{y: hiSideTrack[6500].maxBreakDiff, label: 6500},
									{y: hiSideTrack[7000].maxBreakDiff, label: 7000},
									{y: hiSideTrack[7500].maxBreakDiff, label: 7500},
									{y: hiSideTrack[8000].maxBreakDiff, label: 8000},
									{y: hiSideTrack[8500].maxBreakDiff, label: 8500},
									{y: hiSideTrack[9000].maxBreakDiff, label: 9000},
									{y: hiSideTrack[9500].maxBreakDiff, label: 9500}
								]
								}];

				    oldBreakDiffLoaderHiSide = [{
								type: "bar",
								showInLegend: true,
								color: "#F1DE20", //"thick yellow"
								name: "oldBreakDiff",
								dataPoints: [
									{y: hiSideTrack[500].oldBreakDiff, label: 500},
									{y: hiSideTrack[1000].oldBreakDiff, label: 1000},
									{y: hiSideTrack[1500].oldBreakDiff, label: 1500},
									{y: hiSideTrack[2000].oldBreakDiff, label: 2000},
									{y: hiSideTrack[2500].oldBreakDiff, label: 2500},
									{y: hiSideTrack[3000].oldBreakDiff, label: 3000},
									{y: hiSideTrack[3500].oldBreakDiff, label: 3500},
									{y: hiSideTrack[4000].oldBreakDiff, label: 4000},
									{y: hiSideTrack[4500].oldBreakDiff, label: 4500},
									{y: hiSideTrack[5000].oldBreakDiff, label: 5000},
									{y: hiSideTrack[5500].oldBreakDiff, label: 5500},
									{y: hiSideTrack[6000].oldBreakDiff, label: 6000},
									{y: hiSideTrack[6500].oldBreakDiff, label: 6500},
									{y: hiSideTrack[7000].oldBreakDiff, label: 7000},
									{y: hiSideTrack[7500].oldBreakDiff, label: 7500},
									{y: hiSideTrack[8000].oldBreakDiff, label: 8000},
									{y: hiSideTrack[8500].oldBreakDiff, label: 8500},
									{y: hiSideTrack[9000].oldBreakDiff, label: 9000},
									{y: hiSideTrack[9500].oldBreakDiff, label: 9500}
								]
								}];	

				    reductionInDiffLoaderHiSide = [{
								type: "bar",
								showInLegend: true,
								color: "#13F5DA", //"torquise blue"
								name: "reductionInDiff",
								dataPoints: [
									{y: hiSideTrack[500].reductionInDiff, label: 500},
									{y: hiSideTrack[1000].reductionInDiff, label: 1000},
									{y: hiSideTrack[1500].reductionInDiff, label: 1500},
									{y: hiSideTrack[2000].reductionInDiff, label: 2000},
									{y: hiSideTrack[2500].reductionInDiff, label: 2500},
									{y: hiSideTrack[3000].reductionInDiff, label: 3000},
									{y: hiSideTrack[3500].reductionInDiff, label: 3500},
									{y: hiSideTrack[4000].reductionInDiff, label: 4000},
									{y: hiSideTrack[4500].reductionInDiff, label: 4500},
									{y: hiSideTrack[5000].reductionInDiff, label: 5000},
									{y: hiSideTrack[5500].reductionInDiff, label: 5500},
									{y: hiSideTrack[6000].reductionInDiff, label: 6000},
									{y: hiSideTrack[6500].reductionInDiff, label: 6500},
									{y: hiSideTrack[7000].reductionInDiff, label: 7000},
									{y: hiSideTrack[7500].reductionInDiff, label: 7500},
									{y: hiSideTrack[8000].reductionInDiff, label: 8000},
									{y: hiSideTrack[8500].reductionInDiff, label: 8500},
									{y: hiSideTrack[9000].reductionInDiff, label: 9000},
									{y: hiSideTrack[9500].reductionInDiff, label: 9500}
								]
								}];



					//******************************************************** LO SIDE VARS DECLARATION *******************************************************************

				    winCountLoaderLoSide = [{
								type: "bar",
								showInLegend: true,
								color: "green",
								name: "winCount",
								dataPoints: [
									{y: loSideTrack[500].winCount, label: 500},
									{y: loSideTrack[1000].winCount, label: 1000},
									{y: loSideTrack[1500].winCount, label: 1500},
									{y: loSideTrack[2000].winCount, label: 2000},
									{y: loSideTrack[2500].winCount, label: 2500},
									{y: loSideTrack[3000].winCount, label: 3000},
									{y: loSideTrack[3500].winCount, label: 3500},
									{y: loSideTrack[4000].winCount, label: 4000},
									{y: loSideTrack[4500].winCount, label: 4500},
									{y: loSideTrack[5000].winCount, label: 5000},
									{y: loSideTrack[5500].winCount, label: 5500},
									{y: loSideTrack[6000].winCount, label: 6000},
									{y: loSideTrack[6500].winCount, label: 6500},
									{y: loSideTrack[7000].winCount, label: 7000},
									{y: loSideTrack[7500].winCount, label: 7500},
									{y: loSideTrack[8000].winCount, label: 8000},
									{y: loSideTrack[8500].winCount, label: 8500},
									{y: loSideTrack[9000].winCount, label: 9000},
									{y: loSideTrack[9500].winCount, label: 9500}
								]
								}];
								
				    currLossCountLoaderLoSide = [{
								type: "bar",
								showInLegend: true,
								color: "#009999", //"grey"
								name: "currLossCount",
								dataPoints: [
									{y: loSideTrack[500].currLossCount, label: 500},
									{y: loSideTrack[1000].currLossCount, label: 1000},
									{y: loSideTrack[1500].currLossCount, label: 1500},
									{y: loSideTrack[2000].currLossCount, label: 2000},
									{y: loSideTrack[2500].currLossCount, label: 2500},
									{y: loSideTrack[3000].currLossCount, label: 3000},
									{y: loSideTrack[3500].currLossCount, label: 3500},
									{y: loSideTrack[4000].currLossCount, label: 4000},
									{y: loSideTrack[4500].currLossCount, label: 4500},
									{y: loSideTrack[5000].currLossCount, label: 5000},
									{y: loSideTrack[5500].currLossCount, label: 5500},
									{y: loSideTrack[6000].currLossCount, label: 6000},
									{y: loSideTrack[6500].currLossCount, label: 6500},
									{y: loSideTrack[7000].currLossCount, label: 7000},
									{y: loSideTrack[7500].currLossCount, label: 7500},
									{y: loSideTrack[8000].currLossCount, label: 8000},
									{y: loSideTrack[8500].currLossCount, label: 8500},
									{y: loSideTrack[9000].currLossCount, label: 9000},
									{y: loSideTrack[9500].currLossCount, label: 9500}
								]
								}];								

				    maxLossCountLoaderLoSide = [{
								type: "bar",
								showInLegend: true,
								color: "red",
								name: "maxLossCount",
								dataPoints: [
									{y: loSideTrack[500].maxLossCount, label: 500},
									{y: loSideTrack[1000].maxLossCount, label: 1000},
									{y: loSideTrack[1500].maxLossCount, label: 1500},
									{y: loSideTrack[2000].maxLossCount, label: 2000},
									{y: loSideTrack[2500].maxLossCount, label: 2500},
									{y: loSideTrack[3000].maxLossCount, label: 3000},
									{y: loSideTrack[3500].maxLossCount, label: 3500},
									{y: loSideTrack[4000].maxLossCount, label: 4000},
									{y: loSideTrack[4500].maxLossCount, label: 4500},
									{y: loSideTrack[5000].maxLossCount, label: 5000},
									{y: loSideTrack[5500].maxLossCount, label: 5500},
									{y: loSideTrack[6000].maxLossCount, label: 6000},
									{y: loSideTrack[6500].maxLossCount, label: 6500},
									{y: loSideTrack[7000].maxLossCount, label: 7000},
									{y: loSideTrack[7500].maxLossCount, label: 7500},
									{y: loSideTrack[8000].maxLossCount, label: 8000},
									{y: loSideTrack[8500].maxLossCount, label: 8500},
									{y: loSideTrack[9000].maxLossCount, label: 9000},
									{y: loSideTrack[9500].maxLossCount, label: 9500}
								]
								}];
								
				    aboutToBreakLoaderLoSide = [{
								type: "bar",
								showInLegend: true,
								color: "green",
								name: "aboutToBreak",
								dataPoints: [
									{y: loSideTrack[500].aboutToBreak, label: 500},
									{y: loSideTrack[1000].aboutToBreak, label: 1000},
									{y: loSideTrack[1500].aboutToBreak, label: 1500},
									{y: loSideTrack[2000].aboutToBreak, label: 2000},
									{y: loSideTrack[2500].aboutToBreak, label: 2500},
									{y: loSideTrack[3000].aboutToBreak, label: 3000},
									{y: loSideTrack[3500].aboutToBreak, label: 3500},
									{y: loSideTrack[4000].aboutToBreak, label: 4000},
									{y: loSideTrack[4500].aboutToBreak, label: 4500},
									{y: loSideTrack[5000].aboutToBreak, label: 5000},
									{y: loSideTrack[5500].aboutToBreak, label: 5500},
									{y: loSideTrack[6000].aboutToBreak, label: 6000},
									{y: loSideTrack[6500].aboutToBreak, label: 6500},
									{y: loSideTrack[7000].aboutToBreak, label: 7000},
									{y: loSideTrack[7500].aboutToBreak, label: 7500},
									{y: loSideTrack[8000].aboutToBreak, label: 8000},
									{y: loSideTrack[8500].aboutToBreak, label: 8500},
									{y: loSideTrack[9000].aboutToBreak, label: 9000},
									{y: loSideTrack[9500].aboutToBreak, label: 9500}
								]
								}];								
								
				    breakDiffLoaderLoSide = [{
								type: "bar",
								showInLegend: true,
								color: "#66b0ff", //"grey"
								name: "breakDiff",
								dataPoints: [
									{y: loSideTrack[500].breakDiff, label: 500},
									{y: loSideTrack[1000].breakDiff, label: 1000},
									{y: loSideTrack[1500].breakDiff, label: 1500},
									{y: loSideTrack[2000].breakDiff, label: 2000},
									{y: loSideTrack[2500].breakDiff, label: 2500},
									{y: loSideTrack[3000].breakDiff, label: 3000},
									{y: loSideTrack[3500].breakDiff, label: 3500},
									{y: loSideTrack[4000].breakDiff, label: 4000},
									{y: loSideTrack[4500].breakDiff, label: 4500},
									{y: loSideTrack[5000].breakDiff, label: 5000},
									{y: loSideTrack[5500].breakDiff, label: 5500},
									{y: loSideTrack[6000].breakDiff, label: 6000},
									{y: loSideTrack[6500].breakDiff, label: 6500},
									{y: loSideTrack[7000].breakDiff, label: 7000},
									{y: loSideTrack[7500].breakDiff, label: 7500},
									{y: loSideTrack[8000].breakDiff, label: 8000},
									{y: loSideTrack[8500].breakDiff, label: 8500},
									{y: loSideTrack[9000].breakDiff, label: 9000},
									{y: loSideTrack[9500].breakDiff, label: 9500}
								]
								}];								
								
				    breakPriorityLoaderLoSide = [{
								type: "bar",
								showInLegend: true,
								color: "red",
								name: "breakPriority",
								dataPoints: [
									{y: loSideTrack[500].breakPriority, label: 500},
									{y: loSideTrack[1000].breakPriority, label: 1000},
									{y: loSideTrack[1500].breakPriority, label: 1500},
									{y: loSideTrack[2000].breakPriority, label: 2000},
									{y: loSideTrack[2500].breakPriority, label: 2500},
									{y: loSideTrack[3000].breakPriority, label: 3000},
									{y: loSideTrack[3500].breakPriority, label: 3500},
									{y: loSideTrack[4000].breakPriority, label: 4000},
									{y: loSideTrack[4500].breakPriority, label: 4500},
									{y: loSideTrack[5000].breakPriority, label: 5000},
									{y: loSideTrack[5500].breakPriority, label: 5500},
									{y: loSideTrack[6000].breakPriority, label: 6000},
									{y: loSideTrack[6500].breakPriority, label: 6500},
									{y: loSideTrack[7000].breakPriority, label: 7000},
									{y: loSideTrack[7500].breakPriority, label: 7500},
									{y: loSideTrack[8000].breakPriority, label: 8000},
									{y: loSideTrack[8500].breakPriority, label: 8500},
									{y: loSideTrack[9000].breakPriority, label: 9000},
									{y: loSideTrack[9500].breakPriority, label: 9500}
								]
								}];
								
				    maxBreakDiffLoaderLoSide = [{
								type: "bar",
								showInLegend: true,
								color: "red",
								name: "maxBreakDiff",
								dataPoints: [
									{y: loSideTrack[500].maxBreakDiff, label: 500},
									{y: loSideTrack[1000].maxBreakDiff, label: 1000},
									{y: loSideTrack[1500].maxBreakDiff, label: 1500},
									{y: loSideTrack[2000].maxBreakDiff, label: 2000},
									{y: loSideTrack[2500].maxBreakDiff, label: 2500},
									{y: loSideTrack[3000].maxBreakDiff, label: 3000},
									{y: loSideTrack[3500].maxBreakDiff, label: 3500},
									{y: loSideTrack[4000].maxBreakDiff, label: 4000},
									{y: loSideTrack[4500].maxBreakDiff, label: 4500},
									{y: loSideTrack[5000].maxBreakDiff, label: 5000},
									{y: loSideTrack[5500].maxBreakDiff, label: 5500},
									{y: loSideTrack[6000].maxBreakDiff, label: 6000},
									{y: loSideTrack[6500].maxBreakDiff, label: 6500},
									{y: loSideTrack[7000].maxBreakDiff, label: 7000},
									{y: loSideTrack[7500].maxBreakDiff, label: 7500},
									{y: loSideTrack[8000].maxBreakDiff, label: 8000},
									{y: loSideTrack[8500].maxBreakDiff, label: 8500},
									{y: loSideTrack[9000].maxBreakDiff, label: 9000},
									{y: loSideTrack[9500].maxBreakDiff, label: 9500}
								]
								}];

				    oldBreakDiffLoaderLoSide = [{
								type: "bar",
								showInLegend: true,
								color: "#F1DE20", //"thick yellow"
								name: "oldBreakDiff",
								dataPoints: [
									{y: loSideTrack[500].oldBreakDiff, label: 500},
									{y: loSideTrack[1000].oldBreakDiff, label: 1000},
									{y: loSideTrack[1500].oldBreakDiff, label: 1500},
									{y: loSideTrack[2000].oldBreakDiff, label: 2000},
									{y: loSideTrack[2500].oldBreakDiff, label: 2500},
									{y: loSideTrack[3000].oldBreakDiff, label: 3000},
									{y: loSideTrack[3500].oldBreakDiff, label: 3500},
									{y: loSideTrack[4000].oldBreakDiff, label: 4000},
									{y: loSideTrack[4500].oldBreakDiff, label: 4500},
									{y: loSideTrack[5000].oldBreakDiff, label: 5000},
									{y: loSideTrack[5500].oldBreakDiff, label: 5500},
									{y: loSideTrack[6000].oldBreakDiff, label: 6000},
									{y: loSideTrack[6500].oldBreakDiff, label: 6500},
									{y: loSideTrack[7000].oldBreakDiff, label: 7000},
									{y: loSideTrack[7500].oldBreakDiff, label: 7500},
									{y: loSideTrack[8000].oldBreakDiff, label: 8000},
									{y: loSideTrack[8500].oldBreakDiff, label: 8500},
									{y: loSideTrack[9000].oldBreakDiff, label: 9000},
									{y: loSideTrack[9500].oldBreakDiff, label: 9500}
								]
								}];	

				    reductionInDiffLoaderLoSide = [{
								type: "bar",
								showInLegend: true,
								color: "#13F5DA", //"torquise blue"
								name: "reductionInDiff",
								dataPoints: [
									{y: loSideTrack[500].reductionInDiff, label: 500},
									{y: loSideTrack[1000].reductionInDiff, label: 1000},
									{y: loSideTrack[1500].reductionInDiff, label: 1500},
									{y: loSideTrack[2000].reductionInDiff, label: 2000},
									{y: loSideTrack[2500].reductionInDiff, label: 2500},
									{y: loSideTrack[3000].reductionInDiff, label: 3000},
									{y: loSideTrack[3500].reductionInDiff, label: 3500},
									{y: loSideTrack[4000].reductionInDiff, label: 4000},
									{y: loSideTrack[4500].reductionInDiff, label: 4500},
									{y: loSideTrack[5000].reductionInDiff, label: 5000},
									{y: loSideTrack[5500].reductionInDiff, label: 5500},
									{y: loSideTrack[6000].reductionInDiff, label: 6000},
									{y: loSideTrack[6500].reductionInDiff, label: 6500},
									{y: loSideTrack[7000].reductionInDiff, label: 7000},
									{y: loSideTrack[7500].reductionInDiff, label: 7500},
									{y: loSideTrack[8000].reductionInDiff, label: 8000},
									{y: loSideTrack[8500].reductionInDiff, label: 8500},
									{y: loSideTrack[9000].reductionInDiff, label: 9000},
									{y: loSideTrack[9500].reductionInDiff, label: 9500}
								]
								}];

	}
	
	
	