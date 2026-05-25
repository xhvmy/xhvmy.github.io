#!/bin/bash
set -e
cd "$(dirname "$0")"

# 변경사항 없으면 종료
if git diff --quiet && git diff --cached --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
  echo "변경사항 없음 — 배포 건너뜀"
  exit 0
fi

git add -A
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M')"
git push origin main

echo "✅ 배포 완료! https://xhvmy.github.io/"
