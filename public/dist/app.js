(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

const firebaseApi = require("./firebaseApi");

const apiKeys = () => {
  return new Promise((resolve, reject) => {
    $.ajax("../db/apiKeys.json")
      .done((data) => {
        resolve(data);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const retrieveKeys = () => {
  apiKeys()
    .then((results) => {
      console.log(results);
      firebaseApi.setKey(results.firebaseKeys);
      firebase.initializeApp(results.firebaseKeys);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = { retrieveKeys };
},{"./firebaseApi":2}],2:[function(require,module,exports){
"use strict";

let firebaseKey = "";

const setKey = (key) => {
  firebaseKey = key;
  console.log(firebaseKey);
};

const getParkData = () => {
  
};

module.exports = { setKey };
},{}],3:[function(require,module,exports){
"use strict";

const apiKeys = require("./apiKeys");

console.log("in main.js");

const main = () => {
  apiKeys.retrieveKeys();
};

main();
},{"./apiKeys":1}]},{},[3]);
