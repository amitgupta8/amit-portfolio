import Link from "next/link";
import {
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import { site } from "@/data/site";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-black/[.08] bg-[#0b0b10] text-white dark:border-white/[.08]">
      <div className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-violet-600/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="container-pro relative py-12 sm:py-16 lg:py-20">
        <div className="mb-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.045] p-6 shadow-2xl shadow-black/20 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.06] px-3 py-1.5 text-[10px] font-black uppercase tracking-[.18em] text-white/60">
                <Sparkles size={12} className="text-violet-300" />
                Available for freelance
              </div>
              <h2 className="font-display text-3xl font-black leading-[1.05] tracking-[-.04em] sm:text-4xl lg:text-5xl">
                Have an idea?
                <span className="block bg-gradient-to-r from-violet-300 via-fuchsia-200 to-cyan-200 bg-clip-text text-transparent">
                  Let&apos;s build it.
                </span>
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/50 sm:text-base">
                From product interfaces to AI-powered full-stack applications,
                let&apos;s turn a rough idea into a clean, useful digital product.
              </p>
            </div>

            <Link
              href="/contact"
              className="group inline-flex w-fit items-center gap-3 rounded-2xl bg-white px-5 py-3.5 text-sm font-black text-black shadow-xl shadow-white/5 transition hover:-translate-y-1"
            >
              Start a project
              <ArrowUpRight size={17} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.35fr_.65fr_.65fr] lg:gap-14">
          <div>
            <Link href="/" className="inline-flex items-baseline gap-1 font-display text-3xl font-black tracking-[-.04em]">
              AMIT<span className="text-violet-400">.</span>dev
            </Link>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/45">
              AI • MERN • Full Stack Developer building thoughtful interfaces,
              scalable APIs and practical AI experiences.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["Next.js", "TypeScript", "React", "Node.js", "MongoDB", "AI"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[.035] px-3 py-1.5 text-[10px] font-bold text-white/55"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-black uppercase tracking-[.2em] text-white/35">
              Explore
            </p>
            <nav className="mt-4 grid gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex w-fit items-center gap-1 text-sm text-white/55 transition hover:text-white"
                >
                  {link.label}
                  <ArrowUpRight size={13} className="opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-[10px] font-black uppercase tracking-[.2em] text-white/35">
              Connect
            </p>
            <div className="mt-4 grid gap-3">
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 text-sm text-white/55 transition hover:text-white">
                <Mail size={15} /> Email
              </a>
              <a href={site.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-white/55 transition hover:text-white">
                <Github size={15} /> GitHub
              </a>
              <a href={site.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-white/55 transition hover:text-white">
                <Linkedin size={15} /> LinkedIn
              </a>
              <span className="flex items-center gap-2 text-sm text-white/35">
                <MapPin size={15} /> {site.location}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Amit.dev.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={site.resume}
              download
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[.035] px-3.5 py-2 text-xs font-bold text-white/60 transition hover:border-white/20 hover:text-white"
            >
              <Download size={14} /> Resume
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-2 text-xs font-bold text-black transition hover:-translate-y-0.5"
            >
              Contact <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
