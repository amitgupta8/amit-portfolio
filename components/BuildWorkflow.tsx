"use client";
import { useState } from "react";
import { ArrowRight, BrainCircuit, CheckCircle2, Code2, GitBranch, Lightbulb, Rocket, ShieldCheck } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const steps = [
  ["01", "Idea", "Clarify the user, business goal and success signal.", Lightbulb],
  ["02", "Architecture", "Choose routes, data flow, APIs and reusable boundaries.", GitBranch],
  ["03", "Development", "Build the interface, backend and validation in small shippable pieces.", Code2],
  ["04", "AI Integration", "Add practical AI workflows with server-side keys and clear fallbacks.", BrainCircuit],
  ["05", "Testing", "Check responsive states, forms, API errors and important user paths.", ShieldCheck],
  ["06", "Deployment", "Prepare production configuration, SEO, performance and handoff.", Rocket],
] as const;

export function BuildWorkflow() {
  const [active, setActive] = useState(0);
  const step = steps[active];
  const Icon = step[3];
  return (
    <section id="workflow" className="section-space bg-black/[.025] dark:bg-white/[.015]">
      <div className="container-pro">
        <SectionHeading index="05 / HOW I BUILD" title="From idea to a shippable product." text="A visible workflow keeps engineering decisions, quality and delivery easy to understand." />
        <div className="grid gap-5 lg:grid-cols-[.72fr_1.28fr]">
          <div className="surface overflow-hidden p-2">
            {steps.map(([num, title], index) => (
              <button key={title} onClick={() => setActive(index)} className={`group flex w-full items-center gap-4 rounded-2xl p-4 text-left transition ${active === index ? "bg-black text-white dark:bg-white dark:text-black" : "hover:bg-black/[.04] dark:hover:bg-white/[.05]"}`}>
                <span className="font-mono text-xs opacity-45">{num}</span><span className="font-bold">{title}</span><ArrowRight size={16} className={`ml-auto transition ${active === index ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-20 group-hover:translate-x-0 group-hover:opacity-60"}`} />
              </button>
            ))}
          </div>
          <div className="workflow-panel relative overflow-hidden rounded-[30px] bg-[#0d0f15] p-7 text-white md:p-10">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl" />
            <div className="relative">
              <div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/5"><Icon size={24} /></div>
              <p className="mt-8 font-mono text-xs text-cyan-300">{step[0]} / DELIVERY STAGE</p>
              <h3 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">{step[1]}</h3>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/55">{step[2]}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {["Clear scope", "Responsive states", "Reusable components", "Production handoff"].map((item) => <div key={item} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[.04] p-4 text-sm"><CheckCircle2 size={15} className="text-emerald-400" />{item}</div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
