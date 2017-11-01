"use strict";

let firebaseKey = "";

const getKey = () => {
  return firebaseKey;
};

const setKey = (key) => {
  firebaseKey = key;
  console.log(firebaseKey);
};

const getFirebaseData = (collection) => {
  return new Promise((resolve, reject) => {
    $.ajax(`${firebaseKey.databaseURL}/${collection}.json`)
      .then((data) => {
        if (data != null) {
          resolve(data);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};


const getAreas = () => {
  return getFirebaseData("areas");
};

const getAttractions = () => {
  return getFirebaseData("attractions");
};

const getAttractionTypes = () => {
  return getFirebaseData("attraction_types");
};

const getParkInfo = () => {
  return getFirebaseData("park-info");
};


module.exports = { setKey, getAreas, getAttractionTypes, getAttractions, getParkInfo };