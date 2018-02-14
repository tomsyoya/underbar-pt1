const _ = require('../underbar');

describe('uniq()', () => {
  it('de-dups a list of numbers', () => {
    const nums = [2, 4, 5, 5, 7, 4, 10, 2];
    expect(_.uniq(nums)).toEqual([2, 4, 5, 7, 10]);
  });
  
  it('de-dups a list of numbers and words', () => {
    const arr = [2, 4, '5', 5, 7, 4, 'apple', 2, 'apple', 4];
    expect(_.uniq(arr)).toEqual([2, 4, '5', 7, 'apple']);
  });
});