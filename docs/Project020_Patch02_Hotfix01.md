# Project020 Patch02 Hotfix01

## 적용 위치
C:\LifeBookMom-OS\

## 적용 방법
ZIP 압축 풀기
→ data 폴더 복사
→ C:\LifeBookMom-OS 안에 붙여넣기
→ 같은 파일은 덮어쓰기
→ npm run dev

## 수정 내용
- data/aiBootstrap.ts가 찾는 buildProject018NaverRulesText export 복구
- project018NaverSync.ts를 Naver Engine V4 호환 브릿지로 유지
- 기존 오류: Export buildProject018NaverRulesText doesn't exist 해결
