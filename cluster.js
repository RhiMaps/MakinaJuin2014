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



  var matLayer = L.geoJson(  ecolesMat, {
    onEachFeature: ecolePopupTxt,
  });
  function ecolePopupTxt(feature, layer) {
      var txt=feature.properties.Ecole+": "+feature.properties.Index;
      layer.bindPopup(txt);
  }

  var clustersLayer = new L.MarkerClusterGroup({
    iconCreateFunction: function(cluster) {
        return new L.DivIcon({ iconSize: L.point(30,30), html: '<img src=\'icon_2024/icon_2024.png\'/>/<b>' + cluster.getChildCount() + '</b>' });
    }
});
  clustersLayer.addLayer( matLayer);


  var baseLayers = {
      "OpenStreetMap": osmLayer
  };

  var overlays = {
    "maternelles": clustersLayer,
  };



  L.control.layers(baseLayers, overlays).setPosition('bottomleft').addTo(map);

}


init();
