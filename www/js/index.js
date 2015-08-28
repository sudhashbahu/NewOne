
var startLat, startLong, ctr;

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
    ctr++;
    var elem = document.getElementById('Latitude');
    changeText(elem, lat);
    elem = document.getElementById('Longitude');
    changeText(elem, long);
    elem = document.getElementById('Counter');
    changeText(elem, ctr);
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
          startLat = 0; startLong = 0; ctr = 0;

          navigator.geolocation.watchPosition(onSuccess, onError, { maximumAge: 3000, enableHighAccuracy: false });

          cordova.plugins.backgroundMode.setDefaults({ text: 'Patient Monitoring' });
         // Enable background mode
          cordova.plugins.backgroundMode.enable();

         // Called when background mode has been activated
          cordova.plugins.backgroundMode.onactivate = function () {
              setTimeout(function () {
                  // Modify the currently displayed notification
                  cordova.plugins.backgroundMode.configure({
                      text: 'Patient Monitoring' + ctr.toString()
                  });
              }, 3000);
          }

     }
};