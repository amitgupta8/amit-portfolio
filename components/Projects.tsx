import Link from 'next/link';
import { ArrowUpRight, Github } from 'lucide-react';
import { projects } from '@/data/projects';
import { ProjectCard } from './ProjectCard';
import { SectionHeading } from './SectionHeading';

export function Projects(){
  return <section id="projects" className="section-space">
    <div className="container-pro">
      <SectionHeading index="10 / SELECTED WORK" title="Projects with a purpose." text="A quick proof layer for recruiters: what was built, why it matters and which technologies were used." />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.slice(0,3).map(project => <ProjectCard key={project.id} p={project} />)}
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-black/45 dark:text-white/45">Case studies with real repository/live links where available.</p>
        <div className="flex flex-wrap gap-3">
        <a href="https://github.com/amitgupta8/amit-portfolio" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-bold hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/5"><Github size={16}/> GitHub</a>
        <Link href="/projects" className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-bold hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/5">Explore all projects <ArrowUpRight size={16}/></Link>
        </div>
      </div>
    </div>
  </section>
}
