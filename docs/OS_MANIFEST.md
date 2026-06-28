# LifeBookMom OS MANIFEST

Version: OS v2.1.0
Status: LOCKED
Branch: project021-stabilize
Baseline Commit: d11456b Project020 Baseline

## Purpose
이 문서는 LifeBookMom OS의 최상위 운영 기준 문서입니다.
모든 변경은 이 문서를 기준으로 관리합니다.

## Source of Truth
- GitHub = 유일한 기준 저장소
- VS Code = 실행 및 확인 작업 공간
- ZIP = 적용 패키지, 기준 저장소 아님
- 삭제 금지, ARCHIVED 사용

## Current Operating Rule
모든 작업은 아래 순서만 따른다.

1. GitHub 기준 Commit 확인
2. 작업 Branch 확인
3. 변경 파일 적용
4. npm run dev 실행
5. 화면 확인
6. git add .
7. git commit
8. git push
9. main 병합 후 기준점 갱신

## Core Documents
- Constitution.md
- Architecture.md
- DecisionLog.md
- VersionManager.md
- AssetRegistry.md
- ChangeApproval.md
- Recovery.md
- Roadmap.md
- ProjectState.md

## Project State
- LOCKED
- TODO
- BUILDING
- TESTING
- DONE
- ARCHIVED

## LOCK Assets
- 생활백서맘 브랜드
- 리니 Character Bible
- Brand Bible
- Image Bible
- 네이버 V4 출력 구조
- Google 출력 구조
- 워터마크
- 추천상품 출력 규칙
- 쿠팡 고지문

## Change Rule
- LOCK 항목은 대표 승인 없이는 변경 불가
- 기존 규칙은 삭제하지 않고 ARCHIVED로 이동
- 완료는 실제 화면 확인 후 기록
- 변경마다 DecisionLog와 VersionManager를 갱신
- 기준 Commit 없이 Patch 생성 금지
