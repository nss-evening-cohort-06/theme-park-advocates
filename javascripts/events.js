"use strict";


const firebaseApi = require("./firebaseApi");

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

// 
const highlightAreas = (numArray) => {
  numArray.forEach((areaId) => {
    $(`#area${areaId}`).addClass("dotborder");
  });
};

// Main function which fires on Enter press in search box
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

// Event to display attractions in the list container when an area is clicked in the map:
const displayAttractionsByArea = () =>	{ 
	$('.areas').click((e) => {
		// Grab the area id number from the id assigned to the element in index.html:
		let area_id = e.target.id.slice(4, 5);
		firebaseApi.addAttractionTypeName(area_id);
	});
};


const selectAttractionsTime = () => {
	$('#hoursDropdown').on('click', '.dropdown-item', (e) => {
		console.log("selected time", e.target.innerHTML);
		let selectedTime = e.target.innerHTML;
		firebaseApi.showCurrentEvents(selectedTime);
	});
};

const initializeEvents = () => {
  searchBox();
  displayAttractionsByArea();
  selectAttractionsTime();
};

module.exports = { initializeEvents };
