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
	    	if ( !data ) return "<div class='popup'><span style='font-weight:bold'>" + geo.properties.name +
                    "</span><br><span>No Data</span></div>";
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
  	data: dataset
	});
	
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
	map.updateChoropleth(map_data);
};