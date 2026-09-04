#!/usr/bin/env bash
# Stage 3 verification script — the tool-agnostic core of the CLI stage.
#
# Any CLI-based AI (Claude Code CLI, Gemini CLI, etc.) can be pointed at
# this script's output to know exactly what to fix next; a human or a CI
# runner can use it standalone. This is what makes "Functionality: runs
# end-to-end without breaking" a checked fact instead of a claim.
set -uo pipefail
cd "$(dirname "$0")/../.."

echo "== Stage 3: automated verification =="

echo "-- npm run lint --"
if npm run lint; then
  echo "PASS: lint"
  LINT_OK=1
else
  echo "FAIL: lint"
  LINT_OK=0
fi

echo
echo "-- npm run build --"
if npm run build; then
  echo "PASS: build"
  BUILD_OK=1
else
  echo "FAIL: build"
  BUILD_OK=0
fi

echo
if [[ "$LINT_OK" -eq 1 && "$BUILD_OK" -eq 1 ]]; then
  echo "RESULT: workflow requirement satisfied (lint + build both clean)."
  exit 0
else
  echo "RESULT: workflow requirement NOT satisfied — see failures above."
  exit 1
fi
