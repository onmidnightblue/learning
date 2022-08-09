// 중복을 무시하고 각각 다른 숫자가 몇개인지

const arr = [1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13];
// 7

// solution 1
// function countUniqueValues(arr) {
//   const newArr = new Set(arr);
//   const length = newArr.size;
//   return length;
// }
// console.log(countUniqueValues(arr)); // 7

// solution 2
function countUniqueValues2(arr) {
  if (arr.length === 0) return 0;
  let i = 0;

  for (let j = 1; j < arr.length; j++) {
    if (arr[i] !== arr[j]) {
      i++;
      arr[i] = arr[j];
    }
    console.log(arr[i], i);
  }
  return i + 1;
}
console.log(countUniqueValues2(arr)); // 7
