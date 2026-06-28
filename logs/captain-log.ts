export type CaptainLog = {
  id: string;
  date: string;
  title: string;
  category: "system" | "brand" | "content" | "git" | "strategy";
  summary: string;
  decisions: string[];
  nextActions: string[];
};

export const captainLogs: CaptainLog[] = [
  {
    id: "2026-06-27-foundation",
    date: "2026-06-27",
    title: "LifeBookMom Enterprise 기초공사 시작",
    category: "system",
    summary: "LifeBookMom OS를 생활백서맘을 운영하는 AI 회사 운영체제로 개발하기로 결정했다.",
    decisions: [
      "큰 회사보다 탄탄한 회사를 만든다.",
      "중요한 결정은 OS 안에 기록한다.",
      "선장님은 코드 수정 대신 운영에 집중한다.",
      "항해사 이리나는 업데이트팩 방식으로 개발을 책임진다.",
    ],
    nextActions: [
      "Enterprise Dashboard 안정화",
      "Content Engine 기초 구조 설계",
      "콘텐츠 자산관리 시스템 설계",
    ],
  },
];
