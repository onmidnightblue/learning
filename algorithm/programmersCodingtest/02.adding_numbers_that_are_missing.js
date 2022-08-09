const numbers = [1, 2, 3, 4, 6, 7, 8, 0];
// 14

function solution(numbers) {
  const filteredNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  let answer = 0;

  const filtered = filteredNumbers.filter((i) => !numbers.includes(i));

  for (let i in filtered) {
    answer += filtered[i];
  }

  return answer;
}
solution(numbers);
