"use strict";
let realTime;

const firebaseApi = require("./firebaseApi");

const setCurrentHour = () => {
	realTime = moment().format("MMMM Do YYYY, h:mm:ss a");
};



const currentHourDomString = () => {
	let domString = "";

	domString += `<h3 class="currentTime">${realTime}</h3>`;
	console.log(realTime);
	//domString +=	``;
	printToDom(domString);
};

const printToDom = (strang) => {
	$("#listContainer").html(strang);
};


// Prints all attractions with an area_id matching the area_id of e.target to the list container:
let printAttractionsArray = (attractionsWithTypes) => {
	let domString = '';
	for(let i = 0; i < attractionsWithTypes.length; i++) {
	domString += `<div>
					<a href=""><h4 class="">${attractionsWithTypes[i].name}</a> (${attractionsWithTypes[i].type_name})</h4>
					<div id="attractionDescription" class="hide">
						<h4>${attractionsWithTypes[i].description}</h4>
					</div>
				  </div>`;
	}
	printToDom(domString);
};

module.exports = {setCurrentHour, currentHourDomString, printAttractionsArray};
