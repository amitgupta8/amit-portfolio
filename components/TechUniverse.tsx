"use client";
import { useState } from "react";
import { BrainCircuit, Cloud, Database, Globe, Layers3, Server, Sparkles, Terminal } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const nodes = [
  ["Frontend", "React · Next.js · TypeScript · Tailwind", Globe],
  ["Backend", "Node.js · Express · REST · Auth", Server],
  ["Data", "MongoDB · Mongoose · Pinecone", Database],
  ["AI", "OpenAI · Gemini · LangChain · RAG", BrainCircuit],
  ["Cloud", "Vercel · AWS · Docker · Git", Cloud],
  ["Architecture", "Reusable UI · APIs · realtime flows", Layers3],
] as const;

export function TechUniverse() {
  const [active, setActive] = useState(0);
  const ActiveIcon = nodes[active][2];
  return <section id="tech" className="section-space bg-black/[.025] dark:bg-white/[.015]">
    <div className="container-pro">
      <SectionHeading index="07 / TECH UNIVERSE" title="A stack that connects, not just a list." text="Explore how the tools fit together across the product lifecycle." />
      <div className="tech-universe rounded-[34px] border border-black/10 bg-[#0b0d12] p-4 text-white shadow-2xl dark:border-white/10 md:p-7">
        <div className="grid gap-5 lg:grid-cols-[1fr_.9fr]">
          <div className="tech-orbit relative min-h-[390px] overflow-hidden rounded-[26px] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(124,58,237,.18),transparent_36%)] p-5">
            <div className="orbit-ring orbit-one" /><div className="orbit-ring orbit-two" />
            <div className="absolute left-1/2 top-1/2 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[28px] border border-white/15 bg-white/[.07] shadow-[0_0_80px_rgba(124,58,237,.22)]"><div className="text-center"><Sparkles className="mx-auto text-cyan-300" size={22}/><p className="mt-2 text-xs font-black">AMIT.DEV</p><p className="text-[9px] text-white/40">PRODUCT ENGINEERING</p></div></div>
            {nodes.map(([title], i) => { const angle = i * 60 - 90; const x = 50 + 38 * Math.cos(angle * Math.PI / 180); const y = 50 + 38 * Math.sin(angle * Math.PI / 180); return <button key={title} onClick={() => setActive(i)} style={{left:`${x}%`,top:`${y}%`}} className={`tech-node absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl border px-3 py-2 text-[11px] font-bold ${active===i?"border-cyan-300/60 bg-cyan-300/10 text-cyan-200":"border-white/10 bg-white/[.04] text-white/60"}`}>{title}</button>; })}
          </div>
          <div className="flex flex-col justify-center rounded-[26px] border border-white/10 bg-white/[.035] p-6 md:p-8">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/[.07]"><ActiveIcon size={21}/></div>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[.18em] text-cyan-300">Connected capability</p>
            <h3 className="mt-3 text-3xl font-black">{nodes[active][0]}</h3>
            <p className="mt-4 leading-7 text-white/50">{nodes[active][1]}</p>
            <div className="mt-7 rounded-2xl border border-white/10 bg-black/20 p-4 font-mono text-xs leading-7 text-white/55"><span className="text-emerald-400">$</span> connect --stack {nodes[active][0].toLowerCase()}<br/><span className="text-cyan-300">✓</span> reusable architecture<br/><span className="text-cyan-300">✓</span> responsive product layer</div>
          </div>
        </div>
      </div>
    </div>
  </section>;
}
