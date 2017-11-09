"use strict";

const firebaseApi = require('./firebaseApi');


// --- DATA RELATED FUNCTIONS --- //

// Creates attraction.type_name key with a value === type.name then runs underMaintenance. Called in displayAttractionsByArea in events.js
const addAttractionTypeName = (area_id) => {
  let attractionsWithTypes = [];
  Promise.all([firebaseApi.getAttractionsByArea(area_id), firebaseApi.getAttractionTypes()])
  .then((values) => {
    values[0].forEach((attraction) => {
      values[1].forEach((type) => {
        if (type.id == attraction.type_id) {
          attraction.type_name = type.name;
          attractionsWithTypes.push(attraction);
        }
      });
    });
    time.underMaintenance(attractionsWithTypes, true);
  }).catch((err) => {
      console.log(err);
    });
};

// Creates attraction.area_name key with a value === area.name and pushes it into the global array, attractionsWithAreaNames. 
const attractionsWithAreaName = () => {
  Promise.all([firebaseApi.getAttractions(), firebaseApi.getAreas()])
  .then((values) => {
    values[0].forEach((attraction) => {
      values[1].forEach((area) => {
        if(area.id === attraction.area_id){
          attraction.area_name = area.name;
          attractionsWithAreaNames.push(attraction);
        }
      });
    });
       time.showEventsByTime();
    }).catch((err) => {
      console.log(err);
  });
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


// --- TIME RELATED FUNCTIONS --- //

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

const initializeAttractions = () => {
	{addAttractionTypeName, 
	 attractionsWithAreaName, 
	 theUpsideDown, 
	 getHoursOfOperation, };
}

