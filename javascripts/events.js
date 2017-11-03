"use strict";
const firebaseApi = require("./firebaseApi");
const dom = require('./dom');
console.log("dom in events", dom);

// Object -> Boolean
const checkAreaMatch = (attraction) => {
  let searchString = $("#searchBox").val().toLowerCase();
  return attraction.name.toLowerCase().includes(searchString);
};

// Object -> Number
const getAttractionArea = (attraction) => {
  return attraction.area_id;
};

// [Object] -> [Number]
const reduceToAreas = (attractionArray) => {
  return attractionArray.map(getAttractionArea);
};


const highlightAreas = (numArray) => {
  numArray.forEach((areaId) => {
    $(`#area${areaId}`).addClass("dotborder");
  });
};

const highlightMatchingAreas = (e) => {
  console.log(e);
  if (e.key === "Enter") {
    firebaseApi.getAttractions()
      .then((attractions) => { return attractions.filter(checkAreaMatch); })
      .then(reduceToAreas)
      .then(highlightAreas);
  }
};




const searchBox = () => {
  $("#searchBox").keypress(highlightMatchingAreas);
};

const initializeEvents = () => {
  searchBox();
};

module.exports = { initializeEvents };

// Event to display attractions in the list container when an area is clicked in the map:	 
$('.areas').click((e) => {
	// Grab the area id number from the id assigned to the element in index.html:
	let area_id = e.target.id.slice(4, 5);
	// The following Promise.all will return an array containing 2 indexes, 0 will be an array consisting all attractions with an area_id matching the area_id of e.target (from getAttractionsByArea), 1 will be an array consisting of all types (from getAttractionsByType):
	Promise.all([firebaseApi.getAttractionsByArea(area_id), firebaseApi.getAttractionTypes()])
	.then((values) => {	
		let attractionsWithTypes = [];	
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
		console.log("attractionsWithTypes?", attractionsWithTypes);
		dom.printAttractionsArray(attractionsWithTypes);
	}).catch((err) => {
			console.log(err);
		});
});

