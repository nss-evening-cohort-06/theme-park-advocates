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