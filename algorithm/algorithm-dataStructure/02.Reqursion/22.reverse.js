// 문자열 역순

const str = "awesome";
// emosewa

// solution 1
function reverse(str) {
  if (str.length <= 1) return str;
  return reverse(str.slice(1)) + str[0];
}
console.log(reverse(str));
