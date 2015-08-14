function initialize() {
  $.getJSON( '/login/login', function( data ) {
      console.log(data);
      //SETTING THE DATA FROM THE DB TO A VARIABLE CALLED USERDATA
      userData = data;
      addUser();
  });
}

function addUser() {
  //USING THE USERDATA VARIABLE TO SIFT THROUGH THE DB DATA
  $.each(userData,function(){ //ANNONYMOUS FUNCTION
    //LOG THE ROW INFO IN USERDATA
    console.log(this)

    //if(this.firstName!= firstName){} //IF STATEMENT TO CHECK WHETHER THE
      //USERNAME IS AVAILBLE BY SEEING IF THE FIRSTNAME THAT IS IN THE INPUT
      //FIELD IS NOT EQUAL TO THE FIRSTNAME IN THE DB

    db.userlist.insert({'inputUserName':user, 'password':pass})
}

event.addDomListener(window, 'load', initialize);
