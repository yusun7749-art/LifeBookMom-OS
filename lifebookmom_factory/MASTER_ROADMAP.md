# 생활백서맘 Factory MASTER ROADMAP

## Sprint 001 — 블로그 자동화 가능 여부 검증

### 조사
- [x] 네이버 자동화 조사
- [x] Google Blogger API 조사
- [x] 네이버 정책·로그인·수정 방식 1차 검증
- [ ] 이미지 업로드 방식 조사

### 설계
- [x] Publisher 설계
- [x] 자동화 구조 설계
- [x] CMS 상태 모델 설계
- [x] QA 규칙 1차 설계

### 구현 기반
- [x] Blogger Publisher 입력 계약 생성
- [x] Blogger 초안 생성 모듈 기반 구현
- [x] OAuth 환경설정 예제 생성
- [x] Publisher 요청 예제 생성
- [x] Blogger 계정의 단일 블로그 자동 탐색
- [x] Blogger 다중 블로그 오발행 차단
- [x] 발행 결과 URL·postId JSONL 기록
- [x] Publisher 입력·블로그 선택·로그 단위 테스트 작성
- [x] QA Gate 구현
- [x] QA → Blogger 통합 Pipeline Runner 구현
- [x] 안전 기본값 dry-run 및 발행 모드 분리
- [x] Blogger 예약 발행 구현
- [x] 예약 시각·시간대·과거 시간 차단
- [x] 파이프라인 실행 결과 JSONL 기록
- [x] Windows 원클릭 dry-run·예약 발행 실행 파일 추가
- [x] QA Gate 단위 테스트 작성
- [x] 임시 초안 생성→조회→수정→삭제 Smoke Test 구현
- [x] Smoke Test 임시 초안 자동 삭제 안전장치
- [x] MASTER DECISION LOG 생성
- [x] 한 문장 주제 → CMS 콘텐츠 요청 JSON 엔진 구현
- [x] 콘텐츠 요청 Windows 원클릭 실행 파일 추가
- [x] Content Request Engine 단위 테스트 작성
- [ ] 콘텐츠 생성 엔진 구현
- [ ] CMS 요청 → Blogger Publisher 요청 변환 구현
- [ ] Naver 승인형 브라우저 자동화 구현
- [ ] Asset Publisher 구현

### 실제 테스트
- [x] Google OAuth 최초 승인
- [x] Blogger 계정 블로그 목록 자동 조회
- [x] Blogger 임시 초안 생성·조회·수정·삭제 실제 실행
- [ ] Content Request Engine CI 실제 실행
- [ ] Publisher 단위 테스트 로컬 실제 실행
- [ ] QA Gate 단위 테스트 로컬 실제 실행
- [ ] 통합 Pipeline dry-run 로컬 실제 실행
- [ ] Blogger 예약 발행 실제 실행
- [ ] 네이버 실제 수정 테스트
- [ ] 이미지 업로드 자동화 테스트
- [ ] 발행 전 QA 차단 실제 테스트
- [ ] 실제 콘텐츠 자동 초안 생성 테스트

## 현재 판정

- Google Blogger: OAuth·블로그 조회·초안 쓰기·조회·수정·삭제 실제 검증 PASS
- Blogger 쓰기 검증: `DRAFT_LIFECYCLE_PASS` 확인 / 임시 초안 자동 삭제 확인
- Content Request Engine: 구현 및 단위 테스트 작성 완료 / CI 실행 결과 대기
- 예약 발행: 코드·안전장치 구현 / 로컬 실제 예약 발행 대기
- 네이버 블로그: 공개 글쓰기 API 미확인 / 승인형 브라우저 자동화 테스트 필요
- 기본 발행 정책: QA 통과 후 초안 생성
- 무인 발행: 콘텐츠 생성·QA·예약 발행 실제 검증 완료 전 금지

## 다음 작업 순서

1. Content Request Engine CI 통과 확인
2. 콘텐츠 생성 단계 구현
3. CMS 요청을 Blogger Publisher 요청 JSON으로 자동 변환
4. 생성 콘텐츠 QA Gate 연결
5. 첫 승인용 콘텐츠 Blogger 초안 생성
6. 이미지 저장소 및 Asset Publisher 방식 확정
7. 이미지 포함 요청 QA 규칙 연결
8. Blogger 예약 발행 실제 검증
9. 통합 발행 버튼 연결
10. 네이버 제목·본문·이미지·임시저장 테스트

## 고정 운영 규칙
1. 기존 `LifeBookMom-OS`만 사용한다.
2. Savingio의 factory, logs, roadmap, qa 경로와 공유하지 않는다.
3. 아이디어·조사·프로그램·실행 로그를 분리한다.
4. 완료된 작업만 체크한다.
5. 작업 단위마다 `SESSION-###`를 누적한다.
6. 실제 검증하지 않은 기능은 PASS 처리하지 않는다.
7. 계정 비밀번호·OAuth token·client secret은 GitHub에 저장하지 않는다.
8. CAPTCHA·2단계 인증·보안 확인을 우회하지 않는다.
9. 대화 전문이 아니라 확정 결정·LOCK·구현·검증·문제·다음 작업을 MASTER DECISION LOG에 누적한다.

## 디렉터리 지도
- `lifebookmom_factory/` — 총괄·로드맵·결정 로그
- `lifebookmom_logs/` — 실행 로그
- `lifebookmom_sessions/` — 세션 카드
- `lifebookmom_brain/` — 아이디어·운영 지식
- `lifebookmom_cms/` — 콘텐츠 상태 및 요청 관리
- `lifebookmom_publisher/` — 네이버·Google 발행
- `lifebookmom_research/` — 조사 자료
- `lifebookmom_assets/` — 이미지·브랜드 자산
- `lifebookmom_qa/` — 검증
- `lifebookmom_release/` — 검증 완료 릴리스
- `lifebookmom_automation/` — 자동화 파이프라인
- `lifebookmom_engine/` — 재사용 엔진
