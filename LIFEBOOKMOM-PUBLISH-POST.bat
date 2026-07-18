@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"

if /I not "%~1"=="PUBLISH" (
  echo.
  echo 공개 발행은 실제 블로그에 게시물을 올립니다.
  echo 실행하려면 아래처럼 PUBLISH를 정확히 입력하세요.
  echo LIFEBOOKMOM-PUBLISH-POST.bat PUBLISH
  pause
  exit /b 2
)

if "%~2"=="" (
  python -m lifebookmom_automation.blogger_verified_draft_publisher --latest --confirm PUBLISH
) else (
  python -m lifebookmom_automation.blogger_verified_draft_publisher "%~2" --confirm PUBLISH
)
set EXIT_CODE=%ERRORLEVEL%

if not "%EXIT_CODE%"=="0" (
  echo.
  echo FAIL: Blogger 공개 발행 또는 발행 후 검증에 실패했습니다.
  pause
  exit /b %EXIT_CODE%
)

echo.
echo PASS: 검증 완료 초안이 공개 발행되었고 Blogger에서 LIVE 상태를 확인했습니다.
pause
exit /b 0
