"use strict";

const firebaseApi = require("./firebaseApi");
const attr = require("./attractions");

// Object -> Boolean
// Checks whether the object's "name" key includes the search text and returns true or false for filtering purposes
const checkSearchMatch = (attraction) => {
	let searchValue = new RegExp($("#searchBox").val().split(" ").join(""), "i");
	return (attraction.name.split(" ").join("").match(searchValue) && !attraction.out_of_order);
};

// Object -> Number
// reduces an attraction object to just the value of its "area" key
const getAttractionArea = (attraction) => {
  return attraction.area_id;
};

// [Object] -> [Number]
// takes in an array of attraction objects and returns an array of all of their area IDs
const reduceToAreas = (attractionArray) => {
  return attractionArray.map(getAttractionArea);
};

// removes the dotted border from any previous searches and then outlines any areas with attractions matching the given IDs
const highlightAreas = (numArray) => {
	$(".dotborder").removeClass("dotborder");
  numArray.forEach((areaId) => {
    $(`#area${areaId}`).addClass("dotborder");
  });
};

// Main function which fires on Enter press in search box
const highlightMatchingAreas = (e) => {
	if (e.key === "Enter" && $("#searchBox").val().length) {
		firebaseApi.getAttractions()
			.catch((error) => console.log(error))
      .then((attractions) => {return attractions.filter(checkSearchMatch);})
			.then(attr.theUpsideDown)
			.then(reduceToAreas)
      .then(highlightAreas);
  }
};

// initializes searchBox event listener
const searchBox = () => {
  $("#searchBox").keypress(highlightMatchingAreas);
};

// Event to display attractions in the list container when an area is clicked in the map:
const displayAttractionsByArea = () =>	{
	$('#areas').on('click', '.area', (e) => {
		const area_id = $(e.target).closest('.area')[0].id.split('area')[1];
		attr.addAttractionTypeName(area_id);
	});

};

// Event to display attractions in the list container based on selectedTime from drop down menu
const selectAttractionsTime = () => {
	$('#hoursDropdown').on('click', '.dropdown-item', (e) => {
		let selectedTime = e.target.innerHTML;
		attr.showEventsByTime(selectedTime);
	});
};

// Add copyright date to the bottom of the page
const copyrightDate = () => {
  $("#copyright").append(moment().format('L'));
};

const initializeEvents = () => {
  searchBox();
  displayAttractionsByArea();
  selectAttractionsTime();
  copyrightDate();
};


module.exports = { initializeEvents };
