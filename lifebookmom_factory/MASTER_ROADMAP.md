# 생활백서맘 Factory MASTER ROADMAP

## Sprint 001 — 블로그 자동화 가능 여부 검증

### 조사
- [ ] 네이버 자동화 조사
- [ ] Google Blogger API 조사
- [ ] 네이버 정책·로그인·수정 방식 검증
- [ ] 이미지 업로드 방식 조사

### 설계
- [ ] Publisher 설계
- [ ] 자동화 구조 설계
- [ ] CMS 상태 모델 설계
- [ ] QA 규칙 설계

### 실제 테스트
- [ ] 네이버 실제 수정 테스트
- [ ] Google Blogger 테스트 글 생성·수정
- [ ] 이미지 업로드 자동화 테스트
- [ ] 발행 전 QA 차단 테스트
- [ ] 발행 자동화 테스트

## 고정 운영 규칙
1. 기존 `LifeBookMom-OS`만 사용한다.
2. Savingio의 factory, logs, roadmap, qa 경로와 공유하지 않는다.
3. 아이디어·조사·프로그램·실행 로그를 분리한다.
4. 완료된 작업만 체크한다.
5. 작업 단위마다 `SESSION-###`를 누적한다.
6. 실제 검증하지 않은 기능은 PASS 처리하지 않는다.

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
