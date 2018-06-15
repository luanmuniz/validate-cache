const convertToString = require('../lib/helpers').convertToString;

describe('convertToString', () => {
	it('should have a global object', () => {
		expect(convertToString).toBeDefined();
	});

	it('Should return empty string if param is not object', () => {
		expect(convertToString('max-age=3600 must-revalidate')).toEqual('');
	});

	it('Should return ignore if param has a key with false as value', () => {
		expect(convertToString({ one: false, two: 3600 })).toEqual('two=3600');
	});

	it('Should convert string corretly', () => {
		expect(convertToString({ one: true, two: 3600, three: true, four: 1000 })).toEqual('one, two=3600, three, four=1000'); // eslint-disable-line sort-keys
	});
});
