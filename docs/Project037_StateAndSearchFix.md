# Project037 State and Search Fix

- 데이터센터/운영본부 추천주제를 3개 고정에서 Revenue 추천 10개+미발행 후보로 확장
- 발행완료/중복 처리 상태를 localStorage 전역 Store에 저장
- 다시 들어와도 발행완료/중복 처리된 주제가 다시 살아나지 않도록 hiddenTopicTitles 추가
- 글쓰기 추천 주제도 전체 목록과 검색창으로 변경
- 주제찾기 검색 fallback을 안전한 부모 질문형 제목으로 변경
- 임의 조합 오류 방지
