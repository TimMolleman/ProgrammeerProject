#Design Document
####Tim Molleman

## Diagram van Structuur van de Site
![](doc/webDia.png)

## Uitleg Diagram
Ik zal de diagram uitleggen per html-pagina die er op mijn site zal komen.

### index.html
#### Schets
![](doc/homedesign)
#### Uitleg
Dit is de html-pagina die uiteindelijk de homepagina van de website zal vormen. Ik zal een stukje uitleg over de migratiecrisis in Europa geven op deze pagina, waarna er een automatische slideshow volgt van foto's die gerelateerd zijn aan de migratiecrisis. Voor deze slideshow zal ik een API gebruiken genaamd 'blueberry'. Deze API bestaat uit een javascript file genaamd "jquery.blueberry.js" en een CSS file genaamd "blueberry.css". Om een werkende slideshow te krijgen hoef ik verder in principe geen javascript code toe te voegen behalve:
"<script>
$(window).load(function() {
	$('.blueberry').blueberry();
});
</script>"
In de CSS hoef ik ook niks toe te passen om de slideshow te implementeren. Het enige wat ik nog wel moet doen is in de HTML een class aan te passen naar 'blueberry' om ervoor te zorgen dat de slideshow werkt. Onder de slideshow volgt nog een stukje uitleg volgen over de migratiecrisis.

Vervolgens wil ik een datamap onder deze uitleg geven die gefocust is op Europa. Datamaps is een API die functioneert aan de hand van D3. Deze plaatst een datamap in een svg element. Hiervoor zal ik een apart div element aan moeten maken waarin de svg geplaatst kan worden. Wanneer een gebruiker met de muis over een land zweeft, wil ik dat het land oplicht en een tooltip laat zien met het aantal asielzoekers dat in het gespecificeerde jaar aangekomen is in dat land. Deze functies zal ik moeten toepassen in de javascript file genaamd 'home.js'.
Onder de datamap wil ik een slider plaatsen waarmee een bepaald jaartal gekozen kan worden. Dit moet te doen zijn met het html-element "input". Vervolgens zal ik deze slider nog moeten verbinden aan mijn data, zodat de map update wanneer de slider bewogen wordt. De data die ik voor deze datamap en de barchart wil gebruiken bevat data over het aantal asielzoekers dat ieder Europees land heeft opgenomen voor een aantal jaren (en daarbij ook hoeveel asielzoekers uit welk land kwamen). Deze data - in JSON format opgeslagen in 'migrants.json' - zal ik in  'home.js' verbinden aan de slider en de datamap, zodat de datamap update aan de hand van de slider. De JSON-file moet hier eerst voor ingelezen worden in 'home.js'

Onder de datamap wil ik nog een barchart maken die update wanneer een gebruiker van de website op een land in de datamap klikt. Ook hiervoor zal ik weer een apart div element aan moeten maken in de HTML waarin een svg-element geplaatst wordt. Wanneer een gebruiker op een land klikt in de datamap, wil ik dat de barchart veranderd aan de hand van de data voor dit land. Ik wil namelijk de top 5 landen laten zien waar asielzoekers voor dat land in het gespecificeerde jaar vandaan komen. Hiervoor zal ik standaard Javascript - of eventueel nog de jquery API - moeten gebruiken om de data zo te linken dat er sprake is van correspondentie tussen de datamap en de barchart. Vervolgens moet ik nog D3 gebruiken om ervoor te zorgen dat de barchart zichzelf update wanneer er op een land geklikt wordt en ook wanneer de slider onder de datamap verschoven wordt. Ik zal hiervoor functies en D3 moeten gebruiken in 'home.js'.

### routes.html
#### Schets
![](doc/routesdesign)
#### Uitleg
Dit is de html-pagina die laat zien hoe wat voor immigratieroutes er allemaal opgekomen zijn in de afgelopen jaren. Eerst zal er een stukje tekst volgen dat wat uitleg geeft over de immigratieroutes in Europa. Hierna wil ik wederom een datamap toevoegen. Hier zal weer een apart div element voor nodig zijn, waarin een svg element geplaatst kan worden aan de hand van de datamaps API. Vervolgens wil ik proberen om aan de hand van of cirkels, maar het liefst pijlen, populaire migratieroutes weer te geven op de datamap. Ik zal vaste coördinaten op de svg bepalen om de routes aan te duiden. Met een slider onder de kaart wil ik ervoor zorgen dat de gebruiker wederom kan kiezen welk jaar ze willen bekijken. De groottes van de pijlen/cirkels zullen dan groter of kleiner worden. Deze grootte van de pijlen wordt bepaald aan de hand van hoeveel immigranten een bepaalde route hebben afgelegd. De D3 zal ik toepassen in een javascript bestand genaamd 'routes.js'. Hier zal ik ook de data - dit is andere data dan bij index.html, namelijk refstreams.json - linken aan de slider onder de datamap. Het aantal vluchtelingen per land zal niet zichtbaar zijn in deze datamap en de landen zullen dus ook niet ingekleurd zijn.

