
/**
*	Commonly referenced variables. I know it's evil and 
*	bad practice to have global variables!! Oh well this
*   is my first attempt with javascript/d3. 
**/

// Stock information 
var stock_graph = {"RIM.CA": {"RIMM": 395}, "NFLX": {"AAPL": 1101, "AMZN": 603}, "GBPUSD": {"AUDUSD": 402, "EURUSD": 1921}, "USO": {"CL_F": 1058}, "XLF": {"SPY": 455}, "AAPL": {"GOOG": 8124, "SPY": 5353, "BIDU": 447, "ES_F": 1624, "NFLX": 1101, "GS": 513, "SPX": 784, "STUDY": 786, "NOK": 419, "CALL": 514, "FB": 1519, "QQQ": 1284, "PCLN": 1067, "RIMM": 1669, "AMZN": 3438, "VZ": 510, "MSFT": 1880}, "V": {"MA": 703}, "GLD": {"GDX": 623, "SPY": 703, "SLV": 3170, "GC_F": 3004, "SI_F": 522}, "DIA": {"SPX": 385, "SPY": 2946, "IWM": 810, "QQQ": 1673}, "ZNGA": {"FB": 1547}, "FB": {"ZNGA": 1547, "GOOG": 698, "AAPL": 1519, "LNKD": 496}, "OCZ": {"FIO": 439}, "DJIA": {"SPX": 638}, "GC_F": {"SLV": 522, "ES_F": 491, "GLD": 3004, "SI_F": 916}, "BAC": {"C": 387}, "WYNN": {"LVS": 707}, "AGQ": {"SLV": 376}, "VZ": {"AAPL": 510}, "MSFT": {"GOOG": 404, "AAPL": 1880}, "SINA": {"BIDU": 800}, "SPX": {"SPY": 16340, "ES_F": 10496, "AAPL": 784, "DIA": 385, "AUDUSD": 569, "EURUSD": 918, "DJIA": 638, "QQQ": 382, "VIX": 689}, "SPY": {"SPX": 16340, "TZA": 376, "ES_F": 19007, "TLT": 999, "MACRO": 1218, "STUDY": 1684, "SDS": 790, "GLD": 703, "DIA": 2946, "AUDUSD": 569, "EURUSD": 1027, "IWM": 9781, "QQQ": 7002, "VXX": 1214, "XLF": 455, "VIX": 757, "AAPL": 5353}, "F": {"GM": 499}, "FAS": {"FAZ": 560}, "IWM": {"SPY": 9781, "ES_F": 3613, "QQQ": 2356, "DIA": 810}, "DX_F": {"ES_F": 621}, "LNKD": {"FB": 496}, "CL_F": {"USO": 1058, "ES_F": 789}, "FIO": {"OCZ": 439}, "SI_F": {"SLV": 2147, "GLD": 522, "GC_F": 916}, "TZA": {"FAZ": 471, "SPY": 376, "TNA": 627}, "GM": {"F": 499}, "EURUSD": {"SPX": 918, "SPY": 1027, "ES_F": 2818, "GBPUSD": 1921, "6E_F": 1255, "AUDUSD": 1763, "USDJPY": 403, "FXE": 461, "USDX": 764}, "PCLN": {"AAPL": 1067}, "TVIX": {"UVXY": 408}, "CALL": {"AAPL": 514}, "C": {"BAC": 387}, "REE": {"MCP": 531}, "6E_F": {"EURUSD": 1255, "ES_F": 385}, "STUDY": {"SPY": 1684, "AAPL": 786}, "GOOG": {"AAPL": 8124, "FB": 698, "VRNG": 1169, "AMZN": 540, "BIDU": 524, "MSFT": 404}, "FAZ": {"TZA": 471, "FAS": 560}, "HZNP": {"AMRN": 568}, "GS": {"AAPL": 513}, "LVS": {"WYNN": 707}, "TLT": {"SPY": 999, "TBT": 587}, "NQ_F": {"ES_F": 1651}, "MACRO": {"SPY": 1218}, "SLV": {"SLW": 448, "GLD": 3170, "GC_F": 522, "AGQ": 376, "SI_F": 2147}, "SLW": {"SLV": 448}, "SSYS": {"DDD": 391}, "DDD": {"SSYS": 391}, "AUDUSD": {"SPX": 569, "SPY": 569, "EURUSD": 1763, "ES_F": 569, "GBPUSD": 402}, "TF_F": {"ES_F": 898}, "S": {"CLWR": 693}, "TNA": {"TZA": 627}, "VXX": {"SPY": 1214, "VIX": 719}, "UNG": {"NG_F": 1309}, "FXE": {"EURUSD": 461}, "RIMM": {"AAPL": 1669, "RIM.CA": 395}, "AMZN": {"GOOG": 540, "AAPL": 3438, "NFLX": 603}, "USDX": {"EURUSD": 764}, "VIX": {"SPX": 689, "SPY": 757, "VXX": 719}, "CLWR": {"S": 693}, "YM_F": {"ES_F": 392}, "AMRN": {"ARNA": 673, "HZNP": 568}, "ES_F": {"SPX": 10496, "SPY": 19007, "YM_F": 392, "NQ_F": 1651, "IWM": 3613, "DX_F": 621, "CL_F": 789, "AUDUSD": 569, "TF_F": 898, "EURUSD": 2818, "GC_F": 491, "6E_F": 385, "AAPL": 1624}, "MA": {"V": 703}, "UVXY": {"TVIX": 408}, "SDS": {"SPY": 790}, "GDX": {"GLD": 623}, "BIDU": {"GOOG": 524, "AAPL": 447, "SINA": 800}, "NOK": {"AAPL": 419}, "VVUS": {"ARNA": 1854}, "TBT": {"TLT": 587}, "SBUX": {"GMCR": 552}, "ARNA": {"AMRN": 673, "VVUS": 1854}, "QQQ": {"SPX": 382, "SPY": 7002, "IWM": 2356, "AAPL": 1284, "DIA": 1673}, "USDJPY": {"EURUSD": 403}, "GMCR": {"SBUX": 552}, "VRNG": {"GOOG": 1169}, "NG_F": {"UNG": 1309}, "MCP": {"REE": 531}};
var stocks = ["AAPL", "GOOG", "SPY", "SPX", "FB", "LNKD", "AMZN", "MSFT", "EURUSD", "VIX"];

