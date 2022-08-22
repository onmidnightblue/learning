function numberCompare(num1, num2) {
  return num1 - num2;
}

console.log([6, 4, 15, 10].sort(numberCompare));
// [ 4, 6, 10, 15 ]

// num1 - num2가 음수를 반환하면 num1이 앞에 옴
// num1 - num2가 양수를 반환하면 num2가 앞에 옴

function compareByLen(str1, str2) {
  return str1.length - str2.length;
}
console.log(["Apple", "Banana", "Pineapple", "Raspberry"].sort(compareByLen));
// [ 'Apple', 'Banana', 'Pineapple', 'Raspberry' ]
