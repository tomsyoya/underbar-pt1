const _ = require('../underbar');

describe('every()', () => {
  describe('processing an array of numbers', () => {
    it('returns true if all numbers in an array are odd and we test for odd numbers', () => {
      const nums = [1, 3, 5, 7];
      expect(_.every(nums, num => num % 2 === 1)).toBe(true);
    });

    it('returns false if not all numbers in an array are odd and we test for odd numbers', () => {
      const nums = [1, 3, 5, 6, 7];
      expect(_.every(nums, num => num % 2 === 1)).toBe(false);
    });

  });
  
  describe('processing an Object', () => {
    it('returns true if all property has are odd', ()=>{
      const numObject = {
        'prop1' : 1,
        'prop2' : 3,
        'prop3' : 5,
        'prop4' : 7
      };
      expect(_.every(numObject, num => num % 2 === 1)).toBe(true);
    });
  });
  
});