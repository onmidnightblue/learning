// n과 같은 값을 찾아 있다면 index를 반환하고, 없다면 -1을 반환

const arr = [10, 15, 20, 25, 30];
const n = 15;
// 2

// solution 1
function linearSearch(arr, n) {
  return arr.indexOf(n);
}
console.log(linearSearch(arr, n));

// solution 2
function linearSearch(arr, n) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === n) return i;
  }
  return -1;
}
console.log(linearSearch(arr, n));
