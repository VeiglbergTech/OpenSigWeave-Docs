import fs from 'node:fs';
import path from 'node:path';
const files=[],errors=[];
function walk(p){for(const e of fs.readdirSync(p,{withFileTypes:true})){if(['node_modules','dist','.git','.astro','.translate-env'].includes(e.name))continue;const f=path.join(p,e.name);if(e.isDirectory())walk(f);else if(/\.(md|mdx|json|mjs|js|ts|yaml|yml|txt|css)$/.test(f))files.push(f)}}
walk('.');
const patterns=[
['private IP',/\b(?:10\.\d{1,3}\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3}|172\.(?:1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3})\b/g],
['private key',/-----BEGIN (?:RSA |EC |OPENSSH |ENCRYPTED )?PRIVATE KEY-----/g],
['GitHub token',/\b(?:ghp_|gho_|ghs_|ghu_|ghr_)[A-Za-z0-9]{30,}\b/g],
['fine-grained GitHub token',/\bgithub_pat_[A-Za-z0-9_]{25,}\b/g],
['AWS access key',/\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/g]
];
for(const file of files){const s=fs.readFileSync(file,'utf8');for(const [name,re] of patterns){re.lastIndex=0;if(re.test(s))errors.push(file+': '+name)}}
if(errors.length){console.error(errors.join('\n'));process.exitCode=1}else console.log('Sensitive data patterns: clear');
