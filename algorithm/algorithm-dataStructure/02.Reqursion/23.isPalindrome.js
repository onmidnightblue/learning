// 앞으로 읽어도 거꾸로 읽어도 같은 글자인지 확인

const str = "tacocat";
// true

// solution 1
function isPalindrome(str) {
  function reverse(str) {
    if (str.length <= 1) return str;
    return reverse(str.slice(1)) + str[0];
  }
  const reverseStr = reverse(str);

  if (reverseStr === str) return true;
  return false;
}
console.log(isPalindrome(str));
