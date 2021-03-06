<html lang="fr-FR" prefix="og: http://ogp.me/ns#"> <!--<![endif]-->
<head>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <meta charset="UTF-8">
   <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />

   <!-- BASIC INFO -->
   <title></></title>
                 <meta name="author" content="Ben Richwood">
                 <meta name="keywords" content="">

   <!-- FAVICONS -->
   <link rel="icon" href="img/flavicon.ico">
   <link rel="apple-touch-icon" href="img/flavicon.ico">

   <!-- GOOGLE FONT
   ================================= -->
   <link href='https://fonts.googleapis.com/css?family=Ubuntu|Roboto+Slab:300|Roboto:400|Play' rel='stylesheet' type='text/css'>

   <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.43.0/mapbox-gl.js'></script>
    <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.43.0/mapbox-gl.css' rel='stylesheet' />
    <link href='./assets/css/watchdogs.css' rel='stylesheet' />

   <!-- **OPEN GRAPH** -->
   <link rel="canonical" href="http://richebois.fr" />
   <meta property="og:locale" content="fr_FR" />
   <meta property="og:type" content="website" />
   <meta property="og:title" content="Richwood | portfolio" />
   <meta property="og:url" content="http://richebois.fr" />
   <meta property="og:site_name" content="Richwood"/>
   <meta property="og:description" content="ctOS" />
   <meta property="og:image" content="http://richebois.fr/img/Richwood-og.png" />
   <meta property="og:image:url" content="http://richebois.fr/img/Richwood-og.png" />
   <meta property="og:image:width" content="1300" />
   <meta property="og:image:height" content="730" />
   <meta property="og:image" content="http://richebois.fr/img/og-image-large.png" />
   <meta property="og:image:url" content="http://richebois.fr/img/og-image-large.png" />
   <meta property="og:image:width" content="1250" />
   <meta property="og:image:height" content="702" />
   <meta property="og:image" content="http://richebois.fr/img/og-image-thumb.png" />
   <meta property="og:image:url" content="http://richebois.fr/img/og-image-thumb.png" />
   <meta property="og:image:width" content="650" />
   <meta property="og:image:height" content="350" />

   <meta name="twitter:card" content="logo" />
   <meta name="twitter:site" content="@richwood" />
   <meta name="twitter:title" content="Richwood" />
   <meta name="twitter:description" content="ctOS" />
   <meta name="twitter:image" content="http://richebois.fr/img/og-image-large.png" />
   <meta name="twitter:url" content="http://richebois.fr" />

   <!-- <script src='https://www.google.com/recaptcha/api.js'></script> -->

  <style>
    #map { position:absolute; top:0; bottom:0; width:100%; height:100%;}
  </style>

</head>

