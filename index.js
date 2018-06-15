const Helpers = require('./lib/helpers');
const FRC = require('./lib/frc');

const cacheValidation = {

	applyConfig(finalObject, config) {
		if(!config) {
			return true;
		}

		if(config && config.returnObject) {
			return finalObject;
		}

		if(config && config.returnString) {
			return Helpers.convertToString(finalObject);
		}

		return false;
	},

	init(cacheParam, config) {
		if(!cacheParam) {
			return { error: 'No cache to validate. Check https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control for more details' };
		}

		let cacheObject = cacheParam;
		if(typeof cacheParam === 'string') {
			if(Helpers.hasDuplicatedConfiguration(cacheParam)) {
				return { error: 'No duplicated configuration is allowed' };
			}

			cacheObject = Helpers.convertStringIntoObject(cacheParam);
		}

		if(cacheObject.error) {
			return cacheObject;
		}

		const isFRCCompliant = FRC.isFRCCompliant(cacheObject);

		if(isFRCCompliant.error) {
			return isFRCCompliant;
		}

		return cacheValidation.applyConfig(cacheObject, config);
	}

};

module.exports = cacheValidation.init;

// istanbul ignore next
if(process.env.NODE_ENV === 'test') {
	module.exports.testObject = cacheValidation;
}
