# Project037 Publish Sync Fix

- 발행완료를 전역 Store에 publishedRecords로 영구 저장
- 데이터센터/오늘작성/발행관리 상태 동기화 기반 추가
- 발행완료/중복 처리된 주제는 다시 살아나지 않음
- 오늘작성/발행관리 후속 패치와 함께 사용
