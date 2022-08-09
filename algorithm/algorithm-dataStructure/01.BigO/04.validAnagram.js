// 두 문자열이 문자가 같은지

const str1 = "anagram";
const str2 = "nagaram";
// true

// solution 1
function validAnagram(str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }

  const counter1 = {};
  const counter2 = {};

  for (let val of str1) {
    counter1[val] = (counter1[val] || 0) + 1;
  }
  for (let val of str2) {
    counter2[val] = (counter2[val] || 0) + 1;
  }
  for (let key in counter1) {
    if (counter2[key] !== counter1[key]) {
      return false;
    }
  }
  return true;
}
console.log(validAnagram(str1, str2));

// solution 2
function validAnagram2(first, second) {
  if (first.length !== second.length) {
    return false;
  }
  const lookup = {};

  for (let i = 0; i < first.length; i++) {
    let letter = first[i];
    lookup[letter] ? (lookup[letter] += 1) : (lookup[letter] = 1);
  }

  for (let i = 0; i < second.length; i++) {
    let letter = second[i];
    if (!lookup[letter]) {
      return false;
    } else {
      lookup[letter] -= 1;
    }
  }
  return true;
}

console.log(validAnagram2(str1, str2)); // true