// Color information 
var colors = ["turquoise", "mediumturquoise", "darkturquoise", "deepskyblue", "dodgerblue"];
var highlight = "rgb(255, 165, 0)";
var highlightDown = "rgb(255, 69, 0)";

// Dimension variables
var svgWidth = 900, svgHeight = 1000;
var stockDim = 70;
var macroBuffer = 100;	

// Will contain clicked squares
var clicked = [];	

// Extract subset of data from stockgraph 
var stockMatrix = [];
var stockKeys = stocks;
for(var i = 0; i < stockKeys.length; i++) {
	stockMatrix = stockMatrix.concat(stockKeys);
}

// Contains only the comention numbers 
var comentionData = Object.keys(stock_graph).map(function (entry) {
		return Object.keys(stock_graph[entry]).map(function (subentry) {
				return parseInt(stock_graph[entry][subentry]);
		});
});

// Get the min and max comentions 
var min = d3.min(comentionData.map(function (entry) {
	return d3.min(entry);
}));
var max = d3.max(comentionData.map(function (entry) {
	return d3.max(entry);
}));


/**
*	Array utility functions  
**/

Array.prototype.random = function () {
	return this[Math.floor(Math.random()*this.length)];
};

Array.prototype.contains = function (item) {
	return this.indexOf(item) >= 0;
};

Array.prototype.remove = function (item) {
	if (this.contains(item)) {
		var index = this.indexOf(item);
		return this.slice(0, index).concat(this.slice(index+1, this.length));
	}
	return this;
};

Array.prototype.count = function (item) {
	return this.filter(function (elem) { return elem === item; }).length;
};	



/**
*	Other utility functions  
**/

/* Scaling functions */ 
var opacityScale = d3.scale.log().domain([min, max]).range([0,1]);
var colorScale = d3.scale.linear().domain([min, max]).range([0, 1]);

/* Returns matrix indices based on list index */
var indices = function (index) {
	var coords = {};
	coords.col = index % stocks.length;
	coords.row = (index - coords.col) / stocks.length;
	return coords;
};

