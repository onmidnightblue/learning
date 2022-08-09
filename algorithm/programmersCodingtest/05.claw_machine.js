const board = [
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 3],
  [0, 2, 5, 0, 1],
  [4, 2, 4, 4, 2],
  [3, 5, 1, 3, 1],
];
const moves = [1, 5, 3, 5, 1, 2, 1, 4];
// result: 4

function solution(board, moves) {
  const basket = [];
  let count = 0;

  for (let i = 0; i < moves.length; i++) {
    const pick = moves[i] - 1;

    for (let k = 0; k < board.length; k++) {
      if (board[k][pick] === 0) continue;

      const basketLength = basket.length <= 1 ? 0 : basket.length - 1;

      if (basket[basketLength] === board[k][pick]) {
        basket.splice(basketLength);
        count += 2;
      } else {
        basket.push(board[k][pick]);
      }
      board[k][pick] = 0;
      break;
    }
  }
  return count;
}
solution(board, moves);
