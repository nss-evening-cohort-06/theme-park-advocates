"use strict";

let populateMapInfo = (areas) => {
	let domString = '';
	areas.forEach((area) => {
		if(area.id === 7) {
			domString += `<div id="area7" class="area col-md-4 col-md-offset-8">
							<h4>${area.name}</h4>
						  	<p>${area.description}</p>
						  </div>`;
		}else{
		domString += `<div id="area${area.id}" class="area col-md-4">
						<h4>${area.name}</h4>
					  	<p>${area.description}</p>
					  </div>`;
		}
	printMapInfo(domString);
	});
};

let printMapInfo = (strang) => {
	$('#areas').html(strang);
};


let populateHoursOfOperation = (hoursOfOperation) => {
	let domString = '';
	for (let i = 0; i < hoursOfOperation.length; i++) {
		domString += `<li class="dropdown-item">${hoursOfOperation[i]}</li>`;
	}
	printHoursOfOperation(domString);
};

let printHoursOfOperation = (strang) => {
	$('#hoursDropdown').html(strang);
};

// Prints all attractions with an area_id matching the area_id of e.target to the list container:
let printAttractionsWithTypes = (attractionsWithTypes) => {
	let domString = '';
	for(let i = 0; i < attractionsWithTypes.length; i++) {
		domString += `<div class="text-left attractions" id="attraction_${attractionsWithTypes[i].id}">
					<a class="attractionLink" href="#">${attractionsWithTypes[i].name}</a> (${attractionsWithTypes[i].type_name})
					<div class="attractionDescription hide">
						<p>${attractionsWithTypes[i].description}</p>
					</div>`;
		if (attractionsWithTypes[i].times) {
			domString += `<div class="attractionTimes hide">
				<p>${attractionsWithTypes[i].times.join(", ")}</p>
				</div>`;
		}
		domString += `</div>`;
	}
	
	printToListContainer(domString);
	$(".attractionLink").click((event) => {
		$(".attractionDescription").addClass("hide");
		$(".attractionTimes").addClass("hide");
		$(event.target).parent().children().removeClass("hide");
	});
};

let printAttractionsWithAreas = (attractionsWithAreas) => {
	let domString = '';
		for(let i = 0; i < attractionsWithAreas.length; i++) {
			domString += `<div class="text-left attractions" id="attraction_${attractionsWithAreas[i].id}">
									<a class="attractionLink" href="#">${attractionsWithAreas[i].name}</a> (${attractionsWithAreas[i].area_name})
									<div class="attractionDescription hide">
										<p>${attractionsWithAreas[i].description}</p>
									</div>`;
			if (attractionsWithAreas[i].times) {
				domString += `<div class="attractionTimes hide">
				<p>${attractionsWithAreas[i].times.join(", ")}</p>
				</div>`;
			}
	domString +=		`</div>`;
  }
	printToListContainer(domString);
	$(".attractionLink").click((event) => {
		$(".attractionDescription").addClass("hide");
		$(".attractionTimes").addClass("hide");
		$(event.target).parent().children().removeClass("hide");
	});
};

let printToListContainer = (strang) => {
	$('#listContainer').html(strang);
};

module.exports = {printAttractionsWithTypes, populateHoursOfOperation, printAttractionsWithAreas, populateMapInfo};
