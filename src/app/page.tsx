"use client";

import Link from "next/link";
import { ArrowRight, Shield, Droplets, Ruler, PhoneCall } from "lucide-react";

const features = [
  {
    title: "Instant Grip",
    detail: "EDPM rubber skin creates cling on shingles, metal, or synthetic panels so your nailer stays where you set it.",
    icon: Shield,
  },
  {
    title: "Universal Fit",
    detail: "Low-profile adhesive backing wraps around all major roofing nail guns without blocking magazines or triggers.",
    icon: Ruler,
  },
  {
    title: "Weatherproof",
    detail: "Heat, cold, tar, and solvents bounce off the industrial adhesive — no peeling, no residue.",
    icon: Droplets,
  },
];

const steps = [
  "Peel the protective liner.",
  "Wrap the strip along your nail gun chassis.",
  "Press firmly for 30 seconds. GripGuard is ready.",
];

const faqs = [
  {
    question: "Will it add weight?",
    answer: "Each GripGuard pad weighs under 2 oz. It adds traction without changing balance or ergonomics.",
  },
  {
    question: "Does it work on wet shingles?",
    answer: "Yes. EDPM rubber is engineered to stay tacky even when roofs are damp, dusty, or icy.",
  },
  {
    question: "How long does it last?",
    answer: "Owens Construction tested GripGuard for 9 months of daily use with no delamination.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#05060a] text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16">
        <header className="rounded-[32px] border border-white/10 bg-white/5 p-10 shadow-[0_40px_140px_rgba(0,0,0,0.55)] backdrop-blur">
          <p className="text-sm uppercase tracking-[0.5em] text-orange-300">Owens Construction</p>
          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="lg:w-3/5 space-y-5">
              <h1 className="text-4xl font-semibold leading-tight lg:text-5xl">GripGuard™ — the EDPM traction skin for roofing nail guns.</h1>
              <p className="text-lg text-white/70">
                Roof pitches keep getting steeper. GripGuard wraps your nailer with a custom EDPM rubber strip so it anchors to shingles instead of
                skating off the roof. No clamps. No magnets. Just peel, stick, and keep crews safe.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="https://forms.gle/"
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-black transition hover:translate-y-0.5"
                >
                  Reserve Production Batch <ArrowRight size={18} />
                </Link>
                <Link
                  href="mailto:sales@owensconstruction.com"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-white/80 transition hover:bg-white/10"
                >
                  Talk to Sales
                </Link>
              </div>
            </div>
            <div className="lg:w-2/5 space-y-5 rounded-3xl border border-white/10 bg-black/40 p-6">
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">Product snapshot</p>
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-orange-500/40 to-pink-500/20 p-6 text-white/80">
                <p className="text-sm">Material</p>
                <p className="text-2xl font-semibold text-white">EDPM Rubber + Industrial Adhesive</p>
                <p className="mt-4 text-sm">Surface coverage</p>
                <p className="text-2xl font-semibold text-white">12" x 3" strip (trim to fit)</p>
                <p className="mt-4 text-sm">Retention</p>
                <p className="text-2xl font-semibold text-white">Static grip up to 7x smoother surfaces</p>
              </div>
              <p className="text-sm text-white/70">
                Every strip ships in heat-sealed packs. Replace yearly or when the tread shows wear.
              </p>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-[28px] border border-white/10 bg-white/5 p-6 text-white/80">
              <feature.icon className="text-orange-300" />
              <p className="mt-4 text-xl font-semibold text-white">{feature.title}</p>
              <p className="mt-2 text-sm">{feature.detail}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Three-step install</p>
            <p className="mt-3 text-3xl font-semibold text-white">Wrap and climb.</p>
            <ul className="mt-5 space-y-4 text-sm">
              {steps.map((step, idx) => (
                <li key={step} className="relative pl-8">
                  <span className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-orange-400 text-xs font-semibold text-black">
                    {idx + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-white/70">Need pre-cut kits for your fleet? We laser-trim GripGuard for Hitachi, DeWalt, Bostitch, and more.</p>
          </div>
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Built for job sites</p>
            <p className="mt-3 text-3xl font-semibold text-white">Field testing by Owens Construction crews.</p>
            <p className="mt-4 text-base text-white/80">
              We designed GripGuard after replacing too many nail guns that slid off the roof. The EDPM rubber conforms to tool bodies and keeps
              traction even when the surface is dusty, damp, or frosty. Crews spend less time chasing tools and more time nailing perfect rows.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 text-sm text-white/70">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-xs uppercase tracking-[0.4em] text-white/50">Time saved</p>
                <p className="mt-2 text-2xl font-semibold text-white">+18%</p>
                <p className="text-xs">less downtime per roof install.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-xs uppercase tracking-[0.4em] text-white/50">Slip incidents</p>
                <p className="mt-2 text-2xl font-semibold text-white">-72%</p>
                <p className="text-xs">reported on pilot crews.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/5 p-8">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">Questions answered</p>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-white/10 bg-black/30 p-5 text-white/80">
                <p className="text-sm font-semibold text-white">{faq.question}</p>
                <p className="mt-3 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/5 p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">Ready to equip your crews?</p>
              <p className="mt-3 text-3xl font-semibold text-white">GripGuard is built-to-order from Owens Construction.</p>
              <p className="mt-4 text-base text-white/80">Drop your fleet size and preferred nail guns, and we’ll quote bulk packs with white-label packaging.</p>
            </div>
            <Link
              href="tel:+13305075195"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-white/80 transition hover:bg-white/10"
            >
              <PhoneCall size={18} /> Call Owens Construction
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
