const isFRCCompliant = require('../lib/frc').isFRCCompliant;

describe('isFRCCompliant', () => {
	it('should have a global object', () => {
		expect(isFRCCompliant).toBeDefined();
	});

	it('Should return true', () => {
		expect(isFRCCompliant({ 'max-age': 36000, public: true })).toEqual(true);
		expect(isFRCCompliant({ 'no-store': true })).toEqual(true);
		expect(isFRCCompliant({ private: true })).toEqual(true);
	});

	it('Should return error because no-store and private inst alone', () => {
		expect(isFRCCompliant({ 'max-age': 3600, private: true })).toEqual({ error: 'The params "no-store" or "private" must appear alone' });
		expect(isFRCCompliant({ 'max-age': 3600, 'no-store': true })).toEqual({ error: 'The params "no-store" or "private" must appear alone' });
		expect(isFRCCompliant({ 'no-store': true, private: true })).toEqual({ error: 'The params "no-store" or "private" must appear alone' });
	});
});
