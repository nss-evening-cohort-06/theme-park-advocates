"use strict";

let firebaseKey = "";


const setKey = (key) => {
  firebaseKey = key;
  console.log(firebaseKey);
};

const getParkData = (collection) => {
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
  return getParkData("areas");
};

const getAttractions = () => {
  return getParkData("attractions");
};

const getAttractionTypes = () => {
  return getParkData("attraction_types");
};

const getParkInfo = () => {
  return getParkData("park-info");
};


module.exports = { setKey, getAreas, getAttractionTypes, getAttractions, getParkInfo };