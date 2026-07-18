@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"

if "%~2"=="" (
  echo 사용법: LIFEBOOKMOM-PUBLISH.bat "publisher-request.json" "draft.json"
  pause
  exit /b 2
)

python lifebookmom_publisher\publisher_execution_engine.py "%~1" "%~2"
set EXIT_CODE=%ERRORLEVEL%

if not "%EXIT_CODE%"=="0" (
  echo.
  echo FAIL: Blogger 실행에 실패했습니다. retry_queue와 CMS 오류 상태를 확인하세요.
  pause
  exit /b %EXIT_CODE%
)

echo.
echo PASS: Blogger 처리와 CMS 상태 업데이트가 완료되었습니다.
pause
exit /b 0
