const s = "one4seveneight";
// "1478"

function solution(s) {
  let answer = s;
  const numbers = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

  // numbers를 돌면서 해당 문자열로 자르고, 인덱스로 이어붙임
  for (let i in numbers) {
    let arr = answer.split(numbers[i]);
    answer = arr.join(i);
  }

  // 숫자형으로 변환해서 반환
  return Number(answer);
}
solution(s);
