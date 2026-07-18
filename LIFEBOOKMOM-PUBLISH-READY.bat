@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"

if "%~2"=="" (
  echo 사용법: LIFEBOOKMOM-PUBLISH-READY.bat "draft.json" "asset-qa.json" [draft^|schedule^|publish] [예약시각]
  pause
  exit /b 2
)

set "MODE=%~3"
if "%MODE%"=="" set "MODE=draft"

if /I "%MODE%"=="schedule" (
  if "%~4"=="" (
    echo FAIL: schedule 모드에는 RFC3339 예약시각이 필요합니다.
    pause
    exit /b 2
  )
  python lifebookmom_publisher\publish_ready_engine.py "%~1" "%~2" --mode schedule --publish-at "%~4"
) else (
  python lifebookmom_publisher\publish_ready_engine.py "%~1" "%~2" --mode "%MODE%"
)

set EXIT_CODE=%ERRORLEVEL%
if not "%EXIT_CODE%"=="0" (
  echo.
  echo FAIL: Publisher 요청 준비에 실패했습니다.
  pause
  exit /b %EXIT_CODE%
)

echo.
echo PASS: 검증된 Blogger Publisher 요청이 생성되었습니다.
pause
exit /b 0
