"use strict";

const apiKeys = require("./apiKeys");
const events = require("./events");
const firebaseApi = require("./firebaseApi");
const attractions = require("./attractions");

const main = () => {
  apiKeys.apiKeys()
    .then((results) => {
      firebaseApi.setKey(results.firebaseKeys);
      firebaseApi.getAreas();
      attractions.getHoursOfOperation();
      attractions.attractionsWithAreaName();
      attractions.showEventsByTime();
      events.initializeEvents();
    });

};

main();