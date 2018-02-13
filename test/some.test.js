const _ = require('../underbar');

describe('some()', () => {
  it('returns true if any number is odd', () => {
    const nums = [2, 4, 5, 6];
    expect(_.some(nums, num => num % 2 === 1)).toBe(true);
  });

  it('returns false if no number is odd', () => {
    const nums = [2, 4, 6, 8];
    expect(_.some(nums, num => num % 2 === 1)).toBe(false);
  });
  
  it('returns true if any object value type is number', () => {
    const nums = {
      'prop1' : '2', 
      'prop2' : '4', 
      'prop3' : '6', 
      'prop4' : 8
    };
    expect(_.some(nums, num => typeof num  === 'number')).toBe(true);
  });
  
  it('returns false if no object value type is number', () => {
    const nums = {
      'prop1' : '2', 
      'prop2' : '4', 
      'prop3' : '6', 
      'prop4' : '8'
    };
    expect(_.some(nums, num => typeof num  === 'number')).toBe(false);
  });

});