/**
 * bar.js
 * 
 * Tim Molleman
 *
 * This Javascript file contains a function that is used for creating a
 * barchart when a country in a datamap is clicked on
 *
 * NOTE: data.js needs to be loaded for the below functions to work
 */

/* 
 * Function requires a dataset that was created with the 'findCountry' function.
 * It returns an array with at least 5 objects. These are the 5 (or more) countries where most
 * refugees came from for the given year and clicked on country. Each object 
 * contains name of the country and the number of refugees. 
 */
function storeRefugees(country_data) {

	// check if country_data is defined, else return 'false'
	if (country_data == undefined)
	{
		return undefined;
	}

	// arrays for storing data of refugees based on 5 (or more) most prevalent origins
	var max_value = [];
	var max_data = [];

	// loop for 5 times, to store 5 (or more) of the countries with largest amount of refugees
	for (i = 0; i < 5; i++)
	{
		max = 0
		for (j = 0; j < country_data.refugees.length; j++)
		{
			if (max_value.length == 0)
			{
				if (Number(country_data.refugees[j].number) > max)
				max = Number(country_data.refugees[j].number);
			}
			else
			{
				if (max_value.includes(Number(country_data.refugees[j].number)))
				{
					continue;
				}
				else if (Number(country_data.refugees[j].number > max))
				{
					max = Number(country_data.refugees[j].number);
				}
			}
		}
		max_value.push(max);
	}

	for (k = 0; k < max_value.length; k++)
		{
		for (j = 0; j < country_data.refugees.length; j++)
			if (Number(country_data.refugees[j].number) == max_value[k])
			{
				country_data.refugees[j].number = Number(country_data.refugees[j].number)
				max_data.push(country_data.refugees[j]);
			}
		}
	return max_data;
};

// /* Function creates barchart */
function createBarchart(year, migrants) {
	// if there is a no-data text element in barchart, remove it 
	d3.select(".no-data").remove()

	// safe the right data in max_data variable
	var cur_data = currentData(year, migrants),
		country_data = findCountry(cur_data, cur_country),
		max_data = storeRefugees(country_data);

	// if there is no data available for a given year/country, let user know
	if (max_data == undefined) 
	{
		d3.select(".barchart").selectAll(".tick").remove()
		d3.select(".barchart").selectAll("rect").remove()
		d3.select(".barchart").selectAll("text").remove()

		d3.select(".barchart").append("text")
			.attr("class", "no-data")
			.style("opacity", 0)
			.transition().duration(1000)
			.style("opacity", 1)
			.attr("x", 220)
			.attr("y", 250)
			.text("No data for " + cur_country_name + " in " + cur_year) 
	}
	else
	{
		// define margins of barchart
		var margins = {top: 50, bottom: 80, left: 70, right : 0};

		// define the width and height of the svg element
		var	height = 550 - margins.top - margins.bottom,
			width = 500 - margins.left - margins.right;

		// scale the x-variable ordinally with top 5 countries where refugees come from
		var x = d3.scale.ordinal()
			.domain(max_data.map( function(d) {return d.origin; }))
			.rangeBands([0, width], 0.4);

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
			.rangeRound([height, 0]);

		// create y-axis
		var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left")
			.tickFormat(d3.format(",.0f"));

		// create tooltip element for when barchar is hovered over
		var tip = d3.tip()
		.attr("class", "d3tip bars")
		.offset([-10, 0])
		.html(function(d) { return "<strong>" + d.origin + ":</strong> <span style='color:red'>" 
			+ numberWithCommas(d.number) + "</span>"; });

		// remove the current barchart from the page (if there is one)
		d3.select('.barchart').remove();
		d3.select('.d3tip').remove();

		// append svg element to .bar div element
		var canvas = d3.select(".bar").append("svg")
			.attr("class", "barchart")
		    .attr("width", width + margins.left + margins.right)
		    .attr("height", height + margins.top + margins.bottom)
		    .append("g")
		    .attr("class", "bars " + cur_country)
		    .attr("transform", "translate(" + margins.left + "," + margins.top + ")");

		// add title to the graph
		canvas.append("text")
				.attr("y", -10)
				.attr("x", 20)
				.text("Top " + max_data.length + " countries of refugee origins for " + cur_country_name + 
					" (" + cur_year + ")");

		// add x-axis to canvas
		canvas.append("g")
			.attr("class", "x axis bar")
			.attr("transform", "translate(0, " + height + ")")
			.call(xAxis)
			.selectAll("text")
			.style("text-anchor", "end")
			.attr("transform", "rotate(-50)")
	 		.attr("dx", "-.8em")
	        .attr("dy", ".15em")

	    d3.select(".x.axis.bar")
	        .append("text")
	    	.attr("class", "x axis bar label")
	    	.text("Origin")
	    	.attr("x", 190)
	    	.attr("y", 70)

		// add y-axis to canvas
		canvas.append("g")
		.attr("class", "y axis bar")
		.call(yAxis)
		.append("text")
		.text("Number of Refugees")
		.attr("x", -260)
		.attr("y", -55)
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
			.attr("y", function(d) { return height; })
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
			.attr("height", function(d) { return height - y(d.number); });
		
		// call tooltip on bars
		bar.call(tip)
		.on("mouseover", tip.show)
		.on("mouseout", tip.hide);
	}	
};


