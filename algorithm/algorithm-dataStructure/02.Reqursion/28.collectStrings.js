// 문자만 골라내서 배열에 담아 출력

const obj = {
  stuff: "foo",
  data: {
    val: {
      thing: {
        info: "bar",
        moreInfo: {
          evenMoreInfo: {
            weMadeIt: "baz",
          },
        },
      },
    },
  },
};
// ["foo", "bar", "baz"]

// solution 1
function collectStrings(obj) {
  const newArr = [];

  function pushArr(obj) {
    for (let key in obj) {
      if (typeof obj[key] === "string") {
        newArr.push(obj[key]);
      }
      if (typeof obj[key] === "object") {
        return pushArr(obj[key]);
      }
    }
  }
  pushArr(obj);

  return newArr;
}
console.log(collectStrings(obj));

// solution 2
function collectStrings2(obj) {
  var stringsArr = [];
  for (var key in obj) {
    if (typeof obj[key] === "string") {
      stringsArr.push(obj[key]);
    } else if (typeof obj[key] === "object") {
      stringsArr = stringsArr.concat(collectStrings2(obj[key]));
    }
  }

  return stringsArr;
}
console.log(collectStrings2(obj));
