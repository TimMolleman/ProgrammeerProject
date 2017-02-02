// queue the json-files so they can be loaded in later
d3.queue()
  .defer(d3.json, "/ProgrammeerProject/site/data/migrants.json")
  .defer(d3.json, "/ProgrammeerProject/site/data/refstreams.json")
  .await(analyze);

// define global variables
var cur_year,
	cur_country,
	cur_country_name,
	map,
	lines_toggle = 0,
	routes_toggle = 1;

// define global variables for width, height and margins for barchart and linegraphs
var margins = {line: {top: 50, left: 90, bottom: 100, right: 40}, bar: {top: 50, left: 90, bottom: 100, right: 50}},
	graph_width = 620,
	graph_height = 475;

// load in the json-files when ready. If there is an error, log error
function analyze(error, migrants, refstreams) {
	if (error) {
		console.log(error);
	}

	// safe the year that corresponds to slide-bar's initial position
	var init_slide = document.getElementById('slider');
	cur_year = init_slide.value;

	// get the initial map for this year
	map = createMap(cur_year, migrants);

	// draw circles for the initial year (2011)
	drawCircles(refstreams);

	// initial barchart country (Germany)
	cur_country = 'DEU'
	cur_country_name = "Germany"

	// create default barchart (for Germany (2011))
	createBarchart(cur_year, migrants);

	// hide the linetoggle button initially
	d3.select("button.linetoggle").style("visibility", "hidden");

	// draw initial linegraph that contains information on all migration routes
	createLine(refstreams);

	// in the linegraph, show year corresponding to slider in top-left corner
	d3.select(".show-year").select("text")
		.text("Selected Year: " + cur_year)

	// update map everytime the slider is moved for year on slider
	var slider = document.getElementById("slider");

	// update map and the barchart when slider is changed/moved
	slider.addEventListener("change", function() {
		cur_year = slider.value;

		// update barchart for year on the slider 
		createBarchart(cur_year, migrants);

		// update map according to year on slider
		updateMap(cur_year, migrants);

		// draw dots on te map for immigrant routes if routes are toggled 'on'
		if (routes_toggle == 1) 
		{
			drawCircles(refstreams);
		}

		// draw dot on routes line if there is data for the year
		dotLine();

		// in the linegraph, show year corresponding to slider in top-left corner
		d3.select(".show-year").select("text")
			.text("Selected Year: " + cur_year);
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
	
	/* Function that either removes or adds migrant routes circles on click */
	function clickRoutesButton() {
		d3.select("button.routestoggle")
			.on("click", function() {
				// if routes is toggled 'on' (1)
				if (routes_toggle == 1)
				{	
					// erase circles and linegraph
					eraseCircles();
					removeLineGraph();

					// set current route_name and years data to undefined
					route_name = undefined;
					years = undefined;

					// toggle routes 'off' (0)
					routes_toggle = 0;

					d3.select("button.linetoggle").style("visibility", "hidden");
					d3.select(".graphcontainer").style("width", "50%")
					d3.select("button.routestoggle").text("Toggle Routes (Off)")
				}
				// if routes is toggled 'off'
				else
				{	
					// draw circles on map, toggle routes 'on' and draw linegraph
					drawCircles(refstreams);
					routes_toggle = 1;
					createLine(refstreams);

					d3.select("button.linetoggle").style("visibility", "hidden");
					d3.select(".graphcontainer").style("width", "90%")
					d3.select("button.routestoggle").text("Toggle Routes (On)")
				}
			});
	};

	/* Function allows the user to switch back to linegraph with all routes present */
	function clickLineButton() {
		d3.select("button.linetoggle")
			.on("click", function() {
				// route_name to undefined so dotLine 'if' statement won't work
				route_name = undefined;
				years = undefined;

				// remove unnecessary elements
				d3.select(".linegraph").remove();
				d3.select(".focus2").remove();

				// draw the linegraph with all migration routes present 
				createLine(refstreams);

				// hide switch button. Button only necessary when one line in graph
				d3.select("button.linetoggle").style("visibility", "hidden")
			});
	};

	// call above functions
	clickRoutesButton()
	clickLineButton();
};



