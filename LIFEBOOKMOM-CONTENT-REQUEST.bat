@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"

if "%~1"=="" (
  echo 사용법: LIFEBOOKMOM-CONTENT-REQUEST.bat "엄마, 나만 친구 집에 못 가?" [카테고리]
  pause
  exit /b 2
)

set "CATEGORY=%~2"
if "%CATEGORY%"=="" set "CATEGORY=미분류"

python lifebookmom_engine\content_request_engine.py "%~1" --category "%CATEGORY%" --channel blogger
set EXIT_CODE=%ERRORLEVEL%

if not "%EXIT_CODE%"=="0" (
  echo.
  echo FAIL: 콘텐츠 요청 생성에 실패했습니다.
  pause
  exit /b %EXIT_CODE%
)

echo.
echo PASS: 주제가 생활백서맘 콘텐츠 요청함에 저장되었습니다.
pause
exit /b 0
