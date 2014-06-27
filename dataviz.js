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

  var dvfLayer = L.geoJson(  dvf, {
      pointToLayer: function (feature, latlng) {
          var options = {
              data: { 
                  'data1':feature.properties.data1,
                  'data2':feature.properties.data2,
                  'data3':feature.properties.data3
              },//end data 
              chartOptions: {
                  'data1': {
                      fillColor: '#FF0000',
                      minValue: 0,
                      maxValue: 100,
                      maxHeight: 100,
                      displayText: function(value){
                          return value+'%';
                      },
                  },
                  'data2': {
                      fillColor: '#00FF00',
                      minValue: 0,
                      maxValue: 100,
                      maxHeight: 100,
                      displayText: function(value){
                          return value+'%';
                      },
                  },
                  'data3': {
                      fillColor: '#0000FF',
                      minValue: 0,
                      maxValue: 100,
                      maxHeight: 100,
                      displayText: function(value){
                          return value+'%';
                      },
                  }
              },//end chartOptions
              weight: 1,
              color: '#666',
              opacity: 1
          } // end options
          var barChartMarker = new L.BarChartMarker( latlng, options);
          return barChartMarker;
      } // end pointToLayer callback()
  });
  dvfLayer.addTo(map);




  var baseLayers = {
      "OpenStreetMap": osmLayer
  };

  var overlays = {
    "data viz framework": dvfLayer,
  };



  L.control.layers(baseLayers, overlays).setPosition('bottomleft').addTo(map);

}


init();
