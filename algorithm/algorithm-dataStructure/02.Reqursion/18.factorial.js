// 팩토리얼

const n = 7;
// 5040

// solution 1
function factorial(n) {
  if (n < 0) return 0;
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
console.log(factorial(n));
