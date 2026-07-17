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
- [ ] QA 규칙 설계

### 구현 기반
- [x] Blogger Publisher 입력 계약 생성
- [x] Blogger 초안 생성 모듈 기반 구현
- [x] OAuth 환경설정 예제 생성
- [x] Publisher 요청 예제 생성
- [ ] Naver 승인형 브라우저 자동화 구현
- [ ] Asset Publisher 구현
- [ ] QA Gate 구현

### 실제 테스트
- [ ] 네이버 실제 수정 테스트
- [ ] Google Blogger 테스트 글 생성·수정
- [ ] 이미지 업로드 자동화 테스트
- [ ] 발행 전 QA 차단 테스트
- [ ] 발행 자동화 테스트

## 현재 판정

- Google Blogger: 공식 API 자동화 가능 / 실제 OAuth 계정 테스트 필요
- 네이버 블로그: 공개 글쓰기 API 미확인 / 승인형 브라우저 자동화 테스트 필요
- 기본 발행 정책: 초안 또는 발행 직전 사용자 승인
- 무인 발행: 실제 QA와 플랫폼 테스트 완료 전 금지

## 다음 작업 순서

1. Blogger Publisher 로컬 dry-run 및 문법 테스트
2. Google OAuth Client와 blogId 연결
3. Blogger 테스트 초안 생성·조회·수정·삭제
4. 이미지 저장소 및 Asset Publisher 방식 확정
5. QA Gate 구현
6. 네이버 글쓰기 브라우저 구조 확인
7. 네이버 제목·본문·이미지·임시저장 테스트
8. 통합 Publisher 실행기 연결

## 고정 운영 규칙
1. 기존 `LifeBookMom-OS`만 사용한다.
2. Savingio의 factory, logs, roadmap, qa 경로와 공유하지 않는다.
3. 아이디어·조사·프로그램·실행 로그를 분리한다.
4. 완료된 작업만 체크한다.
5. 작업 단위마다 `SESSION-###`를 누적한다.
6. 실제 검증하지 않은 기능은 PASS 처리하지 않는다.
7. 계정 비밀번호·OAuth token·client secret은 GitHub에 저장하지 않는다.
8. CAPTCHA·2단계 인증·보안 확인을 우회하지 않는다.

## 디렉터리 지도
- `lifebookmom_factory/` — 총괄·로드맵
- `lifebookmom_logs/` — 실행 로그
- `lifebookmom_sessions/` — 세션 카드
- `lifebookmom_brain/` — 아이디어·운영 지식
- `lifebookmom_cms/` — 콘텐츠 상태 관리
- `lifebookmom_publisher/` — 네이버·Google 발행
- `lifebookmom_research/` — 조사 자료
- `lifebookmom_assets/` — 이미지·브랜드 자산
- `lifebookmom_qa/` — 검증
- `lifebookmom_release/` — 검증 완료 릴리스
- `lifebookmom_automation/` — 자동화 파이프라인
- `lifebookmom_engine/` — 재사용 엔진
