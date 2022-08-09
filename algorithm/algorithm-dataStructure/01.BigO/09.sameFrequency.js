// 두 숫자형이 같은 숫자를 가지고 있는지

const num1 = 182;
const num2 = 281;
// true

// solution 1
function sameFrequency(num1, num2) {
  const n1 = num1.toString();
  const n2 = num2.toString();
  if (n1.length !== n2.length) return false;

  const count1 = {};
  const count2 = {};

  for (let i in n1) {
    count1[n1[i]] = (count1[n1[i]] || 0) + 1;
  }
  for (let i in n2) {
    count2[n2[i]] = (count2[n2[i]] || 0) + 1;
  }
  for (let key in count1) {
    if (count2[key] !== count1[key]) return false;
  }

  return true;
}
console.log(sameFrequency(182, 281)); // true
