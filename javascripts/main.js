"use strict";

const apiKeys = require("./apiKeys");
const firebaseApi = require("./firebaseApi");
const dom = require("./dom");

console.log("in main.js");

const main = () => {
  apiKeys.retrieveKeys();
  dom.setCurrentHour();
  dom.currentHourDomString();
  
};

main();

