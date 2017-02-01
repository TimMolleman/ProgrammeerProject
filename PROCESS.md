# day 3 
- Ik heb vandaag het design document afgemaakt en beter nagedacht over de aspecten van mijn website en visualisaties. Schetsen:
![](doc/homedesign.jpg)
![](doc/routesdesign.jpg)
![](doc/growthdesign.jpg)
- Ik heb alvast een layout gemaakt voor de site waarop de visualisaties zullen staan.
- Ik heb alle data voor eerste dataset samengevoegd zodat ik er vervolgens een JSON object mee kan maken op dag 4.

# day 4
- Tweede dataset van Wikipedia gehaald en in een csv bestand gezet.
- JSON file gemaakt van de eerste dataset met handige structuur voor het werken in d3 met behulp van Python.
- Prototype afgemaakt van de website met behulp van CSS en HTML.
- JSON file gemaakt van de tweede dataset die ik wil gebruiken voor d3.

# day 5
- Datamap laten inzoomen op Europa
- Over alternatieve visualisaties nagedacht (op dit moment heb ik geen 3 visualisaties die gelinked zijn aan elkaar)
- Geprobeerd mijn JSON beter te formatten om te kunnen gebruiken met d3 (dit is mij vandaag niet gelukt en snap niet hoe ik het moet doen)

# weekend
- Dataset was niet goed voor mijn doeleinden (verkeerde definitie van vluchtelingen werd gehanteerd). Geprobeerd om juiste data te vinden. Jusite data gevonden. Ik ben er echter nog niet geslaagd om deze data in juiste JSON-format te zetten. De dataset bevat data over asielzoekers van 2006 totenmet 2016.

# day 6 (16 januari 2017)
- Dataset die ik in het weekend gevonden heb in juiste JSON-format gezet.
- Aan de hand van deze dataset tweede dataset gestructureerd die gebruikt kan worden voor het inkleuren van de datamap.
- Deze tweede dataset verbonden aan de datamap. Ook de slider heb ik al werkend gemaakt: Kleuren in de kaart worden geupdated aan de hand van het jaar dat op de slider gekozen is.
- Begin gemaakt aan het implementeren van de barchart.

# day 7
- Ik was ziek dus heb niet veel kunnen doen.
- Wel barchart weten te laten verschijnen wanneer er op een land geklikt wordt met info over de 5 meeste landen waar vluchtelingen vandaan kwamen voor het land waarop geklikt is. Tot nu toe alleen voor 1 jaar gelukt.
- Morgen zorgen dat dit mogelijk is voor elk jaar in de dataset.

# day 8
- Het is nu mogelijk om bij elk jaar op de slider op het land te klikken wat je wilt, waarna er een barchart verschijnt met info over het land voor het gegeven jaar. De barchart verandert vervolgens ook mee wanneer de slider verschoven wordt. Basisfunctionaliteit van de barchart is dus aanwezig.
- refstreams.json omgevormd zodat deze beter gebruikt kan worden voor het maken van lijngrafiek.
- Opzet gemaakt voor lijngrafiek. Hierin komt een lijn te staan voor iedere vluchtelingenroute. Deze lijnen geven weer in welke mate het gebruik van deze routes is toe/afgenomen in de jaren 2006-2015).
- Morgen proberen lijngrafiek af te maken. Wanneer tijd over: cirkeles voor vluchtelingenroutes toevoegen aan datamap.

# day 9 (20 januari 2017)
- Lijnen toegevoegd aan de lijngrafiek voor iedere vluchtelingenroute. Essentie van lijngrafiek dus aan voldaan.
- Stippen toegevoegd aan datamap die gebaseerd zijn op de vluchtelingenroutes.
- Morgen vooral werken aan structuur van folders en files die behoren tot de website. Voor de rest denk ik kleine dingetjes opknappen (wellicht al verder met lijngrafiek en stippen op kaart)

# day 10 (21 januari 2017)
- Structuur aangebracht in mijn folders en files. 
- Javascript functies die veel met elkaar te maken hebben bij elkaar in js-files geplaatst. Hierdoor
is de code voor mij nu een stuk overzichtelijker (immers, niet alles meer in één js-file).
- Veel comments toegevoegd bij de code waar dit nodig was.

# weekend
- Vooral gekeken naar alternatieve manier hoe ik mijn visualisaties wil binden. Ik wil nu dat wanneer een gebruiker op een vluchtelingenroute klikt (aangegeven met cirkels), dat er een lijngrafiek verschijnt naast de barchart die een lijn laat zien hoeveel het gebruik van deze vluchtelingenroute is toegenomen door de jaren heen.