/* Function that returns a comentioned pair based on list index */
var stockPair = function (index) {	
	var pair = {};
	var coords = indices(index);
	pair.first = stockKeys[coords.row];
	pair.second = stockKeys[coords.col];
	return pair;
};

/* Function that returns a color based on number of comentions */
var chooseColor = function (listIndex) {
	// var pair = stockPair(listIndex);
	// var num = stock_graph[pair.first][pair.second] || 0;
	// if (!num) return colors[0];
	// return colors[Math.ceil(colorScale(num)*(colors.length-1))];
	return "dodgerblue";
};

/* Function that returns opacity based on number of comentions */
var opacity = function (listIndex) {
	var pair = stockPair(listIndex);
	var num = stock_graph[pair.first][pair.second] || 0;
	if (num === 0) return .3;
	if (num > 0 && num <= 700) return .5;
	if (num > 700 && num <= 1000) return .6;
	if (num > 2000 && num <= 3000) return .7;
	if (num > 3000 && num <= 6000) return .8;
	if (num > 6000 && num <= 10000) return .9;
	if (num > 10000) return 1;
	//return opacityScale(num);
};

/* Sees if a cell should be highlighted given current cell being moused over */
var isHighlightable = function (i, j) {
	var sup = indices(i);
	var sub = indices(j);
	var sameRow = sub.col === sup.col && sub.row <= sup.row;
	var sameCol = sub.row === sup.row && sub.col <= sup.col;
	return sameRow || sameCol;
};


/* Contains functions that get next x, y coordinates for setting up the square matrix. */
var coords = function () {
	var that = {};
	that.x = macroBuffer;
	that.y = macroBuffer;
	that.yx = macroBuffer;
	that.nextX = function () {
		var xval = that.x;
		var tempx = that.x + stockDim;
		if (tempx >= (svgWidth - macroBuffer)) {
			that.x = macroBuffer;
		}
		else {
			that.x += stockDim;
		}
		return xval;
	};
	that.nextY = function () {
		var yval = that.y;
		var tempx = that.yx + stockDim;
		if (tempx >= (svgWidth - macroBuffer)) {
			that.yx = macroBuffer;
			that.y += stockDim;
		}
		else {
			that.yx += stockDim;
		}
		return yval;
	};
	return that;
};

var resetClicked = function () {
	for(var i = 0; i < clicked.length; i++) {
		d3.select(clicked[i]).style("fill", function (d, i) { return chooseColor(i) });
	}
	clicked.splice(0, clicked.length);
};


/** 
*	Styling helper functions - functions that generate SVG 
*	or act on SVG elements. 
**/

/* Helper function for instructions text */
var stylizeInstructions = function (group, x, y, size, color, text) {
	group.append("text").attr("x", x).attr("y", y)
		.attr("font-family", "sans-serif")
		.attr("font-size", size)
		.attr("fill", color)
		.attr("fill-opacity", .8)
		.text(text)
		.style("text-anchor", "left");
};

/* Helper function to stylize banner (easy/medium/hard) text */
var stylizeBannerText = function (elem, text, x, y, anchor) {
	var position = elem.append("text").attr("x", x).attr("y", y);
	if (text) var txt = position.text(text);
	else var txt = position;
	txt.attr("font-family", "sans-serif")
		.attr("font-size", "50px")
		.attr("fill", "black")
		.attr("fill-opacity", .8)
		.style("text-anchor", anchor);
};

/* Helper function to stylize question squares */
var stylizeQSquares = function (group, data, height) {
	// Stylize square
	group.selectAll("rect").data(data).enter().append("rect")
			.attr("width", stockDim+20)
			.attr("height", stockDim)
			.attr("x", function (d, i) {
				return i*stockDim + 30;
			})
			.attr("y", function (d, i) {
				return height;
			})
			.style("fill", function (d, i) { 
				if (i % 2 === 0) return "orangered"; 
				return "none"; 
			})
		  	.style("stroke-width", 3)
		 	.style("stroke", function (d, i) {
		 		if (i % 2 === 0) return "black";
		 		return "none";
		 	})
		  	.style("fill-opacity", .2)
		  	.style("stroke-opacity", .7);

	// Stylize operators
	group.selectAll("text").data(data).enter().append("text")
		.attr("x", function (d, i) { return (i*stockDim)+75; })
		.attr("y", function () { return height+55; })
		.text(function (d, i) { return d; })
		.attr("font-family", "sans-serif")
		.attr("font-size", "50px")
		.attr("fill", "black")
		.attr("fill-opacity", .8)
		.style("text-anchor", "middle");
};

