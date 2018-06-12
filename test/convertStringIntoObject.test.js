const convertStringIntoObject = require('../index').testObject.convertStringIntoObject;

describe('convertStringIntoObject', () => {
	it('should have a global convertStringIntoObject object', () => {
		expect(convertStringIntoObject).toBeDefined();
	});

	it('Should return error without commas', () => {
		expect(convertStringIntoObject('max-age=3600 must-revalidate')).toEqual({ error: 'Cache string not valid' });
	});

	it('Should return error without = and without number value', () => {
		expect(convertStringIntoObject('max-age=asd')).toEqual({ error: 'Expect to find a number for configuration but found something else' });
	});

	it('Should convert correctly', () => {
		expect(convertStringIntoObject('max-age=3600, must-revalidate, immutable')).toEqual({
			immutable: true,
			'max-age': 3600,
			'must-revalidate': true
		});
	});
});
