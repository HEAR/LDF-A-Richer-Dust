"use strict"

var DMX = require('dmx');
var A = DMX.Animation;

var dmx = new DMX();
var universe = dmx.addUniverse('demo', 'enttec-usb-dmx-pro', '/dev/cu.usbserial-EN187701')
// var universe = dmx.addUniverse('demo', 'null')


// https://github.com/wiedi/node-dmx


var valeur = 0;
// https://github.com/wiedi/node-dmx/blob/master/demo_simple.js
// https://github.com/wiedi/node-dmx/blob/master/demo.js !!!
var on = false;
setInterval(function(){
  // if(on){
  //   on = false;
  //   // universe.updateAll(0);
  //   universe.update({1: 0, 2: 255})
  //   console.log("off");
  // }else{
  //   on = true;
  //   // universe.updateAll(255);
  //   universe.update({1: 255, 2: 255})
  //   console.log("on");
  // }

  valeur = (valeur+1)%255;

  universe.update({1: valeur, 2: 255})
}, 40);