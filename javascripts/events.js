"use strict";
const firebaseApi = require("./firebaseApi");

const checkAreaMatch = (attraction) => {
  let searchString = $("#searchBox").val().toLowerCase();
  return attraction.name.toLowerCase().includes(searchString);
};

const getAttractionArea = (attraction) => {
  return attraction.area_id;
};

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