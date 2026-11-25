import fs from 'node:fs';
import path from 'node:path';
const dir='.github/workflows';
const failures=[];
const names=fs.readdirSync(dir).filter(s=>/\.ya?ml$/.test(s));
const contents={};
for(const name of names){
 const y=fs.readFileSync(path.join(dir,name),'utf8');
 contents[name]=y;
 if(/\bpull_request_target\s*:/.test(y))failures.push(name+' unsafe pull_request_target event');
 if(/\bwrite-all\b/.test(y))failures.push(name+' write-all permission');
 for(const m of y.matchAll(/^\s*uses:\s*([\w./-]+)@([^\s#]+)/gm)){
  if(!/^[0-9a-f]{40}$/.test(m[2]))failures.push(name+' action not pinned to full SHA: '+m[1]);
 }
}
const pages=contents['pages.yml']||'';
if(!pages.includes('branches: [main]'))failures.push('Pages must trigger from main only');
if(/\bworkflow_dispatch\s*:/.test(pages)||/\bpull_request\s*:/.test(pages))failures.push('Pages must not deploy from manual/PR triggers');
if(!pages.includes("github.ref == 'refs/heads/main'"))failures.push('Pages runtime main gate missing');
if(!pages.includes('actions/deploy-pages@'))failures.push('Official Pages deployment action missing');
for(const name of ['docs-ci.yml','docs-security.yml']){
 const y=contents[name]||'';
 if(!y.includes('branches: [dev, main]'))failures.push(name+' must test dev and main');
 if(!y.includes('npm ci'))failures.push(name+' must install immutable dependency lockfile');
}
if(!contents['promotion-policy.yml']?.includes('main:dev'))failures.push('Missing dev-to-main PR policy');
const auto=contents['auto-promote-main.yml']||'';
if(!auto.includes('push:')||!auto.includes('branches: [dev]'))failures.push('Automatic promotion must trigger on dev pushes and verify exact CI itself');
if(!auto.includes('docs-security.yml') && !fs.readFileSync('scripts/auto_promote_main.py','utf8').includes('docs-security.yml'))failures.push('Automatic promotion missing security CI verification');
if(!auto.includes('permission-contents: write')||!auto.includes('create-github-app-token@'))failures.push('Automatic promotion must use a scoped GitHub App token');
if(!auto.includes('workflow_dispatch:'))failures.push('Promotion must permit controlled retry after credentials are configured');
if(!auto.includes("persist-credentials: false"))failures.push('Promotion checkout must not persist credentials');
if(!fs.readFileSync('scripts/auto_promote_main.py','utf8').includes('"force": False'))failures.push('Promotion must disallow force pushes');
if(failures.length){console.error(failures.join('\n'));process.exitCode=1}
else console.log('Workflow policy, SHA pinning and main-only Pages gate passed');
