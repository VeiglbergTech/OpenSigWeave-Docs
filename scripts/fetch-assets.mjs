import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
const sourceCommit='1722583c75733ccab177316958e30726a1149a37';
const expectedGitBlob='a4fe6917dfa00202911439a92b02087c58b4baa1';
const target=path.resolve('src/assets/opensigweave.png');
function valid(bytes){
  return createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex')===expectedGitBlob;
}
if(fs.existsSync(target)&&valid(fs.readFileSync(target))){
  console.log('Original OpenSigWeave logo verified (local cached asset).');
  process.exit(0);
}
const url='https://raw.githubusercontent.com/VeiglbergTech/OpenSigWeave/'+sourceCommit+'/branding/logo.png';
const response=await fetch(url,{signal:AbortSignal.timeout(30000)});
if(!response.ok)throw new Error('Cannot fetch pinned OpenSigWeave logo: HTTP '+response.status);
const bytes=Buffer.from(await response.arrayBuffer());
if(!valid(bytes))throw new Error('Original logo Git SHA check failed; refusing untrusted asset');
fs.mkdirSync(path.dirname(target),{recursive:true});
fs.writeFileSync(target,bytes);
console.log('Original OpenSigWeave logo downloaded and Git SHA verified.');
