"use strict";

const dom = require("./dom");

let firebaseKey = "";

// --- set API key and call functions needed on load ---
const setKey = (key) => {
  firebaseKey = key;
};

// --- Getters --- //

// --- Promise to get all AREAS - Called in setKey to populate map info on load --- //
const getAreas = () => {
  return new Promise((resolve, reject) => {
    $.ajax(`${firebaseKey.databaseURL}/areas.json`)
      .then((data) => {
        if (data != null) {
          dom.populateMapInfo(data);
          resolve(data);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// --- Promise to get all ATTRACTIONS --- //
const getAttractions = () => {
  return new Promise((resolve, reject) => {
    $.ajax(`${firebaseKey.databaseURL}/attractions.json`)
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

// --- Promise to get all TYPES --- //
const getAttractionTypes = () => {
  return new Promise((resolve, reject) => {
    $.ajax(`${firebaseKey.databaseURL}/attraction_types.json`)
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

// --- Promise to get PARK INFO --- //
const getParkInfo = () => {
  return new Promise((resolve, reject) => {
    $.ajax(`${firebaseKey.databaseURL}/park-info.json`)
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

// --- Promise to get all MAITENANCE TICKETS --- //
const getMaintenanceTickets = () => {
  return new Promise((resolve, reject) => {
    $.ajax(`${firebaseKey.databaseURL}/maintenance_tickets.json`)
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

// Returns an array consisting of all attractions with an area_id matching the area_id of e.target:
const getAttractionsByArea = (area_id) => {
  let attractions = [];
  return new Promise((resolve, reject) => {
    $.ajax(`https://theme-park-advocates.firebaseio.com/attractions.json?orderBy="area_id"&equalTo=${area_id}`)
      .then((results) => {
        Object.keys(results).forEach((result) => {
          attractions.push(results[result]);
        });
        resolve(attractions);
      }).catch((err) => {
        reject(err);
      });
  });
};

module.exports = { setKey, getAreas, getAttractionTypes, getAttractions, getParkInfo,getMaintenanceTickets, getAttractionsByArea};

