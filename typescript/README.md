##### table of contents
- [타입스크립트가 정확히 무엇이고 왜 필요할까 ?](#타입스크립트가-정확히-무엇이고-왜-필요할까-)
- [설치 및 사용](#설치-및-사용)
- [변수 및 배열과 객체 선언](#변수-및-배열과-객체-선언)
  - [기본 타입 (string, number, boolean)](#기본-타입-string-number-boolean)
  - [배열과 객체](#배열과-객체)
- [타입 추론](#타입-추론)
- [다양한 타입을 여러 개 저장하는 방법 (union type)](#다양한-타입을-여러-개-저장하는-방법-union-type)
- [중복된 타입 코드를 줄이는 방법 (type aliases)](#중복된-타입-코드를-줄이는-방법-type-aliases)
- [타입을 가진 함수](#타입을-가진-함수)
  - [매개 변수 또는 함수 반환값에 타입 지정하기](#매개-변수-또는-함수-반환값에-타입-지정하기)
  - [함수에만 있는 특별한 타입, void](#함수에만-있는-특별한-타입-void)
- [함수에게 값을 확인하라고 말해주기 (generic type)](#함수에게-값을-확인하라고-말해주기-generic-type)
<br />

## 타입스크립트가 정확히 무엇이고 왜 필요할까 ?

자바스크립트를 기반으로 하고, 보다 더 확장된 프로그래밍 언어이다.
자바스크립트는 동적 타입 언어이지만 타입스크립트는 정적 타입 언어이다.
자바스크립트로 작성하는 경우 코드가 많아지면 number 와 string 타입에 대해 오류를 야기할 수 있다.
<br />

```jsx
function add(a, b) {
	return a + b
}

const result = add(2, 5)
console.log(result) // 7
```

```jsx
function add(a, b) {
	return a + b
}

const result = add('2', '5')
console.log(result) // 25
```

타입스크립트는 사전에 명확하게 매개변수의 타입을 정하기 때문에 이러한 오류를 방지할 수 있다. 
<br />

실행하지 않고도 코드를 작성할 때 바로 오류가 표시된다.

```tsx
function add(a: number, b: number) {
	return a + b
}

const result = add('2', '5') // error
console.log(result)
```
<br />
<br />

## 설치 및 사용

:point_right: [typescript](https://www.typescriptlang.org/)

:point_right: [Node.js](https://nodejs.org/ko/)
<br />

```tsx
npm install typescript --save-dev
```

자바스크립트 문법에 타입 표기 구문이 추가된 것이기 때문에 자바스크립트 형태로 컴파일하는 과정이 필요하다.

코드를 작성하면서 오류를 알려주긴 하지만, 컴파일 단계에서 미처 발견하지 못했던 문제점을 알려준다.
<br />

```tsx
npx tsc
```

- 컴파일러를 사용하려면 타입스크립트 구성 파일을 프로젝트 폴더에 추가해 타입스크립트에게 컴파일할 파일을 알려주어야 한다.
<br />

```tsx
npx tsc 파일이름.ts
```

- 컴파일할 파일을 직접 지정할 수도 있다.

위처럼 작성하면 컴파일된 자바스크립트 파일이 생성되는데, 여기서 중요한 점은 컴파일 단계에 오류가 있더라도 컴파일은 진행된다는 것이다.
<br />

```tsx
function add(a, b) {
	return a + b
}

var result = add('2', '5')
console.log(result)
```

- 컴파일된 자바스크립트 파일은 구 버전의 브라우저에도 동작하는 형태로 코드를 변환하는 것이 기본 설정으로 되어있다.
<br />
<br />

## 변수 및 배열과 객체 선언

### 기본 타입 (string, number, boolean)

```tsx
let userName: string
userName = 'jin'

let age: number
age = 12

let isInstructor: boolean
isInstructor = true
```
<br />

### 배열과 객체

- 배열
    
    ```tsx
    let hobbies: string[]
    hobbies = ['Sports', 'Cook']
    
    ```
<br />

- 객체
    
    ```tsx
    let person: {
      name: string,
      age: number
    }
    person = {
      name: 'jin',
      age: 20
    }
    ```
<br />

- 타입을 정의한 객체를 가진 배열
    
    ```tsx
    let people: {
      name: string,
      age: number
    }[]
    ```
<br />
<br />

## 타입 추론


타입스크립트는 명시적인 타입 표기가 없어도 타입을 유추한다.
<br />

```tsx
let course = 'react'
course = 12345 // error
```

- 변수 만들고 바로 초기화를 해버리면 타입스크립트는 할당된 값의 자료형을 확인한다.
- 가능한 한 타입 추론을 사용하는 것이 좋다.
<br />
<br />

## 다양한 타입을 여러 개 저장하는 방법 (union type)

유니온 타입을 사용하면 여러 가지의 타입을 하나의 변수에 저장할 수 있다.

```tsx
let course: string | number = 'react'
course = 12345
```
<br />
<br />

## 중복된 타입 코드를 줄이는 방법 (type aliases)

직접 기본 타입을 만들어 복잡한 타입을 정의해 두고 사용할 수 있다.
자바스크립트 파일로 컴파일 시 코드는 사라진다.

```tsx
let person: {
  name: string,
  age: number
}

let people: {
  name: string,
  age: number
}[]
```
<br />

type 키워드 뒤 원하는 이름으로 작성해서, 그 이름으로 지정한 타입을 반복 사용 할 수 있다.

```tsx
type Person = {
  name: string,
  age: number
}

let person: Person
let people: Person[]
```
<br />
<br />

## 타입을 가진 함수

### 매개 변수 또는 함수 반환값에 타입 지정하기

```tsx
function add(a: number, b: number) {
	return a + b
}
```

- 매개 변수에 타입을 지정할 수 있다.
- 반환 값의 타입에 number 타입의 값을 얻을 수 있다는 타입 추론이 적용된다.
- 이로 인해 함수의 타입은 number가 된다.
<br />

```tsx
function add(a: number, b: number):number {
	return a + b
}
```

- 이렇게 작성하면 좀더 명시적으로 함수의 타입을 지정할 수 있다.
- 명시적으로 정의할 필요가 없다면 굳이 작성할 필요가 없다.
<br />
<br />

### 함수에만 있는 특별한 타입, void

return이 없을 때 갖는 특별한 반환 타입이다.
null, undefined와 비슷하지만 항상 함수와 결합해서 사용한다.
만약 반환값을 받고 싶다면 undefined 타입으로 값을 받아야 한다.

```tsx
function printOutput(value: any) {
  console.log(value)
}
```
<br />
<br />

## 함수에게 값을 확인하라고 말해주기 (generic type)

```tsx
function insertAtBeginning(array: any[], value: any) {
  const newArray = [value, ...array]
  return newArray
}

const demoArray = [1, 2, 3]
const numberArray = insertAtBeginning(demoArray, -1)
const stringArray = insertAtBeginning(['a', 'b', 'c'], 'd')
```

- 위에서 타입을 any로 지정했기 때문에 numberArray 배열이 숫자로만 이루어져 있음에도 불구하고  숫자로만 이루어졌는지 확인하지 못한다.
<br />

```tsx
function insertAtBeginning<Type>(array: Type[], value: Type) {
  const newArray = [value, ...array]
  return newArray
}

const demoArray = [1, 2, 3]
const numberArray = insertAtBeginning(demoArray, -1)
const stringArray = insertAtBeginning(['a', 'b', 'c'], 'd')
```

- 이렇게 작성하면 타입스크립트는 두 매개변수의 타입을 확인하고 함수 리턴 값의 타입을 추론한다.