/* Helper function to add text to input squares */
var addInputText = function (group, height, width) {
	return group.append("text")
		  .attr("x", stockDim + width)
		  .attr("y", height)
		  .attr("font-family", "sans-serif")
		  .attr("font-size", "25px")
		  .attr("fill", "black")
		  .attr("fill-opacity", .8)
		  .style("text-anchor", "middle");
};

/* Helper function to add guess text */
var addGuessText = function (group, height) {
	return group.append("text")
				.attr("x", 450)
		 		.attr("y", height)
		 		.text("0")
		 		.attr("font-family", "sans-serif")
		 		.attr("font-size", "50px")
		 		.attr("fill", "black")
		 		.attr("fill-opacity", .8)
		 		.style("text-anchor", "right");
};



/**
*	Functions that encode the game logic 
**/

/* Gets random number from list of lists */
var randNum = function () {
	return comentionData.random().random();
};
/* Get random x, y, z and return in object */
var getRands = function (that) {
	that.x = randNum(), that.y = randNum(), that.z = randNum();
};

/* Object that stores the formula functions for each question */
var fns = function () {
	var that = {};
	that.easy = function (obj) {
		return obj.x + obj.y - obj.z;
	};
	that.medium = function (obj) {
		return Math.pow(obj.x, 0) + obj.z;
	};
	that.hard = function (obj) {
		return (obj.x % obj.y) * obj.z;
	};
	return that;
}();

/* Answer generator */
var answer = function (fn) {
	return function () {
		var that = {};
		getRands(that);
		that.answer = fn(that);
		that.same = function (other) {
			// Use == so evaluates if other 
			// is string or int
			return that.answer == other; 
		}
		return that;
	};
};

/* Defines what happens when user wins or has exhausted all tries */
var success = function (scores) {
	// Calculate score
	var grades = ["appalling", "mediocre", "decent", "awesome"];
	var presents = ["The Essays on Warren Buffett, by Warren Buffett",
					"Flash Boys, by Michael Lewis",
					"Common Stocks and Uncommon Profits, by P. Fisher",
					"Beating the Street, by Peter Lynch"];
	var score = scores.count(true);
	var grade = grades[score];
	//var present = "url(#image"+score+")";
	// Display congrats text 
	congrats.text("Congratulations!");
	congratsText1.text("You did pretty " + grade + ", so you get:");
	//congratsText2.text("so you get this present:");
	presentText.text(presents[score]);
	// Display present 
	// bookPicture.attr("fill", function () {
	// 	d3.select(this).style("fill", present);
	// });
};

// Questions/answers -- TODO: Put in solver, don't need these externally 
var easyAnswer = answer(fns.easy) ();
var mediumAnswer = answer(fns.medium) ();
var hardAnswer = answer(fns.hard) ();

/* FOR TESTING */
// easyAnswer.x = 0; easyAnswer.y = 0; easyAnswer.z = 0; easyAnswer.answer = 0;
// mediumAnswer.x = 0; mediumAnswer.y = 0; mediumAnswer.z = 0; mediumAnswer.answer = 0;
// hardAnswer.x = 0; hardAnswer.y = 0; hardAnswer.z = 0; hardAnswer.answer = 0;
/* END TESTING */

