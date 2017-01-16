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

	console.log([1, 4, 2].includes(3))

	// get the year that corresponds to slide-bar's initial position
	var init_slide = document.getElementById('slider');
	var first_year = init_slide.value;

	// get the initial corresponding map
	var map = updateMap(first_year, migrants);

	map.svg.selectAll('.datamaps-subunit')
		.on('click', function(geography) {

			// safe the data for the right year in a variable
			for (i = 0; i < migrants.length; i++)
				if (migrants[i].year == first_year)
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

			var max_value = [];
			var max_data = [];

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
						max_data.push(country_data.refugees[j]);
					}
				}

			/* maak barchart */
			var margins = {top: 50, bottom: 40, left: 55, right : 0};

			// define the desired width of bars and desired space between bars
		    var barWidth = 55;
		    var barSpace = 20;

		    // define the width of the svg element and height
		    var width2 = (barWidth + barSpace) * data_x.length - margins2.left - margins2.right;
		    var height2 = 500 - margins2.top - margins2.bottom;

			console.log(max_value);
			console.log(max_data);
		})

	// update the maps everytime the slider is moved for value of slider
	var slider = document.getElementById("slider")
	slider.addEventListener("mousemove", function() {
		var cur_year = slider.value;

		// update map according to the current year on slider
		updateMap(cur_year, migrants);


	});
};





