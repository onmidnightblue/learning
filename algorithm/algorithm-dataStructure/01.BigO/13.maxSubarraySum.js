// 배열의 요소 중 연속된 4개를 더한 것 중 최댓값 찾기

const arr = [1, 4, 2, 10, 23, 3, 1, 0, 20];
const n = 4;
// 39

// solution 1
function maxSubarraySum(arr, n) {
  let maxSum = 0;
  let tempSum = 0;
  if (arr.length < n) return null;

  for (let i = 0; i < n; i++) {
    maxSum += arr[i];
  }
  tempSum = maxSum;

  for (let i = n; i < arr.length; i++) {
    tempSum = tempSum - arr[i - n] + arr[i];
    maxSum = Math.max(maxSum, tempSum);
  }
  return maxSum;
}
console.log(maxSubarraySum(arr, n)); // 39
