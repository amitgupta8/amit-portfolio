"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight, Download, Sparkles, MapPin, Mail, Linkedin, Github, Terminal, Cpu, Database, Globe2 } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

const roles = ["AI MERN Developer", "Full Stack Developer", "React Developer", "Node.js Developer", "AI Integration Engineer"];

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((value) => (value + 1) % roles.length), 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden pt-32">
      <div className="absolute inset-0 -z-10 grid-fade" />
      <div className="hero-orb left-[5%] top-44 bg-violet-500/15" />
      <div className="hero-orb right-[5%] top-72 bg-cyan-400/10" />

      <div className="container-pro grid min-h-[730px] items-center gap-12 pb-16 lg:grid-cols-[1.08fr_.92fr]">
        <div>
          <span className="eyebrow"><Sparkles size={13} /> {site.availability}</span>
          <p className="mt-7 font-mono text-sm text-violet-600">01 / DIGITAL PRODUCT ENGINEERING</p>
          <h1 className="mt-4 max-w-5xl font-display text-5xl font-black leading-[.93] tracking-[-.06em] sm:text-7xl lg:text-[82px]">
            I build <span className="gradient-text">digital products</span> that ship.
          </h1>
          <div className="mt-7 flex items-center gap-3 text-xl font-bold">
            <span className="status-dot" />
            <span>{roles[index]}</span>
          </div>
          <p className="mt-6 max-w-2xl text-base leading-8 text-black/55 dark:text-white/55 sm:text-lg">
            AI + MERN + Full Stack developer focused on responsive interfaces, dependable APIs, MongoDB workflows and practical AI integrations.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/projects" className="inline-flex items-center gap-2 rounded-2xl bg-black px-5 py-3.5 font-bold text-white dark:bg-white dark:text-black">
              Explore projects <ArrowUpRight size={17} />
            </Link>
            <a href={site.resume} download className="inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white/70 px-5 py-3.5 font-bold dark:border-white/10 dark:bg-white/5">
              <Download size={17} /> Resume
            </a>
            <Link href="/contact" className="rounded-2xl border border-black/10 px-5 py-3.5 font-bold dark:border-white/10">Hire me</Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-5 text-sm text-black/50 dark:text-white/50">
            <span className="inline-flex items-center gap-2"><MapPin size={15} /> {site.location}</span>
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2"><Mail size={15} /> {site.email}</a>
          </div>
        </div>

        <div className="hero-stage relative mx-auto w-full max-w-[570px]">
          <div className="profile-card surface p-4">
            <div className="profile-photo">
              <div className="profile-photo-grid" />
              <img
                src="/profile-photo.jpeg"
                alt="Amit Gupta"
                className="profile-image"
              />

              <div className="profile-scanline" />
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-violet-600">DEVELOPER PROFILE</p>
                  <h2 className="mt-2 font-display text-3xl font-black">Amit Gupta</h2>
                  <p className="mt-1 text-sm text-black/45 dark:text-white/45">AI • MERN • Full Stack</p>
                </div>
                <div className="rounded-2xl bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-600">OPEN</div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[["20+", "Projects"], ["10+", "Tech"], ["AI", "Integration"], ["100%", "Responsive"]].map(([value, label]) => (
                  <div key={label} className="rounded-2xl bg-black/[.035] p-4 dark:bg-white/[.035]">
                    <p className="font-display text-2xl font-black">{value}</p>
                    <p className="text-xs text-black/45 dark:text-white/45">{label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex gap-2">
                <a className="grid h-10 w-10 place-items-center rounded-xl border" href={site.github} aria-label="GitHub"><Github size={17} /></a>
                <a className="grid h-10 w-10 place-items-center rounded-xl border" href={site.linkedin} aria-label="LinkedIn"><Linkedin size={17} /></a>
              </div>
            </div>
          </div>

          <div className="terminal-float absolute -bottom-7 -left-7 hidden w-64 rounded-2xl border border-white/10 bg-[#0c0d12] p-4 text-white shadow-2xl sm:block">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.18em] text-white/45"><Terminal size={13} /> amit.dev / terminal</div>
            <div className="mt-4 space-y-2 font-mono text-[11px] leading-5">
              <p><span className="text-emerald-400">$</span> build --production</p>
              <p className="text-white/45">stack: next.js + node + mongodb</p>
              <p className="text-cyan-300">✓ ai integration ready</p>
            </div>
          </div>

          <div className="tech-float absolute -right-4 top-8 hidden rounded-2xl border border-black/10 bg-white/90 p-3 shadow-xl backdrop-blur dark:border-white/10 dark:bg-[#17181e]/90 sm:block">
            <div className="grid grid-cols-3 gap-2">
              {[Cpu, Database, Globe2].map((Icon, i) => <div key={i} className="grid h-10 w-10 place-items-center rounded-xl bg-black/[.04] dark:bg-white/[.06]"><Icon size={17} /></div>)}
            </div>
          </div>
        </div>
      </div>

      <div className="container-pro pb-8">
        <a href="#snapshot" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black/40 dark:text-white/40">Scroll <ArrowDown size={14} /></a>
      </div>
    </section>
  );
}
