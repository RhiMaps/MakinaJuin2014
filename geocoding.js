var map = L.map('map', {center: [43.6, 1.44], zoom: 13});

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',{
        attribution: 'OSM'
        }).addTo(map);

new L.Control.GeoSearch({
    provider: new L.GeoSearch.Provider.OpenStreetMap()
}).addTo(map);
