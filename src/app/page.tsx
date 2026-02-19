"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const sparks = [
  {
    title: "Realtime Build",
    desc: "Animated hero wired to layered gradients and motion-ready layout built solely with Tailwind.",
  },
  {
    title: "Aurora Grid",
    desc: "Subtle neon mesh adds depth without large assets.",
  },
  {
    title: "Quick Actions",
    desc: "Launch the playground, fork the repo or open docs in one tap.",
  },
];

const timeline = [
  { label: "Envision", detail: "Describe the palette + emotion." },
  { label: "Generate", detail: "Next.js + Tailwind scaffold composes instantly." },
  { label: "Ship", detail: "Deploy to Vercel/GitHub from the action bar." },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05060a] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,153,0,0.25),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,_transparent_1px),linear-gradient(90deg,_rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[size:60px_60px] opacity-40" />

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 px-6 py-20">
        <section className="rounded-[32px] border border-white/10 bg-white/5 p-10 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-orange-200">BlockPulse Studio</p>
              <h1 className="mt-3 max-w-2xl text-4xl font-semibold leading-tight text-white md:text-5xl">
                Design-forward Next.js starter with cinematic gradients, motion-ready layout and zero boilerplate legacy.
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-white/70">
                Drop in your copy, swap the palette, and you have a product hero that feels alive. Built with the App Router, Tailwind
                and a sprinkle of fancy CSS.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm font-medium">
              <Link
                href="https://nextjs.org"
                className="flex items-center gap-2 rounded-full bg-white text-black px-6 py-2 transition hover:translate-y-0.5"
                target="_blank"
              >
                Explore Next.js <ArrowRight size={18} />
              </Link>
              <Link
                href="https://vercel.com"
                className="rounded-full border border-white/40 px-6 py-2 text-white/80 transition hover:bg-white/10"
                target="_blank"
              >
                Deploy on Vercel
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {sparks.map((spark) => (
              <div key={spark.title} className="rounded-2xl bg-white/5 p-5 text-sm text-white/80">
                <p className="text-xs uppercase tracking-[0.2em] text-orange-200">{spark.title}</p>
                <p className="mt-3 text-base text-white">{spark.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top,#ff9800_0%,#120400_65%)] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
            <div className="pointer-events-none absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
            <div className="relative z-10 flex flex-col gap-6">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-white/70">Flow</p>
                <h2 className="mt-3 text-3xl font-semibold">Prototype to polished in three beats.</h2>
              </div>
              <div className="space-y-4">
                {timeline.map((step, index) => (
                  <div key={step.label} className="flex gap-4 rounded-2xl bg-white/10 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black font-semibold">
                      0{index + 1}
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-white/70">{step.label}</p>
                      <p className="text-lg text-white">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 text-white/80">
            <p className="text-sm uppercase tracking-[0.4em] text-white/60">Palette switch</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Neon + obsidian theme baked in</h2>
            <p className="mt-4 text-base">
              globals.css ships with CSS custom properties so you can turn this into a brutalist mono page or a pastel gradient vibe in seconds.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li>• Tailwind tokens map to CSS vars for instant theming.</li>
              <li>• Glassmorphism utilities ready for reuse.</li>
              <li>• Smooth scroll + grid overlay toggled by a single class.</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
