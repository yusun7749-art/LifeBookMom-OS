@echo off
setlocal
cd /d "%~dp0"

if "%~1"=="" (
  echo 사용법: LIFEBOOKMOM-BLOGGER-DRY-RUN.bat lifebookmom_publisher\examples\blogger_publish_request.example.json
  exit /b 2
)

python lifebookmom_automation\blogger_pipeline_runner.py "%~1"
set EXIT_CODE=%ERRORLEVEL%

if not "%EXIT_CODE%"=="0" (
  echo.
  echo QA 또는 Publisher 검사에 실패했습니다.
  pause
)

exit /b %EXIT_CODE%
