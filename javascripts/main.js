"use strict";

const apiKeys = require("./apiKeys");
const firebaseApi = require("./firebaseApi");

console.log("in main.js");

const main = () => {
  apiKeys.retrieveKeys();
  
};

main();