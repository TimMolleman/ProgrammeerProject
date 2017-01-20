// queue the json-files so they can be loaded in later
d3.queue()
  .defer(d3.json, "../data/migrants.json")
  .defer(d3.json, "../data/refstreams.json")
  .await(analyze);

// define global variables
var cur_year,
	cur_country,
	map;

function drawCircles(refstreams) {
}

// load in the json-files when ready. If there is an error, log error
function analyze(error, migrants, refstreams) {
	if (error) {
		console.log(error);
	}

	console.log(migrants);

	// get the year that corresponds to slide-bar's initial position
	var init_slide = document.getElementById('slider');
	cur_year = init_slide.value;

	// get the initial corresponding map
	map = createMap(cur_year, migrants);

	// initial barchart country (Germany)
	cur_country = 'DEU'

	// initialize default country (Germany) for barchart
	createBarchart(cur_year, migrants);

	// update the map everytime the slider is moved for year on slider
	var slider = document.getElementById("slider")
	slider.addEventListener("mousemove", function() {

		cur_year = slider.value;

		// update barchart for value on the slider 
		createBarchart(cur_year, migrants);

		// update map according to the current year on slider
		updateMap(cur_year, migrants);
	});
	

	map.svg.selectAll('.datamaps-subunit')
		.on('click', function(geography) {
			cur_country = geography.id;
			createBarchart(cur_year, migrants);
		}); 

	createLine(refstreams);

	d3.select(".datamap").append("circle")
		.attr("cx", 230)
		.attr("cy", 372)
		.attr("r", "5px")
		.attr("class", "WestMedi")
		.style("fill", "red")
		.style("opacity", 0.8)

	var coordinates = [ {"route": "Central Mediterranean route", "coordinates": [{"x": 365, "y": 370}]},
						{"route": "Circular Albania Greece route", "coordinates": [{"x": 436, "y": 370}]},
						{"route": "Western Balkan route", "coordinates": [{"x": 430, "y": 284}]},
						{"route": "Eastern Borders route", "coordinates": [{"x": 475, "y": 240}]},
						{"route": "Eastern Mediterranean route", "coordinates": [{"x":480, "y": 340}]}];

	console.log(coordinates);

	d3.select(".datamap").append("circle")
		.attr("cx", 365)
		.attr("cy", 370)
		.attr("r", "5px")
		.attr("class", "CentMedi")
		.style("fill", "red")
		.style("opacity", .8)

	d3.select(".datamap").append("circle")
		.attr("cx", 436)
		.attr("cy", 337)
		.attr("r", "5px")
		.attr("class", "AlbGreece")
		.style("fill", "red")
		.style("opacity", .8)

	d3.select(".datamap").append("circle")
		.attr("cx", 430)
		.attr("cy", 284)
		.attr("r", "5px")
		.attr("class", "WestBalkan")
		.style("fill", "red")
		.style("opacity", .8)

	d3.select(".datamap").append("circle")
		.attr("cx", 475)
		.attr("cy", 240)
		.attr("r", "5px")
		.attr("class", "EastBorders")
		.style("fill", "red")
		.style("opacity", .8)

	d3.select(".datamap").append("circle")
		.attr("cx", 480)
		.attr("cy", 340)
		.attr("r", "5px")
		.attr("class", "EastMedi")
		.style("fill", "red")
		.style("opacity", .8)

}




