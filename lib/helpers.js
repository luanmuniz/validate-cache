const FRC = require('./frc');

const Helpers = {

	/**
	 * Converts a string with comma separation keys and = separetor value in an Object
	 * Where anything described as "Key=Value" will become { key: value }, anything represented only as "Key" will become { key: true }
	 *
	 * Ot only accept numbers as Values and empty valued keys
	 * If you send anything that ins't valid it will return an error object
	 *
	 * @example 'one, two=200, four, five=500'
	 * // returns { one: true, two: 2000, four: true, five: 500 }
	 *
	 * @param {String} cacheString - A String to be converted
	 * @returns {Object|Error} An Object with the result or a object with an error
	 */
	convertStringIntoObject(cacheString) {
		const cacheArray = cacheString.split(', ');
		const cacheObject = {};
		let hasError = false;

		if(!cacheArray.length || (cacheArray.length === 1 && cacheString.includes(' ')) || typeof cacheString !== 'string') {
			return { error: 'Cache string not valid. Check https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control for more details' };
		}

		cacheArray.forEach(config => {
			if(!config.includes('=')) {
				cacheObject[config] = true;
				return true;
			}

			const expirationConfig = config.split('=');
			let expirationNumber = parseInt(expirationConfig[1], 10);

			if(!Helpers.isNumeric(expirationConfig[1])) {
				hasError = true;
			}

			expirationNumber = FRC.maxCacheTime(expirationNumber);

			cacheObject[expirationConfig[0]] = expirationNumber;
			return true;
		});

		if(hasError) {
			return { error: 'Expect to find a number for configuration but found something else. Check https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control for more details' };
		}

		return cacheObject;
	},

	/**
	 * Converts an object into strings with comma separation.
	 * Where anything is described as "Key=Value", Boolean True only as "Key" and Boolean false is not represented
	 * If you send anything that ins't an object it will return an empty string
	 *
	 * @example { one: true, two: 200, three: false, four: true, five: 5000 }
	 * // returns 'one, two=200, four, five=5000'
	 *
	 * @param {Any} objectToConvert - Object to be converted
	 * @returns {String} An string with the result of the convertion
	 */
	convertToString(objectToConvert) {
		let finalString = '';

		if(objectToConvert && typeof objectToConvert !== 'object') {
			return finalString;
		}

		Object.keys(objectToConvert).forEach(thisParam => {
			if(finalString !== '') {
				finalString += ', ';
			}

			if(objectToConvert[thisParam] === true) {
				finalString += `${thisParam}`;
				return true;
			}

			if(objectToConvert[thisParam] === false) {
				return true;
			}

			finalString += `${thisParam}=${objectToConvert[thisParam]}`;
		});

		return finalString;
	},

	/**
	 * This function check to see if there is any duplicated configurations
	 *
	 * @param {Object} cacheString - A Cache String
	 * @returns {Boolean} - Return true if there are not duplicates
	 */
	hasDuplicatedConfiguration(cacheString) { // eslint-disable-line sort-keys
		const allParamsArray = [];

		cacheString.split(', ').forEach(config => {
			allParamsArray.push(config.split('=')[0]);
		});

		const filteredArray = [ ...new Set(allParamsArray) ]; // eslint-disable-line

		return filteredArray.length !== allParamsArray.length;
	},

	/**
	 * Check to see if the value is a numeric value. It can be a string or anything else if it can be converter to a number
	 * Also it doesn't allow numbers with floatation point and only greater than zero ones
	 *
	 * @param {Any} varToVerify - Value to verify
	 * @returns {Boolean} True if is a numeric value greater than zero and not decimal
	 */
	isNumeric(varToVerify) {
		return !isNaN(parseFloat(varToVerify)) && !Array.isArray(varToVerify) && Number.isInteger(Number(varToVerify)) && (Number(varToVerify) === 0 || Number(varToVerify) >= 1);
	}

};

module.exports = Helpers;
