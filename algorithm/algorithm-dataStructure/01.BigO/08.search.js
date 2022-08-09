// 배열에서 n에 해당하는 값의 index

const arr = [1, 2, 3, 4, 5, 6];
const n = 4;
// 3

// solution 1
function search(arr, n) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === n) {
      return i;
    }
  }
  return -1;
}
console.log(search(arr, n)); // 3

// solution 2
function search2(arr, n) {
  let min = 0;
  let max = arr.length - 1;

  while (min <= max) {
    let middle = Math.floor((min + max) / 2);
    let currentElement = arr[middle];

    if (currentElement < n) {
      min = middle + 1;
    }
    if (currentElement > n) {
      max = middle - 1;
    }
    if (currentElement === n) {
      return middle;
    }
  }
  return -1;
}
console.log(search2(arr, n)); // 3