/* This function object contains the game control flow */
var solver = function (spec) {
	var that = {};
	var levels = ["easy", "medium", "hard"];
	var vars = ["x", "y", "z"];
	var scores = [];
	var template = {easy : {x : 0, y : 0, z : 0},
					medium : {x : 0, y : 1, z : 0},
					hard : {x : 0, y : 0, z : 1} };
	var inputs = [spec.easies, spec.meds, spec.hards];
	var solutions = [easyAnswer, mediumAnswer, hardAnswer];
	var guesses = [guess1, guess2, guess3];
	var curr = {level : levels[0], px : 0, py : 0};
	var tries = {easy : 5, medium : 10, hard : 15};	// TODO: change tries 
	var userInfo = {easy : {x : 0, y : 0, z : 0},
					medium : {x : 0, y : 1, z : 0},
					hard : {x : 0, y : 0, z : 1} };

	var xPos = function (result) {
		if (result.length === 1) return 450;
		else return 450-(result.length*25);
	};
	
	that.click = function (input) {
		// Display the number clicked 
		inputs[curr.px][curr.py].text(input);

		// Evaluate the current result and display
		userInfo[curr.level][vars[curr.py]] = parseInt(input);
		var result = fns[curr.level](userInfo[curr.level]).toString();
		guesses[curr.px].attr("x", function () { return xPos(result); });
		guesses[curr.px].text(result);

		// If user has arrived at solution, see if correct
		if (curr.py === 2) {
			if (solutions[curr.px].same(result)) {
				guesses[curr.px].style("fill", "green");

				scores.push(true);

				// If user is done, display prize
				if (curr.px === 2) {
					success(scores);
					return; 
				}

				// Otherwise update states
				curr.px++;
				curr.level = levels[curr.px];

			}
			else guesses[curr.px].style("fill", "orangered");

			// Update tries 
			// If at 0, display answer and move to next
			if (!tries[curr.level]) {
				var sol = solutions[curr.px];
				guesses[curr.px].text(sol.answer.toString())
								.attr("x", function () { return xPos(sol.answer.toString()); })
								.style("fill", "green");
				inputs[curr.px][0] = sol.x;
				inputs[curr.px][1] = sol.y;
				inputs[curr.px][2] = sol.z;

				scores.push(false);

				if (curr.px === 2) {
					success(scores);
					return;
				}
				else {
					curr.px++;
					curr.level = levels[curr.px];
				}

			}
			else tries[curr.level]--;

			// Go back to beginning 
			curr.py = 0;

			// Reset clicked squares 
			setTimeout(function (e) {
				resetClicked();
			}, 2000);
		}

		// If user not yet at solution simply update info
		else curr.py++;
	};

	that.unclick = function () {
		// Update user info
		userInfo[curr.level][vars[curr.py]] = template[curr.level][vars[curr.py]];
		if (curr.py > 0) curr.py--;
		
		// Evaluate and display new total 
		var result = fns[curr.level](userInfo[curr.level]).toString();
		guesses[curr.px].attr("x", function () {
			if (result.length === 1) return 450;
			else return 450-(result.length*20);
		});
		guesses[curr.px].text(result);

		// Remove text from input box 
		inputs[curr.px][curr.py].text("");
		
	};

	return that;
};



/**
*	Creating all the SVG elements happens here. 
**/


/* Create instructions/HBD greeting */

// Container for instructions/greeting 
// var instructions = d3.select("body").select("#instructions").append("svg")
// 				  .attr("width", 480)
// 				  .attr("height", 200)
// 				  .style("border", "2px solid black");

// // Instruction group 
// var instructionsGroup = instructions.append("g");
// stylizeInstructions(instructionsGroup, -3, 55, "65px", colors.random(), "Happy birthday!");
// stylizeInstructions(instructionsGroup, 0, 85, "25px", "black", "This matrix represents stock comentions");
// stylizeInstructions(instructionsGroup, 0, 105, "25px", "black", "found on StockTwits. Your task is to use");
// stylizeInstructions(instructionsGroup, 0, 125, "25px", "black", "this data to fill in the arithmetic formulas.");
// stylizeInstructions(instructionsGroup, 0, 145, "25px", "black", "You can try each question a good amount");
// stylizeInstructions(instructionsGroup, 0, 165, "25px", "black", "of times. Your score will then determine");
// stylizeInstructions(instructionsGroup, 0, 185, "25px", "black", "which present you receive. Good luck! :)");


/* Create adjacency matrix */

// Container for matrix
var svgContainer = d3.select("body").select("#squares")
					 .append("svg")
					 .attr("width", svgWidth)
					 .attr("height", svgHeight)
					 .style("border", "2px solid black");

// Create objects that contain functions that find next 
// area to place a square/text 
var rectCoords = coords();
var textCoords = coords();

