// 작은 순에서 큰 순으로 정렬된 배열에서 n과 같은 값을 찾아 index를 반환하고, 없다면 -1

const arr = [
  5, 6, 10, 13, 14, 18, 30, 34, 35, 37, 40, 44, 64, 79, 84, 86, 95, 96, 98, 99,
];
const n = 95;
// 16

function binarySearch(arr, n) {
  let start = 0;
  let end = arr.length - 1;
  let middle = Math.floor((start + end) / 2);

  while (arr[middle] !== n && start <= end) {
    if (n < arr[middle]) {
      end = middle - 1;
    }
    if (n > arr[middle]) {
      start = middle + 1;
    }
    middle = Math.floor((start + end) / 2);
  }
  return arr[middle] === n ? middle : -1;
}
console.log(binarySearch(arr, n));
