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
var x_line,
	y_line,
	format,
	route_name,
	years,
	xPos,
	x,
	line_width,
	line_height;

/* This function is used to create a linegraph that contains lines for all routes */
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

	// determine height and width of the linegraphs
	line_width = graph_width - margins.line.left - margins.line.right,
	line_height = graph_height - margins.line.top - margins.line.bottom;

	// transform data so that it can be used to draw the linegraph
	var data = transformRefstreams(refstreams);
	console.log(data)
	// define function for transforming stringed year to Javascript time object
	format = d3.time.format("%Y");

	// scale the x-axis data
	x = d3.time.scale()
			.domain(d3.extent(refstreams, function(d) { return format.parse(d.year); }))
			.range([0, line_width])

	// create the x-axis
	var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom")
		
	// scale the y-axis data		
	var y = d3.scale.linear()
		.domain(d3.extent(values, function(d) { return d; }))
		.range([line_height, 0]);

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
				.y(function(d) { return y(d.number); });

	// create canvas to draw the linegraph on 
	var canvas = d3.select(".line").append("svg")
				.attr("width", line_width + margins.line.left + margins.line.right)
				.attr("height", line_height + margins.line.bottom + margins.line.top)
				.attr("class", "linegraph"),
			g = canvas.append("g")
				.attr("transform", "translate(" + margins.line.left + "," + margins.line.top + ")");

	// call the x-axis
	xAxis = g.append("g")
		.attr("class", "x axis linegraph")
		.attr("transform", "translate(0," + line_height + ")")
		.call(xAxis)
		.selectAll("text")
		.style("text-anchor", "end")
		.attr("transform", "rotate(-50)")
 		.attr("dx", "-.8em")
        .attr("dy", ".14em")

	d3.select(".x.axis.linegraph")
		.append("text")
		.attr("class", "x axis linegraph label")
		.text("Year")
		.attr("x", 240)
		.attr("y", 70)

	// call the y-axis
	yAxis = g.append("g")
		.attr("class", "y axis linegraph")
		.call(yAxis);

	// add title to y-axis
	yAxis.append("text")
		.attr("class", "y axis linegraph label")
		.attr("x", -230)
		.attr("y", -70)
		.attr("transform", "rotate(270)")
		.text("No. Illegal Border Crossings")

	// add title to the linegraph
	canvas.append("text")
			.attr("class", "title")
			.attr("y", 20)
			.attr("x", 120)
			.text("Use of Migratory Routes to Europe by Refugees from 2006 to 2016");
	console.log(data)
	// append lines to the graph
	g.selectAll(".line")
		.data(data)
		.enter().append("path")
		.attr("class", function(d) { return d.route; })
		.attr("d", function(d) { return line(d.years); })
		.style("stroke", function(d) { return z(d.route); })
		.style("stroke-width", "3px")
		.style("fill", "none")
		.style("opacity", 0.6)
		.on("mouseover", function(d) {
			// highlight line of route in  
			d3.select(this)
				.style("stroke-width", "4px")
				.style("stroke", "orange")
				.style("opacity", 0.7)

			// highlight route circle in datamap
			d3.select("circle." + d.route.split(' ').join('.'))
				.style("fill", "orange")

			document.body.style.cursor = "pointer";

			// get the right route name when mouseover line
			var class_route = d3.select(this)[0][0].className.baseVal;

			// obtain the right refugee number for current year/route
			var hover_route = findRoute(data, class_route)
			var ref_data = findRouteNumber(hover_route);

			// show route and number information in the linegraph
			d3.select(".allroutes.route")
				.text("Route: " + d.route);

			// show refugees data if there is data available
			if (ref_data != undefined)
			{
				d3.select(".allroutes.number")
					.text("No. Refugees: " + numberWithCommas(ref_data[0]));
			}
			// else mention that there is no data known
			else
			{
				d3.select(".allroutes.number")
					.text("No. Refugees: Unknown");
			}

			
		})
		.on("mouseout", function(d) {
			d3.select(this)
				.style("stroke-width", "3px")
				.style("stroke", function() { return z(d.route); })
				.style("opacity", 0.6)
			
			// change route circle color back to normal color
			d3.select("circle." + d.route.split(' ').join('.'))
				.style("fill", "red")

			// delete route and number information
			d3.select(".allroutes.route")
				.text("")

			d3.select(".allroutes.number")
				.text("")

			document.body.style.cursor = "default";

		})
		.on("click", function() {
			// get routename of line
			route_name = d3.select(this)[0][0].className.baseVal;

			// delete curent linegraph
			d3.select(".linegraph").remove();

			// create linegraph of route that was clicked on
			createLine2(refstreams);
			
			// show the linetoggle button
			d3.select("button.linetoggle").style("visibility", "visible")

			// show tooltip at right position in linegraph
			dotLine();

			document.body.style.cursor = "default";

		});

	// append group element, used for showing trackline on change of slider
	var trackline = canvas.append("g")
					.attr("class", "trackline")

	// append vertical line that tracks which year it is
    trackline.append("line")
	    .attr("class", "track")
	    .style("stroke", "black")
	    .style("stroke-dasharray", "4.5")
	    .style("opacity", 0.0)
	    .attr("y1", 0)
	    .attr("y2", line_height);

	// append text element that will show the year on slider move
	trackline.append("text")
		.attr("class", "allroutes year")
		.attr("x", 102)
		.attr("y", 70)
		.style("font-size", "11.5px");

	trackline.append("text")
		.attr("class", "allroutes route")
		.attr("x", 102)
		.attr("y", 82)
		.style("font-size", "11.5px");

	trackline.append("text")
		.attr("class", "allroutes number")
		.attr("x", 102)
		.attr("y", 94)
		.style("font-size", "11.5px");

	trackLine();	
};

