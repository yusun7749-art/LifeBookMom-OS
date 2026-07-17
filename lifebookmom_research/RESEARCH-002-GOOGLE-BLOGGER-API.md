# RESEARCH-002 — Google Blogger API 조사

작성일: 2026-07-17
상태: 공식 API 조사 완료 / 계정 인증 테스트 전

## 결론

Google Blogger API v3는 생활백서맘 Google 글 자동화에 사용할 수 있다.

공식 지원 범위:
- 블로그 조회
- 게시물 목록·검색·조회
- 게시물 초안 생성
- 게시물 수정·패치
- 초안 발행
- 예약 발행
- 게시물 삭제
- 페이지 생성·수정

## 핵심 API

### 초안 생성
`POST /blogger/v3/blogs/{blogId}/posts?isDraft=true`

필수:
- OAuth 2.0
- scope: `https://www.googleapis.com/auth/blogger`
- blogId
- title
- HTML content

### 초안 발행
`POST /blogger/v3/blogs/{blogId}/posts/{postId}/publish`

선택:
- `publishDate`로 예약 발행

### 수정
- `PATCH /blogger/v3/blogs/{blogId}/posts/{postId}`
- `PUT /blogger/v3/blogs/{blogId}/posts/{postId}`

## 이미지 처리 판단

Blogger 게시물 본문은 HTML을 받을 수 있다. 따라서 본문에는 최종 이미지 URL을 `<img>` 태그로 삽입한다.

Blogger API 자체를 생활백서맘의 범용 이미지 저장소로 간주하지 않는다. 이미지 업로드는 별도 Asset Publisher가 담당하고, Blogger Publisher는 업로드 완료 URL만 전달받는다.

## 인증 설계

저장 금지:
- OAuth client secret 원문
- access token 원문
- refresh token 원문

허용:
- 로컬 `.env` 또는 OS secret store
- 저장소에는 `.env.example`만 포함
- 최초 인증은 사용자가 브라우저에서 직접 승인

## 권장 발행 흐름

1. CMS 원고 상태 `QA_PASSED`
2. HTML Renderer 실행
3. Asset Publisher가 이미지 URL 확정
4. Blogger Publisher가 `isDraft=true`로 초안 생성
5. 생성된 postId와 URL을 CMS에 기록
6. 게시물 재조회 후 제목·본문·이미지·링크 검증
7. 사용자 승인
8. 즉시 또는 예약 발행
9. 발행 URL 최종 확인

## 판정

- 공식 API 초안 생성: 가능
- 공식 API 수정: 가능
- 공식 API 발행·예약 발행: 가능
- 인증 없는 실제 테스트: 불가
- Publisher 구현 착수: 가능
