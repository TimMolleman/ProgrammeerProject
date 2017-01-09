# Programmeerproject voorstel
## Tim Molleman

##Het Probleem
In Europa is er sinds 2015 sprake van een grote stroom migranten (vaak aangeduid als 'vluchtelingen') - bestaande uit zowel echte vluchtelingen als gelukszoekers die zich voordoen als vluchtelingen - die een nieuw thuis proberen te vinden in Europese landen. Er is zelfs sprake van een ware migratiecrisis. Mede door deze crisis zijn er veel politieke spanningen ontstaan in veel Europese landen.
In mijn applicatie wil ik gebruikers visualizaties aanbieden die voor hen een duidelijker en coherenter beeld kunnen scheppen over bepaalde aspecten van deze migratiecrisis. Hierdoor kunnen zij voor zichzelf een beter beeld krijgen over hoe groot het probleem nou daadwerkelijk is en kunnen zij beter geïnformeerde standpunten innemen over de migratiecrisis.

##Vormgeving en eigenschappen visualizatie(s)
Hoe ga ik deze visualizaties vormgeven? Ik wil een website maken met verschillende pagina's die allen een eigen functie vervullen in het aanbieden van informatie over het migratieprobleem. Hiervoor zal ik waarschijnlijk 3 webpagina's gebruiken, met als titels: 'Home', 'Migration Routes' en 'Migrant Growth'. Ik zal hieronder een schets laten zien voor elke pagina en uitlege geven over deze pagina.

###Home:
![](doc/home.png)

Op de 'Home'-pagina zal ik ten eerste een uitleg geven over de Europese migratiecrisis aan de hand van twee paragrafen. Tussen deze twee paragrafen laat ik nog een automatische slideshow lopen die foto's laat zien die gerelateerd zijn aan de Europese migratiecrisis. Onder deze uitleg zal er vervolgens een datamap aanwezig zijn die is 'gefocust' op Europa. De (Europese) landen op deze kaart zullen ingekleurd zijn met één kleur met verschillende (bijvoorbeeld vijf) tinten. Hierbij zal een lichtere kleurentint betekenen dat een bepaald land minder vluchtelingen heeft opgenomen en een donkerdere kleur zal betekenen dat een bepaald land meer vluchtelingen heeft opgenomen. Mijn idee is om onder de datamap een 'slider' toe te voegen die ervoor zorgt dat gebruikers voor verschillende jaren kunnen kijken hoeveel immigranten ieder Europees land voor het gekozen jaar (op de slider) heeft opgenomen. Dit kan bijvoorbeeld voor de jaren 2000 totenmet 2015, waarbij ieder tussenliggend jaar geselecteerd kan worden op de slider. De kleurentinten van landen op de kaart zullen bij verschuiving van de slider dan veranderen op basis van het aantal immigranten dat landen dat jaar hebben opgenomen. Wanneer de gebruiker met de muis over een land heen gaat, wil ik dat het aantal immigranten dat het land dat jaar heeft opgenomen zichtbaar wordt in een tooltip (en natuurlijk ook de naam van het land). 
Een optie die ik wellicht ook nog wil implementeren is dat het mogelijk is om lijnen/bogen te laten verschijnen wanneer er op een land geklikt wordt (aan de hand van bijvoorbeeld een button). Deze bogen zouden dan van dit land naar een aantal landen (bijv. 5 landen) gaan waar de meeste immigranten vandaan komen die het land heeft opgenomen waarop geklikt is. Wellicht wil ik naast deze bogen dan ook nog het aantal immigranten uit ieder van deze landen melden.

Wanneer er op een land geklikt wordt in de hierboven beschreven datamap wil ik hiernaast dat er onder de datamap een barchart verschijnt die voor dit land (en voor het specifieke jaar) laat zien waar de immigranten die het land heeft opgenomen vandaan komen. Het ligt aan de data of ik hier voor ieder land waar immigranten vandaan komen een barchart laat zien of dat ik alleen data laat zien van bijvoorbeeld de 5 landen waar het grootste aantal immigranten vandaan komen. Als een land bijvoorbeeld immigranten heeft opgenomen uit 40 landen, waarvan uit heel veel van deze landen maar enkele mensen, dan wordt de barchart misschien enigszins onoverzichtelijk.

Bovenaan de 'Home'-pagina zal een header aanwezig zijn die 'fixed' gepositioneerd is en dus meebeweegt over de hele pagina. In deze header zal een titel staan en een navigatiemenu waarmee de gebruiker naar de verschillende pagina's op de website kan navigeren. Deze header is overigens ook aanwezig op de andere pagina's van de website.

###Migration Routes
![](doc/routes.png)

