const applyConfig = require('../index').testObject.applyConfig;

describe('applyConfig', () => {
	it('Should have a global applyConfig object', () => {
		expect(applyConfig).toBeFunction();
	});

	it('Should return true', () => {
		expect(applyConfig(1)).toEqual(true);
		expect(applyConfig('1')).toEqual(true);
		expect(applyConfig({ firstVar: false })).toEqual(true);
		expect(applyConfig(false)).toEqual(true);
		expect(applyConfig(true)).toEqual(true);
	});

	it('Should return false', () => {
		expect(applyConfig(1, {})).toEqual(false);
		expect(applyConfig('1', {})).toEqual(false);
		expect(applyConfig({ firstVar: false }, {})).toEqual(false);
		expect(applyConfig(false, {})).toEqual(false);
		expect(applyConfig(true, {})).toEqual(false);
	});

	it('Should return first value', () => {
		expect(applyConfig(1, { returnObject: true })).toEqual(1);
		expect(applyConfig('1', { returnObject: true })).toEqual('1');
		expect(applyConfig({ firstVar: false }, { returnObject: true })).toEqual({ firstVar: false });
		expect(applyConfig(false, { returnObject: true })).toEqual(false);
	});

	it('Should return string value', () => {
		expect(applyConfig({ 'max-value': 3600 }, { returnString: true })).toEqual('max-value=3600');
		expect(applyConfig({ first: 300, second: true, third: true }, { returnString: true })).toEqual('first=300, second, third');
	});
});
