"use strict";

const dom = require("./dom");

let firebaseKey = "";
let hoursOfOperation = [];
let attractionsWithAreaNames = [];

// --- set API key and call functions needed on load ---
const setKey = (key) => {
  firebaseKey = key;
  getAreas();
  getHoursOfOperation();
  attractionsWithAreaName();
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

// --- End of Getters --- //

// --- 
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


// Creates attraction.type_name key with a value === type.name then runs underMaintenance. Called in displayAttractionsByArea in events.js
const addAttractionTypeName = (area_id) => {
  let attractionsWithTypes = [];
  // The following Promise.all will return an array containing 2 indexes, 0 will be an array consisting all attractions with an area_id matching the area_id of e.target (from getAttractionsByArea), 1 will be an array consisting of all types (from getAttractionsByType):
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
    underMaintenance(attractionsWithTypes, true);
  }).catch((err) => {
      console.log(err);
    });
};

// Creates attraction.area_name key with a value === area.name and pushes it into the global array, attractionsWithAreaNames. 
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
       showEventsByTime();
    }).catch((err) => {
      console.log(err);
  });
};

// Creates individual hours of operation (format ex. "9:00AM") and is then printed to #hoursDropdown
const getHoursOfOperation = () => {
  let hour = '';
  for(let i = 9; i < 22; i++) {
    hour = moment(`${i}`, 'H').format('h:mmA');
    hoursOfOperation.push(hour);
  }
  dom.populateHoursOfOperation(hoursOfOperation);
};

// Returns current time formatted as whole hour (ex. "9:00AM") which is called in showEventsByTime
const setCurrentTime = () => {
  let realTime = "";
  realTime = moment().format("MMMM Do YYYY, h:mm:ss a");
  return moment(realTime, "MMMM DO YYYY, h:mm:ss a").format("H:00A");
};

// Displays attractions for current time in listContainer on load and is called in selectAttractionsTime in events.js
const showEventsByTime = (time) => {
  let displayedHour;

  if(!time) {
    displayedHour = moment(setCurrentTime(), "h:mmA").hour();
  }else{
    displayedHour = moment(time, "h:mmA").hour();
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
    underMaintenance(eventsAtDisplayedHour, false);
};

// evaluate if maintenance is currently happening and if so set out_of_order to true
const underMaintenance = (selectedAttractions, value) => {
  let currentTime = moment().format();
  getMaintenanceTickets().then((tickets) => {
    Object.keys(tickets).forEach((ticket) => {
      Object.keys(selectedAttractions).forEach((key) => {
        if (selectedAttractions[key].id === tickets[ticket].attraction_id){
          let time = tickets[ticket].maintenance_date;
          let maintenanceStart = moment(time).format();
          let maintenanceFinish = moment(maintenanceStart).add(tickets[ticket].maintenance_duration_hours, 'hours').format();
          //if maintenace has occured the ride is no longer out of order
          if (moment(currentTime).isAfter(maintenanceFinish)) {
              selectedAttractions[key].out_of_order = false;
          }
          // if the maintenance is occuring now mark the attraction as closed
          if (moment(currentTime).isBetween(maintenanceStart, maintenanceFinish)) {
              selectedAttractions[key].out_of_order = true;
          }
        }
      });
      outOfOrderRides(selectedAttractions, value);
    });
  });
};

// evaluate if attractions "out_of_order" status is not true and push into workingAttractions array
const outOfOrderRides = (selectedAttractions, value) => {
  let workingAttractions = [];
  let outOfOrderAttractions = [];
  if (selectedAttractions != null) {
    Object.keys(selectedAttractions).forEach((key) => {
      if (selectedAttractions[key].out_of_order != true) {
        workingAttractions.push(selectedAttractions[key]);
      }
    });
  if (value) {
    dom.printAttractionsWithTypes(workingAttractions);
  } else {
    dom.printAttractionsWithAreas(workingAttractions);
    }
  }
};

// using the searched attractions search their descriptions for the listed terms and change their background and area background
const theUpsideDown = (attractions) => {
  $(".area").removeClass('downIsUp');
  $(".attractions").removeClass('upIsDown');
  let searchTerms = ["away", "beneath", "blinking", "broken", "camera", "christmas", "claws", "cruiser", "darkness", "enchanted", "evil", "film", "forgotten", "friend", "gasoline", "ghost", "gloomy", "hawkins", "hidden", "hungry", "indiana", "invisible", "labyrinth", "lights", "merlin", "mike", "monsters", "neon", "nighttime", "party", "portal", "pulsate", "school", "sheriff", "spellbinding", "supernatural", "thunder", "underground", "vintage", "waffle"];
  Object.keys(attractions).forEach((attraction) => {
    searchTerms.forEach((term) => {
     if ($.inArray(term, attractions[attraction].description.split(' ')) > -1) {
        $("#attraction_"+attractions[attraction].id).addClass('upIsDown');
        $("#area"+attractions[attraction].area_id).addClass('downIsUp');
      }
    });
  });
  return attractions;
};

module.exports = { setKey, getAreas, getAttractionTypes, getAttractions, getParkInfo, getAttractionsByArea, getHoursOfOperation, addAttractionTypeName, showEventsByTime, theUpsideDown};
