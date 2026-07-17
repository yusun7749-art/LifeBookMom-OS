@echo off
setlocal
cd /d "%~dp0"

echo [1/4] Blogger dependency install
python -m pip install -r lifebookmom_publisher\requirements-blogger.txt
if errorlevel 1 goto :fail

echo [2/4] OAuth file check
if not exist secrets\client_secret.json (
  echo FAIL: secrets\client_secret.json 파일이 없습니다.
  pause
  exit /b 2
)

echo [3/4] Google login and Blogger list check
python lifebookmom_publisher\blogger_publisher.py --list-blogs
if errorlevel 1 goto :fail

echo [4/4] Completed
echo Google OAuth token and Blogger access were confirmed.
pause
exit /b 0

:fail
echo.
echo FAIL: 위 오류 메시지를 그대로 알려주세요.
pause
exit /b 1
