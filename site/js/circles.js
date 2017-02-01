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

/* Function draws the circles for migration routes to the datamap. */ 
function drawCircles(refstreams) {
	var data = transformRefstreams(refstreams);
	// remove current circles and circle tooltips from the html
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

		//  only proceed if data is found for year with findRouteNumber function
		if (ref_info != undefined)
		{	
			// safe number of illegal border crossings and the year
			var number = findRouteNumber(d)[0],
				year = findRouteNumber(d)[1];

			// create tooltip to show next to migration route circle
			var tip = d3.tip()
						.attr("class", "d3tip routes")
						.html(function() { return "<strong>" + route + "</strong><br><strong>Illegal crossings: </strong><span style='color:red'>" 
							+ numberWithCommas(number) + "</span>"; });

			// append circle to the .routes element and call tooltip
			d3.select(".routes").append("circle")
				.attr("class", route)
				.attr("cx", x)
				.attr("cy", y)
				.attr("r", 0)
				.call(tip)
				.on("mouseover", function(d, i) {
					tip.show(d, i);
					document.body.style.cursor = "pointer";
					})
				.on("mouseout", function(d, i) { 
					tip.hide(d, i);
					document.body.style.cursor = "default"; 

					d3.select(".linegraph").select("path." + route.split(' ').join('.'))
					})
				.on("click", clickFunction)
				.transition().duration(550)
				.attr("r", getRadius(number))
				.style("fill", fillCircles)
				.style("opacity", 0.8)
				.transition().delay(2100).duration(800)
				.style("fill", "red");

			/* Creates linegraph for the route that was clicked on in map */
			function clickFunction() {

				if (route_name != undefined) // XXX
				// change current route circle to red if it is still orange
				d3.select("." + route_name.split(' ').join('.'))
					.transition().duration(300)
					.style("fill", "red");

				// get the classname (route) of circle that is clicked on
				route_name = d3.select(this)[0][0].className.baseVal;

				// let clicked on circle light up orange for a short duration
				d3.select("circle." + route_name.split(' ').join('.'))
					.transition().duration(300)
					.style("fill", "orange")
					.transition().delay(2200).duration(300)
					.style("fill", "red");

				// hide crosshairs for linegraph
				d3.select(".focus").style("display", null);

				// delete linegraph on screen if one is already there 
				d3.select(".linegraph").remove();

				// make linetoggle button visible 
				d3.select("button.linetoggle").style("visibility", "visible");

				// create new linegraph for the route that was clicked on in map
				createLine2(refstreams);

				// dotLine function so dot shows for current year and route in linegraph
				dotLine();

				// show year in top-left corner of 
			    d3.select(".lineinfo.year")
			    	.text("Year: " + cur_year) // XXX dit stuk code komt meerdere malen voor
			};

			/* Function determines the color for the circle. */
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

/* Function makes circles disappear smoothly */ 
function eraseCircles() {
	d3.selectAll("circle")
		.transition().duration(550)
		.style("opacity", 0)
		.style("r", 0);
};

/* 
 * Function finds the right number of refugees and year for 'data' and returns these
 * values. The 'data' argument should contain a refstreams dataset already transformed
 * by using the transformRefstreams function.
 */
function findRouteNumber(data) {
	// loop through the data until right year is found and return values
	for (i = 0; i < data.years.length; i++) 
	{
		if (data.years[i].year == cur_year) 
		{
			return [data.years[i].number, data.years[i].year];
		}
	}
};



