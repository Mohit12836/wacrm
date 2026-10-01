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

def delete_env(env_id):
    del_url = f"https://api.vercel.com/v9/projects/{project_id}/env/{env_id}?teamId={team_id}"
    req = urllib.request.Request(del_url, headers={'Authorization': f'Bearer {token}'}, method='DELETE')
    with urllib.request.urlopen(req) as resp:
        return resp.status

def add_env(key, value):
    post_url = f"https://api.vercel.com/v10/projects/{project_id}/env?teamId={team_id}"
    payload = json.dumps({
        'key': key,
        'value': value,
        'type': 'encrypted',
        'target': ['production', 'preview', 'development']
    }).encode('utf-8')
    req = urllib.request.Request(
        post_url,
        data=payload,
        headers={'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'},
        method='POST'
    )
    with urllib.request.urlopen(req) as resp:
        return resp.status

# Get current envs
url = f"https://api.vercel.com/v9/projects/{project_id}/env?teamId={team_id}"
req = urllib.request.Request(url, headers={'Authorization': f'Bearer {token}'})
with urllib.request.urlopen(req) as resp:
    envs = json.loads(resp.read().decode())['envs']

for key, val in [('META_APP_SECRET', '437a782eb7cdb6c9e9b0f27b6adf2d39'), ('META_APP_ID', '1380482834156168')]:
    existing = next((e for e in envs if e['key'] == key), None)
    if existing:
        print(f"Deleting existing {key} ({existing['id']})...")
        delete_env(existing['id'])
    print(f"Adding new {key}...")
    status = add_env(key, val)
    print(f"Added {key}: {status}")

print("Vercel Environment Variables Synchronized Successfully!")