### growth.html
#### Schets
![](doc/growthdesign)
#### Uitleg
Dit is de html-pagina die laat zien hoe het totale aantal immigranten dat naar Europa is gekomen/gevlucht is gegroeid de afgelopen paar jaren (2006-2015). Dit gebeurt aan de hand van een simpele lijngrafiek. In 'growth.js' zal ik D3 gebruiken, gekoppeld aan de 'migrants.json' dataset of 'refstreams.json' dataset, om deze lijngrafiek te maken. Als ik nog genoeg tijd over heb aan het einde, wil ik nog een drop-down menu toevoegen aan de lijngrafiek, om het voor gebruikers mogelijk te maken de toename/afname van gebruik van bepaalde immigratieroutes over de jaren 2006-2018 te bekijken. Hiervoor zal ik dan voor elke immigratieroute een lijngrafiek laten zien.

### CSS voor Bovenstaande Html Pagina's
Bovenstaande html pagina's zullen allen verbonden zijn aan een CSS file genaamd 'general.css'. Dit zorgt ervoor dat iedere pagina op de website hetzelfde geformat is. Wellicht zal ik ook nog de bootstrap API gebruiken om bijvoorbeeld mooiere buttons dan de standaard buttons te kunnen toevoegen aan de website (door 'bootstrap.css' aan de html pagina's te verbinden). 

## API'S
Voorlopige lijst:
- D3. Ik ga sowieso D3 moeten gebruiken voor alle visualizaties die ik wil implementeren.
- Blueberry. Maakt het erg makkelijk om mijn beoogde image slideshow toe te voegen aan de homepagina.
- Bootstrap. Wellicht gebruiken om de website mooier te maken dan mogelijk is met standaard CSS.

## Bronnen voor de Data en JSON Formats: 
### migrants.json
Bronnen:
- http://data.un.org/Data.aspx?d=UNHCR&f=indID%3aType-Ref (data aantal vluchtelingen per land van 1975-2013 wereldwijd. Bron: Verenigde Naties)
- http://ec.europa.eu/eurostat/statistics-explained/index.php?title=File:Five_main_citizenships_of_(non-EU)_asylum_applicants,_2014_(number,_rounded_figures)_YB15_II.png&oldid=225318 (number_of_first_time_applicants,_rounded_figures)_YB16.png (data top 5 landen waar het meeste immigranten vandaan komen voor ieder lidland van de EU voor 2014)
- http://ec.europa.eu/eurostat/statistics-explained/index.php/File:Five_main_citizenships_of_(non-EU)_asylum_applicants,_2015_(number_of_first_time_applicants,_rounded_figures)_YB16.png  (number_of_first_time_applicants,_rounded_figures)_YB16.png (data top 5 landen waar het meeste immigranten vandaan komen voor ieder lidland van de EU voor 2015)

Format:
[{"country": "Netherlands", "year": {"2008": {"Algerije": "30", "Botswana": "200", "Syrië": "5400", ...., "Total": "18754"}, "2009": {"Algerije": "30", "Botswana": "200", "Syrië": "5400", ...., "Total": "18754"}}}, {"country": "Germany", "year": {"2008": {"Algerije": "30", "Botswana": "200", "Syrië": "5400", ...., "Total": "18754"}, "2009": {"Algerije": "30", "Botswana": "200", "Syrië": "5400", ...., "Total": "18754"}}}]

## refstreams.json
Bron:
- https://en.wikipedia.org/wiki/European_migrant_crisis (data over het aantal vluchtelingen dat via verschillende ‘vluchtelingenroutes’ binnenkomt. Informatie van 2006 tm 2015. Bron: Frontex/wikipedia)

Format:
[{"route": "Western African Route", "year": {"2008": "9200", "2009": "2250"}}, "route": "Western Mediterranean", "year": {"2008": etcetera}]


