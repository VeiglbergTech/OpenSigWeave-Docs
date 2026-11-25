import path from 'node:path';
import {spawn,spawnSync} from 'node:child_process';
const host='http://127.0.0.1:4447';
const candidates=['google-chrome','google-chrome-stable','chromium','chromium-browser'];
const chrome=candidates.find(cmd=>spawnSync('which',[cmd]).status===0);
if(!chrome)throw new Error('Chromium/Chrome is required for the browser smoke test');
const server=spawn(path.resolve('node_modules/.bin/astro'),['preview','--host','127.0.0.1','--port','4447'],{stdio:'ignore'});
try {
 let ready=false;
 for(let i=0;i<60;i++){
   if(server.exitCode!==null)throw new Error('Astro preview exited unexpectedly');
   try{const r=await fetch(host+'/');if(r.ok){ready=true;break}}catch{}
   await new Promise(resolve=>setTimeout(resolve,250));
 }
 if(!ready)throw new Error('Astro preview not ready');
 const tests=[
   ['/', 'OpenSigWeave'],
   ['/getting-started/quickstart/','Quick start'],
   ['/administration/signatures/','Signatures and images'],
   ['/developers/rest-api/','REST API'],
   ['/impressum/','Martin Leonhard Walleitner'],
   ['/datenschutz/','Privacy policy'],
   ['/de/','OpenSigWeave'],
   ['/de/impressum/','Martin Leonhard Walleitner'],
   ['/de/datenschutz/','Datenschutzerklärung'],
   ['/de/markenhinweise/','CodeTwo'],
   ['/de/getting-started/quickstart/','OpenSigWeave'],
   ['/markenhinweise/','CodeTwo'],
 ];
 for(const [route,needle] of tests){
   const response=await fetch(host+route);
   if(!response.ok)throw new Error(route+' HTTP '+response.status);
   const body=await response.text();
   if(!body.includes(needle))throw new Error(route+' did not render expected title');
 }
 // Fetch this before launching multiple Chromium processes. Node HTTP keep-alive
 // sockets can become stale while Chromium workloads occupy the runner.
 const logo=await fetch(host+'/favicon.png',{headers:{Connection:'close'}});
 if(!logo.ok)throw new Error('Website favicon was not served');
 function chromeDom(route,width,height){
   const args=['--headless=new','--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--disable-background-networking','--no-first-run','--hide-scrollbars','--window-size='+width+','+height,'--virtual-time-budget=2000','--dump-dom',host+route];
   const r=spawnSync(chrome,args,{encoding:'utf8',timeout:45000,maxBuffer:20*1024*1024});
   if(r.error||r.status!==0)throw new Error('Chrome failed: '+(r.error?.message||r.stderr?.slice(-1000)||r.status));
   return r.stdout;
 }
 const desktop=chromeDom('/',1366,900);
 if(!desktop.includes('OpenSigWeave'))throw new Error('Desktop browser title missing');
 const mobile=chromeDom('/getting-started/quickstart/',390,844);
 if(!mobile.includes('Quick start'))throw new Error('Mobile browser content missing');
 // The page follows the user's system preference until the visitor explicitly
 // chooses a theme; do not store a default theme automatically.
 if(!/data-theme=["'](?:dark|light)["']/.test(desktop))throw new Error('Expected resolved Starlight theme');
 for(const legal of ['impressum','datenschutz','markenhinweise']){
   if(!desktop.includes('href="/'+legal+'/'))throw new Error('English desktop legal link missing: '+legal);
   if(!mobile.includes('href="/'+legal+'/'))throw new Error('English mobile legal link missing: '+legal);
 }
 const german=chromeDom('/de/getting-started/quickstart/',390,844);
 if(!german.includes('lang="de"'))throw new Error('German HTML lang attribute missing');
 if(!german.includes('href="/de/impressum/"'))throw new Error('German legal footer link missing');
 if(!desktop.includes('Deutsch') || !german.includes('English'))throw new Error('Language switcher not detected');
 console.log('Browser smoke passed: bilingual routes, Chromium desktop/mobile, accessible legal footer, theme preference and official favicon');
} finally {
 server.kill('SIGTERM');
}