// Style the squares
var squares = svgContainer.selectAll("rect")
						  .data(stockMatrix)
						  .enter()
						  .append("rect")
						  .attr("width", stockDim)
						  .attr("height", stockDim)
						  .attr("x", function () { return rectCoords.nextX(); 
						  } )
						  .attr("y", function () { return rectCoords.nextY(); } )
						  .style("fill", function (d, i) { return chooseColor(i); } )
						  .style("stroke-width", 3)
						  .style("stroke", "black")
						  .style("fill-opacity", function (d, i) { return opacity(i); } )
						  .style("stroke-opacity", .8);

// Add text for comention data
var textInSquaresGroup = svgContainer.append("g");
var textInSquares = textInSquaresGroup.selectAll("text")
									  .data(stockMatrix)
									  .enter()
									  .append("text")
									  .attr("x", function () { return textCoords.nextX() + (stockDim/5); })
									  .attr("y", function () { return textCoords.nextY() + stockDim - 5; })
									  .style("fill", "black")
									  .style("text-anchor", "right")
									  .style("font-family", "sans-serif")
									  .style("font-size", "20px")
									  .text(function (d, i) {
									  	var pair = stockPair(i);
									  	var num = stock_graph[pair.first][pair.second] || 0;
									  	if (num === 0) return "";
									  	return num.toString();
									  })
									  .attr("visibility", "hidden");


/* Create comention display */

// Container for display that shows number of comentions 
var comentionDisplay = d3.select("body").select("#comentions").append("svg")
						 .attr("width", 280)
						 .attr("height", 150)
						 .style("border", "2px solid black");

// Group for display and text
var comention_group = comentionDisplay.append("g");
var comentionText = comention_group.append("text")
					//.attr("x", function () { return macroBuffer + 140; })
					.attr("x", function () { return 140; })
					.attr("y", function () { return macroBuffer + 10; })
					.attr("font-family", "sans-serif")
					.attr("font-size", "100px")
					.attr("fill", "black")
					.attr("fill-opacity", .8)
					.style("text-anchor", "middle");

/* Create question portion */

// Main question container
// var qHeight = svgHeight - 356;
// var diffHeight = 60;
// var questionDisplay = d3.select("body").select("#questions").append("svg")
// 						.attr("width", 480)
// 						.attr("height", qHeight)
// 						.style("border", "2px solid black");	 

// // Groups for squares that will contain guesses 
// var easySquares = questionDisplay.append("g");
// var mediumSquares = questionDisplay.append("g");
// var hardSquares = questionDisplay.append("g");

// // Banner text
// var easyText = "easy:  " + easyAnswer.answer;
// var mediumText = "med:  " + mediumAnswer.answer;
// var hardText = "hard:  " + hardAnswer.answer;

// // Operator data 
// var easydata = ["", "+", "", "-", ""];
// var mediumdata = ["", "^", "", "-", ""];
// var harddata = ["", "%", "", "*", ""];

// // Easy banner
// questionDisplay.append("rect")	
// 				.attr("width", 480).attr("height", diffHeight)
// 				.style("fill", "yellow")
// 				.style("fill-opacity", .6);

// stylizeBannerText(questionDisplay, easyText, -4, 60, "left");
// stylizeBannerText(questionDisplay, 340, 45, "right");

// // Medium banner
// questionDisplay.append("rect")	
// 				.attr("width", 480).attr("height", diffHeight)
// 				.attr("y", 220)
// 				.style("fill", "orange")
// 				.style("fill-opacity", .6);

// stylizeBannerText(questionDisplay, mediumText, -4, 280, "left");
// stylizeBannerText(questionDisplay, 124, 280, "right");

// // Hard banner
// questionDisplay.append("rect")	
// 				.attr("width", 480).attr("height", diffHeight)
// 				.attr("y", 420)
// 				.style("fill", "red")
// 				.style("fill-opacity", .6);

// stylizeBannerText(questionDisplay, hardText, -4, 480, "left");
// stylizeBannerText(questionDisplay, 124, 480, "right");

// // Style the squares that will contain guesses
// stylizeQSquares(easySquares, easydata, 90);
// stylizeQSquares(mediumSquares, mediumdata, 310);
// stylizeQSquares(hardSquares, harddata, 510);

