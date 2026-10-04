"use client";

import { BarChart3 } from "lucide-react";

export function Chart() {
  return (
    <section
      id="analytics"
      className="section-space"
    >
      <div className="container-pro">
        <div className="surface overflow-hidden p-6 md:p-8">

          <div className="chart-header">

            <div>
              <span className="eyebrow">
                Analytics
              </span>

              <h2 className="mt-4 font-display text-3xl font-black md:text-4xl">
                Performance overview
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-black/50 dark:text-white/50">
                A quick view of project delivery, technology usage
                and development activity.
              </p>
            </div>

            <div className="chart-icon">
              <BarChart3 size={21} />
            </div>

          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">

            {[
              ["Projects", "20+", "Delivered projects"],
              ["Technologies", "10+", "Modern technologies"],
              ["Experience", "3+", "Years of development"],
              ["AI", "Active", "AI integration"],
            ].map(([title, value, description]) => (
              <div
                key={title}
                className="metric-card rounded-2xl border border-black/10 bg-black/[.025] p-5 dark:border-white/10 dark:bg-white/[.035]"
              >
                <p className="text-xs font-bold uppercase tracking-[.15em] text-black/40 dark:text-white/40">
                  {title}
                </p>

                <p className="mt-4 font-display text-3xl font-black">
                  {value}
                </p>

                <p className="mt-2 text-xs text-black/45 dark:text-white/45">
                  {description}
                </p>
              </div>
            ))}

          </div>

          <div className="mt-6 rounded-2xl border border-black/10 bg-black/[.02] p-5 dark:border-white/10 dark:bg-white/[.025]">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-bold">
                  Development activity
                </p>

                <p className="mt-1 text-xs text-black/40 dark:text-white/40">
                  Recent project workflow
                </p>
              </div>

              <BarChart3
                size={20}
                className="text-violet-600 dark:text-violet-400"
              />

            </div>

            <div className="mt-8 flex h-52 items-end gap-2 sm:gap-4">

              {[42, 58, 48, 75, 62, 86, 70, 92, 78, 96, 82, 100].map(
                (height, index) => (
                  <div
                    key={index}
                    className="group flex h-full flex-1 items-end"
                  >
                    <div
                      style={{
                        height: `${height}%`,
                      }}
                      className="w-full rounded-t-xl bg-gradient-to-t from-violet-600 via-fuchsia-500 to-cyan-400 opacity-80 transition-all duration-300 group-hover:opacity-100"
                    />
                  </div>
                )
              )}

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}