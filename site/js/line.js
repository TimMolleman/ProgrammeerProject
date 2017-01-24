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
	console.log(data, "transformed refstreams");

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

function createLine2(refstreams, route_name)
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

	// transform data so it can be used to draw the linegraph
	var data = transformRefstreams(refstreams),
		route_data = findRoute(data, route_name),
		years = route_data.years;

	// define margins of linegraph
	var margins = {left: 60, right: 120, top: 40, bottom: 75},
			width = 700 - margins.left - margins.right,
			height = 450 - margins.bottom - margins.top;

	// format function for transforming stringed years to Javascript time objects
	var format = d3.time.format("%Y");

	// scale the x-axis data
	var x = d3.time.scale()
			.domain(d3.extent(years, function(d) { return format.parse(d.year); }))
			.range([0, width])

	// create the x-axis
	var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom")
		
	// scale the y-axis data		
	var y = d3.scale.linear()
		.domain(d3.extent(years, function(d) { return d.number; }))
		.range([height, 0])

	// create the y-axis
	var yAxis = d3.svg.axis()
				.scale(y)
				.orient("left");

	// create line function for every object in data array
	var line = d3.svg.line()
				.x(function(d) { return x(format.parse(d.year)); })
				.y(function(d) { return y(d.number); })


	var canvas = d3.select(".line").append("svg")
				.attr("width", width + margins.left + margins.right)
				.attr("height", height + margins.bottom + margins.top)
				.attr("class", "linegraph"),
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

	// append line to the graph
	g.append("path")
		.datum(years)
		.attr("class", route_name)
		.attr("d", line)
		.style("stroke", "red")
		.style("stroke-width", "4px")
		.style("opacity", 0.5)
		.transition().duration(600)
		.style("stroke", "red")
		.style("fill", "none")
		.style("stroke-width", "2px")
		.style("opacity", 0.7)

	// append "g" elements for dots that will track line
	var focus = canvas.append("g")
				.attr("class", "focus")
				.style("display", "none");

	// append 3 dots for min, max and mean temperatures
	focus.append("circle")
			.attr("class", "refnumber")
			.style("r", "0px")
			.style("fill", "red")
			.style("stroke", "red");

	// append text element to focus for popup text
	focus.append("text")
			.attr("class", "linepop")

	// create a rectangle that detects if mouse is on graph or not
	canvas.append("rect")
		.style("fill", "none")
		.style("pointer-events", "all")
		.attr("class", "overlay")
		.attr("transform", "translate(" + margins.left + "," + margins.top + ")")
		.attr("width", width)
		.attr("height", height)
		.on("mouseover", mouseOver)
		.on("mouseout", mouseOut)
		.on("mousemove", mouseMove);

    // create function that returns either right or left datapoint of mouse
   	var bisectYear = d3.bisector(function(d) { return format.parse(d.year); }).left;

   	/* Function called when mouse is over the detection rectangle in linegraph */
   	function mouseOver() {
   		focus.style("display", null);

   		// change the style of the line in the linegraph
      	d3.select("path." + route_name.split(' ').join('.'))
      		.transition().duration(300)
				.style("stroke-width", "4px")
				.style("stroke", "orange")
				.style("opacity", 0.5);

		// make a tooltip appear in linegraph that shows data values
		d3.select("circle.refnumber")
				.transition().duration(300)
				.style("fill", "orange")
				.style("stroke", "orange")
				.style("r", "6px");

		// change color corresponding route on map when mouse is on linegraph
		d3.select("circle." + route_name.split(' ').join('.'))
				.transition().duration(300)
				.style("fill", "orange");
	};

	/* Function called when mouse moves out of the detection rectangle */
	function mouseOut() {
		focus.style("display", "none"); 

		// change line back to original state
		d3.select("path." + route_name.split(' ').join('.'))
			.transition().duration(300)
			.style("stroke-width", "3px")
			.style("stroke", "red")
			.style("opacity", 0.7);

		// change circle in the datamap back to original state
		d3.select("circle." + route_name.split(' ').join('.'))
			.transition().duration(300)
			.style("fill", "red");

		// make tooltip disappear
		d3.select("circle.refnumber")
				.transition().duration(300)
				.style("fill", "red")
				.style("r", "0px");
	};

   	/* 
   	 * This function makes the pointer set to the data point closest
     * to the mouse and also shows the data that belongs to that data point. 
     */
    function mouseMove() {
    	// get the right datapoint for the current mouse position
    	var x0 = x.invert(d3.mouse(this)[0]),
    		i = bisectYear(years, x0, 1),
    		d0 = years[i - 1],
      		d1 = years[i],
      		d = x0 - format.parse(d0.year) > format.parse(d1.year) - x0 ? d1 : d0;

  		// get coördinates of new position of the dot
  		var xPos = x(format.parse(d.year)) + margins.left,
  			yPos = y(d.number) + margins.top;

      	// move the dot to right positions on line
  		focus.select("circle.refnumber")
	      .attr("transform",  
	            "translate(" + xPos + "," +  
	                           yPos + ")"); 

	    // show the data values next to the dot
	    focus.select("text.linepop")
	    	.attr("transform",  
	            "translate(" + (xPos + 20) + "," +  
	                           yPos + ")")
	    	.text(numberWithCommas(d.number) + " Refugees");
    };

};

/* 
 * Function removes linegraph. It is called when migrant routes circles are 
 * toggled to be off.
 */
function removeLineGraph() {
	d3.select(".linegraph")
		.transition().duration(200)
		.remove()
};




