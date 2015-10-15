/* 
	TO DO 
	- style it more like this: http://bl.ocks.org/mbostock/9943478
*/



/* Some helper functions */
var log = function (s) { console.log(s); };

var values = function (o) { return Object.keys(o).map(function (k) { return o[k]; }); };

d3.selection.prototype.moveToFront = function () {
	return this.each(function (){ this.parentNode.appendChild(this); });
};

/* Global variables */
var width = 960,
    height = 600;

var rateById = d3.map();

var quantize = d3.scale.quantize()
    .domain([0, .15])
    .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

var projection = d3.geo.albersUsa()
    .scale(1280)
    .translate([width / 2, height / 2]);

var path = d3.geo.path().projection(projection);

var svg = d3.select("#svg-container").append("svg")
    .attr("width", width)
    .attr("height", height);

var colors = {
	focused: "#0089ff",
	selected: "#D24D57",
	regular: "#3d4a57"
};
 
var bubble_tip = d3.tip()
	.attr("class", "d3-tip")
	.offset([60, 0])
	.html(function (d) { 
		var html = "<div class='bubble-tooltip-title'>" + d.name + "</div>"; 
		html += "<div class='bubble-tooltip-value'><span>" + d.count + " devices</span></div>"; 
		return html;
});


/* Grab the data */
// queue()
// 	.defer(d3.json, "us-counties.json")
// 	.defer(d3.json, "center-geocoordinates.geo.json")	 // less compact than topojson 
// 	.await(initialize);

// 


/* Function to draw the map */
function draw (bubbles, responses, focused, selected) {
	// Draw the responses/focused/selected stuff last 
	bubbles.attr("transform", function (d) { 
			var point = projection([d.coordinates[1], d.coordinates[0]]);
			if (point) return "translate(" + point[0] + "," + point[1] + ")"; 
		})
		.attr("r", function (d) { return d.count + 1; })
		.attr("id", function (d) { return d.cid; })
		.attr("fill", function (d) {
			if (focused && d.cid === focused) return colors.focused;
			else if (selected && d.cid === selected) return colors.selected;
			else if (responses && d.cid in responses) return colors.focused;
			return colors.regular;
		})
		.attr("opacity", 0.65)
		.on("mouseover", function (d) {
			var b = d3.select("#" + d.cid);
			b.moveToFront();
			bubble_tip.show(d);

			if (selected !== d.cid) b.style("fill", colors.focused);
		})
		.on("mouseout", function (d) {
			var b = d3.select("#" + d.cid);
			bubble_tip.hide(d);

			if (selected !== d.cid) b.style("fill", colors.regular);
		});
}

/* Initialize the map */
function initialize (us, devices) {

	// Tally number of devices per center and give each one an id
	var centers = {};
	devices.features.forEach(function (d, i) {
		if (d.properties.name in centers) centers[d.properties.name].count += 1;
		else centers[d.properties.name] = {name: d.properties.name, count: 1, cid: 'center' + i, coordinates: d.geometry.coordinates};
	});

	// Draw the map outline - static 
	svg.append("path")
		// .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
		.datum(topojson.mesh(us, us.objects.states))
		.attr("class", "states")
		.attr("d", path);

	// Add svg bubbles 
	var bubbles = svg.append("g")
		.attr("class", "bubble")
		.selectAll("circle")
		// .data(topojson.feature(us, centers.objects.collection).features)	// using topojson 
		.data(values(centers))
		.enter()
		.append("circle");

	// Draw the bubbles 
	draw(bubbles);

	// Autocomplete search functionality 
	$("#search").autocomplete({
		source: Object.keys(centers),
		response: function (event, ui) {
			// Only show first 15 maybe? 
			//ui.content.splice(15);

			// Show all the points on map 
			var responses = {};
			ui.content.forEach(function (u) { responses[centers[u.label].cid] = true; });
			draw(bubbles, responses);
		},
		focus: function (event, ui) {
			// Highlight the focused node
			draw(bubbles, null, centers[ui.item.label].cid, null);

			d3.select("#" + centers[ui.item.label].cid).moveToFront();
		},
		select: function (event, ui) {
			// Highlight the selected node 
			draw(bubbles, null, null, centers[ui.item.label].cid);

			d3.select("#" + centers[ui.item.label].cid).moveToFront();
		}
	})
	.autocomplete("instance")._resizeMenu = function () {
		this.menu.element.outerWidth($("#search").width() + 2);
	};

	svg.call(bubble_tip);

	// To show the delineation of counties -- prob don't need this 
	// svg.append("g")
	// 	.attr("class", "counties")
	// 	.selectAll("path")
	// 	.data(topojson.feature(us, us.objects.counties).features)
	// 	.enter().append("path")
	// 	.attr("class", function(d) { return quantize(rateById.get(d.id)); })
	// 	.attr("d", path)
	// 	.on("mouseover", function (d) {
	// 		log(d);
	// 	});
}


// us and devices are in the other js files
initialize(us, devices);


