'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Search } from 'lucide-react';
import { projects } from '@/data/projects';

export default function ProjectsPage(){
 const [q,setQ]=useState(''); const [cat,setCat]=useState('All'); const [page,setPage]=useState(1);
 const cats=['All',...Array.from(new Set(projects.map(p=>p.category)))];
 const filtered=useMemo(()=>projects.filter(p=>(cat==='All'||p.category===cat)&&(p.title+' '+p.description+' '+p.stack.join(' ')).toLowerCase().includes(q.toLowerCase())),[q,cat]);
 const size=4,total=Math.max(1,Math.ceil(filtered.length/size)),list=filtered.slice((page-1)*size,page*size);
 return <main className="min-h-screen pb-24 pt-36"><div className="container-pro">
  <div className="flex flex-col gap-8 border-b border-black/10 pb-10 dark:border-white/10 md:flex-row md:items-end md:justify-between">
   <div><p className="text-xs font-black tracking-[.25em] text-violet-600">04 / PROJECT ARCHIVE</p><h1 className="mt-3 font-display text-5xl font-black leading-none tracking-[-.05em] md:text-7xl">Selected <span className="gradient-text">work.</span></h1><p className="mt-5 max-w-xl text-lg leading-8 opacity-55">Real products, experiments and engineering case studies — searchable by stack and category.</p></div>
   <div className="flex h-12 w-full max-w-sm items-center gap-3 rounded-2xl border border-black/10 bg-white/60 px-4 dark:border-white/10 dark:bg-white/5"><Search size={17} className="opacity-45"/><input value={q} onChange={e=>{setQ(e.target.value);setPage(1)}} placeholder="Search projects..." className="w-full bg-transparent text-sm outline-none"/></div>
  </div>
  <div className="mt-7 flex flex-wrap gap-2">{cats.map(c=><button key={c} onClick={()=>{setCat(c);setPage(1)}} className={`rounded-full border px-4 py-2 text-xs font-black transition ${cat===c?'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black':'border-black/10 hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5'}`}>{c}</button>)}</div>
  <div className="mt-10 grid gap-5 md:grid-cols-2">{list.map((p,i)=><Link href={'/projects/'+p.id} key={p.id} className="group project-tile surface p-6 md:p-7"><div className="flex items-start justify-between"><span className="text-[10px] font-black tracking-[.2em] text-violet-600">0{i+1} / {p.category.toUpperCase()}</span><span className="grid h-9 w-9 place-items-center rounded-full border border-black/10 dark:border-white/10"><ArrowUpRight size={15}/></span></div><h2 className="mt-16 font-display text-3xl font-black tracking-[-.04em]">{p.title}</h2><p className="mt-3 max-w-xl leading-7 opacity-55">{p.description}</p><div className="mt-6 flex flex-wrap gap-2">{p.stack.map(s=><span key={s} className="rounded-lg bg-black/[.045] px-2.5 py-1 text-[11px] font-bold dark:bg-white/[.07]">{s}</span>)}</div></Link>)}</div>
  {!list.length&&<div className="surface mt-8 p-12 text-center"><p className="text-xl font-black">No matching projects</p><p className="mt-2 opacity-55">Try another keyword or category.</p></div>}
  <div className="mt-8 flex items-center justify-between"><span className="text-xs font-bold opacity-45">PAGE {page} / {total}</span><div className="flex gap-2"><button disabled={page===1} onClick={()=>setPage(page-1)} className="rounded-xl border border-black/10 px-4 py-2 text-sm font-bold disabled:opacity-25 dark:border-white/10">Previous</button><button disabled={page===total} onClick={()=>setPage(page+1)} className="rounded-xl border border-black/10 px-4 py-2 text-sm font-bold disabled:opacity-25 dark:border-white/10">Next</button></div></div>
 </div></main>
}
