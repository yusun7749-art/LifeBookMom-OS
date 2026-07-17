@echo off
setlocal
cd /d "%~dp0"

if "%~1"=="" (
  echo 사용법: LIFEBOOKMOM-BLOGGER-SMOKE-TEST.bat lifebookmom_publisher\examples\blogger_publish_request.example.json
  exit /b 2
)

python lifebookmom_publisher\blogger_draft_smoke_test.py "%~1"
set EXIT_CODE=%ERRORLEVEL%

if not "%EXIT_CODE%"=="0" (
  echo.
  echo FAIL: Blogger 초안 생성-조회-수정-삭제 검증에 실패했습니다.
  pause
  exit /b %EXIT_CODE%
)

echo.
echo PASS: 임시 초안 생성-조회-수정-삭제가 모두 완료되었습니다.
pause
exit /b 0
