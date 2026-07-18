@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"

if "%~1"=="" (
  echo 사용법: LIFEBOOKMOM-ASSET-REQUEST.bat lifebookmom_cms\drafts\초안파일.json
  pause
  exit /b 2
)

python lifebookmom_engine\asset_request_engine.py "%~1"
set EXIT_CODE=%ERRORLEVEL%

if not "%EXIT_CODE%"=="0" (
  echo.
  echo FAIL: 이미지 제작 요청 생성에 실패했습니다.
  pause
  exit /b %EXIT_CODE%
)

echo.
echo PASS: 썸네일과 10컷 인포그래픽 제작 요청이 저장되었습니다.
pause
exit /b 0
