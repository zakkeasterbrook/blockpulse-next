"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Activity, ArrowRight, ArrowUpRight, Radio, RefreshCw, Zap } from "lucide-react";

type PulseStats = {
  blockHeight: number;
  mempoolTxs: number;
  fastestFee: number;
  priceUSD: number;
  hashRateEh: number;
  updatedAt: string;
};

const featureCards = [
  {
    title: "Generative Grid",
    detail: "Noise-driven background uses CSS variables tied to live Bitcoin data so the page subtly shifts every block.",
  },
  {
    title: "Signal Stack",
    detail: "Blocks, price action, mempool congestion and synthetic hash pulse all at a glance.",
  },
  {
    title: "Dropzone Actions",
    detail: "Hook the studio into Vercel, GitHub, or your own orchestrators with one tap actions.",
  },
];

const phases = [
  {
    label: "Catch a Block",
    desc: "Realtime height + mempool delta push the hero gradient and ticker.",
  },
  {
    label: "Compose",
    desc: "Slot in your narrative, ship the preset sections or remix them in minutes.",
  },
  {
    label: "Amplify",
    desc: "Export as static, wire to GitHub Pages, Vercel, or slap on a custom domain instantly.",
  },
];

const reactionPills = [
  "⚡ 9s gradient loop",
  "🟠 Glass stack",
  "🛰️ Live chain feed",
  "🧪 Motion-ready",
  "🧊 Frosted panels",
  "🪂 Drop-in sections",
];

const formatNumber = (value: number, options: Intl.NumberFormatOptions = {}) =>
  new Intl.NumberFormat("en-US", options).format(value);

