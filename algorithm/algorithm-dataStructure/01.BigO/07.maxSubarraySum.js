// 연속된 n개의 숫자의 최대 합계

const arr = [1, 2, 5, 2, 8, 1, 5];
const n = 2;
// 10

// solution 1
function maxSubarraySum(arr, n) {
  if (n > arr.length) {
    return null;
  }
  let max = -Infinity;
  for (let i = 0; i < arr.length - n + 1; i++) {
    temp = 0;
    for (let j = 0; j < n; j++) {
      temp += arr[i + j];
    }
    if (temp > max) {
      max = temp;
    }
  }
  return max;
}
console.log(maxSubarraySum(arr, n)); // 10

// solution 2
function maxSubarraySum2(arr, n) {
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
console.log(maxSubarraySum2(arr, n)); // 10
