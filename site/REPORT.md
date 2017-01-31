* EindVerslag
***Tim Molleman
** Overzicht Applicatie
In mijn applicatie bied ik gebruikers informatie over - voornamelijk illegale - migratiestromen naar Europese landen vanuit landen buiten Europa. De applicatie bevat informatie van de jaren 2006 tot en met 2016. De eerste html-pagina van de applicatie bevat tekstuele informatie over illegale immigratie naar Europa en het doel van de applicatie. Dit doel wordt verwezenlijkt door drie visualisaties die op de tweede html-pagina beschikbaar zijn. De eerste visualisatie is een datamap die update aan de hand van een timeslider met de jaren 2006-2016 erop. In de datamap kleurt ieder land in aan de hand van hoeveel mensen voor het eerst een asielaanvraag hebben gedaan deze landen in het gekozen jaar. Hiernaast zijn er op de datamap cirkels aanwezig die migratieroutes richting Europa aangeven. De grootte van iedere cirkel wordt bepaald door het aantal illegale grens oversteken dat er via die route gemaakt is naar een Europees land om Europa binnen te komen.

De datamap is verbonden aan twee andere visualisaties. Wanneer een gebruiker op een land klikt waar data over is, verschijnt er ten eerste een barchart die voor het aangeklikte land de top 5 landen van herkomst laat zien van 'first-time' asielaanvragers. Ook het aantal asielaanvragen voor ieder van deze landen van herkomst is hier te zien. De barchart update ook wanneer de timeslider beweegt. Hiernaast is er een lijngrafiek aanwezig die het gebruik van de migratieroutes laat zien van de jaren 2006-2016. Iedere migratieroute wordt weergegeven als een lijn in deze grafiek. Wanneer een gebruiker één van de lijnen aanklikt of een cirkel in de kaart aanklikt, update de lijngrafiek zodat deze alleen nog een lijn laat zien voor de geselecteerde migratieroute.

Naast de slider is er nog een knop aanwezig die het mogelijk maakt om de routes aan of uit te zetten. Ook is er een knop die het voor de gebruiker mogelijk maakt weer alle migratieroutes in de lijngrafiek te weergeven.

## Technisch Design

## Ontwikkeling en Keuzes
Initieel was het mijn plan om in mijn applicatie drie html-pagina's te gebruiken en vier visualisaties toe te passen. Op de eerste pagina ('index.html') zou een datamap komen en daarbij ook de barchart. Deze zouden aan elkaar gelinked zijn zoals beschreven onder het kopje 'Overzicht Applicatie'. De tweede pagina ('routes.html') zou een datamap bevatten met cirkels die migratieroutes zouden weergeven. De derde pagina ('growth.html') zou een lijngrafiek bevatten met een lijn die de groei en daling van illegale migratie naar Europa zou weergeven tussen 2006 en 2016. Een drop-down menu met alle vluchtelingenroutes zou het vervolgens mogelijk maken om eenzelfde lijn te weergeven, maar dan voor een geselecteerde vluchtelingenroute in het menu.

Uiteindelijk is mijn design veel anders geworden. In mijn initiële plan was er namelijk geen sprake van drie gelinkte visualisaties (een vereiste voor de opdracht). Door slechts twee html-pagina's te gebruiken - één voor uitleg en één voor de visualisaties - is de applicatie nu een stuk overzichtelijker en coherenter. 

### Uitdagingen en Oplossingen
####Bargraph
Een probleem dat ik tegenkwam met betrekking tot het implementeren van de barchart, is dat het soms zo was dat er in sommige landen in bepaalde jaren geen top 5 landen van herkomsten van asielaanvragers aanwezig waren. Dit kwam doordat er van sommige landen van herkomst in de top 5 eenzelfde aantal asielaanvragers het aangeklikte land binnengekomen waren. Dit betekent dat het mogelijk was voor een land van herkomst om niet in de bargraph te komen, terwijl uit dit land wel eenzelfde aantal asielzoekers naar het aangeklikte land waren gekomen voor het gegeven jaar. In dit geval werd er vaak maar 1 arbitrair gekozen land van herkomst met dit aantal asielzoekers weergegeven in de bargraph. 

Ik heb ervoor gekozen dat wanneer dit het geval was, alle landen van herkomst met eenzelfde aantal asielzoekers in de barchart weer te geven (dit dus wanneer zij in de top 5 waarden van asielzoekersaantallen stonden). Hierdoor werd er geen arbitraire keuze meer gemaakt met betrekking tot welke landen er geïncludeerd werden. Gezien de bars in mijn barchart eerst een vastgestelde grootte hadden, werd het gehele barchart element al snel veel breder wanneer bovenstaande optreedde. Eerst heb ik dit geprobeerd op te lossen door CSS 'overflow' - waarbij je door de barchart heen kon scrollen - te gebruiken wanneer de barchart te breed werd, maar het bleek uiteindelijk onintuïtief voor gebruikers dat je kon scrollen door de barchart. Ik heb er daarom voor gekozen om de breedtes van de bars te bepalen aan de hand van het aantal landen van herkomst op de x-as. Dit werkt nu goed.

####Lijngrafiek
Bij het implementern van de lijngrafiek kwam ik ook een probleem tegen. Initieel had ik besloten om alleen een lijngrafiek te maken die lijnen liet zien voor iedere vluchtelingenroute. Door een extreme waarde van ongeveer 900.000 illegale grensoversteken in 2015 bij een route viel van vele lijnen echter niet meer goed het verloop af te lezen, aangezien het maximaal aantal illegale grensoversteken per jaar tussen de jaren 2006-2016 voor bijna alle routes onder de 150.000 bleef. Hierdoor werd de onderkant van de lijngrafiek heel 'druk' en onoverzichtelijk. 

Om dit probleem op te lossen heb ik ervoor gekozen de lijngrafiek wel te behouden, maar er ook voor te kiezen dat gebruikers een lijngrafiek konden zien van iedere route op zich door op een route in de eerste lijngrafiek te klikken of door op een cirkel in de kaart te klikken. Door een button konden zij weer terug naar de lijngrafiek met alle vluchtelingenroutes erin.

####Datamap
Ik heb bij het implementeren van de datamap de twee ideeën voor de datamaps in het DESIGN.md document in één datamap samengevoegd. Het enige probleem dat ik hierbij tegenkwam, was dat ik mijn data toch iets anders moest formatten dan ik origineel gedacht had. Om de kaart in te kleuren heb ik de objecten in een array geselecteerd op basis van jaar in plaats van op basis van land op de kaart. Hierdoor was de data veel makkelijker te binden aan de slider. Het dataformat voor het toevoegen van de migratieroute-cirkels heb ik wel praktisch hetzelfde gelaten (per route een object en vervolgens de jaren en waarden). Met een toggle is het mogelijk om de cirkels voor de route uit te schakelen. Ik heb ervoor gekozen om geen bogen te implementeren (zie README.md) in de Datamap. Dit gezien de positie van vele herkomstlanden buiten de 'scope' van de datamap vielen. De kaart was namelijk gecentreerd op Europa.

###





