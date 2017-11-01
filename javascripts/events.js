"use strict";

const attractions = require('./attractions');

const searchBox = () => {
  
};

const displayAttractionsByArea = () => {
	let area_id;
	
	attractions.getAttractionsByArea(area_id).then((attractionsArray) => {
		dom.printAttractionsArray(attractionsArray);
				}).catch((err) => {
				console.log(err);
			});

};