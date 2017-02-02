'''
Name: Tim Molleman
Doel: Dit script wordt gebruikt om refstreams.csv naar
een json-file om te zetten. Een deel van de json wordt
nog handmatig ingevuld aangezien ik het script niet goed
kreeg.
'''

import csv
import json
jsonfile = open('refstreams.json', 'w')

data = []

def createRefstreams(years, route, number):
    if year not in data:
        data[years] = []
    data[year].append({"route": route, "number": number})

with open('refstreams.csv', 'rU') as file2:
    reader2 = csv.reader(file2)
    next(file2)
    json2 = {}

    years = ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015']

    for year in years:
        json2[year] = []

    for row in reader2:
        for year in years:
            json2[year].append({"route": row[0], "number": ""})

json3 = {'2006': [{'route': 'Western African route', 'number': '31600'}, {'route': 'Western Mediterranean route', 'number': 'N/A'}, {'route': 'Central Mediterranean route', 'number': 'N/A'}, {'route': 'Apulia and Calabria route', 'number': 'N/A'}, {'route': 'Circular Albania Greece route', 'number': 'N/A'}, {'route': 'Western Balkan route', 'number': 'N/A'}, {'route': 'Eastern Mediterranean route', 'number': 'N/A'}, {'route': 'Eastern Borders route', 'number': 'N/A'}, {'route': 'Totals', 'number': 'N/A'}], '2007': [{'route': 'Western African route', 'number': '12500'}, {'route': 'Western Mediterranean route', 'number': 'N/A'}, {'route': 'Central Mediterranean route', 'number': 'N/A'}, {'route': 'Apulia and Calabria route', 'number': 'N/A'}, {'route': 'Circular Albania Greece route', 'number': 'N/A'}, {'route': 'Western Balkan route', 'number': 'N/A'}, {'route': 'Eastern Mediterranean route', 'number': 'N/A'}, {'route': 'Eastern Borders route', 'number': 'N/A'}, {'route': 'Totals', 'number': 'N/A'}], '2015': [{'route': 'Western African route', 'number': '874'}, {'route': 'Western Mediterranean route', 'number': '7164'}, {'route': 'Central Mediterranean route', 'number': '153946'}, {'route': 'Apulia and Calabria route', 'number': '153946'}, {'route': 'Circular Albania Greece route', 'number': '8932'}, {'route': 'Western Balkan route', 'number': '764038'}, {'route': 'Eastern Mediterranean route', 'number': '885386'}, {'route': 'Eastern Borders route', 'number': '1920'}, {'route': 'Totals', 'number': '1822260'}], '2014': [{'route': 'Western African route', 'number': '275'}, {'route': 'Western Mediterranean route', 'number': '7840'}, {'route': 'Central Mediterranean route', 'number': '170760'}, {'route': 'Apulia and Calabria route', 'number': '170760'}, {'route': 'Circular Albania Greece route', 'number': '8840'}, {'route': 'Western Balkan route', 'number': '43360'}, {'route': 'Eastern Mediterranean route', 'number': '50830'}, {'route': 'Eastern Borders route', 'number': '1270'}, {'route': 'Totals', 'number': '283175'}], '2008': [{'route': 'Western African route', 'number': '9200'}, {'route': 'Western Mediterranean route', 'number': '6500'}, {'route': 'Central Mediterranean route', 'number': '39800'}, {'route': 'Apulia and Calabria route', 'number': 'N/A'}, {'route': 'Circular Albania Greece route', 'number': '42000'}, {'route': 'Western Balkan route', 'number': 'N/A'}, {'route': 'Eastern Mediterranean route', 'number': '52300'}, {'route': 'Eastern Borders route', 'number': '1335'}, {'route': 'Totals', 'number': 'N/A'}], '2009': [{'route': 'Western African route', 'number': '2250'}, {'route': 'Western Mediterranean route', 'number': '6650'}, {'route': 'Central Mediterranean route', 'number': '11000'}, {'route': 'Apulia and Calabria route', 'number': '807'}, {'route': 'Circular Albania Greece route', 'number': '40000'}, {'route': 'Western Balkan route', 'number': '3090'}, {'route': 'Eastern Mediterranean route', 'number': '40000'}, {'route': 'Eastern Borders route', 'number': '1050'}, {'route': 'Totals', 'number': '104847'}], '2011': [{'route': 'Western African route', 'number': '340'}, {'route': 'Western Mediterranean route', 'number': '8450'}, {'route': 'Central Mediterranean route', 'number': '64300'}, {'route': 'Apulia and Calabria route', 'number': '5259'}, {'route': 'Circular Albania Greece route', 'number': '5300'}, {'route': 'Western Balkan route', 'number': '4650'}, {'route': 'Eastern Mediterranean route', 'number': '57000'}, {'route': 'Eastern Borders route', 'number': '1050'}, {'route': 'Totals', 'number': '146349'}], '2010': [{'route': 'Western African route', 'number': '200'}, {'route': 'Western Mediterranean route', 'number': '5000'}, {'route': 'Central Mediterranean route', 'number': '4500'}, {'route': 'Apulia and Calabria route', 'number': '2788'}, {'route': 'Circular Albania Greece route', 'number': '35300'}, {'route': 'Western Balkan route', 'number': '2370'}, {'route': 'Eastern Mediterranean route', 'number': '55700'}, {'route': 'Eastern Borders route', 'number': '1050'}, {'route': 'Totals', 'number': '105908'}], '2013': [{'route': 'Western African route', 'number': '250'}, {'route': 'Western Mediterranean route', 'number': '6800'}, {'route': 'Central Mediterranean route', 'number': '40000'}, {'route': 'Apulia and Calabria route', 'number': '5000'}, {'route': 'Circular Albania Greece route', 'number': '8700'}, {'route': 'Western Balkan route', 'number': '19950'}, {'route': 'Eastern Mediterranean route', 'number': '24800'}, {'route': 'Eastern Borders route', 'number': '1300'}, {'route': 'Totals', 'number': '106800'}], '2012': [{'route': 'Western African route', 'number': '170'}, {'route': 'Western Mediterranean route', 'number': '6400'}, {'route': 'Central Mediterranean route', 'number': '15900'}, {'route': 'Apulia and Calabria route', 'number': '4772'}, {'route': 'Circular Albania Greece route', 'number': '5500'}, {'route': 'Western Balkan route', 'number': '6390'}, {'route': 'Eastern Mediterranean route', 'number': '37200'}, {'route': 'Eastern Borders route', 'number': '1600'}, {'route': 'Totals', 'number': '77932'}]}
json.dump(json3, jsonfile)