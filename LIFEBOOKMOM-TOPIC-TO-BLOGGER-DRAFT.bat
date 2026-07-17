@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"

if "%~1"=="" (
  echo 사용법: LIFEBOOKMOM-TOPIC-TO-BLOGGER-DRAFT.bat "글 주제" "카테고리"
  pause
  exit /b 2
)

set "CATEGORY=%~2"
if "%CATEGORY%"=="" set "CATEGORY=미분류"

python lifebookmom_automation\topic_to_blogger_draft_runner.py "%~1" --category "%CATEGORY%" --min-text-length 5000
set EXIT_CODE=%ERRORLEVEL%

if not "%EXIT_CODE%"=="0" (
  echo.
  echo FAIL: 글 생성, QA 또는 Blogger 초안 생성에 실패했습니다.
  pause
  exit /b %EXIT_CODE%
)

echo.
echo PASS: 주제 입력부터 QA와 Blogger 초안 생성까지 완료되었습니다.
pause
exit /b 0
