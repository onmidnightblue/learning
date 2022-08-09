const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const hand = "right";
// "LLRLLRLLRL"

function solution(numbers, hand) {
  let answer = "";
  let keypad = {
    1: [3, 1],
    2: [3, 2],
    3: [3, 3],
    4: [2, 1],
    5: [2, 2],
    6: [2, 3],
    7: [1, 1],
    8: [1, 2],
    9: [1, 3],
    "*": [0, 1],
    0: [0, 2],
    "#": [0, 3],
  };

  let currentLocationL = [0, 1];
  let currentLocationR = [0, 3];

  numbers.forEach((num) => {
    let numLocation = keypad[num];

    const resultLeft = () => {
      currentLocationL = numLocation;
      answer += "L";
    };
    const resultRight = () => {
      currentLocationR = numLocation;
      answer += "R";
    };

    if (numLocation[1] === 1) {
      resultLeft();
    }
    if (numLocation[1] === 3) {
      resultRight();
    }
    if (numLocation[1] === 2) {
      function getDistance(arr1, arr2) {
        let result = Math.abs(arr1[0] - arr2[0]) + Math.abs(arr1[1] - arr2[1]);
        return result;
      }

      let distanceL = getDistance(currentLocationL, numLocation);
      let distanceR = getDistance(currentLocationR, numLocation);

      if (distanceL === distanceR) {
        return hand === "left" ? resultLeft() : resultRight();
      }
      if (distanceL < distanceR) {
        resultLeft();
      } else {
        resultRight();
      }
    }
  });
  return answer;
}
solution(numbers, hand);
