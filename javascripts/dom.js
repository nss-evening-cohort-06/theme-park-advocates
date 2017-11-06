"use strict";

// Prints all attractions with an area_id matching the area_id of e.target to the list container:
let printAttractionsArray = (attractionsWithTypes) => {
	let domString = '';
	for (let i = 0; i < attractionsWithTypes.length; i++) {
		domString += `<div>
					<a href="#" class="individual-attraction"><h4>${attractionsWithTypes[i].name}</a> (${attractionsWithTypes[i].type_name})</h4>
					<div class="attractionDescription hide">
						<h6>${attractionsWithTypes[i].description}</h6>
					</div>`;
		if (attractionsWithTypes[i].times) {
			domString += `<div class="attractionTimes hide">
										<h4>TIMES:</h4>`;
			attractionsWithTypes[i].times.forEach((timestring) => {
				domString += `<h5> - ${timestring} - </h5>`;
			});
			domString += `</div>`;
		}

		domString += `</div>`;
	}
	printToDom(domString);
};

let printToDom = (strang) => {
	$('#listContainer').html(strang);
};

const revealDetails = (e) => {
	console.log($(e.target).parent().parent().children());
	$(".attractionDescription").addClass("hide");
	$(".attractionTimes").addClass("hide");
	$(e.target).parent().parent().children(2).removeClass("hide");
	if ($(e.target).parent().parent().children(3)) {
		$(e.target).parent().parent().children(3).removeClass("hide");
	}
};

module.exports = { printAttractionsArray, revealDetails };