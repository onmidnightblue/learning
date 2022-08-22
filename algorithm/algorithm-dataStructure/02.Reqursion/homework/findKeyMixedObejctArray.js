/**
 * animal > temp > temp1에 연산 적용
 * string일 경우 '_add'
 * number일 경우 +9
 *
 * - 각 데이터들의 포맷은 각기 다르다.
 */

const data = {
  people: {
    nations: [
      {
        name: "korea",
        economy: "good",
        power: {
          short: "short",
        },
      },
      {
        name: "usa",
        economy: "nice",
        power: {
          short: "short2",
        },
      },
      {
        name: "china",
        economy: "nice",
        power: {
          short: "short3",
        },
      },
    ],
    race: ["white", "black", "mongoloid"],
  },
  animal: {
    kind: ["monkey", "horse", "cat", "dog"],
    total: 20000000,
    temp: {
      temp1: "234",
      temp2: {
        temp3: 11111,
      },
    },
  },
};

const targetKey = "short";

// code
const forChangedValue = (data, targetKey) => {
  // array
  if (Array.isArray(data)) {
    for (i of data) {
      forChangedValue(i, targetKey);
    }

    return data;
  }

  // object
  if (typeof data === "object") {
    for (i in data) {
      if (i === targetKey) {
        if (typeof data[i] === "string") {
          data[i] = data[i] + "_add";
        }
        if (typeof data[i] === "number") {
          data[i] = +data[i] + 9;
        }
      }
      if (i !== targetKey) {
        forChangedValue(data[i], targetKey);
      }
    }

    return data;
  }
};

forChangedValue(data, targetKey);
console.log(data);

/**
 * 1. data가 객체인지 확인하기
 * 2. 객체라면 원하는 키와 동일한지 확인하기
 * 3. 동일하지 않다면 키의 값이 객체인지 확인하기
 * 4. 객체라면 다시 원하는 키와 동일한지 확인하기
 * 5. 원하는 키와 동일하다면 문자인지 숫자인지 확인하기
 */
