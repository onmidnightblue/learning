// 배열 평평하게 펴기

const arr = [1, [2, [3, 4], [[5]]]];
// [1, 2, 3, 4, 5]

// solution 1
function flatten(arr) {
  return arr.flat(Infinity);
}
console.log(flatten(arr));

// solution 2
function flatten1(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      newArr = newArr.concat(flatten1(arr[i]));
    } else {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}
console.log(flatten1(arr));

// solution 3
function flatten2(arr, d = 1) {
  return d > 0
    ? arr.reduce(
        (acc, val) =>
          acc.concat(Array.isArray(val) ? flatten2(val, d - 1) : val),
        []
      )
    : arr.slice();
}
console.log(flatten2(arr, Infinity));
