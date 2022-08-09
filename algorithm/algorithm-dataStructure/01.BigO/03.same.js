// 두 배열이 제곱의 관계에 있는지

const arr1 = [1, 2, 3];
const arr2 = [4, 1, 9];
// true

// solution 1
function same1(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (correctIndex === -1) {
      return false;
    }
    arr2.splice(correctIndex, 1);
  }
  return true;
}
console.log(same1(arr1, arr2)); // true

// solution 2
function same2(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  let counter1 = {};
  let counter2 = {};
  for (let val of arr1) {
    counter1[val] = (counter1[val] || 0) + 1;
  }
  for (let val of arr2) {
    counter2[val] = (counter2[val] || 0) + 1;
  }
  for (let key in counter1) {
    if (!(key ** 2 in counter2) && counter2[key ** 2] !== counter1[key]) {
      return false;
    }
  }
  return true;
}
console.log(same2(arr1, arr2)); // true
