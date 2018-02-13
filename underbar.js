// Returns the first n elements of the given array.
const first = function(array, n = 1) {
  return n === 1 ? array[0] : array.slice(0, n);
};

// Returns the last n elements of the given array.
const last = function(array, n = 1) {
  return n === 1 ? array[array.length - 1] : array.slice(Math.max(0, array.length - n));
};

// see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
const indexOf = function(array, target, fromIndex=0) {
  // This is not the most efficient solution but we use each() here for the learning value.
  // The code reuse is nice and it avoids off-by-one errors from using for-loops.
  let result = -1;
  each(array, function(item, index) {
    if (index >= fromIndex && result === -1 && item === target) {
      result = index;
    }
  });
  return result;
};

const isArrayLike = function(obj) {
  const length = obj['length'];
  return typeof length === 'number' && length >= 0;
};

// The cornerstone of a functional library -- iterate all elements, pass each to a callback function.
// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
const each = function(obj, callback) {
  if (isArrayLike(obj)) {
    for (let index = 0; index < obj.length; index++) {
      callback(obj[index], index, obj);
    }
  } else {
    for (let key in obj) {
      callback(obj[key], key, obj);
    }
  }
};

// Return the results of applying the callback to each element.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
const map = function(obj, callback) {
  const results = [];
  each(obj, (currentValue, currentIndexOrKey, obj) => {
    results.push(callback(currentValue, currentIndexOrKey, obj));
  });
  return results;
};

// Return an array of the values of a certain property in the collection.
// E.g. given an array of people objects, return an array of just their ages.
const pluck = function(obj, key) {
  return map(obj, item => item[key]);
};

// Reduces collection to a value which is the accumulated result of running
// each element through the callback, where each successive
// invocation is supplied the return value of the previous invocation. If `accumulator`
// is not given, the first element of the collection is used as the initial
// value. The callback is invoked with four arguments:
// (accumulator, value, index|key, collection).
//アキュムレータと配列の各要素に対してcallback関数を実行する
const reduce = function(obj, callback, initialValue) {
  //第３引数に値が入力されているか確認
  let accumulator = initialValue; //関数を実行する際の計算をする初期値を設定
  let initializing = accumulator === undefined;
  //配列内の各要素に対してeach(forEachのようなもの)を実行
  each(obj, (currentValue, currentIndexOrKey, iteratedObj)  => {
    if (initializing) {
      initializing = false;
      accumulator = currentValue;
    } else {
      //第２引数で指定した関数を実行
      accumulator = callback(accumulator, currentValue, currentIndexOrKey, iteratedObj);
    }
  });
  return accumulator; //実行結果を返す
};

// Return true if the object contains the target.
const contains = function(obj, target) {
  return reduce(obj, (wasFound, item) => {
    return wasFound || item === target; //左から確認していき、trueであった方を返す
  }, false); //reduceに渡す際に最初にtrueが入らないようにする
};

// Return true if all the elements / object values are accepted by the callback.
//配列またはオブジェクト内の値を全てコールバック関数に渡して検証し、全てtrueだった場合にtrueを返す。一つでもfalseになった場合はfalseが返される
const every = function(obj, callback) {
  return reduce(obj, (allPassed, item) => {
    return allPassed && !!callback(item);
  }, true);
};

// Return true if even 1 element / object value is accepted by the callback.
//配列またはオブジェクト内の値を全てコールバック関数で検証し、一つでもtrueだった場合、trueを返す 全てfalseだった場合、falseを返す
const some = function(obj, callback) {
  return reduce(obj, (anyPassed, item) => {
    return anyPassed || !!callback(item);
  }, false);
};

// Return an array with all elements / object values that are accepted by the callback.
const filter = function(obj, callback) {
  const result = [];
  each(obj, item => {
    if (callback(item)) {
      result.push(item);
    }
  });
  return result;
};

// Return object without the elements / object valuesthat were rejected by the callback.
const reject = function(obj, callback) {
  return filter(obj, item => !callback(item));
};

// De-duplicates (de-dups) the elements / object values.
const uniq = function(obj) {
  const foundItems = {};
  return filter(obj, item => {
    if (item in foundItems) {
      return false;
    }
    foundItems[item] = true;
    return true;
  });
};


module.exports = {
  contains: contains,
  each: each,
  every: every,
  filter: filter,
  first: first,
  indexOf: indexOf,
  isArrayLike,
  last: last,
  map: map,
  pluck: pluck,
  reduce: reduce,
  reject: reject,
  some: some,
  uniq: uniq
};


