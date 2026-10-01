import os
import json
import urllib.request

auth_file = os.path.expanduser('~/AppData/Roaming/com.vercel.cli/Data/auth.json')
with open(auth_file, 'r', encoding='utf-8') as f:
    token = json.load(f)['token']

project_file = '.vercel/project.json'
with open(project_file, 'r', encoding='utf-8') as f:
    pdata = json.load(f)
    project_id = pdata['projectId']
    team_id = pdata.get('orgId')

def add_or_update(key, value, is_secret=False):
    # Check if exists
    url = f"https://api.vercel.com/v9/projects/{project_id}/env?teamId={team_id}"
    req = urllib.request.Request(url, headers={'Authorization': f'Bearer {token}'})
    with urllib.request.urlopen(req) as resp:
        envs = json.loads(resp.read().decode())['envs']
    
    existing = next((e for e in envs if e['key'] == key), None)
    if existing:
        del_url = f"https://api.vercel.com/v9/projects/{project_id}/env/{existing['id']}?teamId={team_id}"
        del_req = urllib.request.Request(del_url, headers={'Authorization': f'Bearer {token}'}, method='DELETE')
        with urllib.request.urlopen(del_req) as resp:
            print(f"Deleted old {key}")

    post_url = f"https://api.vercel.com/v10/projects/{project_id}/env?teamId={team_id}"
    payload = json.dumps({
        'key': key,
        'value': value,
        'type': 'encrypted' if is_secret else 'plain',
        'target': ['production', 'preview', 'development']
    }).encode('utf-8')
    post_req = urllib.request.Request(
        post_url,
        data=payload,
        headers={'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'},
        method='POST'
    )
    with urllib.request.urlopen(post_req) as resp:
        print(f"Added {key}: {resp.status}")

# Read .env.local
with open('.env.local', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for line in lines:
    line = line.strip()
    if not line or line.startswith('#') or '=' not in line:
        continue
    key, val = line.split('=', 1)
    key = key.strip()
    val = val.strip()
    is_secret = 'KEY' in key or 'SECRET' in key or 'ID' in key
    add_or_update(key, val, is_secret)

print("All env vars synced to production, preview, development!")
