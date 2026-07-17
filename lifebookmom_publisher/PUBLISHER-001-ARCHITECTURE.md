# PUBLISHER-001 — 생활백서맘 Publisher 설계

## 목적

네이버와 Google을 동일한 방식으로 억지 통합하지 않고, 공통 입력 규격만 공유한 뒤 플랫폼별 Publisher가 독립 실행되도록 한다.

## 공통 입력 계약

```json
{
  "content_id": "LBM-0001",
  "channel": "naver|blogger",
  "title": "글 제목",
  "html": "<p>본문</p>",
  "plain_text": "복붙용 본문",
  "labels": ["초등학생", "부모교육"],
  "assets": [
    {
      "asset_id": "ASSET-0001",
      "local_path": "...",
      "public_url": "...",
      "alt": "이미지 설명",
      "position": 1
    }
  ],
  "publish_mode": "draft|review|publish|schedule",
  "publish_at": null,
  "qa_report_id": "QA-0001"
}
```

## 상태 모델

`IDEA → RESEARCHED → DRAFTED → ASSETS_READY → QA_PENDING → QA_PASSED → READY_FOR_REVIEW → DRAFT_CREATED → APPROVED → PUBLISHED → VERIFIED`

실패 상태:
- `QA_BLOCKED`
- `AUTH_REQUIRED`
- `PUBLISH_FAILED`
- `VERIFY_FAILED`
- `PLATFORM_CHANGED`

## 플랫폼 분리

### BloggerPublisher
- 공식 Blogger API v3 사용
- 초안 생성 기본
- postId, draft URL, published URL 저장
- PATCH 수정 지원
- 승인 후 publish 또는 schedule

### NaverPublisher
- 1차: 복붙 패키지 생성
- 2차: 사용자 로그인 브라우저를 이용한 승인형 자동 입력
- 발행 직전 기본 정지
- DOM selector 검증 실패 시 `PLATFORM_CHANGED`
- 보안 절차 우회 금지

## 공통 안전장치

1. `QA_PASSED`가 아니면 Publisher 실행 금지
2. 이미지 URL 또는 로컬 파일 존재 검증
3. 제목·본문 공백 금지
4. 금지 문구·중복 문단·깨진 링크 검사
5. 발행 후 원격 게시물 재조회 또는 브라우저 확인
6. 실패 시 자동 재발행 금지
7. 모든 실행은 `lifebookmom_logs/`에 기록

## 저장 위치

- 구현: `lifebookmom_publisher/`
- 인증 예시: `lifebookmom_publisher/.env.example`
- 실행 기록: `lifebookmom_logs/`
- 발행 결과: `lifebookmom_cms/`
- 검증 규칙: `lifebookmom_qa/`
