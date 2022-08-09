const id_list = ["muzi", "frodo", "apeach", "neo"];
const report = [
  "muzi frodo",
  "apeach frodo",
  "frodo neo",
  "muzi neo",
  "apeach muzi",
];
const k = 2;
// 	[2, 1, 1, 0]

function solution(id_list, report, k) {
  // 초깃값 설정
  const list = id_list.reduce((result, currentId) => {
    result[currentId] = [0, []];
    return result;
  }, {});

  // 중복값 제거
  const set = new Set(report);

  // 분리, 카운팅, 아이디 추가
  for (const id of set) {
    const [userID, sufferedID] = id.split(" ");
    list[sufferedID][0]++;
    list[userID][1].push(sufferedID);
  }

  // 신고 당한 횟수가 k 이상인 사람만 필터링
  const filtered = id_list.filter((id) => list[id][0] >= k);

  // 포함하는지 여부를 확인하고 갯수 반환 모든 배열에 대하여 실행
  const answer = id_list.map((id) => {
    return list[id][1].filter((id) => {
      return filtered.includes(id);
    }).length;
  });

  return answer;
}
solution(id_list, report, k);
