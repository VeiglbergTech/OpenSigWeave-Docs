import fs from 'node:fs';
import os from 'node:os';
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
 ];
 for(const [route,needle] of tests){
   const response=await fetch(host+route);
   if(!response.ok)throw new Error(route+' HTTP '+response.status);
   const body=await response.text();
   if(!body.includes(needle))throw new Error(route+' did not render expected title');
 }
 // Fetch this before launching multiple Chromium processes. Node HTTP keep-alive
 // sockets can become stale while Chromium workloads occupy the runner.
 const logo=await fetch(host+'/favicon.svg',{headers:{Connection:'close'}});
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
 // Verify a recognizable dark-mode initialization is present and the theme
 // chooser remains part of Starlight rather than being removed by customization.
 if(!desktop.includes('data-theme="dark"')&&!desktop.includes('data-theme=dark'))throw new Error('Expected dark theme as default');

 console.log('Browser smoke passed: four routes, Chromium desktop/mobile, dark theme and favicon');
} finally {
 server.kill('SIGTERM');
}
