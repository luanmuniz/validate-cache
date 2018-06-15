const hasDuplicatedConfiguration = require('../lib/helpers').hasDuplicatedConfiguration;

describe('hasDuplicatedConfiguration', () => {
	it('should have a global object', () => {
		expect(hasDuplicatedConfiguration).toBeDefined();
	});

	it('Should return false if there is no duplicated', () => {
		expect(hasDuplicatedConfiguration('max-age=3600, must-revalidate')).toEqual(false);
	});

	it('Should return true, if there is duplicated values', () => {
		expect(hasDuplicatedConfiguration('max-age=3600, must-revalidate, must-revalidate')).toEqual(true);
		expect(hasDuplicatedConfiguration('max-age=3600, must-revalidate, max-age=3600')).toEqual(true);
		expect(hasDuplicatedConfiguration('max-age=3600, must-revalidate, max-age=36000')).toEqual(true);
	});
});
