# Project020 Patch03 · V4 Migration

## 적용 위치
C:\LifeBookMom-OS\

## 적용 방법
ZIP 압축 풀기
→ data, docs 폴더 복사
→ C:\LifeBookMom-OS 안에 붙여넣기
→ 같은 파일은 덮어쓰기

## 실행
npm run dev

## 확인
http://localhost:3000/content-studio

## 변경 내용
- Naver Engine V4를 기준 엔진으로 추가
- contentStudioV2의 buildNaverOneClickPrompt를 V4로 연결
- project018NaverSync를 V4 호환 브릿지로 변경
- naverContentEngineV3를 V4 호환 브릿지로 변경
- 화면 표시 문구 Project018/V3 → Project020/V4로 변경
- 별점/점수/번호/Markdown/시스템 제한 안내 출력 금지 유지

## 확인 포인트
- Bootstrap 상태에 Naver Engine V4 또는 Project020 Sync 표시
- 네이버 원클릭 출력에서 #, ## 없음
- 1~10 번호 없음
- 추천 아이템에 별점/점수 없음
- 쿠팡 고지문 한 줄
