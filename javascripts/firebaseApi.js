"use strict";

const dom = require("./dom");

let firebaseKey = "";

const getKey = () => {
  return firebaseKey;

};

const setKey = (key) => {
  firebaseKey = key;
  showCurrentEvents();
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
      console.log("attractions data", data);

    }).catch((error) => {
      console.log("error in get attractions", error);
    });
  });
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
  return new Promise((resolve, reject) => {
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



//in order for Jessica to use these functions too, pass a parameter thru 
//setCurrentTime, which would look at the selected time in drop down;
//write logic that if a time is passed in, look at that time for comparison;
//if no time is passed in, run it on current time.
const setCurrentTime = () => {
  let realTime = moment().format("MMMM Do YYYY, h:mm:ss a");
  return moment(realTime, "MMMM Do YYYY, h:mm:ss a").format("h:00A");
};

const showCurrentEvents = () => {
  let hour = setCurrentTime('1:00PM');
  let currentEventsArray = [];
  getAttractions().then((attractions) => {
    Object.keys(attractions).forEach((attraction) => {
      if (attractions[attraction].times) {
        currentEventsArray.push(attractions[attraction]);
      }
    });
    currentEventsArray.forEach((item) => {
      item.times.forEach((time) => {
        let time_hour = moment().hour(time.split(':')[0]).minute(0).second(0).format("h:00A");
        console.log("time", time_hour);
        if (time_hour === hour) {

        }
      });
    });
  });
};


module.exports = {
  setKey,
  getAreas,
  getAttractionTypes,
  getAttractions,
  getParkInfo,
  getKey,
  getAttractionsByArea
};