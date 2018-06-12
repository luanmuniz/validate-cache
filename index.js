const cacheValidation = {

	allCaches: [ 'public', 'private', 'no-cache', 'only-if-cached' ],
	allExpirationPrefix: [ 'max-age', 's-maxage', 'max-stale', 'min-fresh', 'stale-while-revalidate', 'stale-if-error' ],
	allOtherCacheConfig: [ 'no-store', 'no-transform' ],
	allRevalidations: [ 'must-revalidate', 'proxy-revalidate', 'immutable' ],

	applyConfig(finalObject, config) {
		if(!config) {
			return true;
		}

		if(config && config.returnObject) {
			return finalObject;
		}

		if(config && config.returnString) {
			return cacheValidation.convertToString(finalObject);
		}

		return false;
	},

	convertStringIntoObject(cacheString) {
		const cacheArray = cacheString.split(', ');
		const cacheObject = {};
		let hasError = false;

		if(!cacheArray.length || (cacheArray.length === 1 && cacheString.includes(' '))) {
			return { error: 'Cache string not valid' };
		}

		cacheArray.forEach(config => {
			if(!config.includes('=')) {
				cacheObject[config] = true;
				return true;
			}

			const expirationConfig = config.split('=');
			const expirationNumber = expirationConfig[1];

			if(!cacheValidation.isNumeric(expirationNumber)) {
				hasError = true;
			}

			cacheObject[expirationConfig[0]] = parseInt(expirationNumber, 10);
			return true;
		});

		if(hasError) {
			return { error: 'Expect to find a number for configuration but found something else' };
		}

		return cacheObject;
	},

	convertToString(objectToConvert) {
		let finalString = '';

		Object.keys(objectToConvert).forEach(thisParam => {
			if(finalString !== '') {
				finalString += ', ';
			}

			if(objectToConvert[thisParam] === true) {
				finalString += `${thisParam}`;
				return true;
			}

			finalString += `${thisParam}=${objectToConvert[thisParam]}`;
		});

		return finalString;
	},

	hasUnallowedParam(object) {
		let hasError = false;
		const allAllowedParams = [
			...cacheValidation.allCaches,
			...cacheValidation.allExpirationPrefix,
			...cacheValidation.allOtherCacheConfig,
			...cacheValidation.allRevalidations
		];

		Object.keys(object).forEach(config => {
			if(!allAllowedParams.includes(config)) {
				hasError = true;
			}
		});

		return hasError;
	},

	init(cacheParam, config) {
		if(!cacheParam) {
			return { error: 'No cache to validate' };
		}

		let cacheObject = cacheParam;
		if(typeof cacheParam === 'string') {
			cacheObject = cacheValidation.convertStringIntoObject(cacheParam);
		}

		if(cacheObject.error) {
			return cacheObject;
		}

		if(cacheValidation.hasUnallowedParam(cacheObject)) {
			return { error: 'Invalid Cache config' };
		}

		return cacheValidation.applyConfig(cacheObject, config);
	},

	isNumeric(varToVerify) {
		return !isNaN(parseFloat(varToVerify)) && !Array.isArray(varToVerify) && Number.isInteger(Number(varToVerify)) && (Number(varToVerify) === 0 || Number(varToVerify) >= 1);
	}

};

module.exports = cacheValidation.init;

// istanbul ignore next
if(process.env.NODE_ENV === 'test') {
	module.exports.testObject = cacheValidation;
}


