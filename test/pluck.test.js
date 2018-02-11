const _ = require('../underbar');

describe('pluck()', () => {
  it('returns an array of just ages, given an array of people objects', () => {
    const people = [
      { name: 'Harriet', age: 12},
      { name: 'Lazarus', age: 999},
      { name: 'Bethany', age: 14}
    ];
    const result = _.pluck(people, 'age');
    expect(result).toEqual([12, 999, 14]);
  });
  
  it('returns an array of just ages in object, given an array of objects', () => {
    const people = [
      { name: 'Harriet', data:{age: 12, sex: 'male'}},
      { name: 'Lazarus', data:{age: 999, sex: 'female'}},
      { name: 'Bethany', data:{age: 14, sex: 'male'}}
    ];
    const objArrays = _.pluck(people, 'data');
    const result = _.pluck(objArrays, 'age');
    expect(result).toEqual([12, 999, 14]);
  });

});