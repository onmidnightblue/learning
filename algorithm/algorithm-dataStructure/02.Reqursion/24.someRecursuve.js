// 주어진 함수에 포함하는 것이 하나라도 있는 경우 true

const isOdd = (val) => val % 2 !== 0;

const arr = [2, 4, 6];
const func = isOdd;
// true

// solution 1
function someRecursive(arr, func) {
  if (arr.length === 0) return false;
  if (func(arr.shift())) return true;
  return someRecursive(arr, func);
}
console.log(someRecursive(arr, func));

// solution 2
function someRecursive(array, callback) {
  if (array.length === 0) return false;
  if (callback(array[0])) return true;
  return someRecursive(array.slice(1), callback);
}
