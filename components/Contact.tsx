"use client";
import { useState } from "react";
import { ArrowUpRight, CheckCircle2, Mail, MapPin, Send } from "lucide-react";
import { site } from "@/data/site";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setStatus("");
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const d = await r.json();
      setStatus(d.message || (r.ok ? "Message sent successfully." : "Something went wrong."));
      if (r.ok) setForm({ name: "", email: "", message: "" });
    } catch { setStatus("Unable to send right now. Please try email instead."); }
    finally { setBusy(false); }
  }

  return <section id="contact" className="section-space relative overflow-hidden">
    <div className="container-pro">
      <div className="contact-shell">
        <div className="contact-copy">
          <span className="eyebrow"><span className="status-dot"/> OPEN TO OPPORTUNITIES</span>
          <p className="mt-7 text-xs font-black tracking-[.25em] text-violet-600">LET&apos;S BUILD SOMETHING USEFUL</p>
          <h2 className="mt-4 max-w-3xl font-display text-5xl font-black leading-[.95] tracking-[-.05em] md:text-7xl">Have a product, idea, or role in mind?</h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-black/55 dark:text-white/55">Tell me what you are working on. I&apos;ll bring a practical mix of frontend craft, backend engineering and AI integration.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <a className="contact-mini" href={`mailto:${site.email}`}><Mail size={17}/><span><b>Email</b><small>{site.email}</small></span></a>
            <div className="contact-mini"><MapPin size={17}/><span><b>Based in</b><small>{site.location}</small></span></div>
          </div>
          <a href={site.resume} download className="mt-6 inline-flex items-center gap-2 text-sm font-black">Download resume <ArrowUpRight size={15}/></a>
        </div>
        <form onSubmit={submit} className="contact-form">
          <div className="form-label">PROJECT BRIEF <span>01</span></div>
          <label>Name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your name" /></label>
          <label>Email<input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@company.com" /></label>
          <label>Message<textarea required minLength={10} rows={6} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="What are you looking to build?" /></label>
          <button disabled={busy} className="send-btn" type="submit">{busy ? "Sending..." : "Send inquiry"}<Send size={17}/></button>
          {status && <p className="flex items-center gap-2 text-sm opacity-70"><CheckCircle2 size={15}/>{status}</p>}
        </form>
      </div>
    </div>
  </section>
}
