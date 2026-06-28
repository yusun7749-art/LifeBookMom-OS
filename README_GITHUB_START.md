# LifeBookMom OS · GitHub Baseline

이 패키지는 선장님이 업로드한 현재 `app`, `components`, `data` 폴더를 기준으로 만든 GitHub 전환용 기준본입니다.

## 적용 순서

1. 이 ZIP을 압축 해제합니다.
2. 안의 `app`, `components`, `data`, `docs`, `scripts`, `.gitignore`를 `C:\LifeBookMom-OS`에 복사합니다.
3. 같은 파일은 덮어쓰기합니다.
4. VS Code 터미널에서 아래 명령을 실행합니다.

```powershell
git init
git add .
git commit -m "Project019 baseline: LifeBookMom OS current state"
```

5. GitHub에서 새 저장소를 만든 뒤 안내되는 remote 명령을 실행합니다.

예시:

```powershell
git remote add origin https://github.com/<계정명>/<저장소명>.git
git branch -M main
git push -u origin main
```

## 운영 원칙

- GitHub = 기준 저장소
- VS Code = 실행 확인 작업실
- 앞으로 Project020부터는 GitHub 기준으로 변경 파일을 관리합니다.
- ZIP 덮어쓰기는 임시 수단이고, 최종 기준은 GitHub 커밋입니다.
