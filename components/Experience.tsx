import { BriefcaseBusiness, CalendarDays } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const jobs = [
  {
    company: "Webkype Info Services Pvt. Ltd.",
    city: "Noida",
    role: "Full Stack MERN Developer",
    date: "Nov 2023 — Present",
    items: [
      "Developed and maintained full-stack web applications across frontend, backend, and database layers, building responsive interfaces, dashboards, forms, and customer-facing workflows.",
      "Designed and integrated RESTful APIs for authentication, data management, business workflows, and communication between application services.",
      "Implemented real-time communication using Socket.IO for live updates, notifications, and application events between clients and backend services.",
      "Developed authentication and authorization workflows, including protected routes, user sessions, validation, and role-based access.",
      "Integrated payment workflows and third-party services, handling API interactions, validation, and backend processing.",
      "Worked with Git/GitHub, Postman, Linux, CI/CD workflows, and cloud infrastructure for deployment, testing, and production support.",
    ],
  },
];

export function Experience({ compact = false }: { compact?: boolean }) {
  return (
    <section id="experience" className={compact ? "section-space" : "pb-20"}>
      <div className="container-pro">
        <SectionHeading
          index="08 / EXPERIENCE"
          title="Experience that ships."
          text="Roles, responsibilities and measurable engineering focus."
        />

        <div className="space-y-5">
          {jobs.map((j) => (
            <article key={j.company} className="surface overflow-hidden">
              <div className="p-6 md:p-8">
                {/* Company Header */}
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div className="flex gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-violet-500/10 text-violet-600">
                      <BriefcaseBusiness size={20} />
                    </div>

                    <div>
                      <h3 className="font-display text-2xl font-black">
                        {j.company}
                      </h3>

                      <p className="mt-1 text-sm font-semibold text-black/55 dark:text-white/55">
                        {j.role}
                      </p>

                      <p className="mt-1 text-sm text-black/45 dark:text-white/45">
                        {j.city}
                      </p>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-black/50 dark:text-white/50">
                    <CalendarDays size={15} />
                    {j.date}
                  </div>
                </div>

                {/* Responsibilities */}
                <ul className="mt-6 grid gap-3">
                  {j.items.map((item) => (
                    <li
                      key={item}
                      className="relative rounded-2xl border border-black/10 p-4 pl-8 text-sm leading-6 dark:border-white/10"
                    >
                      <span className="absolute left-4 top-[21px] h-1.5 w-1.5 rounded-full bg-violet-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