/* This function is used to create linegraph for circle that is clicked on in datamap */
function createLine2(refstreams)
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
		route_data = findRoute(data, route_name);

	// safe information on years and refugee numbers in variable
	years = route_data.years;

	// scale the x-axis data
	x_line = d3.time.scale()
			.domain(d3.extent(years, function(d) { return format.parse(d.year); }))
			.range([0, line_width])

	// create the x-axis
	var xAxis = d3.svg.axis()
				.scale(x_line)
				.orient("bottom")
		
	// scale the y-axis data		
	y_line = d3.scale.linear()
		.domain(d3.extent(years, function(d) { return d.number; }))
		.range([line_height, 0])

	// create the y-axis
	var yAxis = d3.svg.axis()
				.scale(y_line)
				.orient("left");

	// create line function for every object in data array
	var line = d3.svg.line()
				.x(function(d) { return x_line(format.parse(d.year)); })
				.y(function(d) { return y_line(d.number); })

	// append canvas to .line div element for the linegraph
	var canvas = d3.select(".line").append("svg")
				.attr("width", line_width + margins.line.left + margins.line.right)
				.attr("height", line_height + margins.line.bottom + margins.line.top)
				.attr("class", "linegraph"),
			g = canvas.append("g")
				.attr("transform", "translate(" + margins.line.left + "," + margins.line.top + ")")
				.attr("class", "graph");

	// call the x-axis
	 var xAxis = g.append("g")
		.attr("class", "x axis line")
		.attr("transform", "translate(0," + line_height + ")")
		.call(xAxis)
		.selectAll("text")
		.style("text-anchor", "end")
		.attr("transform", "rotate(-50)")
 		.attr("dx", "-.8em")
        .attr("dy", ".30em");

	// add title to x-axis
	d3.select(".x.axis.line")
		.append("text")
		.attr("class", "x axis line label")
		.text("Year")
		.attr("x", 240)
		.attr("y", 70)

	// call the y-axis
	var yAxis = g.append("g")
		.attr("class", "y axis")
		.call(yAxis);

	// add title to y-axis
	yAxis.append("text")
		.attr("class", "y axis line label")
		.attr("x", -230)
		.attr("y", -70)
		.attr("transform", "rotate(270)")
		.text("No. Illegal Border Crossings")

	// add title to the linegraph
	canvas.append("text")
			.attr("class", "title")
			.attr("y", 15)
			.attr("x", 120)
			.text("Number of Illegal Border Crossings via " + route_name);

	// append line to the graph
	g.append("path")
		.datum(years)
		.attr("class", route_name)
		.attr("d", line)
		.style("fill", "none")
		.style("stroke", "orange")
		.style("stroke-width", "4px")
		.style("opacity", 0.5)
		.style("z-index", "1")

	// append "g" elements for dots that will track line
	var focus = canvas.append("g")
				.attr("class", "focus")
				.style("display", "none");

	// append dot that will show at position determined by mouse position 
	focus.append("circle")
			.attr("class", "refnumber")
			.style("r", "0px")
			.style("fill", "red")
			.style("stroke", "red");

	// append two text elements to focus for showing data value in top-left corner
	focus.append("text")
			.attr("class", "lineinfo year")
			.attr("x", 103)
			.attr("y", 70)
			.style("font-size", "11.5px")

	focus.append("text")
			.attr("class", "lineinfo number")
			.attr("x", 103)
			.attr("y", 82)
			.style("font-size", "11.5px")

    // append vertical line for crosshair
    focus.append("line")
        .attr("class", "verline")
        .style("stroke", "black")
        .style("stroke-dasharray", "4.5")
        .style("opacity", 0.5)
        .attr("y1", 0)
        .attr("y2", line_height);

    // append horizontal line for crosshair
      focus.append("line")
        .attr("class", "horline")
        .style("stroke", "black")
        .style("stroke-dasharray", "4.5")
        .style("opacity", 0.5)
        .attr("x1", 0)
        .attr("x2", line_width);

	// append text element to focus for popup text
	focus.append("text")
			.attr("class", "linepop")

	// create a rectangle that detects if mouse is on graph or not
	canvas.append("rect")
		.style("fill", "none")
		.style("pointer-events", "all")
		.attr("class", "overlay")
		.attr("transform", "translate(" + margins.line.left + "," + margins.line.top + ")")
		.attr("width", line_width)
		.attr("height", line_height)
		.on("mouseover", mouseOver)
		.on("mouseout", mouseOut)
		.on("mousemove", mouseMove);

    // create function that returns either right or left datapoint of mouse
   	var bisectYear = d3.bisector(function(d) { return format.parse(d.year); }).left;

   	/* Function called when mouse is over the detection rectangle in linegraph */
   	function mouseOver() {
   		focus.style("display", null);

   		// remove the dot connected to slider if it is on linegraph
   		d3.select("circle.dotline").remove();
   		d3.select(".horline2").remove();
   		d3.select(".verline2").remove();

   		// change the style of the line in the linegraph
      	d3.select("path." + route_name.split(' ').join('.'))
      		.transition().duration(300)
				.style("stroke-width", "4px")
				.style("stroke", "orange")
				.style("opacity", 0.5);

		// make a dot appear in linegraph that shows data values
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

		dotLine();
	};

   	/* 
   	 * This function makes the dot set to the data point closest
     * to the mouse and also shows the data that belongs to that data point. 
     */
    function mouseMove() {
    	// get the right datapoint for the current mouse position
    	var x0 = x_line.invert(d3.mouse(this)[0]),
    		i = bisectYear(years, x0, 1),
    		d0 = years[i - 1],
      		d1 = years[i],
      		d = x0 - format.parse(d0.year) > format.parse(d1.year) - x0 ? d1 : d0;

  		// get coördinates of new position of the dot
  		var xPos = x_line(format.parse(d.year)) + margins.line.left,
  			yPos = y_line(d.number) + margins.line.top;

      	// move the dot to right positions on line
  		focus.select("circle.refnumber")
	      .attr("transform",  
	            "translate(" + xPos + "," +  
	                           yPos + ")"); 

	    // show the data values in topleft corner of linegraph
	    focus.select("text.lineinfo.year")
	    	.text("Year: " + d.year);
	    
	    focus.select("text.lineinfo.number")
	    	.text("No. Refugees: " + numberWithCommas(d.number));

	    // change position of the crosshair
	    focus.select(".verline")
	    		.style("opacity", 0.5)
			    .attr("transform",
			            "translate(" + xPos + "," +
			                            + margins.line.top + ")");

		focus.select(".horline")
				.style("opacity", 0.5)
				.attr("transform",
			            "translate(" + margins.line.left + "," +
			                            + yPos + ")");
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

/* 
 * This function shows a dot on the current linegraph for the value of cur_year.
 * The dot appears where the x-axis value corresponds to the cur_year value.
 * Function should be called when the slider value is changed. If the current
 * graph shows all the route lines, a trackline will appear that shows which year
 * the slider is currently on.
 */
function dotLine() {
	// show dot if there is information available for the year
	if (years != undefined)
	{
		var line_data;

		// find the routes data that corresponds to current year
		for (i = 0; i < years.length; i++)
		{
			if (cur_year == years[i].year)
			{
				line_data = years[i];
			}
		}

		// remove the current .dotline circle and .focus2
		d3.select(".dotline").remove();
		d3.selectAll(".focus2").remove();

		// only show a dot on the line if there is data for route/cur_year
		if (line_data != undefined && route_name != undefined)
		{	
			// append g element to linegraph canvas for the dot
			var focus = d3.select(".linegraph").append("g")
							.attr("class", "focus2");

			// append text to focus for data information
			focus.append("text")
				.attr("class", "lineinfo2 year");

			focus.append("text")
				.attr("class", "lineinfo2 number");

			// append vertical line for crosshair
			focus.append("line")
			    .attr("class", "verline2")
			    .style("stroke", "black")
			    .style("stroke-dasharray", "4.5")
			    .style("opacity", 0.5)
			    .attr("y1", 0)
			    .attr("y2", line_height);

			// append horizontal line for crosshair
			  focus.append("line")
			    .attr("class", "horline2")
			    .style("stroke", "black")
			    .style("stroke-dasharray", "4.5")
			    .style("opacity", 0.5)
			    .attr("x1", 0)
			    .attr("x2", line_width);

			// append dot to the linegraph
			focus.append("circle")
				.attr("class", "dotline")
				.attr("cx", x_line(format.parse(line_data.year)) + margins.line.left)
				.attr("cy", y_line(line_data.number) + margins.line.top)
				.style("r", "0px")
				.style("fill", "red")
				.transition().duration(300)
				.style("r", "6px")
				.style("fill", "orange")

			// also change path color of the linegraph
		 	d3.select("path." + route_name.split(' ').join('.'))
	  			.transition().duration(300)
				.style("stroke-width", "4px")
				.style("stroke", "orange")
				.style("fill", "none")
				.style("opacity", 0.5)

			// also change color of route on the map
			d3.select("circle." + route_name.split(' ').join('.'))
					.style("fill", "orange");

			// determine x and y positions for crosshairs 
			var xPos = x_line(format.parse(line_data.year)) + margins.line.left,
					yPos = y_line(line_data.number) + margins.line.top;

			// change position of the crosshair
		    d3.select(".verline2")
		    		.style("opacity", 0)
				    .attr("transform",
				            "translate(" + xPos + "," 
				                            + margins.line.top + ")")
				    .transition().duration(300)
				    .style("opacity", 0.5)

			d3.select(".horline2")
					.style("opacity", 0)
					.attr("transform",
							"translate(" + margins.line.left + "," + 
											yPos + ")")
					.transition().duration(300)
					.style("opacity", 0.5)

			// stop displaying focus and change opacity of crosshair
			d3.select(".focus").style("display", null)
			d3.select(".verline").style("opacity", 0)
			d3.select(".horline").style("opacity", 0)

			// show information for the datapoint that the dot is on
			d3.select(".lineinfo.year")
					.text("Year: " + cur_year)

			d3.select(".lineinfo.number")
				    .text("No. Refugees: " + numberWithCommas(line_data.number))
		}
		else
		{
			// transform line back to original state
			d3.select("path." + route_name.split(' ').join('.'))
				.transition().duration(300)
				.style("stroke-width", "2px")
				.style("stroke", "red")
				.style("opacity", 0.7)

			// display no values in linegraph if there is no data for year
			d3.select(".focus").style("display", "none")
		}
	}	
	else
	{
		// show trackline if linegraph contains all the route lines
		trackLine();
	}
};

/* This function is used for showing the trackline if all routes are in linegraph */
function trackLine() {
		// get the x position of the line when slider is changed
		xPos = x(format.parse(String(cur_year))) + margins.line.left;

		// make trackline appear at the right position
		d3.select(".track")
	    		.style("opacity", 0.5)
			    .attr("transform",
			            "translate(" + xPos + "," + margins.line.top + ")");

		// show current year in the linegraph
		d3.select("text.allroutes")
	    	.text("Year: " + cur_year);
};



