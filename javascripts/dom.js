"use strict";

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

let printToDom = (strang) => {
	$('#listContainer').html(strang);
};

module.exports = {printAttractionsArray};