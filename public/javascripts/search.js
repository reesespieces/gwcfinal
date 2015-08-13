// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

var InfoWindow = new google.maps.InfoWindow({ //INFO WINDOW HAS NO CONTENT
  content: ''
});

function initialize() { //INTITAL FUNCTION
  // jQuery AJAX call for JSON
  $.getJSON( '/markers/markerlist', function( data ) { //GRABS THE DATA FROM THE ROUTE MARKERLIST (AKA THE DATA)
      console.log(data);
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
    console.log(latLong)

    //CREATES AN ARRAY OF AVAILABLE TIMES FOR TOURS FOR RESPECTIVE COLLEGES
    //COLLEGES = [{'NAME':'HARVARD',...,'DATES':[{DATE: '8/15/15', TIMES:[10, 11, 1]}, {'DATE':...}]}]
    //CREATES THE CONTENT IN THE INFO WINDOW BASED ON THE COLLEGE INFO
    //var availableDates = ["9-8-2015", "14-8-2015", "15-8-2015"];
    if (this.name=="Brown University"){ //BROWN
      var availableDates = ["24-8-2015", "27-8-2015", "15-8-2015"];
      var availableTimes = ["10:00", "12:30", "3:30", "4:00"];
    } else if (this.name=="Harvard University"){ //HARVARD
      var availableDates = ["22-8-2015", "21-8-2015", "28-8-2015"];
      var availableTimes = ["11:30", "1:00", "2:30"];
    } else if (this.name=="University of Texas at Austin"){ //U TEXAS
      var availableDates = ["31-8-2015", "15-8-2015", "20-8-2015"];
      var availableTimes = ["9:00", "10:30", "1:30", "3:30"];
    } else { //MICHIGAN
      var availableDates = ["26-8-2015", "27-8-2015", "24-8-2015"];
      var availableTimes = ["10:00", "12:30", "3:30", "4:00"];
    }
    //CREATES A VARIABLE COLLEGENAME AND SETS THE HEADER TO BE EQUAL TO THE NAME OF THE DATA ID
    var collegeName = '<h4 class="center">' + this.name + '</h4>' + '<p class="flow-text">Book Your Tour</p>' +
    '<input id="calendar" type="text" class="center" style="float:left;width:25%;" placeholder="Pick Your Date"></input>';


    /*for(var i = 0; i < db.collegelist.length; i ++){
      db.collegelist.find({"name" : 1});
    }*/

    //var availableDates = this.dates[0].date[0];

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
        //document.getElementById('calendar').innerHTML = calendar;
        /*$(function() {
          $( "#calendar" ).datepicker(); //CREATES THE CALENDAR
        });*/
        function available(date){ //CREATES THE FUNCTION THAT TAKES THE PARAMETER DATE
          dmy = date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear(); //CREATES A VARIABLE THAT RETURNS DATE LIKE: DD-MM-YYYY
          if ($.inArray(dmy, availableDates) != -1) { //I HAVE NO CLUE
            return [true, "", "Available"]; //DATE IS AVAILABLE
          } else {
            return [false,"","unAvailable"]; //DATE IS UNAVAILABLE
          }
        }


        /*function available(time){ //CREATES THE FUNCTION THAT TAKES THE PARAMETER DATE
          '<input id="test1" type="radio"/><label for="test1">'time'</label>'
          if ($.inArray(time, availableTimes) != -1) { //I HAVE NO CLUE
            '<input type="radio" id="test1" /><label for="test1">' + time + '</label>'
            return [true, "", "Available"]; //DATE IS AVAILABLE
          } else {
            return [false,"","unAvailable"]; //DATE IS UNAVAILABLE
          }
        } */
        $('#calendar').datepicker({ beforeShowDay: available}); //SHOW AVAILABLE DATES

    });
  });
}

google.maps.event.addDomListener(window, 'load', initialize); //WHEN THE WINDOW LOADS, CALL ON THE INITIALIZE FUNCTION
