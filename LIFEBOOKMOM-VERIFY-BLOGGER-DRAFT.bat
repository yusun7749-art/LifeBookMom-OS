@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"

if "%~1"=="" (
  python -m lifebookmom_automation.blogger_draft_verifier --latest
) else (
  python -m lifebookmom_automation.blogger_draft_verifier "%~1"
)
set EXIT_CODE=%ERRORLEVEL%

if not "%EXIT_CODE%"=="0" (
  echo.
  echo FAIL: Blogger 비공개 초안 실제 검증에 실패했습니다.
  pause
  exit /b %EXIT_CODE%
)

echo.
echo PASS: Blogger 비공개 초안의 제목, 본문, 라벨, 상태가 CMS와 일치합니다.
pause
exit /b 0
