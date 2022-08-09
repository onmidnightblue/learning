// 배열 중 몇 개의 연속된 요소를 더해야 sum을 넘을 수 있는지 ?

const arr = [1, 4, 16, 22, 5, 7, 8, 9, 10];
const sum = 55;
// 5

// solution 1
function minSubArrayLen(arr, sum) {
  let total = 0;
  let start = 0;
  let end = 0;
  let minLen = Infinity;

  while (start < arr.length) {
    if (total < sum && end < arr.length) {
      total += arr[end];
      end++;
    } else if (total >= sum) {
      minLen = Math.min(minLen, end - start);
      total -= arr[start];
      start++;
    } else {
      break;
    }
  }

  return minLen === Infinity ? 0 : minLen;
}
console.log(minSubArrayLen(arr, sum));
