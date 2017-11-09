"use strict";

const apiKeys = require("./apiKeys");
const events = require("./events");
const firebaseApi = require("./firebaseApi");

const main = () => {
  console.log(firebaseApi);
  apiKeys.apiKeys()
    .then((results) => {
      console.log(results);
      console.log(firebaseApi.setKey);
      firebaseApi.setKey(results.firebaseKeys);
      firebase.initializeApp(results.firebaseKeys);
      firebaseApi.getAreas();
      firebaseApi.getHoursOfOperation();
      firebaseApi.attractionsWithAreaName();
      events.initializeEvents();
    });

};

main();

