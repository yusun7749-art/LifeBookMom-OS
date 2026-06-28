export const monthCalendar = {
  year: 2026,
  month: 6,
  title: "2026년 6월 발행달력",
  days: [
    { day: 1, type: "empty" }, { day: 2, type: "empty" }, { day: 3, type: "empty" }, { day: 4, type: "empty" }, { day: 5, type: "empty" }, { day: 6, type: "empty" },
    { day: 7, type: "empty" }, { day: 8, type: "empty" }, { day: 9, type: "empty" }, { day: 10, type: "empty" }, { day: 11, type: "empty" }, { day: 12, type: "empty" }, { day: 13, type: "empty" },
    { day: 14, type: "empty" }, { day: 15, type: "empty" }, { day: 16, type: "empty" }, { day: 17, type: "empty" }, { day: 18, type: "empty" }, { day: 19, type: "empty" }, { day: 20, type: "empty" },
    { day: 21, type: "empty" }, { day: 22, type: "empty" }, { day: 23, type: "empty" },
    {
      day: 24,
      type: "done",
      title: "자기주도학습",
      naver: "발행완료",
      google: "발행완료",
      image: "완료"
    },
    {
      day: 25,
      type: "done",
      title: "장마철 준비물",
      naver: "발행완료",
      google: "발행완료",
      image: "완료"
    },
    {
      day: 26,
      type: "partial",
      title: "물놀이 안전수칙",
      naver: "발행완료",
      google: "미작성",
      image: "완료"
    },
    {
      day: 27,
      type: "partial",
      title: "SNS 안전",
      naver: "발행완료",
      google: "작성중",
      image: "완료"
    },
    {
      day: 28,
      type: "done",
      title: "체취 변화 / 사춘기",
      naver: "발행완료",
      google: "발행완료",
      image: "완료"
    },
    {
      day: 29,
      type: "plan",
      title: "속옷 교체 시기",
      naver: "작성예정",
      google: "작성예정",
      image: "대기"
    },
    {
      day: 30,
      type: "plan",
      title: "샤워습관",
      naver: "추천",
      google: "추천",
      image: "대기"
    },
  ],
};

export const weekdays = ["월", "화", "수", "목", "금", "토", "일"];

export function calendarStatusColor(type: string) {
  if (type === "done") return "bg-[#E8F6EE] border-[#9DD6B5]";
  if (type === "partial") return "bg-[#FFF4EF] border-[#F0B8A8]";
  if (type === "plan") return "bg-[#FFFDF8] border-[#E4D5BE]";
  return "bg-white border-[#EEE4D6]";
}

export function writeLink(title: string, mode: "naver" | "google") {
  return `/content-studio?topic=${encodeURIComponent(title)}&mode=${mode}`;
}
