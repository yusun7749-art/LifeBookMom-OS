# 생활백서맘 Factory MASTER DECISION LOG

이 문서는 채팅 전체를 저장하지 않는다. 프로젝트를 이어가는 데 필요한 결정, LOCK, 실제 구현, 실제 검증, 문제와 다음 작업만 누적한다.

## 기록 규칙
- `DECISION`: 선장님이 확정한 방향
- `LOCK`: 이후 기본 원칙으로 유지할 사항
- `IMPLEMENTED`: 실제 코드에 반영된 기능
- `VERIFIED`: 실제 실행 결과가 확인된 기능
- `ISSUE`: 발생한 문제와 원인
- `NEXT`: 다음 작업
- 제안과 확정 결정을 구분한다.
- 실행하지 않은 작업은 `VERIFIED` 또는 `PASS`로 기록하지 않는다.

---

## 2026-07-18

### DECISION
- 생활백서맘과 Savingio의 코드·로그·로드맵·QA를 완전히 분리한다.
- 생활백서맘 Factory는 사람이 JSON을 직접 편집하는 구조가 아니라 주제 입력에서 시작한다.
- 대화 전문이 아니라 꼭 하기로 한 결정, 계획, LOCK, 구현·검증 결과를 마스터 로그에 누적한다.

### LOCK
- 기존 `LifeBookMom-OS` 저장소만 사용한다.
- QA를 통과하지 않은 콘텐츠는 발행하지 않는다.
- 계정 비밀번호, OAuth token, client secret은 GitHub에 저장하지 않는다.
- 실제 실행하지 않은 기능은 PASS 처리하지 않는다.
- 본문에서 공식 캐릭터 이름을 사용하지 않고 `아이`, `우리 아이`로 표현한다.
- 승인용 Google 본문은 최소 가시 텍스트 5,000자를 기준으로 한다.

### IMPLEMENTED
- Blogger OAuth 및 단일 블로그 선택 구조
- Blogger 초안 생성·조회·수정·삭제 Lifecycle 실행기
- 예약 발행 코드와 미래 시각·시간대 검증
- QA Gate와 Blogger Pipeline Runner
- 한 문장 주제를 CMS 콘텐츠 요청 JSON으로 변환하는 Content Request Engine
- Windows 원클릭 콘텐츠 요청 실행 파일
- CMS 요청 데이터를 QA 준비 Draft 구조로 변환하는 Content Generation Engine

### VERIFIED
- Google OAuth 최초 승인 성공
- Blogger 블로그 ID `4027327034067144989` 조회 성공
- 실제 계정에서 임시 초안 생성 → 조회 → 수정 → 삭제 성공
- 결과 상태 `DRAFT_LIFECYCLE_PASS` 확인
- 전체 pytest 실행 결과 `48 passed` 확인
- Content Request Engine 테스트 통과 확인
- Content Generation Engine 구조 검증 완료

### ISSUE
- 로컬 Git이 detached HEAD 상태여서 `git pull`이 중단됨.
- `git switch main` 후 `git pull origin main`으로 해결됨.
- Windows 명령 프롬프트에서 BAT 한글 출력이 깨짐. 실행 결과 JSON에는 영향 없음.

### NEXT
1. CMS 요청 → Blogger Publisher 요청 JSON 변환 구현
2. 생성 콘텐츠 QA Gate 연결
3. 첫 승인용 콘텐츠 Blogger 초안 생성
4. 이미지 저장소와 Asset Publisher 방식 확정
5. 예약 발행 실제 검증
