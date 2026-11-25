import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
const dist=path.resolve('dist'),pages=[],errors=[];
if(!fs.existsSync(dist))throw new Error('Run npm run build first');
function walk(p){for(const e of fs.readdirSync(p,{withFileTypes:true})){const f=path.join(p,e.name);if(e.isDirectory())walk(f);else if(f.endsWith('.html'))pages.push(f)}}
walk(dist);
for(const page of pages){
for(const m of fs.readFileSync(page,'utf8').matchAll(/\b(?:href|src)=["']([^"']+)["']/g)){
const url=m[1].replaceAll('&amp;','&');
if(!url||/^(https?:|\/\/|mailto:|tel:|data:|#)/.test(url))continue;
let u;try{u=new URL(url,'https://docs.opensigweave.de/')}catch{errors.push(page+': invalid '+url);continue}
if(u.hostname!=='docs.opensigweave.de')continue;
const p=path.join(dist,decodeURIComponent(u.pathname).replace(/^\/+/,''));
if(![p,path.join(p,'index.html'),p+'.html'].some(f=>fs.existsSync(f)&&fs.statSync(f).isFile()))errors.push(path.relative(dist,page)+': missing '+url);
}
}
// Legal notices must be generated and linked from the footer on every route.
for(const legal of ['impressum','datenschutz','markenhinweise']){
 if(!fs.existsSync(path.join(dist,legal,'index.html')))errors.push('missing legal route /'+legal+'/');
}
for(const page of pages){
 const html=fs.readFileSync(page,'utf8');
 for(const legal of ['impressum','datenschutz','markenhinweise']){
  if(!html.includes('href="/'+legal+'/"'))errors.push(path.relative(dist,page)+': missing legal footer link /'+legal+'/');
 }
}
for(const file of ['sitemap-index.xml','CNAME','robots.txt','favicon.png'])if(!fs.existsSync(path.join(dist,file)))errors.push('missing '+file);
if(pages.length<40)errors.push('expected 40+ pages');
// The deployed browser favicon must match the project logo exactly, not a placeholder.
const faviconPath=path.join(dist,'favicon.png');
if(fs.existsSync(faviconPath)){
 const bytes=fs.readFileSync(faviconPath);
 const sha=createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex');
 if(sha!=='a4fe6917dfa00202911439a92b02087c58b4baa1')errors.push('deployed favicon is not the original OpenSigWeave logo');
}
if(!fs.readFileSync('astro.config.mjs','utf8').includes("favicon: '/favicon.png'"))errors.push('Starlight must reference the branded PNG favicon');
const publicHost='docs.opensigweave.de';
if(fs.readFileSync('public/CNAME','utf8').trim()!==publicHost)errors.push('CNAME does not match public domain');
if(!fs.readFileSync('public/robots.txt','utf8').includes('https://'+publicHost+'/sitemap-index.xml'))errors.push('robots sitemap does not match public domain');
if(!fs.readFileSync('astro.config.mjs','utf8').includes("site: 'https://"+publicHost+"'"))errors.push('Astro site does not match public domain');
if(errors.length){console.error(errors.slice(0,80).join('\n'));process.exitCode=1}else console.log('Static links checked: '+pages.length+' HTML pages');
