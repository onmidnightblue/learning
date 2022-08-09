// n까지의 합계

const n = 6;
// 21

// solution 1
function add1(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}
console.log(add1(n)); // 21

// solution 2
function add2(n) {
  return (n * (n + 1)) / 2;
}
console.log(add2(n)); // 21
