// 문자열에서 문자의 갯수

const str = "hello";
// {h: 1, e: 1, l: 2, o: 1}

// solution 1
function charCount1(str) {
  let obj = {};
  for (let i = 0; i < str.length; i++) {
    let char = str[i].toLowerCase();
    if (/[a-z0-9]/.test(char)) {
      if (obj[char] > 0) {
        obj[char]++;
      } else {
        obj[char] = 1;
      }
    }
  }
  return obj;
}
console.log(charCount1(str)); // {h: 1, e: 1, l: 2, o: 1}

// solution 2
function charCount2(str) {
  let obj = {};
  for (let char of str) {
    char = char.toLowerCase();
    if (/[a-z0-9]/.test(char)) {
      obj[char] = ++obj[char] || 1;
    }
  }
  return obj;
}
console.log(charCount2(str)); // {h: 1, e: 1, l: 2, o: 1}

// solution 3
function isAlphaNumeric(char) {
  let code = char.charCodeAt(0);
  if (
    !(code > 47 && code < 58) && // 47-58 : 0-9
    !(code > 64 && code < 91) && // 64-91 : A-Z
    !(code > 96 && code < 123) // 96-123 : a-z
  ) {
    return false;
  }
  return true;
}
function charCount3(str) {
  let obj = {};
  for (let char of str) {
    if (isAlphaNumeric(char)) {
      char = char.toLowerCase();
      obj[char] = ++obj[char] || 1;
    }
  }
  return obj;
}
console.log(charCount3(str)); // {h: 1, e: 1, l: 2, o: 1}
