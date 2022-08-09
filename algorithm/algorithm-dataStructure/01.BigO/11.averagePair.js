// 배열에서 요소 두 개의 평균이 num과 같은 값이 있는지 확인

const arr = [1, 3, 3, 5, 6, 7, 10, 12, 19];
const num = 8;
// true

// solution 1
function averagePair(arr, num) {
  let start = 0;
  let end = arr.length - 1;
  while (start < end) {
    let avg = (arr[start] + arr[end]) / 2;
    if (avg === num) return true;
    if (avg < num) start++;
    if (avg > num) end--;
  }
  return false;
}

console.log(averagePair(arr, num)); // true