export default function Home() {
  const [stats, setStats] = useState<PulseStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchStats = async () => {
      try {
        setError(null);
        const res = await fetch("https://api.blockchair.com/bitcoin/stats", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load Blockchair stats");
        const payload = await res.json();
        const data = payload?.data;
        if (!data) throw new Error("Empty payload");

        const hashRateRaw = Number(data.hashrate_24h ?? data.hashrate_1d ?? 0);
        const statsPayload: PulseStats = {
          blockHeight: data.best_block_height ?? data.blocks ?? 0,
          mempoolTxs: data.mempool_transactions ?? data.mempool_txs ?? 0,
          fastestFee: data.suggested_transaction_fee_per_byte_sat ?? data.median_transaction_fee_24h ?? 0,
          priceUSD: data.market_price_usd ?? payload?.context?.market_price_usd ?? 0,
          hashRateEh: Number.isFinite(hashRateRaw) ? hashRateRaw / 1e18 : 0,
          updatedAt: new Date().toISOString(),
        };

        if (!cancelled) {
          setStats(statsPayload);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setError("Live feed unavailable. Showing static layout only.");
          setLoading(false);
        }
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 45_000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const heroHeadline = useMemo(() => {
    if (!stats) return "BlockPulse Studio";
    return `BlockPulse Studio · Block ${stats.blockHeight.toLocaleString()}`;
  }, [stats]);

  const gridTexture = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/grid.svg`;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#010104] text-white">
      <div className="pointer-events-none absolute inset-0 animate-pulse-slow bg-[radial-gradient(circle_at_top,_rgba(255,132,0,0.3),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,_transparent_1px),linear-gradient(90deg,_rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[size:70px_70px] opacity-30" />

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 px-6 py-20">
        <section className="rounded-[32px] border border-white/10 bg-white/5 p-10 shadow-[0_40px_140px_rgba(0,0,0,0.55)] backdrop-blur">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-6 lg:w-2/3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-[0.3em] text-orange-200">
                <Radio size={14} className="text-orange-300" /> Live Bitcoin Studio
              </div>
              <h1 className="text-4xl font-semibold leading-tight md:text-5xl">{heroHeadline}</h1>
              <p className="text-lg text-white/70">
                Cinematic glassmorphism kit wired to the Bitcoin network. Gradients breathe as blocks land, stats power the ticker, and the layout is ready for any orange-pill story you want to ship.
              </p>
              <div className="flex flex-wrap gap-3 text-xs text-white/70">
                {reactionPills.map((pill) => (
                  <span key={pill} className="rounded-full border border-white/15 px-3 py-1">
                    {pill}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="https://github.com/zakkeasterbrook/blockpulse-next"
                  className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-black transition hover:translate-y-0.5"
                  target="_blank"
                >
                  View Repo <ArrowUpRight size={18} />
                </Link>
                <Link
                  href="https://zakkeasterbrook.github.io/blockpulse-next/?ref=launch"
                  className="flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-white/80 transition hover:bg-white/10"
                  target="_blank"
                >
                  Launch Live Site <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            <div className="w-full rounded-3xl border border-white/15 bg-black/40 p-5 lg:w-1/3">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/50">
                <span>Live Pulse</span>
                <RefreshCw size={14} className={loading ? "animate-spin" : "text-white/40"} />
              </div>
              <div className="mt-4 space-y-4 text-sm">
                <MetricRow label="Block" value={stats ? `#${formatNumber(stats.blockHeight)}` : "..."} highlight />
                <MetricRow label="BTC Price" value={stats ? `$${formatNumber(stats.priceUSD, { maximumFractionDigits: 0 })}` : "..."} />
                <MetricRow label="Mempool" value={stats ? `${formatNumber(stats.mempoolTxs)} txs` : "..."} />
                <MetricRow label="Suggested Fee" value={stats ? `${formatNumber(stats.fastestFee)} sat/vB` : "..."} />
                <MetricRow label="Hash Pulse" value={stats ? `${formatNumber(stats.hashRateEh, { maximumFractionDigits: 2 })} EH/s` : "..."} />
                <MetricRow label="Updated" value={stats ? new Date(stats.updatedAt).toLocaleTimeString() : "..."} />
              </div>
              {error && <p className="mt-4 text-xs text-orange-300">{error}</p>}
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-3">
          {featureCards.map((card) => (
            <div key={card.title} className="rounded-[28px] border border-white/10 bg-white/5 p-6 text-white/80">
              <p className="text-xs uppercase tracking-[0.3em] text-orange-200">{card.title}</p>
              <p className="mt-3 text-base text-white">{card.detail}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top,#ff7600_0%,#100200_65%)] p-10 shadow-[0_20px_90px_rgba(0,0,0,0.5)]">
            <div
              className="pointer-events-none absolute inset-0 opacity-25"
              style={{ backgroundImage: `url(${gridTexture})`, backgroundSize: "cover" }}
            />
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-white/70">
                <Activity size={16} /> Flow Engine
              </div>
              <h2 className="text-3xl font-semibold">Prototype to fandom in three beats.</h2>
              <div className="space-y-4">
                {phases.map((phase, idx) => (
                  <div key={phase.label} className="flex gap-4 rounded-2xl bg-white/10 p-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-lg font-semibold text-black">
                      0{idx + 1}
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-white/70">{phase.label}</p>
                      <p className="text-base text-white/90">{phase.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">
            <h3 className="text-sm uppercase tracking-[0.4em] text-white/60">Drop the kit</h3>
            <p className="mt-3 text-3xl font-semibold text-white">A playground designed for kinetic storytelling.</p>
            <p className="mt-4 text-base text-white/80">
              Layer the preset hero, ticker, feed and action rail. Add your own data sources and swap the palette by editing a single Tailwind theme file.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/70">
              <li>• Client-side fetch with graceful failure and animated loader.</li>
              <li>• CSS variables drive gradients tied to data pulses.</li>
              <li>• Static export compatible → deploy anywhere, instantly.</li>
            </ul>
            <div className="mt-8 flex items-center gap-3 text-white/70">
              <Zap className="text-orange-300" size={20} />
              Crafted by an autonomous ops stack. Fork it, remix it, deploy it.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

type MetricRowProps = {
  label: string;
  value: string;
  highlight?: boolean;
};

function MetricRow({ label, value, highlight }: MetricRowProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
      <span className="text-xs uppercase tracking-[0.3em] text-white/50">{label}</span>
      <span className={`text-sm font-semibold ${highlight ? "text-orange-300" : "text-white"}`}>{value}</span>
    </div>
  );
}
