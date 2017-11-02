"use strict";
const firebaseApi = require("./firebaseApi");

const checkAreaMatch = (attraction) => {
  return attraction.name.includes($("#searchBox").val());
};


const highlightMatchingAreas = (e) => {
  console.log(e);
  if (e.key === "Enter") {
    firebaseApi.getAttractions()
      .then((attractions) => { return attractions.filter(checkAreaMatch); })
      .then((filtered) => { console.log(filtered); });
  }
};


const searchBox = () => {
  $("#searchBox").keypress(highlightMatchingAreas);
};

const initializeEvents = () => {
  searchBox();
};

module.exports = { initializeEvents };