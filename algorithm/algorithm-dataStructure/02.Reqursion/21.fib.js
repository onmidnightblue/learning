// 피보나치 숫자와 재귀

const n = 10;
// 55

// solution 1
function fib(n) {
  if (n <= 2) return 1;
  return fib(n - 1) + fib(n - 2);
}
fib(n);

// 1, 1, 2, 3, 5...
