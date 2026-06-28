# Recovery

Status: ACTIVE

## Purpose

운영본부와 시스템을 안정적으로 복구하기 위한 기준 문서

## Recovery Point

| Recovery ID | Date | Version | Git Commit | Description |
|-------------|------|---------|------------|-------------|

## Recovery Rules

1. 모든 완료(DONE)는 복구 지점을 남긴다.
2. Git Commit과 Version은 항상 연결한다.
3. 문제가 발생하면 가장 최근 Recovery Point로 복원한다.
4. 복원 후 DecisionLog에 기록한다.

## Rollback Procedure

1. Recovery Point 확인
2. Git Commit 확인
3. 해당 Commit으로 복원
4. 화면 확인
5. DONE 기록
