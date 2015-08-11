// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

var InfoWindow = new google.maps.InfoWindow({
  content: ''
});

function initialize() {
  // jQuery AJAX call for JSON
  $.getJSON( '/markers/markerlist', function( data ) {
console.log(data);
    // Stick our user data array into a userlist variable in the global object
        markerData = data;
        drawMap();
  });
}

function drawMap() {
  var markers = [];
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoom: 5,
    center: {lat: 39, lng: -98}
  });


  // Create the search box and link it to the UI element.
  var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var searchBox = new google.maps.places.SearchBox(
    /** @type {HTMLInputElement} */(input));

  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }

    // For each place, get the icon, place name, and location.
    markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker from the search
      var marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });

      markers.push(marker);

      bounds.extend(place.geometry.location);
    }

    map.fitBounds(bounds);
  });

//description of Brown marker
  $.each(markerData,function(){
    console.log(this)
    var latLong = new google.maps.LatLng(this.latitude, this.longitude);
    console.log(latLong)
    var collegeName = this.name;
    var contentString = '<div id="content">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<h1 id="firstHeading" class="firstHeading">'+ this.name +'</h1>'+
          '<div id="bodyContent">'+
          '<p><b>'+ this.name +'</b>,</br> '+ this.name +' '+ this.description +
          '</div>'+
          '</div>';

    var marker = new google.maps.Marker({
        position: latLong,
        map: map,
        title: this.name
    });
    google.maps.event.addListener(marker, 'click', function() {
        InfoWindow.close();
        InfoWindow.setContent(contentString);
        InfoWindow.open(map,marker);

        document.getElementById('bookVisit').innerHTML = collegeName;
    });
  });
}

google.maps.event.addDomListener(window, 'load', initialize);



/*
function makeMaker() {
  //ADDING MARKERS
  //DEFINES THE LAT AND LONG OF THE MARKERS POSITION
  var myLatlng = new google.maps.LatLng(42.377003, -71.116660);
  var myLatlngBrown = new google.maps.LatLng(41.826772,-71.402548); //COORDINATES FOR THE BROWN MARKER

  //DEFINES THE CONTENT INSIDE THE POP UP WINDOW
  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Harvard University</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Harvard University</b>, is a private Ivy League research university in' +
      '</br>Cambridge, Massachusetts, established in 1636. Its history, influence' +
      '</br>and wealth have made it one of the most prestigious universities in the world</p>'+
      '<p><a href="http://www.harvard.edu/">'+
      'Harvard University</a> '+
      '(last visited August 9, 2015).</p>'+
      '</div>'+
      '</div>';

var contentStringBrown = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Brown University</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Brown University</b>, is a private Ivy League research university in' +
      '</br>Providence, Rhode Island. Founded in 1764 as "The College in the' +
      '</br>English Colony of Rhode Island and Providence Plantations"</p>'+
      '<p> <a href="https://www.brown.edu/">'+
      'Visit Brown University</a>.</p>'+
      '</div>'+
      '</div>';

  //CREATES THE POP UP WINDOW WHEN THE MARKER IS PRESSED
  var infowindow = new google.maps.InfoWindow({
      content: contentString
  });

  var infowindowBrown = new google.maps.InfoWindow({
    content: contentStringBrown
  })

  //CREATES THE MARKER
  var marker = new google.maps.Marker({
      position: myLatlng, //USES THE DEFINED LAT AND LONG FROM BEFORE
      map: map, //MAP WAS DEFINED AT THE TOP OF THIS FILE
      title: 'Harvard University' //TITLE
  });

  var markerBrown = new google.maps.Marker({
    position: myLatlngBrown,
    map: map,
    title: 'Brown University'
  })

  //EVENT LISTENER FOR WHEN THE MARKER IS CLICKED
  google.maps.event.addListener(marker, 'click', function() { //HARVARD
    infowindowBrown.close();
    infowindow.open(map,marker); //WHEN THE MARKER IS CLICKED OPEN THE WINDOW
  });

  google.maps.event.addListener(markerBrown, 'click', function() { //BROWN
    infowindow.close();
    infowindowBrown.open(map,markerBrown); //WHEN THE MARKER IS CLICKED OPEN THE WINDOW
  });

} */

/*
function initialize() {
  //SEARCH BAR
  var markers = [];
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  center: {lat:39, lng:-98},
  zoom:5
  });

  // Create the search box and link it to the UI element.
  var input = /** @type {HTMLInputElement} *//*(
    document.getElementById('pac-input'));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var searchBox = new google.maps.places.SearchBox(
  /** @type {HTMLInputElement} *//*(input));

  // [START region_getplaces]
  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox, 'places_changed', function() {
  var places = searchBox.getPlaces();

  if (places.length == 0) {
    return;
  }
  for (var i = 0, marker; marker = markers[i]; i++) {
    marker.setMap(null);
  }

  // For each place, get the icon, place name, and location.
  markers = [];
  var bounds = new google.maps.LatLngBounds();
  for (var i = 0, place; place = places[i]; i++) {
    var image = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    // Create a marker for each place from the search
    var marker = new google.maps.Marker({
      map: map,
      icon: image,
      title: place.name,
      position: place.geometry.location
    });

    markers.push(marker);

    bounds.extend(place.geometry.location);
  }

  map.fitBounds(bounds);
  });

  //markerData = [{collegename : 'Harvard University', latitude : 42.377003, longitude : -71.116660,
  //collegedescription : 'Harvard University is a private Ivy League'}, {collegename : 'Brown University',
  //latitude : 41.826772, longitude : -71.402548, collegedescription : 'Brown University is a great school'}];


  //for(var i=0; i < markerData.length; i++){
  $.each(markerData, function(){
    //var data = markerData[i];
    console.log(this)
    var latLong = new google.maps.LatLng(this.latitude, this.longitude);

    var contentString = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h1 id="firstHeading" class="firstHeading">' + this.collegename + '</h1>'+
    '<div id="bodyContent">'+
    '<p>' + this.collegedescription + '</p>' +
    '</div>'+
    '</div>';

    var marker = new google.maps.Marker({
      position: latLong, //USES THE DEFINED LAT AND LONG FROM BEFORE
      map: map, //MAP WAS DEFINED AT THE TOP OF THIS FILE
      title: this.collegename //TITLE
    });

    google.maps.event.addListener(marker, 'click', function() {
      InfoWindow.close();
      InfoWindow.setContent(contentString);
      InfoWindow.open(map,marker);
    });
  });
}
*/
