const init = require('../index').testObject.init;

describe('init', () => {
	it('should have a global object', () => {
		expect(init).toBeFunction();
	});

	it('should return an error if not pass a parameter', () => {
		expect(init()).toEqual({ error: 'No cache to validate. Check https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control for more details' });
	});

	it('should return an error if pass a parameter that\'s not a cache config', () => {
		expect(init('asd')).toEqual({ error: 'Unallowed paramemeter "asd" found. Check https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control for more details' });
	});

	it('should return an error 2147483648 if passed a number grater than that', () => {
		expect(init('max-age=2147483649')).toEqual(true);
		expect(init('max-age=2147483650', { returnObject: true })).toEqual({ 'max-age': 2147483648 });
		expect(init('max-age=2147483651', { returnString: true })).toEqual('max-age=2147483648');
	});

	it('should return correctly if a string is sent', () => {
		expect(init('max-age=36000')).toEqual(true);
		expect(init('max-age=36000', { returnObject: true })).toEqual({ 'max-age': 36000 });
		expect(init('max-age=36000', { returnString: true })).toEqual('max-age=36000');


		expect(init('max-age=36000, public')).toEqual(true);
		expect(init('max-age=36000, public', { returnObject: true })).toEqual({ 'max-age': 36000, public: true });
		expect(init('max-age=36000, public', { returnString: true })).toEqual('max-age=36000, public');
	});

	it('should return duplicated error', () => {
		expect(init('max-age=3600, must-revalidate, must-revalidate')).toEqual({ error: 'No duplicated configuration is allowed' });
		expect(init('max-age=3600, must-revalidate, max-age=3600')).toEqual({ error: 'No duplicated configuration is allowed' });
		expect(init('max-age=3600, must-revalidate, max-age=36000')).toEqual({ error: 'No duplicated configuration is allowed' });
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
		expect(init('max-age=asd')).toEqual({ error: 'Expect to find a number for configuration but found something else. Check https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control for more details' });
		expect(init('max-age=3600 must-revalidate')).toEqual({ error: 'Cache string not valid. Check https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control for more details' });
	});
});
