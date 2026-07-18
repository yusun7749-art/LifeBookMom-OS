@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"

if "%~3"=="" (
  echo 사용법: LIFEBOOKMOM-ASSET-QA.bat "manifest.json" "draft.json" "visual-review.json"
  pause
  exit /b 2
)

python lifebookmom_assets\asset_qa_engine.py "%~1" "%~2" "%~3"
set EXIT_CODE=%ERRORLEVEL%

if not "%EXIT_CODE%"=="0" (
  echo.
  echo FAIL: Asset QA를 통과하지 못했습니다. QA 보고서의 수정 사유를 확인하세요.
  pause
  exit /b %EXIT_CODE%
)

echo.
echo PASS: 콘텐츠가 PUBLISH_READY 상태로 전환되었습니다.
pause
exit /b 0
