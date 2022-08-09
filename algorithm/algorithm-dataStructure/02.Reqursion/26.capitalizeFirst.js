// 배열의 첫번째 소문자만 대문자로

const arr = ["car", "taco", "banana"];
// ['Car', 'Taco', 'Banana']

// solution 1
function capitalizeFirst(arr) {
  if (arr.length === 1) {
    return [arr[0].slice(0, 1).toUpperCase() + arr[0].slice(1)];
  }
  let res = capitalizeFirst(arr.slice(0, -1));
  res.push(
    arr
      .slice(arr.length - 1)[0]
      .slice(0, 1)
      .toUpperCase() + arr.slice(arr.length - 1)[0].slice(1)
  );
  return res;
}
console.log(capitalizeFirst(arr));

// solution 2
function capitalizeFirst2(arr) {
  return arr.map((i) => i.slice(0, 1).toUpperCase() + i.slice(1));
}
console.log(capitalizeFirst2(arr));
