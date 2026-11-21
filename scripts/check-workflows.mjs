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
 if(!y.includes('branches: [dev, beta, main]'))failures.push(name+' must test all branches');
 if(!y.includes('npm ci'))failures.push(name+' must install immutable dependency lockfile');
}
if(!contents['promotion-policy.yml']?.includes('main:beta'))failures.push('Missing promotion policy');
if(failures.length){console.error(failures.join('\n'));process.exitCode=1}
else console.log('Workflow policy, SHA pinning and main-only Pages gate passed');
