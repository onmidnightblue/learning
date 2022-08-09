// 문자열 중 같은 문자가 중복되지 않은, 제일 긴 문자열의 갯수

const str = "longestsubstring";
// 8

// solution 1
function findLongestSubstring(str) {
  let longest = 0;
  let getIndex = {};
  let start = 0;

  for (let i = 0; i < str.length; i++) {
    let letter = str[i];

    if (getIndex[letter]) {
      start = Math.max(start, getIndex[letter]);
    }

    longest = Math.max(longest, i - start + 1);

    getIndex[letter] = i + 1;
  }
  return longest;
}
console.log(findLongestSubstring(str));
