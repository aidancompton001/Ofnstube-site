#!/usr/bin/env python3
"""Ofnstube verify — pure-Python, Windows-safe (no shell-out).

Usage:
    python verify/verify.py
    python verify/verify.py --acceptance verify/acceptance.json
"""
from __future__ import annotations
import argparse
import json
import sys
from pathlib import Path

GREEN = "\033[92m"
RED = "\033[91m"
RESET = "\033[0m"


def read_text(path: str) -> str:
    p = Path(path)
    if not p.is_file():
        return ""
    try:
        return p.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        return p.read_text(encoding="utf-8", errors="replace")


def check(c: dict) -> tuple[bool, str]:
    t = c.get("type")
    cid = c.get("id", "?")
    name = c.get("name", "?")

    if t == "dir_exists":
        ok = Path(c["path"]).is_dir()
        return ok, f"dir_exists {c['path']}"

    if t == "file_exists":
        ok = Path(c["path"]).is_file()
        return ok, f"file_exists {c['path']}"

    if t == "all_files_exist":
        missing = [p for p in c["paths"] if not Path(p).is_file()]
        return (len(missing) == 0), (f"all_files_exist (missing: {missing})" if missing else "all_files_exist OK")

    if t == "grep_present":
        content = read_text(c["path"])
        ok = c["needle"] in content
        return ok, f"grep_present needle={c['needle']!r} in {c['path']}"

    if t == "grep_count_exact":
        content = read_text(c["path"])
        cnt = content.count(c["needle"])
        ok = cnt == c["expect"]
        return ok, f"grep_count_exact needle={c['needle']!r} got={cnt} expect={c['expect']}"

    if t == "grep_count_max":
        content = read_text(c["path"])
        cnt = content.count(c["needle"])
        ok = cnt <= c["max"]
        return ok, f"grep_count_max needle={c['needle']!r} got={cnt} max={c['max']}"

    if t == "dir_file_count_min":
        d = Path(c["path"])
        if not d.is_dir():
            return False, f"dir_file_count_min: dir not found {c['path']}"
        files = list(d.glob(c["glob"]))
        ok = len(files) >= c["min"]
        return ok, f"dir_file_count_min glob={c['glob']} got={len(files)} min={c['min']}"

    if t == "grep_count_in_dir_min":
        d = Path(c["path"])
        if not d.is_dir():
            return False, f"grep_count_in_dir_min: dir not found {c['path']}"
        matches = sum(1 for f in d.glob(c["glob"]) if c["needle"] in read_text(str(f)))
        ok = matches >= c["min"]
        return ok, f"grep_count_in_dir_min needle={c['needle']!r} matches={matches} min={c['min']}"

    if t == "grep_count_min":
        content = read_text(c["path"])
        cnt = content.count(c["needle"])
        ok = cnt >= c["min"]
        return ok, f"grep_count_min needle={c['needle']!r} got={cnt} min={c['min']}"

    return False, f"UNKNOWN_TYPE {t}"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--acceptance", default="verify/acceptance.json")
    args = ap.parse_args()

    accept_path = Path(args.acceptance)
    if not accept_path.is_file():
        # Try project-rooted fallback
        accept_path = Path(__file__).parent / "acceptance.json"

    spec = json.loads(accept_path.read_text(encoding="utf-8"))
    checks = spec.get("checks", [])
    passed = 0
    failed = 0
    fails: list[str] = []

    print(f"Ofnstube verify — {spec.get('source_px', '?')} — {len(checks)} checks\n")
    for c in checks:
        ok, msg = check(c)
        cid = c.get("id", "?")
        name = c.get("name", "?")
        if ok:
            print(f"  {GREEN}PASS{RESET}  {cid}  {name}")
            passed += 1
        else:
            print(f"  {RED}FAIL{RESET}  {cid}  {name}  --  {msg}")
            failed += 1
            fails.append(f"{cid} {name}: {msg}")

    total = len(checks)
    pct = (passed * 100 // total) if total else 0
    print(f"\nRESULT: {passed}/{total} PASSED ({pct}%)")
    if fails:
        print("\nFailed checks:")
        for f in fails:
            print(f"  - {f}")
    return 0 if failed == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
