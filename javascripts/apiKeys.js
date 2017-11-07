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
      firebaseApi.setKey(results.firebaseKeys);
      firebase.initializeApp(results.firebaseKeys);
      // Demonstrates that each of the four possible Firebase requests are working
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = { retrieveKeys };