// // Add text to squares for user input
// var easySquareText = questionDisplay.append("g");
// var mediumSquareText = questionDisplay.append("g");
// var hardSquareText = questionDisplay.append("g");

// var easy1 = addInputText(easySquareText, 135, 0);
// var easy2 = addInputText(easySquareText, 135, 140);
// var easy3 = addInputText(easySquareText, 135, 280);

// var med1 = addInputText(mediumSquareText, 355, 0);
// var med2 = addInputText(mediumSquareText, 355, 140);
// var med3 = addInputText(mediumSquareText, 355, 280);

// var hard1 = addInputText(hardSquareText, 555, 0);
// var hard2 = addInputText(hardSquareText, 555, 140);
// var hard3 = addInputText(hardSquareText, 555, 280);

// // Add text representing current guess total for each question
// var guessesGroup = questionDisplay.append("g");
// var guess1 = addGuessText(guessesGroup, 220);
// var guess2 = addGuessText(guessesGroup, 420);
// var guess3 = addGuessText(guessesGroup, 643);


// /* Result SVGs */

// // Create text input underneath squares for success string
// var successGroup = svgContainer.append("g");
// var congrats = successGroup.append("text")
// 							.attr("x", 0)
// 					 		.attr("y", 895)
// 					 		.attr("font-family", "sans-serif")
// 					 		.attr("font-size", "80px")
// 					 		.attr("fill", "orangered")
// 					 		.style("text-anchor", "left");
// var congratsText1 = successGroup.append("text")
// 							.attr("x", 0)
// 					 		.attr("y", 930)
// 					 		.attr("font-family", "sans-serif")
// 					 		.attr("font-size", "50px")
// 					 		.attr("fill", "orange")
// 					 		.style("text-anchor", "left");
// // var congratsText2 = successGroup.append("text")
// // 							.attr("x", 0)
// // 					 		.attr("y", 975)
// // 					 		.attr("font-family", "sans-serif")
// // 					 		.attr("font-size", "50px")
// // 					 		.attr("fill", "orange")
// // 					 		.style("text-anchor", "left");
// var presentText = successGroup.append("text")
// 							.attr("x", 450)
// 					 		.attr("y", 980)
// 					 		.attr("font-family", "sans-serif")
// 					 		.attr("font-size", "40px")
// 					 		.attr("fill", "black")
// 					 		.attr("opacity", .7)
// 					 		.style("text-anchor", "middle");

// Create an area for the resultant present image 
// var bookPicture = svgContainer.append("rect")
// 							.attr("height", 150).attr("width", 100)
// 							.attr("x", 700).attr("y", 830)
// 							.style("fill", "none");

/* Axis labels */
var xgroup = svgContainer.append("g");
var ygroup = svgContainer.append("g");

var xlabels = xgroup.selectAll("text")
						.data(stockKeys)
						.enter()
						.append("text")
						.attr("x", function (d, i) {
							return macroBuffer + (i*stockDim) + 10;
						})
						.attr("y", function (d) { return macroBuffer - 10; })
						.text(function (d) { return d; })
						.attr("font-family", "sans-serif")
						.attr("font-size", "12px")
						.attr("fill", "black")
						.attr("fill-opacity", .8);

var ylabels = ygroup.selectAll("text")
						  .data(stockKeys)
						  .enter()
						  .append("text")
						  .attr("x", function (d) { return macroBuffer/2 - 4; })
						  .attr("y", function (d, i) {
						  	return macroBuffer + (i*stockDim) + 40;
						  })
						  .text(function (d) { return d; })
						  .attr("font-family", "sans-serif")
						  .attr("font-size", "12px")
						  .attr("fill", "black")
						  .attr("fill-opacity", .8);

/* Toggler to see/hide comention numbers within adjacency matrix */

// Tooltip div
var toggleDiv = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

// Toggle svg 
var toggleGroup = svgContainer.append("g");
var toggler = toggleGroup.append("rect").attr("x", 30).attr("y", 20)
						 .attr("height", 40).attr("width", 80)
						 .attr("rx", 22).attr("ry", 22)
						 .style("fill", "grey")
						 .style("stroke", "black")
						 .style("stroke-width", 3)
						 .style("fill-opacity", .6)
						 .style("stroke-opacity", .7);
