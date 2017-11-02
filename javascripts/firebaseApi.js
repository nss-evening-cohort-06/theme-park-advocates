"use strict";

let firebaseKey = "";


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
  return new Promise((resolve, reject) => {
    getFirebaseData("attractions").then((data) => {
      resolve(data);
      console.log(data);
    }).catch((error) => {
      console.log("error in get attractions", error);
    });
  });
};

const getAttractionTypes = () => {
  return getFirebaseData("attraction_types");
};

const getParkInfo = () => {
  return getFirebaseData("park-info");
};


module.exports = { setKey, getAreas, getAttractionTypes, getAttractions, getParkInfo };