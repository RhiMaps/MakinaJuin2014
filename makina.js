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

  var burLayer = L.geoJson( bureaux, {
      style: voteStyle,
    onEachFeature: onVoteFeature
  });
  burLayer.addTo( map);

  function onVoteFeature(feature, layer){
    layer.on('mouseover', function(e){
      legend.update(layer.feature.properties);
    });
  }

  function voteStyle( feature){
      var gagnant = feature.properties.GAGNANT;
      var color;
      switch( gagnant){
          case '0':
              color="red";
              break;
          case '1':
              color="yellow";
              break;
          case '2':
              color="green";
              break;
          default:
              color="lightgrey";
      }
      console.log(gagnant+': '+color);
      var options = {
          color: "grey",
          fillColor: color
      }
      return options;
  }


  var baseLayers = {
    "MapBox": mapqLayer,
    "OSM": osmLayer
  };

  var overlays = {
    "elementaires": elmLayer,
    "maternelles": matLayer,
    "bureaux": burLayer,
  };

  L.control.layers(baseLayers, overlays).setPosition('bottomleft').addTo(map);


  var legend = L.control( { position: 'topright' });

  legend.onAdd = function(map) {
    this._div = new L.DomUtil.create('div', 'info');
    return this._div;
  }

  legend.update = function(bureau){
    this._div.innerHTML = '<b>' + bureau.NOM + '</b> (n°'+ bureau.ASSOCIANT+ ')<br />';
  }

  legend.addTo(map);




}


init();

