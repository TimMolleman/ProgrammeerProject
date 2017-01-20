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
 * This function is used for determining the fillkey for a given country. 'Total' is the total 
 * amount of refugees that entered a country in a given year 
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
 * second dataset is used to draw the linegraph 
 */ 
function transformRefstreams(refstreams)
{
	var data = []

	// transform dataset so that it can be used to create lines on graph
	for (i = 0; i < refstreams.length; i++)
	{
		for (j = 0; j < refstreams[i].routes.length; j++)
		{
			if (i == 0)
			{
				if (refstreams[i].routes[j].route != "Totals")
				{
					if (refstreams[i].routes[j].number != "N/A")
					{
						data.push({"route": refstreams[i].routes[j].route, "years": [{"year": refstreams[i].year, "number": Number(refstreams[i].routes[j].number)}]});
					}
					else
					{
						data.push({"route": refstreams[i].routes[j].route, "years": []});
					}
				}
			}
			else 
			{
				for (k = 0; k < data.length; k++)
				{
					if (refstreams[i].routes[j].route == data[k].route)
					{
						if (refstreams[i].routes[j].number != "N/A" && refstreams[i].routes[j].route != "Totals")
						{
							data[k].years.push({"year": refstreams[i].year, "number": Number(refstreams[i].routes[j].number)});
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

 