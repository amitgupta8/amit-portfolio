import { projects } from '@/data/projects';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ExternalLink, GitBranch, Lightbulb, ShieldCheck, Sparkles } from 'lucide-react';

export function generateStaticParams(){ return projects.map(project => ({id:project.id})); }

export default function Page({params}:{params:{id:string}}){
 const project=projects.find(item=>item.id===params.id);
 if(!project) return notFound();
 return <div className="container-pro pb-24 pt-32">
  <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-bold text-violet-600"><ArrowLeft size={16}/> All projects</Link>
  <div className="mt-8 max-w-6xl">
   <div className="flex flex-wrap items-center gap-2"><span className="eyebrow">{project.category}</span><span className="rounded-full border border-black/10 px-3 py-2 text-[10px] font-bold uppercase tracking-widest opacity-50 dark:border-white/10">{project.year} · {project.role}</span></div>
   <h1 className="mt-5 max-w-5xl font-display text-5xl font-black tracking-tight sm:text-6xl md:text-7xl">{project.title}</h1>
   <p className="mt-6 max-w-3xl text-lg leading-8 text-black/55 dark:text-white/55">{project.description}</p>
   <div className={`mt-10 h-2 rounded-full bg-gradient-to-r ${project.accent}`}/>
   <div className="mt-8 grid gap-5 lg:grid-cols-3"><div className="surface p-7 lg:col-span-2"><p className="text-xs font-bold uppercase tracking-widest text-violet-600">Problem</p><p className="mt-3 text-xl font-bold leading-8">{project.problem}</p></div><div className="surface p-7"><p className="text-xs font-bold uppercase tracking-widest text-violet-600">Outcome</p><p className="mt-3 text-lg font-bold leading-7">{project.impact}</p></div></div>
   <div className="mt-5 grid gap-5 md:grid-cols-2"><div className="surface p-7"><div className="flex items-center gap-2"><GitBranch size={19} className="text-violet-600"/><h2 className="font-display text-2xl font-black">Architecture</h2></div><div className="mt-5 space-y-3">{project.architecture.map(x=><div key={x} className="rounded-2xl bg-black/[.035] p-4 text-sm dark:bg-white/[.035]">{x}</div>)}</div></div><div className="surface p-7"><div className="flex items-center gap-2"><Lightbulb size={19} className="text-violet-600"/><h2 className="font-display text-2xl font-black">Solution</h2></div><p className="mt-5 text-sm leading-7 text-black/55 dark:text-white/55">{project.solution}</p><div className="mt-5 flex flex-wrap gap-2">{project.stack.map(x=><span key={x} className="rounded-lg border border-black/10 px-3 py-2 text-xs font-bold dark:border-white/10">{x}</span>)}</div></div></div>
   <div className="mt-5 grid gap-5 md:grid-cols-2"><div className="surface p-7"><div className="flex items-center gap-2"><ShieldCheck size={19} className="text-violet-600"/><h2 className="font-display text-2xl font-black">Challenges</h2></div><div className="mt-5 space-y-4">{project.challenges.map(x=><div className="flex gap-3" key={x}><CheckCircle2 className="shrink-0 text-emerald-500" size={19}/><span className="text-sm leading-6">{x}</span></div>)}</div></div><div className="surface p-7"><div className="flex items-center gap-2"><Sparkles size={19} className="text-violet-600"/><h2 className="font-display text-2xl font-black">Results</h2></div><div className="mt-5 space-y-4">{project.results.map(x=><div className="flex gap-3" key={x}><CheckCircle2 className="shrink-0 text-cyan-500" size={19}/><span className="text-sm leading-6">{x}</span></div>)}</div></div></div>
   <div className="surface mt-5 p-7"><h2 className="font-display text-2xl font-black">Key features</h2><div className="mt-5 grid gap-4 sm:grid-cols-2">{project.features.map(x=><div className="flex gap-3" key={x}><CheckCircle2 className="shrink-0 text-emerald-500" size={19}/><span>{x}</span></div>)}</div></div>
   <div className="mt-6 flex flex-wrap gap-3"><Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 font-bold text-white dark:bg-white dark:text-black">Discuss a similar project <ExternalLink size={16}/></Link></div>
  </div>
 </div>
}
