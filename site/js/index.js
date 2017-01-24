// queue the json-files so they can be loaded in later
d3.queue()
  .defer(d3.json, "../data/migrants2.json")
  .defer(d3.json, "../data/refstreams.json")
  .await(analyze);

// define global variables
var cur_year,
	cur_country,
	cur_country_name,
	map
	button_toggle = 1;	

// load in the json-files when ready. If there is an error, log error
function analyze(error, migrants, refstreams) {
	if (error) {
		console.log(error);
	}

	// safe the year that corresponds to slide-bar's initial position
	var init_slide = document.getElementById('slider');
	cur_year = init_slide.value;

	// get the initial corresponding map
	map = createMap(cur_year, migrants);

	// initial barchart country (Germany)
	cur_country = 'DEU'
	cur_country_name = "Germany"

	// initialize default barchart (for Germany (2011))
	createBarchart(cur_year, migrants);

	// draw circles for the initial year (2011)
	drawCircles(refstreams);

	// update the map everytime the slider is moved for year on slider
	var slider = document.getElementById("slider")

	// update map and the barchart when slider is changed/moved
	slider.addEventListener("change", function() {
		cur_year = slider.value;

		// update barchart for value on the slider 
		createBarchart(cur_year, migrants);

		// update map according to the current year on slider
		updateMap(cur_year, migrants);

		if (button_toggle == 1) 
		{
			// draw dots on te map for immigrant routes
			drawCircles(refstreams);
		}
	});

	// create barchart for country that is clicked on in map (for year on slider)
	map.svg.selectAll('.datamaps-subunit')
		.on('click', function(geography) {
			// safe current data in a variable
			var click_data = currentData(cur_year, migrants)

			// create new barchart if there is data available for country
			if (findCountry(click_data, geography.id) != undefined)
			{
				cur_country = geography.id;
				cur_country_name = geography.properties.name;

				createBarchart(cur_year, migrants);
			};
		}); 
	
	/* Function that either removes or adds migrant routes circles */
	function clickButton() {
		d3.select("button")
			.on("click", function() {
				if (button_toggle == 1)
				{	
					eraseCircles()
					removeLineGraph()
					button_toggle = 0;
				}
				else
				{	
					drawCircles(refstreams);
					button_toggle = 1;
				}
			});
	};

	clickButton()

}



