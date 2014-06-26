var z=13;
var myLL= L.latLng(43.59, 1.45);

function init(){


  // create a map in the "map" div, set the view to a given place and zoom
    var map = L.map('map', {
      center:myLL,
      zoom:z});

  // add an OpenStreetMap tile layer
  var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'OpenStreetMap'
      });
  osmLayer.addTo(map);
  var mapqLayer = L.tileLayer('http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
      attribution: 'MapQuest OpenStreetMap',
      subdomains: ['otile1','otile2','otile3','otile4']
      });
  mapqLayer.addTo(map);

  //      .openPopup();
  var mark1 = L.marker([ 43.59, 1.45]).bindPopup('mark1');
  var mark2 = L.marker([ 43.49, 1.55]).bindPopup('mark2');
  var mark3 = L.marker([ 43.39, 1.65]).bindPopup('mark3');
  var mark4 = L.marker([ 43.29, 1.75]).bindPopup('mark4');
  var markGroup = L.layerGroup( [mark1,mark2,mark3,mark4]);



  var elmOptions = {
      radius: 8,
      fillColor: "red",
      color: "black",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
  };
  var matOptions = {
      radius: 8,
      fillColor: "yellow",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
  };

  var elmLayer = L.geoJson(  ecolesElm, {
      pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, elmOptions);
      },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.Ecole);
    }
  });

  var matLayer = L.geoJson(  ecolesMat, {
      pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, matOptions);
      },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.Ecole);
    }
  });

  var geofLayer = L.tileLayer.wms("https://api.geofoncier.fr:443/referentielsoge/ogc/wxs?SERVICE=WMS",{
      layers: 'DOSSIERS_FXX',
      format: 'image/png',
      transparent: true,
      attribution: 'geofoncier'
      });

  var baseLayers = {
    "MapBox": mapqLayer,
    "OSM": osmLayer
  };

  var overlays = {
    "elementaires": elmLayer,
    "maternelles": matLayer,
    "geofoncier": geofLayer,
    "marqueurs": markGroup,
  };

  L.control.layers(baseLayers, overlays).addTo(map);




}


init();

