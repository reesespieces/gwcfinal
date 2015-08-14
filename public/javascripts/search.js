// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

var InfoWindow = new google.maps.InfoWindow({ //INFO WINDOW HAS NO CONTENT
  content: ''
});

function initialize() { //INTITAL FUNCTION
  // jQuery AJAX call for JSON
  $.getJSON( '/markers/markerlist', function( data ) { //GRABS THE DATA FROM THE ROUTE MARKERLIST (AKA THE DATA)
      //console.log(data);
      // Stick our user data array into a userlist variable in the global object
        markerData = data; //CREATES A VARIABLE (MARKERDATA) EQUAL TO THE DATA
        drawMap(); //CALLS ON THE FUNCTION DRAW MAP TO DRAW THE MAP
  });
}

function drawMap() { //DRAWS THE GOOGLE MAP
  var markers = [];
  var map = new google.maps.Map(document.getElementById('map-canvas'), { //CREATES THE MAP IN THE DIV WITH THE ID MAP-CANVAS
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoom: 5,
    center: {lat: 39, lng: -98} //SETS THE INTIAL LAT AND LONG
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
    //console.log(this)
    //console.log(this.dates);
    //alert(x);
    var latLong = new google.maps.LatLng(this.latitude, this.longitude);
    //console.log(latLong)

    //CREATES A VARIABLE COLLEGENAME AND SETS THE HEADER TO BE EQUAL TO THE NAME OF THE DATA ID
    var collegeName = '<h4 class="center">' + this.name + '</h4>' + '<p class="flow-text">Book Your Tour</p>' +
    '<input id="calendar" type="text" class="center" style="float:left;width:25%;" placeholder="Pick Your Date"></input>';

    var tourDates = [];
    for(var i = 0; i < this.dates.length; i++){ //this.dates[0].date;
      var dates = this.dates[i].date;
      tourDates.push(dates);
    }

    var tourTimes = [];
    for(var i = 0; i < this.dates.length; i++){ //this.dates[0].date;
      //for(var j = 0; j < this.dates[i].times.length; j++){
        var date = this.dates[i].date;
        var times = this.dates[i].times; //var times = this.dates[i].times[i];
        tourTimes.push({'date' : date, 'times' : times});
        //console.log("Date: ", date);
      //}
    }
    console.log("Date and Time: ",tourTimes);
    //console.log(this.dates[0].date);

    var contentString = '<div id="content">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<div id="bodyContent">'+
          '<p><b>'+ this.name +'</b>,</br> '+ this.name +' '+ this.description +
          '</div>'+
          '</div>';

    //CREATES THE MARKER
    var marker = new google.maps.Marker({
        position: latLong, //SETS THE LAT AND LONG
        map: map,
        title: this.name, //SETS THE TITLE EQUAL TO THE NAME
        //var availableDates = this.dates[0].date[0]
    });

    //var calendar = $(function() {$( "#calendar" ).datepicker();});
    google.maps.event.addListener(marker, 'click', function() { //WHEN THE MARKER IS CLICKED, THEN DISPLAY THE INFO WINDOW
        InfoWindow.close();
        InfoWindow.setContent(contentString);
        InfoWindow.open(map,marker);

        document.getElementById('bookVisit').innerHTML = collegeName; //GRABS THE DIV WITH THE ID OF BOOKVISIT AND SETS IT EQUAL TO THE VARIABLE COLLEGENAME

        function available(date){ //CREATES THE FUNCTION THAT TAKES THE PARAMETER DATE
          dmy = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear(); //CREATES A VARIABLE THAT RETURNS DATE LIKE: DD-MM-YYYY
          //console.log(dmy);
          //console.log(tourDates);

          if ($.inArray(dmy, tourDates) != -1) { //IS IT IN THE ARRAY? -- $.inArray(dmy, tourDates) != -1
            return [true, "", "Available"]; //DATE IS AVAILABLE

            //var timeVisit = '</br></br></br><form action="#"><input id="time' + tourTimes + '" type="radio"><label for="time' + tourTimes + '">' + tourTimes + '</label>'
            //document.getElementById('bookTime').innerHTML = timeVisit;
          } else {
            return [false,"","unAvailable"]; //DATE IS UNAVAILABLE
          }
        }

        $('#calendar').datepicker({
          beforeShowDay : available, //SHOW AVAILABLE DATES
          onSelect : function(selected,evnt) { //ON THE AVAILABLE DATES
              var timeVisit = '</br></br></br><form action="#">';
              for(var i = 0; i < tourTimes.length; i++){
                //CHECKS TO SEE IF THE VALUE OF THE SELECTED DATE EQUALS THE VALUE OF THE DATE
                if(new Date(selected).valueOf() == new Date(tourTimes[i].date).valueOf()){

                  for(var j = 0; j < tourTimes[i].times.length; j++){
                    timeVisit += '<input id="time' + tourTimes[i].times[j] + '" type="radio"><label for="time' + tourTimes[i].times[j] + '">' + tourTimes[i].times[j] + '</label></br>'
                    console.log("Time Visit :", timeVisit);
                    timeVisit += '</form>';
                  }
                }
              }
              $('#bookTime').html(
                timeVisit + '<button type="submit" class="btn waves-effect waves-light" name="action">Book Your Tour</button>'
              );
          }
        });

    });
  });
}

google.maps.event.addDomListener(window, 'load', initialize); //WHEN THE WINDOW LOADS, CALL ON THE INITIALIZE FUNCTION
