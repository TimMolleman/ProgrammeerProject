/**
 * circles.js
 * 
 * Tim Molleman
 *
 * This file contains the functions that are used for drawing and erasing
 * the migrant route circles on the datamap.
 *
 * NOTE: data.js has to be loaded first
 */

/* Function finds the right number of refugees and year for 'data' and returns */
function findRouteNumber(data) {
	var routes_data;

	// loop through the data until right year is found and return values
	for (i = 0; i < data.years.length; i++) 
	{
		if (data.years[i].year == cur_year) 
		{
			return [data.years[i].number, data.years[i].year];
		}
	}
};

/* Function draws the circles to the datamap.  */ 
function drawCircles(refstreams) {
	var data = transformRefstreams(refstreams);

	// remove current circles from the map and circle tooltips from the html
	d3.select(".routes").remove();
	d3.selectAll(".d3tip.routes").remove();

	// append a group element to the map to append circles to
	d3.select(".datamap")
		.append("g")
		.attr("class", "routes");

	// for each route in 'data', draw circle if there is data available for year
	data.forEach(function(d) {
		// store necessary information in variables 
		var x = d.coordinates.x,
			y = d.coordinates.y,
			route = d.route,
			ref_info = findRouteNumber(d);

		//  only proceed if there is data found with findRouteNumber function
		if (ref_info != undefined)
		{	
			var number = findRouteNumber(d)[0],
				year = findRouteNumber(d)[1];

			var tip = d3.tip()
						.attr("class", "d3tip routes")
						.html(function() { return "<strong>" + route + "</strong><br><strong>Illegal crossings: </strong><span style='color:red'>" + numberWithCommas(number) + "</span>"; });

			// append circle to the .routes element
			d3.select(".routes").append("circle")
				.attr("class", route)
				.attr("cx", x)
				.attr("cy", y)
				.attr("r", 0)
				.call(tip)
				.on("mouseover", tip.show)
				.on("mouseout", tip.hide)
				.on("click", clickFunction)
				.transition().duration(550)
				.attr("r", getRadius(number))
				.style("fill", fillCircles)
				.style("opacity", 0.8)
				.transition().delay(2100).duration(800)
				.style("fill", "red")

			/* Creates linegraph for the route that was clicked on in map */
			function clickFunction() {

				if (route_name != undefined)
				// change current route circle to red if it is still orange
				d3.select("." + route_name.split(' ').join('.'))
					.transition().duration(300)
					.style("fill", "red")

				// get the classname (route) of circle that is clicked on
				route_name = d3.select(this)[0][0].className.baseVal;

				d3.select("circle." + route_name.split(' ').join('.'))
					.transition().duration(300)
					.style("fill", "orange")
					.transition().delay(2200).duration(300)
					.style("fill", "red")

				// delete linegraph on screen if one is already there 
				d3.select(".linegraph").remove();

				d3.select(".focus").style("display", null)

				// show the data values next to the dot
			    d3.select(".lineinfo.year")
			    	.text("Year: " + cur_year)
			    
			    // d3.select("text.lineinfo.number")
			    // 	.text("Refugees: " + numberWithCommas(d.number))

				// create new linegraph for the route that was clicked on in map
				createLine2(refstreams);

				// dotLine function so dot shows for current year and route in linegraph
				dotLine();
			};

			/* This function determines the color for the circle. */
			function fillCircles() 
			{
				// for the current route, the color is orange
				if (route == route_name)
				{
					return "orange";
				}
				// all other routes are coloured red
				else
				{
					return "red";
				}
			};
		}
	});
};

/* Function makes that circles disappear smoothly when button_toggle == 0 */ 
function eraseCircles() {
	d3.selectAll("circle")
		.transition().duration(550)
		.style("opacity", 0)
		.style("r", 0);
};




