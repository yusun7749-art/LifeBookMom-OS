@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"

if "%~4"=="" (
  echo 사용법: LIFEBOOKMOM-ASSET-COMPLETE.bat "asset-request.json" "draft.json" "thumbnail.png" "infographic.png"
  pause
  exit /b 2
)

python lifebookmom_assets\asset_completion_engine.py "%~1" "%~2" "%~3" "%~4"
set EXIT_CODE=%ERRORLEVEL%

if not "%EXIT_CODE%"=="0" (
  echo.
  echo FAIL: 이미지 완료 등록에 실패했습니다.
  pause
  exit /b %EXIT_CODE%
)

echo.
echo PASS: 썸네일과 인포그래픽이 CMS 초안에 연결되었습니다.
pause
exit /b 0
