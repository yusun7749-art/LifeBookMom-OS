# Decision Log

Status: ACTIVE

---

## 2026-06-28

Decision ID: DL-0001

Title:
GitHub를 LifeBookMom OS의 기준 저장소로 사용

Reason:
VS Code와 ZIP 중심 운영으로 변경 이력이 누락되고 동일한 문제가 반복됨.

Decision:
- GitHub = 기준 저장소
- VS Code = 작업 공간
- ZIP = 적용 패키지

Approved:
대표 승인

Impact:
운영 기준 변경

---

Decision ID: DL-0002

Title:
네이버 원클릭 V4 고정

Reason:
V1~V4 규칙 혼재로 출력 구조가 계속 변경됨.

Decision:
네이버는 V4 템플릿만 사용.
이전 버전은 ARCHIVED.

Approved:
대표 승인

Impact:
출력 구조 고정

---

Decision ID: DL-0003

Title:
Project021은 GitHub Branch 기준으로 진행

Reason:
main 기준점 없이 ZIP 패치를 반복하면 기준이 흔들림.

Decision:
Project021 작업은 project021-stabilize 브랜치에서만 진행한다.
작업 완료 후 Commit과 Push로 기준을 갱신한다.

Approved:
대표 승인

Impact:
작업 흐름 고정