Op de 'Migration Routes'-pagina zal ik eerst een korte uitleg geven over migratieroutes naar Europa. Er zijn namelijk verschillende veelgebruikte routes die immigranten gebruiken om naar Europa te komen. Onder deze uitleg staat wederom een datamap. Deze keer staat er geen informatie over heet aantal immigranten dat ieder land opneemt, maar staat er hoeveel immigranten er via verschillende routes Europa binnenkomen. Deze routes wil ik aangeven aan de hand van cirkels (zie foto) of - als dit mogelijk is - aan de hand van pijlen. De grootte van de cirkels/pijlen geven dan aan hoeveel immigranten er via een bepaalde route Europa binnenkomen. Ook hier wil ik weer een slider toevoegen waarmee de gebruiker een jaar kan kiezen. De cirkels/pijlen zullen voor ieder jaar veranderen van grootte, aan de hand van de hoeveelheid immigranten dat via de verschillende routes Europa binnenkomt.

###Migrant Growth
![](doc/growth.png)

Op de 'Migrant Growth'-pagina zal ik een lijngrafiek toevoegen die laat zien hoeveel immigranten er in totaal in Europa zijn binnengekomen over een spanne van een aantal jaren (wederom, bijvoorbeeld 2000-2015). Ook wil ik aan deze lijn een tooltip toevoegen die het aantal immigranten laat zien voor een bepaald jaar (afhankelijk van muispositie). Wellicht wil ik bij de lijngrafiek ook nog een optie toevoegen die ervoor zorgt dat men over dit aantal jaren kan zien via welke migratieroutes immigranten naar Europa kwamen, door voor iedere immigratieroute een lijn te laten zien.

##Data
Voor de hierboven beschreven visualizaties zal ik waarschijnlijk verschillende datasets nodig hebben. Ik heb sowieso voor ieder Europees land informatie nodig over het totaal aantal immigranten dat dit land heeft opgenomen.Hiernaast heb ik voor ieder land ook informatie nodig over uit welke landen deze immigranten zijn gekomen + de aantallen die uit deze landen. Preferabel heb ik hierover informatie van ongeveer 2000/2005 totenmet 2015 (en het liefst zelfs 2016). Hiernaast zal ik ook een dataset nodig hebben die informatie bevat over het aantal immigranten dat via verschillende routes Europa binnenkomt. Deze informatie heb ik vooral nodig van de laatste jaren, aangezien de migrantencrisis voornamelijk in de laatste jaren is ontstaan. Alle data wil ik in JSON format zetten door Python te gebruiken. Vervolgens wil ik deze JSON data inladen in een javascript bestand. JSON maakt het in Javascript makkelijk om met de data te werken.

##API'S?
Op dit moment weet ik nog niet wat voor API'S ik allemaal nodig ga hebben. Ik weet alleen dat ik D3 zal moeten gebruiken voor de datamaps en dat ik D3 ook zal gebruiken voor de andere beoogde visualizaties in mijn project. Ook heb ik gezien dat er API'S zijn die het mogelijk maken om makkelijk een automatische slideshow (zie 'Home'-pagina stukje) te implementeren. Hier zal ik dus ook naar zoeken. 

##Mogelijke Technische Problemen
Ik heb op dit moment ook nog nauwelijks oog op wat voor technische problemen ik wellicht tegen ga komen tijdens dit project. In principe ben ik al bekend met datamaps en heb ik al eens lijngrafieken en barcharts gemaakt. Ik heb echter nog nooit een slider toegepast op een datamap, bogen toegevoegd aan een datamap en cirkels/pijlen toegevoegd aan een datamap. Deze dingen zouden dus nog wel even pittig kunnen worden voor mij.

##Minimum Viable Product
Enkele dingen zou ik echter pas later kunnen proberen toe te passen, als blijkt dat ik nog genoeg tijd heb. 
Daarvoor wil ik sowieso de volgende dingen goed werkend hebben (MVP):
- Barchart en datamap op de home pagina interacteren naar behoren.
- De sliders voor de datamaps op zowel de home pagina als de migration routes pagina functioneren naar behoren.
- De datamap op de migration routes pagina is compleet (waarschijnlijk met cirkels, wellicht pijlen).
- De lijngrafiek op de migrant growth pagina laat groei van immigranten in Europa zien in één lijn
- Layout van de gehele site is naar behoren

Dingen die ik nog zou kunnen toevoegen als er tijd is (optioneel):
- In de barchart op de homepagina bogen die aangeven uit welke (top 5) landen immigranten komen voor een land waarop geklikt wordt. Wellicht nog het aantal immigranten dat uit deze landen komt ernaast.
- In de lijngrafiek op de migrant growth pagina een drop-down menu toevoegen, zodat de gebruiker meerdere lijnen te zien krijgt voor het gebruik van de verschillende migratieroutes in Europa door immigranten, over de jaren heen.
- Wellicht sla ik ofwel de tweede datamap, ofwel de lijngrafiek over, wanneer blijkt dat dit onhaalbaar is. Ik kan dit op het moment voor mezelf nog niet heel goed inschatten.




