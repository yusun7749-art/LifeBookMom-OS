@echo off
chcp 65001 >nul
setlocal EnableExtensions EnableDelayedExpansion
cd /d "%~dp0"

set "TOPIC=%~1"
set "CATEGORY=%~2"
if "%CATEGORY%"=="" set "CATEGORY=미분류"

if "%TOPIC%"=="" set /p "TOPIC=글 주제를 입력하세요: "
if "%TOPIC%"=="" (
  echo FAIL: 글 주제가 비어 있습니다.
  exit /b 2
)

where git >nul 2>nul || (echo FAIL: Git을 찾을 수 없습니다.& exit /b 3)
where python >nul 2>nul || (echo FAIL: Python을 찾을 수 없습니다.& exit /b 4)

echo MASTER LOG START
python -c "from factory.execution_hook import start_execution; start_execution('%TOPIC%')"

python lifebookmom_automation\topic_to_blogger_image_runner.py "%TOPIC%" --category "%CATEGORY%" --min-text-length 5000
if errorlevel 1 (
  python -c "from factory.execution_hook import finish_execution; finish_execution('%TOPIC%', 'FAIL')"
  echo HOLD: 자동 파이프라인이 안전하게 중단되었습니다.
  exit /b 15
)

python -c "from factory.execution_hook import finish_execution; finish_execution('%TOPIC%', 'PASS')"

echo PASS: MASTER LOG 기록과 자동 파이프라인 완료
exit /b 0
