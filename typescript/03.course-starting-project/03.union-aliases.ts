type combinable = number | string

function combine(
  param1: combinable, 
  param2: combinable, 
  resultConversion: 'as-number' | 'as-text'
) {
  let result
  if (typeof param1 === 'number' && typeof param2 === 'number' || resultConversion === 'as-number') {
    result = +param1 + +param2
  } else {
    result = param1.toString() + param2.toString()
  }
  return result
}

const combineNum = combine(5, 10, 'as-number')
console.log(combineNum) // 15

const combineNum2 = combine('5', '10', 'as-number')
console.log(combineNum2) // 15

const combineStr = combine('h', 'i', 'as-text')
console.log(combineStr) // hi
