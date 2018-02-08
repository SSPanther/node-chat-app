const expect = require('expect');

// import isRealString
const { isRealString } = require('./validation');

// isRealString
describe('isRealString', () => {
    
    it('should reject non-string values', () => {
        var input = 0;

        var result = isRealString(input);

        expect(result).toBeFalsy();
    });

    it('should reject string with only spaces', () => {
        var input = '     ';

        var result = isRealString(input);

        expect(result).toBeFalsy();
    });

    it('should allow string with non-space characters', () => {
        var input = 'Some string';

        var result = isRealString(input);

        expect(result).toBeTruthy();
    });
});

   
