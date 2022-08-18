function add(n1: number, n2: number, showResult: boolean, phrase: string) {
  const result = n1 + n2 // 타입추론(type inference)
  if (showResult) {
    console.log(phrase + result)
    console.log(phrase + n1 + n2)
  } else {
    return result
  }
}

const number1 = 5
const number2 = 2.8
const printResult = true
const resultPhrase = 'Result is: '

const result = add(number1, number2, printResult, resultPhrase)
console.log(result)


const number = 1.5
