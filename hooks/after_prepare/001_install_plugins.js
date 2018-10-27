#!/usr/bin/env node

// http://devgirl.org/2013/11/12/three-hooks-your-cordovaphonegap-project-needs/

//this hook installs all your plugins

// add your plugins to this list--either
// the identifier, the filesystem location
// or the URL
var pluginlist = [
    "org.apache.cordova.device",
    "org.apache.cordova.geolocation",
    "org.apache.cordova.inappbrowser",
    "org.apache.cordova.splashscreen",
    "com.verso.cordova.clipboard",
    "https://github.com/driftyco/ionic-plugins-keyboard.git"
];

// no need to configure below

var fs = require('fs');
var path = require('path');
var sys = require('sys')
var exec = require('child_process').exec;

function puts(error, stdout, stderr) {
    sys.puts(stdout)
}

pluginlist.forEach(function(plug) {
    exec("cordova plugin add " + plug, puts); // You could replace cordova with phonegap if you like
});