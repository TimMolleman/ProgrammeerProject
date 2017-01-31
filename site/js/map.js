/**
 * map.js
 * 
 * Tim Molleman
 *
 * This Javascript file contains two functions that are needed to create a datamap
 * and to update the colors of the countries in the map
 *
 * NOTE: data.js needs to be loaded for the below functions to work
 */

/* Function adds the initial choropleth map to HTML-page */
function createMap(year, migrants)
{
	// find migrants data for current year and create filldata based on this
	var cur_data = currentData(year, migrants),
		dataset = createFillData(cur_data);

	console.log(migrants)
	// create choropleth map
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
	    	if ( !data || data.number == "unknown") return "<div class='popup'><span style='font-weight:bold'>" + geo.properties.name +
                    "</span><br><span>No Data</span></div>";
	    	return "<div class='popup'><span style='font-weight:bold'>" + geo.properties.name +
                    "</span><br><span>No. Asylum Applicants: " + numberWithCommas(data.number) +  "</span></div>";
	    },
	    popupOnHover: true,
	    highlightOnHover: true,
	    highlightFillColor: "orange",
	    highlightBorderWidth: 2
	},
	fills: {
    defaultFill: "#bdbdbd",
    "unknown": "#bdbdbd",
    "< 1": "#eff3ff",
    "1 - 5": '#c6dbef',
    "5 - 15": "#9ecae1",
    "15 - 30": "#6baed6",
    "30 - 60": "#4292c6",
    "60 - 100": "#2171b5",
    "> 100": "#084594"
  	},
  	data: dataset
	});
	
	// add legend to datamap
	createLegend();

	// append
	d3.select("#map").append("button")
		.attr("class", "routestoggle btn btn-default")
		.attr("type", "button")
		.text("Toggle Routes (On)")

	// return the map object
	return basic;
};

/* Function updates the colorfills of countries in the map */
function updateMap (year, migrants)
{
	// find migrants data for current year and create filldata based on this
	var cur_data = currentData(year, migrants),
		dataset = createFillData(cur_data);

	// update colors on map according to map_data
	map.updateChoropleth(dataset);	
};

/* Function is used to create a vertical legend in the datamap */
function createLegend()
{	
	// dataset used for creating custom legend for datamap
    var legend_data = [{label : "unknown", color : "#bdbdbd"}, {label : "< 1", color : "#eff3ff"}, {label : "1 - 5", color : "#c6dbef"}, 
    {label : "5 - 15", color : "#9ecae1"}, {label : "15 - 30", color : "#6baed6"}, {label : "30 - 60", color : "#4292c6"}, 
    {label : "60 - 100", color : "#2171b5"}, {label : "> 100", color : "#084594"}];

    // append rectangle for every data-object in legend_data array
	var legend = d3.select(".datamap").append("g")
		.attr("class", "map-legend")
		.selectAll("rect")
		.data(legend_data)
		.enter()
		.append("g")

	legend.append("rect")
	.attr("width", "20px")
	.attr("height", "20px")
	.attr("x", 20)
	.attr("y", function (d, i) { return 180 + (i * 20); })
	.style("fill", function(d) { return d.color; })

	// also append text for every data-object in legend_data
	legend.append("text")
	.attr("x", 45)
	.attr("y", function(d, i) { return 196 + (i * 20); })
	.text(function(d) { return d.label})

	// add title to legend
	legend.append("text")
	.attr("class", "legend-title")
	.attr("x", 20)
	.attr("y", 360)
	.style("font-size", "11px")
	.html(function() { return "Number of First Time<br> Asylum Applicants (x1000)" })
};