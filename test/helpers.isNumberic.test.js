const isNumeric = require('../lib/helpers').isNumeric;

describe('isNumeric', () => {
	it('should have a global object', () => {
		expect(isNumeric).toBeDefined();
	});

	it('should return true for positive integers', () => {
		expect(isNumeric(1)).toBeTruthy();
		expect(isNumeric(0)).toBeTruthy();
		expect(isNumeric('1')).toBeTruthy();
		expect(isNumeric('0')).toBeTruthy();
		expect(isNumeric('1.')).toBeTruthy();

		expect(isNumeric(-1)).toBeFalsy();
		expect(isNumeric('-1')).toBeFalsy();
	});

	it('should return true and false for max / min numbers', () => {
		expect(isNumeric(Number.MAX_VALUE)).toBeTruthy();
		expect(isNumeric(Number.MIN_VALUE)).toBeFalsy();
		expect(isNumeric(2147483648)).toBeTruthy(); // eslint-disable-line no-magic-numbers
		expect(isNumeric(2147483649)).toBeTruthy(); // eslint-disable-line no-magic-numbers
	});

	it('should return true for hexadecimals', () => {
		expect(isNumeric(0xFF)).toBeTruthy(); // eslint-disable-line no-magic-numbers
		expect(isNumeric('0xFF')).toBeTruthy();
	});

	it('should return false for floating-points', () => {
		expect(isNumeric(1.1)).toBeFalsy(); // eslint-disable-line no-magic-numbers
		expect(isNumeric(0.1)).toBeFalsy(); // eslint-disable-line no-magic-numbers
		expect(isNumeric(-1.1)).toBeFalsy(); // eslint-disable-line no-magic-numbers
		expect(isNumeric(-0.1)).toBeFalsy(); // eslint-disable-line no-magic-numbers
		expect(isNumeric('1.1')).toBeFalsy();
		expect(isNumeric('0.1')).toBeFalsy();
		expect(isNumeric('-1.1')).toBeFalsy();
		expect(isNumeric('-0.1')).toBeFalsy();
		expect(isNumeric('.1')).toBeFalsy();
	});

	it('should return false for negative exponentials and true for positive ones', () => {
		expect(isNumeric(3e5)).toBeTruthy(); // eslint-disable-line no-magic-numbers
		expect(isNumeric('3e5')).toBeTruthy();

		expect(isNumeric('123e-2')).toBeFalsy();
		expect(isNumeric(123e-2)).toBeFalsy(); // eslint-disable-line no-magic-numbers
	});

	it('should return false with decimal commas', () => {
		expect(isNumeric('1,1')).toBeFalsy();
	});

	it('should return false for multiple commas', () => {
		expect(isNumeric('1,1,1')).toBeFalsy();
		expect(isNumeric('1,1,1,1')).toBeFalsy();
	});

	it('should return false for empty / whitespace', () => {
		expect(isNumeric()).toBeFalsy();
		expect(isNumeric('')).toBeFalsy();
		expect(isNumeric('    ')).toBeFalsy();
		expect(isNumeric('  ')).toBeFalsy();
		expect(isNumeric('\t')).toBeFalsy();
		expect(isNumeric('\n')).toBeFalsy();
		expect(isNumeric('\r')).toBeFalsy();
	});

	it('should return false for strings that aren\'t numeric', () => {
		expect(isNumeric('ABC')).toBeFalsy();
		expect(isNumeric('abc')).toBeFalsy();
		expect(isNumeric('ABC123')).toBeFalsy();
		expect(isNumeric('abc123')).toBeFalsy();
		expect(isNumeric('123ABC')).toBeFalsy();
		expect(isNumeric('123abc')).toBeFalsy();
	});

	it('should return false for multiple decimals', () => {
		expect(isNumeric('1.1.1')).toBeFalsy();
		expect(isNumeric('1.1.1.1')).toBeFalsy();
	});

	it('should return false for booleans', () => {
		expect(isNumeric(true)).toBeFalsy();
		expect(isNumeric(false)).toBeFalsy();
	});

	it('should return false for null / undefined / NaN', () => {
		expect(isNumeric(null)).toBeFalsy();
		expect(isNumeric(undefined)).toBeFalsy(); // eslint-disable-line no-undefined
		expect(isNumeric(NaN)).toBeFalsy();
	});

	it('should return false for infinity and Number._INFINITY (ironically)', () => {
		expect(isNumeric(Infinity)).toBeFalsy();
		expect(isNumeric(Number.POSITIVE_INFINITY)).toBeFalsy();
		expect(isNumeric(Number.NEGATIVE_INFINITY)).toBeFalsy();
	});

	it('should return false for dates', () => {
		expect(isNumeric(new Date())).toBeFalsy();
		expect(isNumeric(new Date(2000, 1, 1))).toBeFalsy(); // eslint-disable-line no-magic-numbers
	});

	it('should return false for arrays', () => {
		expect(isNumeric([])).toBeFalsy();
		expect(isNumeric([ 1 ])).toBeFalsy();
		expect(isNumeric([ 1, 2 ])).toBeFalsy();
		expect(isNumeric([ 'a' ])).toBeFalsy();
		expect(isNumeric([ 'a', 'b' ])).toBeFalsy();
	});

	it('should return false for empty objects', () => {
		expect(isNumeric({})).toBeFalsy();
	});

	it('should return false for functions', () => {
		expect(isNumeric(() => { })).toBeFalsy(); // eslint-disable-line no-empty-function
		expect(isNumeric((a) => { })).toBeFalsy(); // eslint-disable-line no-empty-function, id-length, no-unused-vars
		expect(isNumeric(() => 'a')).toBeFalsy();
		expect(isNumeric(() => 1)).toBeFalsy();
	});
});
