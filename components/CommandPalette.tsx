"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Command, Download, Github, Mail, Search, X } from "lucide-react";
import Link from "next/link";
import { site } from "@/data/site";
const items=[
 {label:"About",description:"Profile and working philosophy",href:"/#about",group:"Navigate"},
 {label:"Skills",description:"Frontend, backend, AI and tools",href:"/#skills",group:"Navigate"},
 {label:"Experience",description:"Career timeline and impact",href:"/#experience",group:"Navigate"},
 {label:"Projects",description:"Case studies and product work",href:"/projects",group:"Navigate"},
 {label:"How I Build",description:"Idea to deployment workflow",href:"/#workflow",group:"Navigate"},
 {label:"Tech Universe",description:"Connected engineering stack",href:"/#tech",group:"Navigate"},
  {label:"Contact",description:"Start a project conversation",href:"/contact",group:"Navigate"},
 {label:"Download Resume",description:"Open the latest portfolio resume",href:site.resume,group:"Actions",external:true,icon:Download},
 {label:"GitHub",description:"View code and projects",href:site.github,group:"Actions",external:true,icon:Github},
 {label:"Email",description:"Send a direct message",href:`mailto:${site.email}`,group:"Actions",external:true,icon:Mail},
];
export function CommandPalette(){
 const [open,setOpen]=useState(false),[q,setQ]=useState(""); const [active,setActive]=useState(0); const inputRef=useRef<HTMLInputElement>(null);
 useEffect(()=>{const fn=(e:KeyboardEvent)=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();setOpen(v=>!v)}if(e.key==="Escape")setOpen(false)};window.addEventListener("keydown",fn);return()=>window.removeEventListener("keydown",fn)},[]);
 useEffect(()=>{document.body.style.overflow=open?"hidden":"";if(open){setActive(0);requestAnimationFrame(()=>inputRef.current?.focus())}return()=>{document.body.style.overflow=""}},[open]);
 const filtered=useMemo(()=>items.filter(x=>(x.label+" "+x.description).toLowerCase().includes(q.toLowerCase())),[q]);
 useEffect(()=>{if(!open)return;const fn=(e:KeyboardEvent)=>{if(e.key==="ArrowDown"){e.preventDefault();setActive(i=>filtered.length?Math.min(i+1,filtered.length-1):0)}if(e.key==="ArrowUp"){e.preventDefault();setActive(i=>filtered.length?Math.max(i-1,0):0)}if(e.key==="Enter"&&filtered[active]){e.preventDefault();window.location.href=filtered[active].href}};window.addEventListener("keydown",fn);return()=>window.removeEventListener("keydown",fn)},[open,filtered,active]);
 if(!open)return null;
 return <div className="command-overlay fixed inset-0 z-[120] flex items-start justify-center bg-black/65 px-3 pt-[5vh] backdrop-blur-md sm:px-5 sm:pt-[10vh]" onMouseDown={()=>setOpen(false)}>
  <div role="dialog" aria-modal="true" aria-label="Portfolio command palette" onMouseDown={e=>e.stopPropagation()} className="command-panel w-full max-w-2xl overflow-hidden rounded-[24px] border border-black/10 bg-white shadow-[0_30px_100px_rgba(0,0,0,.3)] dark:border-white/10 dark:bg-[#101117]">
   <div className="flex items-center gap-2 border-b border-black/10 px-3 py-3 sm:gap-3 sm:px-5 sm:py-4 dark:border-white/10"><Search size={18} className="shrink-0 opacity-45"/><input ref={inputRef} value={q} onChange={e=>setQ(e.target.value)} placeholder="Search navigation, projects, resume…" className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none sm:text-base"/><kbd className="hidden shrink-0 rounded-lg border border-black/10 px-2 py-1 text-[10px] opacity-45 dark:border-white/10 sm:block">ESC</kbd><button aria-label="Close command palette" onClick={()=>setOpen(false)} className="grid h-9 w-9 shrink-0 place-items-center rounded-lg hover:bg-black/5 dark:hover:bg-white/10"><X size={18}/></button></div>
   <div className="max-h-[62dvh] overflow-y-auto p-2 sm:max-h-[430px] sm:p-3">{filtered.length?filtered.map((item,index)=>{const Icon=item.icon;const activeItem=index===active;return item.external?<a key={item.label} href={item.href} onClick={()=>setOpen(false)} aria-current={activeItem?"true":undefined} className={`group flex min-h-14 items-center gap-3 rounded-2xl px-3 py-3 sm:px-4 ${activeItem?"bg-black/[.06] dark:bg-white/[.08]":"hover:bg-black/[.05] dark:hover:bg-white/[.06]"}`}><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-black/[.05] dark:bg-white/[.06]">{Icon?<Icon size={16}/>:<ArrowRight size={16}/>}</span><span className="min-w-0 flex-1"><b className="block truncate text-sm">{item.label}</b><small className="block truncate text-[11px] opacity-45">{item.description}</small></span><ArrowRight size={15} className="shrink-0 opacity-30 transition group-hover:translate-x-1"/></a>:<Link key={item.label} href={item.href} onClick={()=>setOpen(false)} aria-current={activeItem?"true":undefined} className={`group flex min-h-14 items-center gap-3 rounded-2xl px-3 py-3 sm:px-4 ${activeItem?"bg-black/[.06] dark:bg-white/[.08]":"hover:bg-black/[.05] dark:hover:bg-white/[.06]"}`}><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-black/[.05] dark:bg-white/[.06]"><ArrowRight size={16}/></span><span className="min-w-0 flex-1"><b className="block truncate text-sm">{item.label}</b><small className="block truncate text-[11px] opacity-45">{item.description}</small></span><span className="hidden text-[10px] opacity-30 sm:block">{item.group}</span></Link>}) : <div className="px-4 py-12 text-center"><Search className="mx-auto opacity-25"/><p className="mt-3 text-sm opacity-45">No matching command</p></div>}</div>
   <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-black/10 px-4 py-3 text-[10px] opacity-45 dark:border-white/10 sm:px-5"><span className="inline-flex items-center gap-1.5"><Command size={13}/>Ctrl/⌘ K</span><span>Enter to open</span><span className="hidden sm:inline">Esc to close</span><span className="ml-auto hidden sm:inline">{filtered.length} results</span></div>
  </div>
 </div>;
}
