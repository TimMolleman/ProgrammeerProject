/**
 * data.js
 * 
 * Tim Molleman
 *
 * This Javascript file contains all functions that have anything to do with manipulating the data stored 
 * in the refugees.json and migrants.json files (in 'data' folder) and with manipulating data in general.
 * (exclusions are data manipulations for the barchart: Those are stored in 'bar.js')
 *
 * NOTE: data.js has to be loaded first
 */

/* 
 * Safe data for a country that was clicked on in a variable and return. It should be used
 * on the 'migrants' array.
 */
function findCountry(current_data, current_country) {
	var country_data;

	// loop until the right country is found and safe in variable
	for (i = 0; i < current_data.countries.length; i++)
	{
		if (current_data.countries[i].code == current_country)
		{
			country_data = current_data.countries[i];
		}
	}
	return country_data;
};

/* Function finds route that is clicked on in the datamap. */
function findRoute(refstreams, current_route) {
	for (i = 0; i < refstreams.length; i++) 
	{
		if (refstreams[i].route == current_route)
		{
			return refstreams[i];
		}
	}
};

/* 
 * This function is used for determining the fillkey for a given country. 'Total' is the total 
 * amount of refugees that entered a country in a given year.
 */
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

/* 
 * This function is used to determine the radius of refugee stream
 * circles on the datamap. A range of radiuses is defined based on
 * the number of refugees that used a route.
 */
function getRadius(refugee_count) {
	if (refugee_count < 1000)
	{
	    return 3 + "px"
	}
	else if (refugee_count >= 1000 && refugee_count < 5000)
	{
	    return 4 + "px"
	}
	else if (refugee_count >= 5000 && refugee_count < 30000)
	{
	    return 7 + "px"
	}
	else if (refugee_count >= 30000 && refugee_count < 50000)
	{
	    return 12 + "px"
	}
	else if (refugee_count >= 50000 && refugee_count < 100000)
	{
	    return 16 + "px"
	}
	else if (refugee_count >= 100000 && refugee_count < 500000)
	{
	    return 22 + "px"
	}
	else 
	{
		return 32 + "px"
	}
};

/* Function returns data in 'migrants' dataset for a given year */
function currentData (year, migrants) {
	
	var data;

	// loop over migrants until right year is found and safe data for year
	for (i = 0; i < migrants.length; i++)
	{
		if (migrants[i].year == year)
		{
			data = migrants[i];
		}
	}
	return data;
};

/* 
 * This function is used to create dataset that has the format 
 * required by a datamap to determine colors of countries in the datamap. 
 * Above two functions are necessary to use this function 
 */
function createFillData(current_data) {
	map_data = {};

	// for each country, calculate the total amount of refugees and safe 
	current_data.countries.forEach(function(item) {
	var total = 0,
		country_code = item['code'];
	item.refugees.forEach(function(item2) {
		total = total + Number(item2.number);
	});

	// determine the fillkey for the current country
	var key = getFillKey(total)

	// add an object to the map_data variable for current country
	map_data[country_code] = {number: total, fillKey: key};
	});

	return map_data;
};

/* 
 * This function transforms the refstreams dataset to a second dataset. This
 * second dataset is used to draw the linegraph and is used to draw the circles for
 * migration routes on the map.
 */ 
function transformRefstreams(refstreams)
{
	var data = []

	var coordinates = [ {"route": "Western African route", "cors": {"x":110, "y": 480}},
				{"route": "Western Mediterranean route", "cors": {"x":230, "y": 372}},
				{"route": "Central Mediterranean route", "cors": {"x": 365, "y": 370}},
				{"route": "Apulia and Calabria route", "cors": {"x": 365, "y": 370}},
				{"route": "Circular Albania Greece route", "cors": {"x": 436, "y": 335}},
				{"route": "Western Balkan route", "cors": {"x": 430, "y": 284}},
				{"route": "Eastern Mediterranean route", "cors": {"x":480, "y": 340}},
				{"route": "Eastern Borders route", "cors": {"x": 475, "y": 240}}
				];

	// loop over each object in refstreams data (sorted by years)
	for (i = 0; i < refstreams.length; i++)
	{
		// loop over all the routes that are in current year
		for (j = 0; j < refstreams[i].routes.length; j++)
		{	
			// safe current route in a variable and also the corresponding number of refugees
			var cur_route = refstreams[i].routes[j].route,
				cur_number = refstreams[i].routes[j].number,
				cor_data;

			// find the right coördinates for circle on map and safe them
			for (l = 0; l < coordinates.length; l++)
			{
				if (coordinates[l].route == cur_route)
				{
					cor_data = coordinates[l].cors;
				}
			}

			// add routes as objects to 'data'. 'data' dataset is sorted by routes
			if (i == 0)
			{
				if (cur_route != "Totals")
				{
					if (cur_number != "N/A")
					{
						data.push({"route": cur_route, "coordinates": cor_data,
							"years": [{"year": refstreams[i].year, "number": Number(cur_number)}]});
					}
					else
					{
						data.push({"route": cur_route, "coordinates": cor_data, "years": []});
					}
				}
			}
			else 
			{
				// if route already in 'data': Add year and number of refugees to route object
				for (k = 0; k < data.length; k++)
				{
					if (cur_route == data[k].route)
					{
						if (cur_number != "N/A" && cur_route != "Totals")
						{
							data[k].years.push({"year": refstreams[i].year, "number": Number(cur_number)});
						}
					}
				}	
			}
		}
	}
	return data;
};

/* Function that returns an integers with commas after every 3 numbers */
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

 