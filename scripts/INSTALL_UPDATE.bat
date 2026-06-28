@echo off
chcp 65001 > nul
setlocal

set ROOT=C:\LifeBookMom-OS
set BACKUP=%ROOT%\backup_enterprise_v2_%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set BACKUP=%BACKUP: =0%

echo.
echo ==========================================
echo  LifeBookMom Enterprise V2 Update Installer
echo ==========================================
echo.

if not exist "%ROOT%" (
  echo [ERROR] C:\LifeBookMom-OS 폴더를 찾을 수 없습니다.
  pause
  exit /b 1
)

echo [1/5] 백업 폴더 생성 중...
mkdir "%BACKUP%" > nul 2>&1

if exist "%ROOT%\components\OperationDashboard.tsx" copy "%ROOT%\components\OperationDashboard.tsx" "%BACKUP%\OperationDashboard.tsx" > nul
if exist "%ROOT%\components\KoreaClock.tsx" copy "%ROOT%\components\KoreaClock.tsx" "%BACKUP%\KoreaClock.tsx" > nul
if exist "%ROOT%\components\OneClickRenewalButton.tsx" copy "%ROOT%\components\OneClickRenewalButton.tsx" "%BACKUP%\OneClickRenewalButton.tsx" > nul

echo [2/5] 업데이트 파일 복사 중...
xcopy "%~dp0components" "%ROOT%\components" /E /Y /I > nul
xcopy "%~dp0docs" "%ROOT%\docs" /E /Y /I > nul
xcopy "%~dp0logs" "%ROOT%\logs" /E /Y /I > nul

echo [3/5] OneClickRenewalButton 자동 패치 중...
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$p='%ROOT%\components\OneClickRenewalButton.tsx'; if(Test-Path $p){$c=Get-Content $p -Raw; if($c -match 'brandImageRules' -and $c -notmatch 'const\s+brandImageRules\s*='){ $c=$c -replace '(const\s+coupangId\s*=\s*\"AF1467107\";)', '$1`r`nconst brandImageRules = JSON.stringify(lifebookmomBrandRules, null, 2);'; Set-Content -Path $p -Value $c -Encoding UTF8; Write-Host 'brandImageRules 패치 완료'; } else { Write-Host '패치 불필요 또는 이미 완료'; }}"

echo [4/5] 잘못 생성된 빈 파일 정리 중...
for %%F in ("(" "dir" "git" "notepad" "main") do (
  if exist "%ROOT%\%%~F" (
    for %%A in ("%ROOT%\%%~F") do if %%~zA==0 del "%ROOT%\%%~F"
  )
)

echo [5/5] 완료.
echo.
echo 백업 위치: %BACKUP%
echo 이제 VS Code에서 npm run dev 실행 후 http://localhost:3000/dashboard 를 확인하세요.
echo.
pause
