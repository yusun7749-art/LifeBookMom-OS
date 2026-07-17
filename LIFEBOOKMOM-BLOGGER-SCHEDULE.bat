@echo off
setlocal
cd /d "%~dp0"

if "%~1"=="" (
  echo 사용법: LIFEBOOKMOM-BLOGGER-SCHEDULE.bat 요청파일.json 2026-07-20T09:00:00+09:00
  pause
  exit /b 2
)

if "%~2"=="" (
  echo 예약 발행 시간이 없습니다. RFC3339 형식으로 입력하세요.
  echo 예: 2026-07-20T09:00:00+09:00
  pause
  exit /b 2
)

python lifebookmom_automation\blogger_pipeline_runner.py "%~1" --schedule "%~2" --min-text-length 5000
set EXIT_CODE=%ERRORLEVEL%

if not "%EXIT_CODE%"=="0" (
  echo.
  echo FAIL: QA 또는 Blogger 예약 발행에 실패했습니다.
  pause
  exit /b %EXIT_CODE%
)

echo.
echo PASS: Blogger 예약 발행이 등록되었습니다.
pause
exit /b 0
