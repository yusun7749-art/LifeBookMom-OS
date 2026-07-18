@echo off
chcp 65001 >nul
setlocal EnableExtensions EnableDelayedExpansion
cd /d "%~dp0"

set "TOPIC=%~1"
set "CATEGORY=%~2"
if "%CATEGORY%"=="" set "CATEGORY=미분류"

if "%TOPIC%"=="" set /p "TOPIC=글 주제를 입력하세요: "
if "%TOPIC%"=="" (
  echo FAIL: 글 주제가 비어 있습니다.
  exit /b 2
)

where git >nul 2>nul || (echo FAIL: Git을 찾을 수 없습니다.& exit /b 3)
where python >nul 2>nul || (echo FAIL: Python을 찾을 수 없습니다.& exit /b 4)

echo [1/8] 최신 main 자동 동기화
git pull --ff-only origin main || (echo FAIL: main 자동 동기화 실패.& exit /b 10)

echo [2/8] 테스트 도구 확인
python -c "import pytest" >nul 2>nul
if errorlevel 1 python -m pip install pytest
if errorlevel 1 (echo FAIL: pytest 자동 설치 실패.& exit /b 11)

echo [3/8] Brand DNA 테스트
python -m pytest tests/test_brand_dna_engine.py -q || (echo FAIL: Brand DNA 테스트 실패.& exit /b 12)

echo [4/8] 이미지 파이프라인 테스트
python -m pytest tests/test_image_pipeline_engine.py tests/test_image_generator_bridge.py -q || (echo FAIL: 이미지 테스트 실패.& exit /b 13)

echo [5/8] 전체 회귀 테스트
python -m pytest tests -q || (echo FAIL: 전체 회귀 테스트 실패.& exit /b 14)

echo [6/8] 글 생성, 이미지 생성, 공개 업로드, Blogger 초안 생성
python lifebookmom_automation\topic_to_blogger_image_runner.py "%TOPIC%" --category "%CATEGORY%" --min-text-length 5000
if errorlevel 1 (
  echo HOLD: 자동 파이프라인이 안전하게 중단되었습니다.
  echo 이미지 생성기 설정, GitHub 토큰, Google OAuth 또는 QA 결과를 확인하세요.
  exit /b 15
)

echo [7/8] Blogger 실제 초안 이미지 검증 완료
echo [8/8] 완료
echo PASS: Brand QA, Content QA, 이미지 3종, 공개 URL, Blogger 비공개 초안 검증을 통과했습니다.
exit /b 0