# day 11 (23 januari 2017)
- Geslaagd om cirkels te implementeren in de datamap die de vluchtelingenroutes richting Europa aangeven. Eerst wilde ik dat deze cirkels een maximale radius van 30 pixels zouden hebben. De radius - dus de grootte van de cirkel - zou worden bepaald door het aantal vluchtelingen dat een route nam in een gegeven jaar. Om dit te bereiken deelde ik de grootste waarde in de refstreams data (885386) door 29513. Hierdoor was de grootste cirkel namelijk om en nabij 30px in radius. Echter bleek dat veel cirkels niet gezien konden worden omdat ze extreem kleine waardes hadden ten opzichte van deze grootste waarde. Ik heb daarom gekozen om vaste ranges aan vluchtelingenaantallen die een route namen vast te stellen om de grootte van de cirkels te bepalen. Dit werkt nu goed.
- Hiernaast een toggle-button geïmplementeerd waarmee de cirkels 'aan' en 'uit' gezet kunnen worden. Het is namelijk zo dat de kaart onoverzichtelijk kan worden voor gebruikers die slechts geïnteresseerd zijn in het aantal vluchtelingen dat landen heeft bereikt in bepaalde jaren, wanneer er ook nog cirkels zijn die informatie geven over de vluchtelingenstromen.
- Bug gefixt die er voorheen voor zorgde dat wanneer er een land werd aangeklikt waar geen data over bekend was met betrekking tot vluchtelingen, de barchart niet meer meer update aan de hand van de slider. Nu blijft het land gelijk aan het land waarvan de barchart al gemaakt was en update deze wanneer de slider bewogen wordt naar een ander jaar.
- Begin gemaakt aan het omvormen van mijn lijngrafiek. De reden dat ik slechts één lijn in de grafiek wil is dat de grafiek ongelofelijk lelijk en onoverzichtelijk was doordat er 8 lijnen doorheen liepen. Hiernaast zorgde de grootste waarde (885386) ervoor dat de maximale waarde op de y-as heel hoog was, terwijl de meeste vluchtelingenroutes slechts door een aanzienlijk kleiner aantal mensen gebruikt werden (de meesten kwamen niet boven de 50000 uit). Dit maakte de onderkant van de grafiek al helemaal onoverzichelijk. Het lijkt mij dus beter dat mensen kunnen kiezen welke route zij willen bekijken in de grafiek. Dit is een stuk overzichtelijker.
- Morgen verder met het omvormen van lijngrafiek. Hiernaast een bug fixen die ervoor zorgt dat Italië ingekleurd blijft in de jaren 2006-2008, terwijl er helemaal geen informatie is over die land in deze jaren. Ook de barchart heeft hier onder te lijden.

# day 12 (24 januari 2017)
- Lijngrafiek omgevormd zodat er een lijngrafiek verschijnt wanneer er op een route geklikt wordt in de kaart. Wanneer de muis in de lijngrafiek is wordt de lijn dikker, verandert de kleur en verschijnt er een tooltip die data laat zien voor het dichtsbijzijnde datapunt op de lijn ten opzichte van de muis. Ook de cirkel verandert van kleur waardoor de gebruiker kan zien over welke cirkel de lijngrafiek informatie geeft.
- Bug met Italië nog niet gefixt. Ik wil eerst nog de laatste puntjes op de visualisaties zetten. Morgen zorgen dat er een tooltip met info verschijnt in de lijngrafiek wanneer de jaarslider verschoven wordt. Ook nog wat dingen bij de barchart fixen.

# day 13 (25 januari 2017)
- Laatste puntjes op visualisaties gezet. Er verschijnt nu linksbovenin bij de linechart informatie over het huidige jaar en het aantal vluchtelingen dat de route genomen heeft. Dit gebeurt zowel wanneer de gebruiker de tooltip in de lijngrafiek met zijn muis beweegt, als wanneer deze de time slider aanpast. Hiernaast is er nu ook een crosshair in de lijngrafiek. Ook licht de route die de gebruiker op het moment geselecteerd heeft kort op wanneer deze de slider beweegt: Hierdoor heeft de gebruiker een reminder die hem/haar eraan herinnert welke route er gekozen is (en dus in de lijngrafiek staat). Ook licht de route op wanneer een gebruiker zijn/haar muis over de lijngrafiek heeft.
- Vanaf morgen vooral bugs fixen en de html en CSS in orde krijgen. Functionaliteit praktisch af.

# day 14 (26 januari 2017)
- Lijngrafiek toch nog aangepast. Je ziet nu initieel een lijngrafiek met alle vluchtelingenroutes erop. Wanneer je op een route in de kaart klikt of één van de lijnen in deze lijngrafiek, wordt de lijngrafiek verwijdert en verschijnt er een nieuwe lijngrafiek waarin maar één lijn verschijnt voor de route waarop geklikt is. Met een button is het vervolgens mogelijk om terug te gaan naar de grafiek met alle vluchtelingenroutes erin. Voor de rest titels en labels aan de assen toegevoegd aan de lijngrafieken.
- De route blijft nu opgelicht wanneer de slider bewogen heeft: Zo weet de gebruiker altijd om welk jaar het gaat.
- Begin gemaakt aan een probleem oplossen met de bargraph. Het is namelijk zo dat er landen zijn waar vluchtelingenaantallen van bepaalde herkomsten gelijk zijn aan elkaar. In dit geval verschijnen er meer dan 5 bars op de bargraph. Dit zorgt er weer voor dat de bargraph breder wordt dan normaal. Ik wil ervoor zorgen dat het mogelijk is om te scrollen wanneer dit het geval is. Dit is gelukt, maar de titel en y-as bewegen vooralsnog niet mee als er gescrolled wordt. Dit wil ik wel.
- Morgen dus met de bagraph verder en ook bugs oplossen. Functionaliteit nu af.

# day 15 (27 januari 2017)
- Van het idee afgestapt dat ik de mogelijkheid tot scrollen aan de bargraph wil toevoegen. Aan de hand van feedback besloten dat ik nu gewoon de bars kleiner ga maken wanneer er meer dan 5 bars zijn. Dit is mij gelukt. Vanaf nu bugs fixen en vooral CSS om pagina er beter uit te laten zien.

# weekend
- Niet veel kunnen doen

# day 16 (30 januari 2017)
- Laout van de pagina zoals ik hem ongeveer wil hebben. Timeslider ook mooier gemaakt en buttons op goede plaats gezet.

# day 17 (31 januari 2017)
- Gewerkt aan het verslag.

# day 18 (1 februari 2017)
- Begonnen met all benodigde comments toevoegen aan code en verslag afgemaakt. Voor de rest begonnen met het overzichtelijker maken van de code.
