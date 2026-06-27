"use client";

import type { Project } from "../data/projects";
import { lifebookmomBrandRules } from "../data/lifebookmomBrandRules";

const coupangId = "AF1467107";

export default function OneClickRenewalButton({ project }: { project: Project }) {
  const oneClickPrompt = `생활백서맘 리뉴얼 원클릭 작업을 시작해줘.

[프로젝트]
주제: ${project.topic}
카테고리: ${project.category}
네이버 기존 제목: ${project.naverTitle}
Google 제목: ${project.googleTitle}
현재 문제점: ${project.issue}
다음 작업: ${project.next}
쿠팡 파트너스 ID: ${coupangId}

[반드시 아래 순서로 한 번에 작성]

1단계. 네이버 SEO 제목 추천 3개
- 검색 노출에 유리한 제목
- 너무 자극적이지 않게
- 부모가 실제 검색할 문장형 제목

2단계. 네이버 애드포스트용 본문
- 생활백서맘 문체
- 옆집 엄마가 알려주는 듯 친근하게
- 정확한 정보 중심
- 공감형 도입부
- 소제목 구성
- 체크리스트 포함
- 과장 표현 금지
- 네이버 블로그에 바로 복붙 가능하게 작성

[본문 안에 반드시 아래 위치 표시 포함]
━━━━━━━━━━━━━━━━━━━━━━
📷 이미지 삽입 위치 ①
생활백서맘 세로형 10컷 인포그래픽을 여기에 넣어주세요.
━━━━━━━━━━━━━━━━━━━━━━

3단계. 체크리스트

4단계. 쿠팡파트너스 추천 위치
- 이미지는 만들지 말고 본문 텍스트 영역으로만 작성
- 추천상품 3~5개
- 추천 이유 포함
- 각 상품 아래에 반드시 아래 자리 표시 포함:
👉 [쿠팡파트너스 링크 입력]
- 링크에는 쿠팡 파트너스 ID ${coupangId}가 적용되어야 한다고 안내

형식:
━━━━━━━━━━━━━━━━━━━━━━
🛒 생활백서맘 추천템

✔ 추천상품명
추천 이유:
👉 [쿠팡파트너스 링크 입력]

✔ 추천상품명
추천 이유:
👉 [쿠팡파트너스 링크 입력]
━━━━━━━━━━━━━━━━━━━━━━

5단계. FAQ 5개
- 검색형 질문
- 짧고 정확한 답변

[FAQ 뒤에 필요하면 아래 위치 표시 포함]
━━━━━━━━━━━━━━━━━━━━━━
📷 이미지 삽입 위치 ②
체크리스트 또는 요약 인포그래픽을 여기에 넣어주세요.
━━━━━━━━━━━━━━━━━━━━━━

6단계. 마무리

7단계. 쿠팡파트너스 고지문
아래 문구를 반드시 포함:
이 포스팅은 쿠팡파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받을 수 있습니다.

8단계. 해시태그 30개
- 네이버 노출에 유리한 해시태그
- 생활백서맘 브랜드 해시태그 포함
- 한 줄로 복붙 가능하게 작성

9단계. 이미지 생성 프롬프트
아래 브랜드 규칙을 절대 변경하지 말고 그대로 반영:
${brandImageRules}

중요:
- 쿠팡 상품 이미지 생성 금지
- 쿠팡 바로가기 버튼 이미지 생성 금지
- 상품 광고 이미지 금지
- 정보 전달용 생활백서맘 인포그래픽만 생성
- 불펌 방지용 월계관 "생활백서맘" 도장과 은은한 워터마크 느낌 반드시 포함

10단계. 항해사 평가 리포트
- SEO 점수
- 애드포스트 적합도
- 구글 노출 가능성
- 예상 체류시간
- 쿠팡 전환 가능성
- 대표글 가능 여부
- 보완할 점

중요:
각 단계 제목을 분명히 나누고, 선장님이 바로 복사해서 네이버 블로그에 붙여넣을 수 있게 작성해줘.`;

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(oneClickPrompt);
        alert("🚀 생활백서맘 리뉴얼 원클릭 요청문 복사 완료!");
      }}
      className="w-full rounded-[2rem] bg-[#231F1A] px-7 py-5 text-left text-white shadow-sm hover:bg-[#332D26]"
    >
      <p className="text-sm text-[#D9CBB7]">버튼 하나로 전체 작업 요청</p>
      <p className="mt-2 text-2xl font-black">🚀 생활백서맘 리뉴얼 시작</p>
      <p className="mt-2 text-[#F7F1E8]">
        제목 3개 · 본문 · 이미지 위치 · 쿠팡 추천 위치 · FAQ · 고지문 · 해시태그 30개 · 브랜드 이미지 프롬프트
      </p>
    </button>
  );
}
