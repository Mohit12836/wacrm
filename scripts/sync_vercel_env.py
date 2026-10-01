import os
import sys
import subprocess

def main():
    if not os.path.exists('.env.local'):
        print(".env.local not found!")
        return

    with open('.env.local', 'r', encoding='utf-8') as f:
        lines = f.readlines()

    for line in lines:
        line = line.strip()
        if not line or line.startswith('#'):
            continue
        if '=' not in line:
            continue
        key, val = line.split('=', 1)
        key = key.strip()
        val = val.strip()

        if key and val:
            print(f"Syncing {key} to Vercel...")
            # Remove existing if any
            subprocess.run(f"npx vercel env rm {key} production --yes", shell=True, capture_output=True)
            # Add to production, preview, and development
            p = subprocess.Popen(
                f"npx vercel env add {key} production",
                shell=True,
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            )
            stdout, stderr = p.communicate(input=f"{val}\n")
            print(f"  Result: {stdout.strip() or stderr.strip()}")

    print("\nRedeploying to Vercel with active environment variables...")
    res = subprocess.run("npx vercel deploy --prod --yes", shell=True, text=True, capture_output=True)
    print(res.stdout)
    if res.stderr:
        print(res.stderr)

if __name__ == "__main__":
    main()
