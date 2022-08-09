// 배열 안에서 두 개의 숫자를 합해서 0만들기

arr = [-3, -2, -1, 0, 1, 2, 3];
// [-3, 3]

// solution 1
function sumZero1(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === 0) {
        return [arr[i], arr[j]];
      }
    }
  }
}
console.log(sumZero1(arr)); // [-3, 3]

// solution 2
function sumZero2(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    let sum = arr[left] + arr[right];
    if (sum === 0) {
      return [arr[left], arr[right]];
    } else if (sum > 0) {
      right--;
    } else {
      left++;
    }
  }
}
console.log(sumZero2(arr)); // [-3, 3]
