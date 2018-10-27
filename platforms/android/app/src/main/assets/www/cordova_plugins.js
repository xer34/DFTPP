cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-firebase.FirebasePlugin",
    "file": "plugins/cordova-plugin-firebase/www/firebase.js",
    "pluginId": "cordova-plugin-firebase",
    "clobbers": [
      "FirebasePlugin"
    ]
  },
  {
    "id": "org.apache.cordova.geolocation.Coordinates",
    "file": "plugins/org.apache.cordova.geolocation/www/Coordinates.js",
    "pluginId": "org.apache.cordova.geolocation",
    "clobbers": [
      "Coordinates"
    ]
  },
  {
    "id": "org.apache.cordova.geolocation.PositionError",
    "file": "plugins/org.apache.cordova.geolocation/www/PositionError.js",
    "pluginId": "org.apache.cordova.geolocation",
    "clobbers": [
      "PositionError"
    ]
  },
  {
    "id": "org.apache.cordova.geolocation.Position",
    "file": "plugins/org.apache.cordova.geolocation/www/Position.js",
    "pluginId": "org.apache.cordova.geolocation",
    "clobbers": [
      "Position"
    ]
  },
  {
    "id": "org.apache.cordova.geolocation.geolocation",
    "file": "plugins/org.apache.cordova.geolocation/www/geolocation.js",
    "pluginId": "org.apache.cordova.geolocation",
    "clobbers": [
      "navigator.geolocation"
    ]
  },
  {
    "id": "com.verso.cordova.clipboard.Clipboard",
    "file": "plugins/com.verso.cordova.clipboard/www/clipboard.js",
    "pluginId": "com.verso.cordova.clipboard",
    "clobbers": [
      "cordova.plugins.clipboard"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.3",
  "cordova-plugin-firebase": "2.0.5",
  "org.apache.cordova.geolocation": "0.3.6",
  "com.verso.cordova.clipboard": "0.1.0"
};
// BOTTOM OF METADATA
});