"use strict";

let populateHoursOfOperation = (hoursOfOperation) => {
	let domString = '';
	for (let i = 0; i < hoursOfOperation.length; i++) {
		domString += `<li class="dropdown-item">${hoursOfOperation[i]}</li>`;
	}
	printHoursOfOperation(domString);
};

// Prints all attractions with an area_id matching the area_id of e.target to the list container:
let printAttractionsWithTypes = (attractionsWithTypes) => {
	let domString = '';
	for(let i = 0; i < attractionsWithTypes.length; i++) {
	domString += `<div class="text-left attractions" id="attraction_${attractionsWithTypes[i].id}">
					<a href=""><p class="">${attractionsWithTypes[i].name}</a> (${attractionsWithTypes[i].type_name})</p>
					<div id="attractionDescription" class="hide">
						<p>${attractionsWithTypes[i].description}</p>
					</div>
				  </div>`;
	}
	printToListContainer(domString);
};

let printAttractionsWithAreas = (attractionsWithAreas) => {
	let domString = '';
		for(let i = 0; i < attractionsWithAreas.length; i++) {
	domString += `<div class="text-left attractions" id="attraction_${attractionsWithAreas[i].id}">
									<a href=""><p class="">${attractionsWithAreas[i].name}</a> (${attractionsWithAreas[i].area_name})</p>
									<div id="attractionDescription" class="hide">
										<p>${attractionsWithAreas[i].description}</p>
									</div>
				  			</div>`;
  }
  printToListContainer(domString);
};


let printHoursOfOperation = (strang) => {
	$('#hoursDropdown').html(strang);
};

let printToListContainer = (strang) => {
	$('#listContainer').html(strang);
};

module.exports = {printAttractionsWithTypes, populateHoursOfOperation, printAttractionsWithAreas};