<body class='underground'>

  <div id='map'></div>
  <div id='menu'>
    <!-- <input id='basic' type='radio' name='rtoggle' value='basic' checked='checked'>
    <label for='basic'>Terminal</label>
    <input id='vintage' type='radio' name='rtoggle' value='vintage'>
    <label for='vintage'>Vintage</label>
    <input id='metroplois' type='radio' name='rtoggle' value='metropolis'>
    <label for='metropolis'>Metropolis</label>
    <input id='streets' type='radio' name='rtoggle' value='streets'>
    <label for='streets'>streets</label>
    <input id='bright' type='radio' name='rtoggle' value='bright'> -->
    <button type="button" name="button">MENU</button>
  </div>
  <div id="typeMenu">
    <div class="typeMenu-title"><h2>Type of activity</h2></div>
    <div class="innocentBG">
      <div class="fixedBigImage">
        <div class="typeMapMenu">
          <div class="typeMapMenu-left"><h3>Exploring</h3></div>
          <div class="typeMapMenu-center"><h3>Underground</h3></div>
          <div class="typeMapMenu-right"><h3>Chic</h3></div>
        </div>
      </div>
    </div>
  </div>

  <script>
    const theme = [
      {
        name: 'exploring',
        styleName: 'mapbox://styles/richwood/cjcrz5zbq1tkl2rpdctydxeqf',
      },
      {
        name: 'underground',
        styleName: 'mapbox://styles/richwood/cjd75k94l03342sqa47hokdt3',
      },
      {
        name: 'chic',
        styleName: 'mapbox://styles/richwood/cjcrzuz8m3dd12sms1q0dnit8',
      },
    ];
    const inputs = document.querySelectorAll('div.typeMapMenu > div');
    const menuType = document.querySelector('div#typeMenu');
    const MENU = document.querySelector('div#menu button');
    let currentTheme = 1;

    mapboxgl.accessToken = 'pk.eyJ1IjoicmljaHdvb2QiLCJhIjoiY2lscGJwcjZlMDAzbnk2bTAydDk4bzQ5ayJ9.mkDGtvQvg1SKYi0xanRBXQ';
    var map = new mapboxgl.Map({
      container: 'map',
      style: theme[currentTheme].styleName,
      center: [106.705755,10.738909],
      zoom: 15.8,
      pitch: 45, // pitch in degrees
      bearing: 00, // bearing in degrees
    });

    map.on('load', function () {
      // Add a layer showing the places.
      // var marker = new mapboxgl.Marker()
      //   .setLngLat([106.677349, 10.789749])
      //   .addTo(map);
      // var marker = new mapboxgl.Marker()
      //   .setLngLat([106.677769, 10.796416])
      //   .addTo(map);



      // map.addLayer({
      //     "id": "places",
      //     "type": "symbol",
      //     "source": {
      //         "type": "geojson",
      //         "data": {
      //             "type": "FeatureCollection",
      //             "features": [{
      //               "type": "Feature",
      //               "properties": {
      //                   "description": "<strong>Dalat Corner</strong><p>Pizzeria typique Viet</p>",
      //                   "icon": "star"
      //               },
      //               "geometry": {
      //                   "type": "Point",
      //                   "coordinates": [106.677349, 10.789749],
      //               }
      //             }, {
      //               "type": "Feature",
      //               "properties": {
      //                   "description": "<strong>Truckeroo</strong><p><a href=\"http://www.truckeroodc.com/www/\" target=\"_blank\">Truckeroo</a> brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>",
      //                   "icon": "music"
      //               },
      //               "geometry": {
      //                   "type": "Point",
      //                   "coordinates": [106.677349, 10.789749],
      //               }
      //           }]
      //         }
      //     },
      //     "layout": {
      //         "icon-image": "{icon}-15",
      //         "icon-allow-overlap": true
      //     }
      // });
      // When a click event occurs on a feature in the places layer, open a popup at the
      // location of the feature, with description HTML from its properties.
      // map.on('click', 'places', function (e) {
      //     new mapboxgl.Popup()
      //         .setLngLat(e.features[0].geometry.coordinates)
      //         .setHTML(e.features[0].properties.description)
      //         .addTo(map);
      // });

      map.on('click', function(e) {
        var features = map.queryRenderedFeatures(e.point, {
          layers: ['SU-markers', 'SU-lines', 'SU-polygons'] // replace this with the name of the layer
        });

        if (!features.length) {
          return;
        }

        var feature = features[0];

        var popup = new mapboxgl.Popup({ offset: [0, -15] })
          .setLngLat(feature.geometry.coordinates)
          .setHTML('<h3>' + feature.properties.name + '</h3><p>' + feature.properties.description + '</p><p><small>' + feature.properties.category + '</small></p>')
          .setLngLat(feature.geometry.coordinates)
          .addTo(map);
      });

      // Change the cursor to a pointer when the mouse is over the places layer.
      map.on('mouseenter', 'places', function () {
          map.getCanvas().style.cursor = 'pointer';
      });

      // Change it back to a pointer when it leaves.
      map.on('mouseleave', 'places', function () {
          map.getCanvas().style.cursor = '';
      });
  });

  // Add geolocate control to the map.
  map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
          enableHighAccuracy: true
      },
      trackUserLocation: true
  }));

  for (var i = 0; i < inputs.length; i++) {
    // inputs[i].onclick = switchLayer(i);
    // inputs[i].addEventListener("click", function(){ console.log(i); switchLayer(i); }, {once:false, passive:false});
  }
  MENU.addEventListener("click", function(){ document.querySelector('div#typeMenu').style.display = 'block';}, {once:false, passive:false});

  menuType.addEventListener("click", function(){ document.querySelector('div#typeMenu').style.display = 'none'; }, {once:false, passive:false});

  inputs[0].addEventListener("click", function(){ switchLayer(0); }, {once:false, passive:false});
  inputs[1].addEventListener("click", function(){switchLayer(1); }, {once:false, passive:false});
  inputs[2].addEventListener("click", function(){switchLayer(2); }, {once:false, passive:false});

  function switchLayer(idx) {
      var layerId = theme[idx].styleName;
      if (idx != currentTheme) map.setStyle(layerId);
      document.body.className = theme[idx].name;
      // console.log(theme[idx].name + ' selected');
      document.querySelector('div#typeMenu').style.display = 'none';
      currentTheme = idx;
  }

</script>


</body>
</html>
