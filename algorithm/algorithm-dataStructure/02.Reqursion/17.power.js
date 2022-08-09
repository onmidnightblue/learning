// 거듭제곱

const n1 = 2;
const n2 = 4;
// 16

// solution 1
function power(base, exponent) {
  if (exponent === 0) return 1;
  return base * power(base, exponent - 1);
}
console.log(power(n1, n2));
