/**
 * bar.js
 * 
 * Tim Molleman
 *
 * This Javascript file contains a function that is used for creating a
 * barchart when a country in a datamap is clicked on or the slider is moved
 *
 * NOTE: data.js needs to be loaded for the below functions to work
 */

/* Function creates barchart */
function createBarchart(year, migrants) {
	// if there is a no-data text element in barchart, remove it 
	d3.select(".no-data").remove()

	// safe the right data in max_data variable
	var cur_data = currentData(year, migrants),
		country_data = findCountry(cur_data, cur_country),
		max_data = storeRefugees(country_data);

	// determine width and height of actual barchart 
	var bar_width = graph_width - margins.bar.left - margins.bar.right,
		bar_height = graph_height - margins.bar.top - margins.bar.bottom;

	// if there is no data available for a given year/country, let user know
	if (max_data == undefined) 
	{
		// remove any unecessary html elements
		d3.select(".barchart").selectAll(".tick").remove()
		d3.select(".barchart").selectAll("rect").remove()
		d3.select(".barchart").selectAll("text").remove()

		// show text saying there is no data for country/year combination
		d3.select(".barchart").append("text")
			.attr("class", "no-data")
			.style("opacity", 0)
			.transition().duration(1000)
			.style("opacity", 1)
			.attr("x", 270)
			.attr("y", 220)
			.text("No data for " + cur_country_name + " in " + cur_year) 
	}
	else
	{
		// scale the x-variable ordinally with top 5 countries of origin
		var x = d3.scale.ordinal()
			.domain(max_data.map( function(d) {return d.origin; }))
			.rangeBands([0, bar_width], 0.4);

		// create x-axis
		var xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom");

		// get the minimum and maximum values of barchart
		var y_bounds = d3.extent(max_data, function(d) { return d.number });
		y_bounds[0] = y_bounds[0] * 0;
		y_bounds[1] = y_bounds[1] * 1.05;

		// scale y-variable linearly
		var y = d3.scale.linear()
			.domain(y_bounds)
			.rangeRound([bar_height, 0]);

		// create y-axis
		var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left")
			.tickFormat(d3.format(",.0f"));

		// create tooltip element for when a bar in chart is hovered over
		var tip = d3.tip()
		.attr("class", "d3tip bars")
		.offset([-10, 0])
		.html(function(d) { return "<strong>" + d.origin + ":</strong> <span style='color:red'>" 
			+ numberWithCommas(d.number) + "</span>"; });

		// remove the current barchart from the page
		d3.select('.barchart').remove();
		d3.select('.d3tip').remove();

		// append svg element to .bar div element
		var canvas = d3.select(".bar").append("svg")
			.attr("class", "barchart")
		    .attr("width", bar_width + margins.bar.left + margins.bar.right)
		    .attr("height", bar_height + margins.bar.top + margins.bar.bottom)
		    .append("g")
		    .attr("class", "bars " + cur_country)
		    .attr("transform", "translate(" + margins.bar.left + "," + margins.bar.top + ")");

		// add title to the graph
		canvas.append("text")
				.attr("y", -30)
				.attr("x", 60)
				.text("Top " + max_data.length + " countries of refugee origins for " + cur_country_name + 
					" (" + cur_year + ")");

		// add x-axis to canvas
		canvas.append("g")
			.attr("class", "x axis bar")
			.attr("transform", "translate(0, " + bar_height + ")")
			.call(xAxis)
			.selectAll("text")
			.style("text-anchor", "end")
			.attr("transform", "rotate(-50)")
	 		.attr("dx", "-.8em")
	        .attr("dy", ".15em")

	    // add label to x-axis
	    d3.select(".x.axis.bar")
	        .append("text")
	    	.attr("class", "x axis bar label")
	    	.text("Origin")
	    	.attr("x", 210)
	    	.attr("y", 70)

		// add y-axis and label to canvas
		canvas.append("g")
		.attr("class", "y axis bar")
		.call(yAxis)
		.append("text")
		.attr("class", "y axis bar label")
		.text("Number of Refugees")
		.attr("x", -240)
		.attr("y", -65)
		.attr("transform", "rotate(270)")

		// add g-element for every datapoint in max_data 
		var bar = canvas.selectAll("g.bars")
		    .data(max_data)
		    .enter()
		    .append("g");

		// add a bar to every g-element in variable 'bar'
		bar.append("rect")
			.attr("fill",  "#e31a1c")
			.style("opacity", "0.6")
			.attr("width", x.rangeBand())
			.attr("height", "0")
			.attr("x", function(d) { return x(d.origin); })
			.attr("y", function(d) { return bar_height; })
			.on("mouseover", function() {
				d3.select(this)
					.transition().duration(500)
					.attr("fill", "#e31a1c")
					.style("opacity", 0.8)
			})
			.on("mouseout", function() {
				d3.select(this)
					.transition().duration(700)
					.attr("fill", "#feb24c")
					.style("opacity", 1.0)
			})
			.transition()
			.delay(function (d,i) { return i * 150; })
			.duration(600)
			.style("opacity", "1.0")
			.attr("fill", "#feb24c")
			.attr("y", function(d) { return y(d.number); })
			.attr("height", function(d) { return bar_height - y(d.number); });
		
		// call tooltip on bars
		bar.call(tip)
		.on("mouseover", tip.show)
		.on("mouseout", tip.hide);
	}	
};


