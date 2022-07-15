
// 변수 선언
let age: number
age = 12

let userName: string
userName = 'jin'

let isInstructor: boolean
isInstructor = true

// 배열과 객체
let hobbies: string[]
hobbies = ['Sports', 'Cook']

// let person: {
//   name: string,
//   age: number
// }
// person = {
//   name: 'jin',
//   age: 20
// }

// let people: {
//   name: string,
//   age: number
// }[]

// 타입 추론
let course = 'react'
// course = 12345 

// 유니온 유형
let unionCourse: string | number = 'react'
unionCourse = 12345 

// 타입 별칭(type aliases)
type Person = {
  name: string,
  age: number
}
let person: Person
person = {
  name: 'jin',
  age: 20
}

let people: Person[]

// 타입을 가진 함수
function add(a: number, b: number):number {
	return a + b
}

// return이 없는 함수의 타입, void
function printOutput(value: any) {
  console.log(value)
}

// 제네릭 타입 (generic type)
function insertAtBeginning<Type>(array: Type[], value: Type) {
  const newArray = [value, ...array]
  return newArray
}

const demoArray = [1, 2, 3]
const numberArray = insertAtBeginning(demoArray, -1)
const stringArray = insertAtBeginning(['a', 'b', 'c'], 'd')
