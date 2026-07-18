@echo off
chcp 65001 >nul
setlocal EnableExtensions EnableDelayedExpansion
cd /d "%~dp0"

set "TOPIC=%~1"
set "CATEGORY=%~2"
if "%CATEGORY%"=="" set "CATEGORY=미분류"

if "%TOPIC%"=="" (
  set /p "TOPIC=글 주제를 입력하세요: "
)
if "%TOPIC%"=="" (
  echo FAIL: 글 주제가 비어 있습니다.
  exit /b 2
)

where git >nul 2>nul
if errorlevel 1 (
  echo FAIL: Git을 찾을 수 없습니다.
  exit /b 3
)

where python >nul 2>nul
if errorlevel 1 (
  echo FAIL: Python을 찾을 수 없습니다.
  exit /b 4
)

echo [1/6] 최신 main 자동 동기화
git pull --ff-only origin main
if errorlevel 1 (
  echo FAIL: main 자동 동기화 실패. 로컬 변경 또는 Git 연결을 확인해야 합니다.
  exit /b 10
)

echo [2/6] 테스트 도구 확인
python -c "import pytest" >nul 2>nul
if errorlevel 1 (
  python -m pip install pytest
  if errorlevel 1 (
    echo FAIL: pytest 자동 설치 실패.
    exit /b 11
  )
)

echo [3/6] Brand DNA 테스트
python -m pytest tests/test_brand_dna_engine.py -q
if errorlevel 1 (
  echo FAIL: Brand DNA 테스트 실패. Blogger 전송을 차단합니다.
  exit /b 12
)

echo [4/6] 전체 회귀 테스트
python -m pytest tests -q
if errorlevel 1 (
  echo FAIL: 전체 회귀 테스트 실패. Blogger 전송을 차단합니다.
  exit /b 13
)

echo [5/6] 생활백서맘 글 생성, Brand QA, Content QA, Blogger 초안 생성
python lifebookmom_automation\topic_to_blogger_draft_runner.py "%TOPIC%" --category "%CATEGORY%" --min-text-length 5000
if errorlevel 1 (
  echo FAIL: 생성 또는 QA 또는 Blogger 초안 단계 실패.
  exit /b 14
)

echo [6/6] 완료
echo PASS: 주제 입력부터 자동 동기화, 테스트, QA, Blogger 초안 생성까지 완료되었습니다.
exit /b 0
