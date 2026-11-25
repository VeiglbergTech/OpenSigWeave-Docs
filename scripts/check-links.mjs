import fs from 'node:fs';
import path from 'node:path';
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
for(const file of ['sitemap-index.xml','CNAME','robots.txt'])if(!fs.existsSync(path.join(dist,file)))errors.push('missing '+file);
if(pages.length<40)errors.push('expected 40+ pages');
const publicHost='docs.opensigweave.de';
if(fs.readFileSync('public/CNAME','utf8').trim()!==publicHost)errors.push('CNAME does not match public domain');
if(!fs.readFileSync('public/robots.txt','utf8').includes('https://'+publicHost+'/sitemap-index.xml'))errors.push('robots sitemap does not match public domain');
if(!fs.readFileSync('astro.config.mjs','utf8').includes("site: 'https://"+publicHost+"'"))errors.push('Astro site does not match public domain');
if(errors.length){console.error(errors.slice(0,80).join('\n'));process.exitCode=1}else console.log('Static links checked: '+pages.length+' HTML pages');
