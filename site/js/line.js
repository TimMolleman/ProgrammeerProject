/**
 * line.js
 * 
 * Tim Molleman
 *
 * This Javascript file contains a function that is used for creating 
 * the linegraph
 *
 * NOTE: data.js needs to be loaded for the below functions to work
 */

function createLine(refstreams)
{
	// array that will be used to find min/max values in refstreams dataset
	var values = []

	// loop over all the objects (ordered by year) in refstreams array 
	for (i = 0; i < refstreams.length; i++)
	{
		// loop over all routes in current objects
		for (j = 0; j < refstreams[i].routes.length; j++)
		{
			// if info on number of refugees using a route, add number to 'values'
			if (refstreams[i].routes[j].number != "N/A" && refstreams[i].routes[j].route != "Totals")
			{
				values.push(Number(refstreams[i].routes[j].number));
			}
		}
	}

	// transform data so that it can be used to draw the linegraph
	var data = transformRefstreams(refstreams);

	// define margins of linegraph
	var margins = {left: 60, right: 120, top: 40, bottom: 75},
			width = 700 - margins.left - margins.right,
			height = 450 - margins.bottom - margins.top;

	var format = d3.time.format("%Y");

	// scale the x-axis data
	var x = d3.time.scale()
			.domain(d3.extent(refstreams, function(d) { return format.parse(d.year); }))
			.range([0, width])

	// create the x-axis
	var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom")
		
	// scale the y-axis data		
	var y = d3.scale.linear()
		.domain(d3.extent(values, function(d) { return d; }))
		.range([height, 0])

	// create the y-axis
	var yAxis = d3.svg.axis()
				.scale(y)
				.orient("left");

	// create color scheme for drawing multiple lines
	var z = d3.scale.category10()
			.domain(data.map(function(d) { return d.route; }));

	// create line function for every object in data array
	var line = d3.svg.line()
				// .interpolate("basis")
				.x(function(d) { return x(format.parse(d.year)); })
				.y(function(d) { return y(d.number); })

	var canvas = d3.select(".line").append("svg")
				.attr("width", width + margins.left + margins.right)
				.attr("height", height + margins.bottom + margins.top),
			g = canvas.append("g")
				.attr("transform", "translate(" + margins.left + "," + margins.top + ")");

	// call the x-axis
	g.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	// call the y-axis
	g.append("g")
		.attr("class", "y axis")
		.call(yAxis);

	// append lines to the graph
	g.selectAll(".line")
		.data(data)
		.enter().append("path")
		.attr("class", function(d) { return "line " + d.route; })
		.attr("d", function(d) { return line(d.years); })
		.style("stroke", function(d) { return z(d.route)})
		.style("stroke-width", "2px")
		.style("fill", "none")
		.on("mouseover", function(d) {
			d3.select(this)
				.style("stroke-width", "7px")
		})
		.on("mouseout", function(d) {
			d3.select(this)
				.style("stroke-width", "2px")
		})
};