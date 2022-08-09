// 배열 중 홀수

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// [1, 3, 5, 7, 9]

// solution 1
function collectOddValues(arr) {
  let result = [];

  function helper(helperInput) {
    if (helperInput.length === 0) {
      return;
    }
    if (helperInput[0] % 2 !== 0) {
      result.push(helperInput[0]);
    }

    helper(helperInput.slice(1));
  }
  helper(arr);

  return result;
}
console.log(collectOddValues(arr));

// solution 2
function collectOddValues1(arr) {
  let newArr = [];

  if (arr.length === 0) {
    return newArr;
  }

  if (arr[0] % 2 !== 0) {
    newArr.push(arr[0]);
  }

  newArr = newArr.concat(collectOddValues1(arr.slice(1)));
  return newArr;
}
console.log(collectOddValues1(arr));

// solution 3
function collectOddValues2(arr) {
  return arr.filter((i) => i % 2 !== 0);
}
console.log(collectOddValues2(arr));
