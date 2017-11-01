"use strict";

let attractions = require('./attractions');


let domString = () => {
	let domString = '';
	for(let i = 0; )
	domString += `<div>
					<a href=""><h4 class="">${attractions[i].name}</a> (${attractions[i].type_name})</h4>
					<div id="attractionDescription" class="hide">
						<h4>${attractions[i].description}</h4>
					</div>
				  </div>`;
};

let printToDom = () => {

};