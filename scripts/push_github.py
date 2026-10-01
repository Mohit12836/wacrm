import os
import sys
import subprocess

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

def run(cmd):
    print(f">> {cmd}")
    res = subprocess.run(cmd, shell=True, text=True, capture_output=True, encoding='utf-8', errors='replace')
    if res.stdout:
        print(res.stdout.strip())
    if res.stderr and res.returncode != 0:
        print(f"Error: {res.stderr.strip()}")
    return res

def main():
    print("=========================================================")
    print("      🐙 1-CLICK GITHUB PUSH - MOHIT12836/WACRM")
    print("=========================================================\n")

    # 1. Check gh auth
    gh_check = run("gh auth status")
    if gh_check.returncode != 0:
        print("GitHub CLI is not logged in! Please run 'gh auth login' first.")
        sys.exit(1)

    # 2. Add and commit
    run("git add -A")
    commit_msg = sys.argv[1] if len(sys.argv) > 1 else "feat: wacrm configured with free gemini ai and meta cloud api"
    run(f'git commit -m "{commit_msg}"')

    # 3. Check if remote exists
    remotes = run("git remote -v").stdout
    if "ArnasDon/wacrm" in remotes:
        print("Switching remote from upstream to Mohit12836/wacrm...")
        run("git remote remove origin")

    repo_check = run("gh repo view Mohit12836/wacrm")
    if repo_check.returncode != 0:
        print("Creating GitHub repository Mohit12836/wacrm...")
        res = run("gh repo create Mohit12836/wacrm --public --source=. --remote=origin --push")
        if res.returncode == 0:
            print("\n✅ Repository created and pushed successfully!")
            print("👉 https://github.com/Mohit12836/wacrm")
            return
    else:
        # Remote exists, ensure origin points to Mohit12836/wacrm
        current_origin = run("git remote get-url origin").stdout.strip()
        if not current_origin or "ArnasDon" in current_origin:
            run("git remote remove origin")
            run("git remote add origin https://github.com/Mohit12836/wacrm.git")
        
        print("Pushing to main branch...")
        run("git branch -M main")
        push_res = run("git push -u origin main")
        if push_res.returncode == 0:
            print("\n✅ Changes pushed to GitHub successfully!")
            print("👉 https://github.com/Mohit12836/wacrm")
        else:
            print("\nPush failed. Trying force push or set-upstream...")
            run("git push -u origin main --force")

if __name__ == "__main__":
    main()
