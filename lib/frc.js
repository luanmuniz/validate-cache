const FRC = {

	allCaches: [ 'public', 'private', 'no-cache', 'only-if-cached' ],
	allExpirationPrefix: [ 'max-age', 's-maxage', 'max-stale', 'min-fresh', 'stale-while-revalidate', 'stale-if-error' ],
	allOtherCacheConfig: [ 'no-store', 'no-transform' ],
	allRevalidations: [ 'must-revalidate', 'proxy-revalidate', 'immutable' ],

	/**
	 * THis function check to see if there is any unallowed parameter. See that the allowed ones are in these arrays above
	 *
	 * @param {Object} cacheObject - An Cache string trasnformed in object
	 * @returns {Boolean} - Return true if all params are allowed
	 */
	hasUnallowedParam(cacheObject) {
		let hasError = false;
		const allAllowedParams = [
			...FRC.allCaches,
			...FRC.allExpirationPrefix,
			...FRC.allOtherCacheConfig,
			...FRC.allRevalidations
		];

		Object.keys(cacheObject).forEach(config => {
			if(!allAllowedParams.includes(config)) {
				hasError = { error: `Unallowed paramemeter "${config}" found. Check https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control for more details` };
			}
		});

		return hasError;
	},

	/**
	 * This function check to see if the params are FRC compliant
	 *
	 * @param {Object} cacheObject - An Cache string trasnformed in object
	 * @returns {Boolean} Return true if the cache config is FRC Compliant
	 */
	isFRCCompliant(cacheObject) {
		let isCompliant = true;
		const hasUnallowedParam = FRC.hasUnallowedParam(cacheObject);

		if(hasUnallowedParam && hasUnallowedParam.error) {
			isCompliant = hasUnallowedParam;
		}

		if(!FRC.checkIfCacheIsEnabled(cacheObject)) {
			isCompliant = { error: 'The params "no-store" or "private" must appear alone' };
		}

		return isCompliant;
	},

	/**
	 * This function check for compliance with FRC 7234 Section 1.2.1
	 *
	 * @param {Number} cacheTime - An integer representing the time in secons
	 * @returns {Number} 2147483648 or the params itself
	 */
	maxCacheTime(cacheTime) {
		if(cacheTime > 2147483648) { // eslint-disable-line no-magic-numbers
			return 2147483648; // eslint-disable-line no-magic-numbers
		}

		return cacheTime;
	},

	/**
	 * This function check for compliance with FRC 7234 Section 3
	 * Is says that if no-store or private is set, there should be no cache
	 *
	 * @param {Object} cacheObject - An Cache string trasnformed in object
	 * @returns {Boolean} Return true if the varibles appear alone for they are not set
	 */
	checkIfCacheIsEnabled(cacheObject) { // eslint-disable-line sort-keys
		const allCacheKeys = Object.keys(cacheObject);

		if(allCacheKeys.includes('no-store') && allCacheKeys.length > 1) {
			return false;
		}

		if(allCacheKeys.includes('private') && allCacheKeys.length > 1) {
			return false;
		}

		return true;
	}

};

module.exports = FRC;
