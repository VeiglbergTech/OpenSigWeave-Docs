import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('src/content/docs');
const pages=[],errors=[];
function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const f=path.join(d,e.name);if(e.isDirectory())walk(f);else if(/\.(md|mdx)$/.test(f))pages.push(f)}}
walk(root);
// Starlight's default docsLoader removes dots from public slugs, for example
// release-notes-v2026.11.md -> /release-notes-v202611/.
const routes=new Set(pages.map(p=>path.relative(root,p).replaceAll('\\','/').replace(/\.(md|mdx)$/,'').toLowerCase().replaceAll('.','')));
const exists=u=>{const s=decodeURIComponent(u).replace(/^\/+|\/+$/g,'').toLowerCase();return routes.has(s||'index')||routes.has(s+'/index')};
for(const p of pages){
 const name=path.relative(root,p),body=fs.readFileSync(p,'utf8');
 if(!/^---\r?\n[\s\S]*?^title:\s*\S+/m.test(body))errors.push(name+': missing YAML title');
 if((body.match(/^\x60{3}/gm)||[]).length%2)errors.push(name+': unbalanced code fences');
 const content=body.replace(/^\x60{3}[^\n]*\n[\s\S]*?^\x60{3}\s*$/gm,'');
 for(const m of content.matchAll(/!?\[[^\]]*\]\(([^)\s]+)/g)){
  const u=m[1].split('#')[0].split('?')[0];
  if(!u||/^(https?:|mailto:|tel:|data:|\/\/)/.test(u))continue;
  if(u.startsWith('/')){if(/\.(png|svg|webp|jpg|jpeg|gif|ico|txt|xml)$/i.test(u)){if(!fs.existsSync(path.join('public',u.slice(1))))errors.push(name+': missing asset '+u)}else if(!exists(u))errors.push(name+': missing route '+u)}
  else if(u.endsWith('.md')&&!fs.existsSync(path.resolve(path.dirname(p),u)))errors.push(name+': missing local '+u);
 }
}
const cfg=fs.readFileSync('astro.config.mjs','utf8');
for(const group of ['getting-started','installation','administration','operations','developers','releases','reference']){
if(!cfg.includes("directory: '"+group+"'"))errors.push('Missing sidebar '+group);
if(!pages.some(p=>path.relative(root,p).replaceAll('\\','/').startsWith(group+'/')))errors.push('Empty sidebar '+group);
}
// Statutory notices must exist and be directly linked on every page.
for(const legal of ['impressum','datenschutz','markenhinweise']){
 if(!pages.some(p=>path.relative(root,p)===legal+'.md'))errors.push('Missing legal page: '+legal);
}
if(!cfg.includes("Footer: './src/components/LegalFooter.astro'"))errors.push('Missing global legal footer override');
const legalFooter=fs.readFileSync('src/components/LegalFooter.astro','utf8');
for(const legal of ['impressum','datenschutz','markenhinweise']){
 if(!legalFooter.includes('/'+legal+'/'))errors.push('Missing localized footer link: '+legal);
}
if(cfg.includes("localStorage.setItem('starlight-theme', 'dark')"))errors.push('Do not persist an unsolicited theme preference');
const canonicalPages=pages.filter(p=>!path.relative(root,p).replaceAll('\\','/').startsWith('de/'));
for(const p of canonicalPages){
 const relative=path.relative(root,p).replaceAll('\\','/');
 if(!fs.existsSync(path.join(root,'de',relative)))errors.push(relative+': missing German counterpart');
}
for(const p of pages.filter(p=>path.relative(root,p).replaceAll('\\','/').startsWith('de/'))){
 const relative=path.relative(root,p).replaceAll('\\','/').slice(3);
 if(!fs.existsSync(path.join(root,relative)))errors.push(relative+': orphan German translation');
}
if(errors.length){console.error(errors.join('\n'));process.exitCode=1}else console.log('Bilingual Markdown navigation and links passed: '+pages.length+' pages');

