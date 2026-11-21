import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
const checkout=process.argv[2];
if(!checkout||!fs.existsSync(checkout)){console.error('Provide an OpenSigWeave source checkout');process.exit(2)}
const manifest=JSON.parse(fs.readFileSync('source-manifest.json','utf8')),drift=[];
for(const [file,sha] of Object.entries(manifest.files)){
 if(!fs.existsSync(path.join(checkout,file))){drift.push(file+' was deleted');continue}
 const current=execFileSync('git',['hash-object','--',file],{cwd:checkout,encoding:'utf8'}).trim();
 if(current!==sha)drift.push(file+' changed: '+sha.slice(0,9)+' -> '+current.slice(0,9));
}
if(drift.length){console.error('OpenSigWeave documentation/contract drift; review code and update docs in dev:\n'+drift.join('\n'));process.exitCode=1}
else console.log('OpenSigWeave source parity: '+Object.keys(manifest.files).length+' paths unchanged');
