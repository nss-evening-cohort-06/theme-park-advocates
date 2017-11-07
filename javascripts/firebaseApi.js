"use strict";

let dom = require('./dom');

let firebaseKey = "";
let hoursOfOperation = [];
let attractionsWithAreaNames = [];

const getKey = () => {
  return firebaseKey;
};

const setKey = (key) => {
  firebaseKey = key;
  getHoursOfOperation();
  showCurrentEvents();
  attractionsWithAreaName();

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
  return new Promise((resolve, reject) => {
    getFirebaseData("areas").then((areas) => {
    resolve(areas);
    });
  });
};

const getAttractions = () => {
  return new Promise((resolve, reject) => {
    getFirebaseData("attractions").then((attractions) => {
    resolve(attractions);
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

const addAttractionTypeName = (area_id) => {
  let attractionsWithTypes = [];
  // The following Promise.all will return an array containing 3 indexes, 0 will be an array consisting all attractions with an area_id matching the area_id of e.target (from getAttractionsByArea), 1 will be an array consisting of all types (from getAttractionsByType):
  Promise.all([getAttractionsByArea(area_id), getAttractionTypes()])
  .then((values) => { 
    values[0].forEach((attraction) => {
      values[1].forEach((type) => {
        // Conditional to add type_name key to attraction with a value equal to type.name provided that the type.id and attractions.type_id are the same:
        if (type.id == attraction.type_id) {
          attraction.type_name = type.name;
          // Push the attractions that now have a key of type_name into the attractionsWithTypes array wich can then be passed into the dom function to print:
          attractionsWithTypes.push(attraction);
        }
      });
    });
    dom.printAttractionsWithTypes(attractionsWithTypes);
  }).catch((err) => {
      console.log(err);
    });
};

const attractionsWithAreaName = () => {
  Promise.all([getAttractions(), getAreas()])
  .then((values) => {
    values[0].forEach((attraction) => {
      values[1].forEach((area) => {
        if(area.id === attraction.area_id){
          attraction.area_name = area.name;
          attractionsWithAreaNames.push(attraction);
        }
      });
    });
       return attractionsWithAreaNames;
    }).catch((err) => {
      console.log(err);
  });
};


const getHoursOfOperation = () => {
  let hour = '';
  for(let i = 9; i < 22; i++) {
    hour = moment(`${i}`, 'H').format('h:mmA');
    hoursOfOperation.push(hour);
  }
  dom.populateHoursOfOperation(hoursOfOperation);
};

// Kelly's:

const setCurrentTime = () => {
  let realTime = "";
  realTime = moment().format("MMMM Do YYYY, h:mm:ss a");
  return moment(realTime, "MMMM Do YYYY, h:mm:ss a").format("H:00A");
};

const showCurrentEvents = (time) => {
  let displayedHour;  

  if(!time) {
    displayedHour = moment(setCurrentTime(), "h:mmA").hour();
    console.log("!displayedHour", displayedHour);
  }else{ 
    displayedHour = moment(time, "h:mmA").hour();
    console.log("displayedHour", displayedHour);
  }

  let displayedEventsArray = [];
  let eventsAtDisplayedHour = [];

  attractionsWithAreaNames.forEach((attraction) => {
      if (attraction.times) {
        displayedEventsArray.push(attraction);
      }     
    });

    displayedEventsArray.forEach((item) => {
      item.times.forEach((time) => {
        let time_hour = moment(time, "h:mmA").hour();
        if (time_hour === displayedHour) {
          eventsAtDisplayedHour.push(item); 
        }       
      });
    });
    console.log("eventsAtDisplayedHour", eventsAtDisplayedHour);
    dom.printAttractionsWithAreas(eventsAtDisplayedHour);
};


module.exports = { setKey, getAreas, getAttractionTypes, getAttractions, getParkInfo, getKey, getAttractionsByArea, getHoursOfOperation, addAttractionTypeName,showCurrentEvents};