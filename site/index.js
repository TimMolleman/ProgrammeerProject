// queue the json-files so they can be loaded in later
d3.queue()
  .defer(d3.json, "migrants2.json")
  .defer(d3.json, "refstreams.json")
  .await(analyze);

/* this function is for determining the fillkey for a given country */
function getFillKey(total) {
	if (total < 1000)
	{
	    color = "< 1";
	}
	else if (total >= 1000 && total < 5000)
	{
	    color = "1 - 5";
	}
	else if (total >= 5000 && total < 15000)
	{
	    color = "5 - 15";
	}
	else if (total >= 15000 && total < 30000)
	{
	    color = "15 - 30";
	}
	else if (total >= 30000 && total < 60000)
	{
	    color = "30 - 60";
	}
	else
	{
	    color = "> 60";
	}
	return color;
	};

	function updateMap (year, migrants)
	{
	d3.select('.datamap').remove();
	d3.select('.datamaps-hoverover').remove();

	for (i = 0; i < migrants.length; i++)
		if (migrants[i].year == year)
		{
			var cur_data = migrants[i];
		}

	map_data = {};

	cur_data.countries.forEach(function(item) {
		var total = 0,
			country_code = item['code'];
		item.refugees.forEach(function(item2) {
			total = total + Number(item2.number);
		});

		// determine the fillkey for the current country:
		var key = getFillKey(total)

		map_data[country_code] = {number: total, fillKey: key};
	})

	var basic = new Datamap({
	element: document.getElementById("map"),
	scope: 'world',
	setProjection: function(element) {
		var projection = d3.geo.equirectangular()
		  .center([15, 50])
	  .rotate([4.4, 0])
	  .scale(500)
	  .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
	var path = d3.geo.path()
	  .projection(projection);

	  return {path: path, projection: projection};
	},
	geographyConfig: {
	    borderColor: 'rgba(255,255,255,0.3)',
	    highlightBorderColor: 'rgba(0,0,0,0.5)',
	    popupTemplate: function(geo, data) {
	    	if ( !data ) return "<div class='popup'><span style='font-weight:bold'>" + geo.properties.name +
                    "</span><br></div>";
	    	return "<div class='popup'><span style='font-weight:bold'>" + geo.properties.name +
                    "</span><br><span>Refugees: " + numberWithCommas(data.number) +  "</span></div>";
	    },
	    popupOnHover: true,
	    highlightOnHover: true,
	    highlightFillColor: "orange",
	    highlightBorderWidth: 2
	},
	fills: {
    defaultFill: "#bdbdbd",
    "< 1": "#eff3ff",
    "1 - 5": '#c6dbef',
    "5 - 15": "#9ecae1",
    "15 - 30": "#6baed6",
    "30 - 60": "#3182bd",
    "> 60": "#08519c"
  },
  data: map_data
});
	return basic;

};

// function that returns  with commas after every 3 numbers
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

// load in the json-files when ready. If there is an error, log error
function analyze(error, migrants, refstreams) {
	if (error) {
		console.log(error);
	}
	console.log(migrants);

	// get the year that corresponds to slide-bar's initial position
	var init_slide = document.getElementById('slider');
	var cur_year = init_slide.value;

	// get the initial corresponding map
	var map = updateMap(cur_year, migrants);

	// get the barchart going bitch
	map.svg.selectAll('.datamaps-subunit')
		.on('click', function(geography) {

			// safe the data for the right year in a variable
			for (i = 0; i < migrants.length; i++)
				if (migrants[i].year == cur_year)
				{
					var cur_data = migrants[i];
				}
			
			// get the country code for country that was clicked on
			var code = geography.id;

			// safe data for country that was clicked on in a variable
			for (i = 0; i < cur_data.countries.length; i++)
			{
				if (cur_data.countries[i].code == code)
				{
					var country_data = cur_data.countries[i];
				}
			}
			console.log(country_data);

			// arrays for storing data of refugees based on 5 most prevalent origins
			var max_value = [];
			var max_data = [];

			// loop for 5 times, to store 5 of the countries with biggest amount of refugees
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

			console.log(max_value);
			console.log(max_data);

			/* maak barchart */
			var margins = {top: 50, bottom: 40, left: 55, right : 0};

			// define the desired width of bars and desired space between bars
		    var barWidth = 55;
		    var barSpace = 20;

		    // define the width of the svg element and height
		    var width = (barWidth + barSpace) * max_data.length - margins.left - margins.right,
		    	height = 500 - margins.top - margins.bottom;

		    var x = d3.scale.ordinal()
            	.domain(max_data.map( function(d) {return d.origin; }))
            	.rangeRoundBands([0, width], 0.1);

            var xAxis = d3.svg.axis()
            	.scale(x)
            	.orient("bottom")

            var y_bounds = d3.extent(max_data, function(d) { return d.number });
            y_bounds[0] = y_bounds[0] * 0.9;
            y_bounds[1] = y_bounds[1] * 1.05;
            
            var y = d3.scale.linear()
            	.domain(y_bounds)
            	.rangeRound([height, 0]);

            var yAxis = d3.svg.axis()
            	.scale(y)
            	.orient("left")

        	var tip = d3.tip()
			.attr("class", "d3tip")
			.offset([-10, 0])
			.html(function(d) { return "<strong>" + d.origin + ":</strong> <span style='color:red'>" 
				+ d.number + "</span>"; });

			d3.select('.barchart').remove();
			d3.select('.d3tip').remove();

			var canvas = d3.select(".bar").append("svg")
				.attr("class", "barchart")
			    .attr("width", width + margins.left + margins.right)
			    .attr("height", height + margins.top + margins.bottom)
			    .append("g")
			    .attr("class", "bars")
			    .attr("transform", "translate(" + margins.left + "," + margins.top + ")");

			canvas.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0, " + height + ")")
				.call(xAxis)

			canvas.append("g")
            .attr("class", "y axis")
            .call(yAxis)

			var bar = canvas.selectAll("g.bars")
	            .data(max_data)
	            .enter()
	            .append("g");

	        bar.append("rect")
				.attr("x", function(d) { return x(d.origin); })
				.attr("y", function(d) { return y(d.number); })
				.attr("height", function(d) {return height - y(d.number); })
				.attr("width", barWidth - barSpace)
				.attr("fill", "#feb24c")
				.call(tip)
				.on("mouseover", tip.show)
				.on("mouseout", tip.hide);
		})

	// update the maps everytime the slider is moved for value of slider
	var slider = document.getElementById("slider")
	slider.addEventListener("mousemove", function() {
		cur_year = slider.value;

		// update map according to the current year on slider
		updateMap(cur_year, migrants);
		console.log(cur_year)

	});
};





