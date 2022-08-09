// 배열 안의 모든 숫자의 곱

const arr = [1, 2, 3, 10];
// 60

// solution 1
function productOfArray(arr) {
  if (arr.length === 0) {
    return 1;
  }
  return arr[0] * productOfArray(arr.slice(1));
}
console.log(productOfArray(arr));
