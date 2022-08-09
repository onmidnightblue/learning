// str1에 있는 문자열이 str2에 포함되는지 확인

const str1 = "hello";
const str2 = "hello world";
// true

// solution 1
function isSubsequence(str1, str2) {
  let i = 0;
  let j = 0;
  if (!str1) return true;
  while (j < str2.length) {
    if (str2[j] === str1[i]) i++;
    if (i === str1.length) return true;
    j++;
  }
  return false;
}
console.log(isSubsequence(str1, str2));

// solution 2
function isSubsequence2(str1, str2) {
  if (str1.length === 0) return true;
  if (str2.length === 0) return false;
  if (str2[0] === str1[0]) return isSubsequence(str1.slice(1), str2.slice(1));
  return isSubsequence(str1, str2.slice(1));
}
console.log(isSubsequence2(str1, str2));
