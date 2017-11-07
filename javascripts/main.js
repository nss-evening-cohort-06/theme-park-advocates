"use strict";

const apiKeys = require("./apiKeys");
const events = require("./events");

const main = () => {
  apiKeys.retrieveKeys();
  events.initializeEvents();
};

main();

