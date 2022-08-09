// 요소들에서 중복된 값이 있는지 확인

const num1 = 1;
const num2 = 2;
const num3 = 3;
// false

const str1 = "a";
const str2 = "b";
const str3 = "c";
const str4 = "a";
// true

// solution 1
// function areThereDuplicates(...args) {
//   let collection = {};
//   for (let val in arguments) {
//     collection[arguments[val]] = (collection[arguments[val]] || 0) + 1;
//   }
//   for (let key in collection) {
//     if (collection[key] > 1) return true;
//   }
//   return false;
// }
// console.log(areThereDuplicates(str1, str2, str3, str4));

// solution 3
function areThereDuplicates2() {
  return new Set(arguments).size !== arguments.length;
}
console.log(areThereDuplicates2(str1, str2, str3, str4)); // true
