const init = require('../index').testObject.init;

describe('init', () => {
	it('should have a global init object', () => {
		expect(init).toBeFunction();
	});

	it('should return an error if not pass a parameter', () => {
		expect(init()).toEqual({ error: 'No cache to validate' });
	});

	it('should return an error if pass a parameter that\'s not a cahce config', () => {
		expect(init('asd')).toEqual({ error: 'Invalid Cache config' });
	});

	it('should return correctly if a string is sent', () => {
		expect(init('max-age=36000')).toEqual(true);
		expect(init('max-age=36000', { returnObject: true })).toEqual({ 'max-age': 36000 });
		expect(init('max-age=36000', { returnString: true })).toEqual('max-age=36000');


		expect(init('max-age=36000, public')).toEqual(true);
		expect(init('max-age=36000, public', { returnObject: true })).toEqual({ 'max-age': 36000, public: true });
		expect(init('max-age=36000, public', { returnString: true })).toEqual('max-age=36000, public');
	});

	it('should return correctly if an object is sent', () => {
		expect(init({ 'max-age': 36000 })).toEqual(true);
		expect(init({ 'max-age': 36000 }, { returnObject: true })).toEqual({ 'max-age': 36000 });
		expect(init({ 'max-age': 36000 }, { returnString: true })).toEqual('max-age=36000');


		expect(init({ 'max-age': 36000, public: true })).toEqual(true);
		expect(init({ 'max-age': 36000, public: true }, { returnObject: true })).toEqual({ 'max-age': 36000, public: true });
		expect(init({ 'max-age': 36000, public: true }, { returnString: true })).toEqual('max-age=36000, public');
	});

	it('Should return an error from parsing the initial param', () => {
		expect(init('max-age=asd')).toEqual({ error: 'Expect to find a number for configuration but found something else' });
		expect(init('max-age=3600 must-revalidate')).toEqual({ error: 'Cache string not valid' });
	});
});
