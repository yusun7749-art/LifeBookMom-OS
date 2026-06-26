export type PublishLogItem = {
  id: number;
  title: string;
  date: string;
  platform: "Naver";
  status: "발행 완료";
  category: string;
};

export const defaultPublishLogs: PublishLogItem[] = [
  { id: 1, title: "요즘 아이들 사이에서 유행하는 질병, 어떻게 예방하면 좋을까요?", date: "2026-06-27", platform: "Naver", status: "발행 완료", category: "건강" },
  { id: 2, title: "초3 주말 집콕놀이 추천! 집에서도 신나게 노는 방법 10가지", date: "2026-06-27", platform: "Naver", status: "발행 완료", category: "생활" },
  { id: 3, title: "초등학생 용돈 교육, 언제부터 시작해야 할까요?", date: "2026-06-27", platform: "Naver", status: "발행 완료", category: "경제" },
  { id: 4, title: "초등학생 독서 습관 만드는 방법, 책 싫어하는 아이도 달라졌어요", date: "2026-06-27", platform: "Naver", status: "발행 완료", category: "교육" },
  { id: 5, title: "초등학생 여름철 식중독 예방법｜장염 유행 전에 부모가 꼭 알아야 할 7가지 생활수칙", date: "2026-06-27", platform: "Naver", status: "발행 완료", category: "건강" },
  { id: 6, title: "초등학생 여름철 물놀이 안전사고 예방법｜부모가 꼭 알려줘야 할 10가지 안전수칙", date: "2026-06-27", platform: "Naver", status: "발행 완료", category: "안전" },
  { id: 7, title: "초등학생 냉방병 증상과 예방법｜여름철 아이 건강을 지키는 7가지 생활수칙", date: "2026-06-27", platform: "Naver", status: "발행 완료", category: "건강" },
  { id: 8, title: "초등학생 로블록스 안전하게 하는 법｜부모가 꼭 알아야 할 필수 설정과 안전수칙 총정리", date: "2026-06-27", platform: "Naver", status: "발행 완료", category: "디지털" },
  { id: 9, title: "초등학생 건강한 학교생활을 위한 좋은 습관 7가지｜부모가 꼭 알려줘야 할 생활습관", date: "2026-06-27", platform: "Naver", status: "발행 완료", category: "생활" },
  { id: 10, title: "친구가 자꾸 괴롭혀요? 초등학생 부모가 꼭 알아야 할 학교폭력 대처법과 해결 방법", date: "2026-06-27", platform: "Naver", status: "발행 완료", category: "학교생활" },
  { id: 11, title: "장마철 초등학생 우산 관리법｜우산 오래 쓰는 습관과 올바른 보관 방법", date: "2026-06-27", platform: "Naver", status: "발행 완료", category: "생활" },
  { id: 12, title: "수족구 걸리면 학교 보내도 될까요? 초등학생 등교 기준과 부모가 꼭 알아야 할 대처법 총정리", date: "2026-06-27", platform: "Naver", status: "발행 완료", category: "건강" },
  { id: 13, title: "초등학생 쇼츠 중독 신호 5가지｜부모가 꼭 알아야 할 스마트폰 사용 습관 점검법", date: "2026-06-27", platform: "Naver", status: "발행 완료", category: "디지털" },
  { id: 14, title: "초등학생 거짓말, 혼내야 할까요? 부모가 꼭 알아야 할 올바른 대처법", date: "2026-06-27", platform: "Naver", status: "발행 완료", category: "교육" },
];
