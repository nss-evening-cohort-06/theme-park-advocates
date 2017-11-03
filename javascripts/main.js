"use strict";

const apiKeys = require("./apiKeys");
const firebaseApi = require("./firebaseApi");
const events = require("./events");

console.log("in main.js");

const main = () => {
  apiKeys.retrieveKeys();
  
};

main();

