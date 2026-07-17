# SESSION-004 — CI 실패 원인 수정

## 확인 결과
- Python 문법 검사: 성공
- 단위 테스트: 성공
- 통합 dry-run: 실패

## 실제 원인
- Workflow가 존재하지 않는 `lifebookmom_automation/pipeline_runner.py`를 호출함
- Workflow가 존재하지 않는 `lifebookmom_publisher/examples/blogger_request.example.json`을 호출함

## 수정
- 실제 Runner인 `lifebookmom_automation/blogger_pipeline_runner.py`로 변경
- QA 기준을 충족하는 통합검증 전용 요청 파일 추가
- 기본 dry-run 모드로 OAuth 없이 검증하도록 유지

## 완료 조건
GitHub Actions에서 Compile, Unit tests, Integrated dry-run이 모두 성공해야 PASS 처리한다.
