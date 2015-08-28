
var Lat, Long, ctr;
var homeLat, homeLong;
var SMSNum;

function setHome() {
    homeLat = Lat;
    homeLong = Long;
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

function setSMS() {
    SMSNum = document.getElementById('SMSNum').value;
}

function changeText(elem, changeVal) {
     if ((elem.textContent) && (typeof (elem.textContent) != "undefined")) {
          elem.textContent = changeVal;
     } else {
          elem.innerText = changeVal;
     }
}

function onSuccess(position) {
    mainGPSSink(position.coords.longitude, position.coords.latitude);
}

// onError Callback receives a PositionError object
//
function onError(error) {
     alert('code: ' + error.code + '\n' +
          'message: ' + error.message + '\n');
}

function mainGPSSink(long, lat) {
    Lat = lat;
    Long = long;
    ctr++;
    var elem = document.getElementById('Latitude');
    changeText(elem, lat);
    elem = document.getElementById('Longitude');
    changeText(elem, long);
    elem = document.getElementById('Counter');
    changeText(elem, ctr);
    document.getElementById('SetHome').style.visibility = "visible";
    if (homeLat > 0)
    {
        elem = document.getElementById('Distance');
        changeText(elem, getDistanceFromLatLonInKm(lat, long, homeLat, homeLong));
    }
}

var app = {
     // Application Constructor
     initialize: function() {
          this.bindEvents();
     },
     // Bind Event Listeners
     //
     // Bind any events that are required on startup. Common events are:
     // 'load', 'deviceready', 'offline', and 'online'.
     bindEvents: function() {
          document.addEventListener('deviceready', this.onDeviceReady, false);
     },
     // deviceready Event Handler
     //
     // The scope of 'this' is the event. In order to call the 'receivedEvent'
     // function, we must explicitly call 'app.receivedEvent(...);'
     onDeviceReady: function() {
          app.receivedEvent('deviceready');
     },
     // Update DOM on a Received Event
     receivedEvent: function(id) {
          var Element = document.getElementById('AppText');
          changeText(Element, 'Started');

          document.getElementById('SetHome').style.visibility = "hidden";

          Lat = 0; tLong = 0; ctr = 0; homeLat = 0; homeLong = 0; SMSNum = 0;

          navigator.geolocation.watchPosition(onSuccess, onError, { maximumAge: 3000, enableHighAccuracy: false });

          cordova.plugins.backgroundMode.setDefaults({ title: 'Patient Monitoring'});
         // Enable background mode
          cordova.plugins.backgroundMode.enable();

     }
};