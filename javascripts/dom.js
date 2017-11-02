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

module.exports = {setCurrentHour, currentHourDomString};