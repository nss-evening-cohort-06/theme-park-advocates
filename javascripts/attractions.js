"use strict";

const firebaseApi = require("./firebaseApi");

const getAttractionsByType = () => {

};

const getAttractionsByArea = (area_id) => {
	let attractions = [];
	return new Promise ((resolve, reject) => {
		$.ajax(`${firebaseApi.getKey().databaseURL}/attractions.json?orderBy="area_id"&equalTo="${area_id}"`).then((results) => {
			Object.keys(results).forEach((result) => {
				results[result].id = result;
				attractions.push(results[result]);
			});
			resolve(attractions);
		}).catch((err) => {
			reject(err);
		});
	});
};

module.exports = {getAttractionsByArea};

