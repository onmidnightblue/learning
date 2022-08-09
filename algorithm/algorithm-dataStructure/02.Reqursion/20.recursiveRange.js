// n과 n보다 작은 정수들의 합

const n = 6;
// 21

// solution 1
function recursiveRange(n) {
  if (n <= 0) return 0;
  return n + recursiveRange(n - 1);
}
console.log(recursiveRange(n));
