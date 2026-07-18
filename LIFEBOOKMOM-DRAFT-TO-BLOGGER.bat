@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"

if "%~1"=="" (
  python -m lifebookmom_automation.draft_to_blogger_runner --latest
) else (
  python -m lifebookmom_automation.draft_to_blogger_runner "%~1"
)
set EXIT_CODE=%ERRORLEVEL%

if not "%EXIT_CODE%"=="0" (
  echo.
  echo FAIL: Blogger 비공개 초안 생성에 실패했습니다.
  pause
  exit /b %EXIT_CODE%
)

echo.
echo PASS: 생활백서맘 Blogger에 비공개 초안이 생성되었습니다.
echo Blogger 관리 화면의 게시물 목록에서 초안을 확인하세요.
pause
exit /b 0
