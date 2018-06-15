const hasUnallowedParam = require('../lib/frc').hasUnallowedParam;

describe('hasUnallowedParam', () => {
	it('should have a global object', () => {
		expect(hasUnallowedParam).toBeDefined();
	});

	it('Should return false if isnt anything wrong', () => {
		expect(hasUnallowedParam({ 'max-age': 36000, public: true })).toEqual(false);
		expect(hasUnallowedParam({ 'no-store': true })).toEqual(false);
	});

	it('Should return error without = and without number value', () => {
		expect(hasUnallowedParam({ publics: true })).toEqual({ error: 'Unallowed paramemeter "publics" found. Check https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control for more details' });
	});
});