var switchOn = toggleGroup.append("circle")
						  .attr("cx", 53).attr("cy", 40)
						  .attr("r", 13)
						  .style("fill", "black")
						  .style("opacity", .7)
						  .attr("visibility", "hidden");
var switchOff = toggleGroup.append("circle")
						  .attr("cx", 85).attr("cy", 40)
						  .attr("r", 13)
						  .style("fill", "black")
						  .style("opacity", .7);
var toggleNum = toggleGroup.append("text").attr("x", 79).attr("y", 49).text("#")
						  .attr("font-family", "sans-serif")
						  .attr("font-size", "25px")
						  .attr("font-weight", "bold")
						  .attr("fill", "black")
						  .attr("opacity", .7)
						  .attr("visibility", "hidden");


/**
* 	These functions add event listeners to SVG elements. 
**/

// First create a solver object that will be used when squares are clicked
// var solutions = { easies : [easy1, easy2, easy3], 
// 				  meds : [med1, med2, med3], 
// 				  hards : [hard1, hard2, hard3] };

// // The solver object
// var solver = solver(solutions);

// To optimize a bit 
var SC = svgContainer.selectAll("rect");

/* Defines square behavior */
squares.on("mouseover", function (d, i) {
	// Highlight when mouseover 
	SC.filter(function (e, j) { return isHighlightable(i, j); })
	  .style("fill", function () {
	  		if (clicked.contains(this)) {
				return d3.select(this).style("fill", highlightDown); //.style("fill-opacity", .9);
			}
			return d3.select(this).style("fill", highlight); //.style("fill-opacity", .9);
	  });

	// Display number of comentions in side panel 
	var pair = stockPair(i);
	var num = stock_graph[pair.first][pair.second] || 0;
	comentionText.text(num);

})
.on("mouseout", function (d, i) {
	// Unhighlighting when mouse leaves
	SC.filter(function (e, j) { return isHighlightable(i, j); })
	  .style("fill", chooseColor(i));

	// Return squares to correct opacity --- this is causing error, stockgraph[pair.first] undefined
	//SC.style("fill-opacity", function (d, i) { return opacity(i); });

	// Make sure all clicked squares remain clicked
	for(var i = 0; i < clicked.length; i++) {
		d3.select(clicked[i]).style("fill", highlightDown); //.style("fill-opacity", .9);
	}

})
.on("click", function (d, i) {
	// Can only click a maximum of 3
	if (clicked.length === 3 && !clicked.contains(this)) return;

	// Highlight or unhighlight the clicked square
	var curr = d3.select(this);
	if (curr.style("fill") === highlightDown) {
		curr.style("fill", highlight);
		clicked = clicked.remove(this);
		solver.unclick();
	}
	else {
		curr.style("fill", highlightDown);
		clicked.push(this);
		var pair = stockPair(i);
		var num = stock_graph[pair.first][pair.second] || 0;
		solver.click(num);
	}
});


/* Defines toggle behavior (show comention numbers when toggle on) */
var toggle = function () {
	if (switchOn.attr("visibility") === "hidden") {
		switchOn.attr("visibility", "visible");
		toggleNum.attr("visibility", "visible");
		switchOff.attr("visibility", "hidden");
		textInSquaresGroup.selectAll("text").attr("visibility", "visible");
	}
	else {
		switchOff.attr("visibility", "visible");
		switchOn.attr("visibility", "hidden");
		toggleNum.attr("visibility", "hidden");
		textInSquaresGroup.selectAll("text").attr("visibility", "hidden");
	}
};

// Show/hide comention numbers within adjacency matrix 
toggler.on("click", function () {
	toggle();
});
toggleNum.on("click", function () {
	toggle();
});


// Show the tooltip when mouseover toggle button
var tip = "Toggle me to show comention numbers.";
toggler.on("mouseover", function () {
	toggleDiv.transition().duration(150).style("opacity", .9);
	toggleDiv.html(tip).style("left", "50px").style("right", "150px");
})
.on("mouseout", function () {
	toggleDiv.transition().duration(500).style("opacity", 0);
});
