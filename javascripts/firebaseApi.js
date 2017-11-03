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

// Returns only attraction_types:
const getAttractionTypes = () => {
  return new Promise((resolve, reject) => {
      getFirebaseData("attraction_types").then((attraction_types) => {
        resolve(attraction_types);
      });
  });
};

const getParkInfo = () => {
  return getFirebaseData("park-info");
};

// Returns an array consisting all attractions with an area_id matching the area_id of e.target:
const getAttractionsByArea = (area_id) => {
  let attractions = [];
  return new Promise ((resolve, reject) => {
    $.ajax(`https://theme-park-advocates.firebaseio.com/attractions.json?orderBy="area_id"&equalTo=${area_id}`)
    .then((results) => {
      Object.keys(results).forEach((result) => {
        results[result].id = result;
        attractions.push(results[result]);
      });
      resolve(attractions);
    }).catch((err) => {
      reject(err);
    });
  });
};

module.exports = { setKey, getAreas, getAttractionTypes, getAttractions, getParkInfo, getKey, getAttractionsByArea};