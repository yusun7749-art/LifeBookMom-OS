# LifeBookMom OS Enterprise V5 Architecture

## 목표
V5부터는 기능 추가가 아니라 구조를 바꾼다.

LifeBookMom OS는 블로그 관리 프로그램이 아니라 생활백서맘 회사를 운영하는 AI 운영체제다.

## 핵심 철학
한 아이의 성장 기록이 수많은 부모의 길이 된다.

## V5 구조
- `brand/` : 생활백서맘 브랜드 규칙
- `brain/` : 항해사 판단 엔진
- `company/` : 향후 회사 조직형 화면
- `data/` : 실제 콘텐츠·프로젝트 데이터
- `components/` : UI 구성요소
- `app/` : Next.js 화면 라우트

## V5 우선순위
1. 현재 깨진 import 안정화
2. 브랜드 규칙 모듈화
3. Brain 엔진 분리
4. Enterprise 화면을 메인 운영체제로 승격
5. 각 센터를 연결형 구조로 리디자인

## Git 저장 명령
git add .
git commit -m "LifeBookMom OS Enterprise V5 기반 구조 시작"
git push
