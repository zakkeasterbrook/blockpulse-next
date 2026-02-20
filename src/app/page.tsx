"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Activity, ArrowRight, ArrowUpRight, Radio, RefreshCw, Sparkles, Zap } from "lucide-react";

type PulseStats = {
  blockHeight: number;
  mempoolTxs: number;
  suggestedFee: number;
  priceUSD: number;
  hashRateEh: number;
  updatedAt: string;
};

const explainerTopics = [
  {
    id: "money",
    label: "What is Bitcoin?",
    headline: "Digital cash with rules nobody can bend.",
    copy: "Bitcoin is a monetary network: software that agrees globally on one ledger. 21 million coins, predictable issuance, no CEO, no off switch.",
    bullets: [
      "Launched in 2009 by the pseudonymous Satoshi Nakamoto.",
      "Every 10 minutes the network bundles transactions into a block.",
      "Anyone can verify ownership with a private key — no bank required.",
    ],
  },
  {
    id: "security",
    label: "Why miners matter",
    headline: "Worldwide miners compete with energy to secure the ledger.",
    copy: "Hash rate measures how much computing power is defending the chain. The higher it is, the more expensive it becomes to rewrite history.",
    bullets: [
      "Miners race to find a valid block hash.",
      "Winning miner earns the block reward + transaction fees.",
      "Hash power is mobile — it follows cheap energy globally.",
    ],
  },
  {
    id: "use",
    label: "Why it matters",
    headline: "People use Bitcoin to store, send, and program value.",
    copy: "Paired with Lightning and modern wallets, Bitcoin is borderless value transfer. It settles in minutes and anyone can audit the supply.",
    bullets: [
      "23k+ public nodes keep redundant copies of the chain.",
      "Large treasuries and individuals treat it as digital gold.",
      "Developers build apps on top: Lightning, ordinals, DLCs, more.",
    ],
  },
];

const journey = [
  {
    step: "Genesis",
    detail: "January 3, 2009 — the first block references a UK bailout headline.",
  },
  {
    step: "Hash Explosion",
    detail: "Decentralized mining jumps from laptops to global energy farms.",
  },
  {
    step: "Lightning",
    detail: "Layer-two payments make instant, low-fee transfers possible.",
  },
  {
    step: "Nation State Era",
    detail: "El Salvador (2021) adopted Bitcoin as legal tender — others study the playbook.",
  },
];

const myths = [
  {
    myth: "Bitcoin wastes energy",
    reality: "The network consumes energy to anchor value, but 50%+ comes from stranded/renewable sources. It monetizes excess power and provides a global buyer of last resort for renewables.",
  },
  {
    myth: "It’s anonymous crime money",
    reality: "All activity is transparent. Chain analytics + public ledgers make Bitcoin more traceable than cash. Most usage today is legal commerce or savings.",
  },
  {
    myth: "It’s too slow",
    reality: "Base layer finality takes ~10 minutes, but Lightning + batching give instant UX. Settlements remain unstoppable and censorship-resistant.",
  },
];

const formatNumber = (value: number, options: Intl.NumberFormatOptions = {}) =>
  new Intl.NumberFormat("en-US", options).format(value);

export default function Home() {
  const [stats, setStats] = useState<PulseStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTopic, setActiveTopic] = useState(explainerTopics[0].id);

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
          suggestedFee: data.suggested_transaction_fee_per_byte_sat ?? data.median_transaction_fee_24h ?? 0,
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

  const mempoolPressure = stats ? Math.min(100, (stats.mempoolTxs / 40000) * 100) : 0;
  const hashSignal = stats ? Math.min(100, (stats.hashRateEh / 600) * 100) : 0;
  const gridTexture = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/grid.svg`;
  const currentTopic = explainerTopics.find((topic) => topic.id === activeTopic) ?? explainerTopics[0];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#010104] text-white">
      <div className="pointer-events-none absolute inset-0 animate-pulse-slow bg-[radial-gradient(circle_at_top,_rgba(255,132,0,0.3),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,_transparent_1px),linear-gradient(90deg,_rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[size:70px_70px] opacity-30" />

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16">
        {/* HERO */}
        <section className="rounded-[32px] border border-white/10 bg-white/5 p-10 shadow-[0_40px_140px_rgba(0,0,0,0.55)] backdrop-blur">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-6 lg:w-2/3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-[0.3em] text-orange-200">
                <Radio size={14} className="text-orange-300" /> Bitcoin Orientation Studio
              </div>
              <h1 className="text-4xl font-semibold leading-tight md:text-5xl">{heroHeadline}</h1>
              <p className="text-lg text-white/70">
                Start from zero, leave fluent. BlockPulse explains Bitcoin with live numbers, cinematic storytelling, and interactive myth-busting so you can grasp why billions trust this network.
              </p>
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
                <Link
                  href="https://bitcoin.org/bitcoin.pdf"
                  className="flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-white/80 transition hover:bg-white/10"
                  target="_blank"
                >
                  Read the Whitepaper <ArrowRight size={18} />
                </Link>
              </div>
              <div className="grid gap-4 text-sm text-white/70 sm:grid-cols-2">
                <StatBadge title="Block height" value={stats ? `#${formatNumber(stats.blockHeight)}` : "..."} />
                <StatBadge title="Global hash power" value={stats ? `${formatNumber(stats.hashRateEh, { maximumFractionDigits: 2 })} EH/s` : "..."} />
                <StatBadge title="BTC price" value={stats ? `$${formatNumber(stats.priceUSD)}` : "..."} />
                <StatBadge title="Updated" value={stats ? new Date(stats.updatedAt).toLocaleTimeString() : "..."} />
              </div>
            </div>

            <div className="w-full rounded-3xl border border-white/15 bg-black/40 p-6 lg:w-1/3">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/50">
                <span>Live Pulse Deck</span>
                <RefreshCw size={14} className={loading ? "animate-spin" : "text-white/40"} />
              </div>
              <div className="mt-5 space-y-4 text-sm">
                <MetricRow label="Mempool" value={stats ? `${formatNumber(stats.mempoolTxs)} txs waiting` : "..."} highlight />
                <ProgressBar label="Network traffic" value={mempoolPressure} color="from-orange-400 to-pink-500" />
                <MetricRow label="Suggested fee" value={stats ? `${formatNumber(stats.suggestedFee)} sat/vB` : "..."} />
                <MetricRow label="Hash pulse" value={stats ? `${formatNumber(stats.hashRateEh, { maximumFractionDigits: 1 })} EH/s` : "..."} />
                <ProgressBar label="Energy securing the chain" value={hashSignal} color="from-emerald-400 to-cyan-400" />
              </div>
              {error && <p className="mt-4 text-xs text-orange-300">{error}</p>}
            </div>
          </div>
        </section>

        {/* EXPLAINER TABS */}
        <section className="rounded-[32px] border border-white/10 bg-white/5 px-6 py-8 text-white/80">
          <div className="flex flex-wrap gap-3">
            {explainerTopics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setActiveTopic(topic.id)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  topic.id === activeTopic
                    ? "border-white bg-white/20 text-white"
                    : "border-white/20 bg-transparent text-white/70 hover:border-white/40"
                }`}
              >
                {topic.label}
              </button>
            ))}
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-orange-200">Bitcoin 101</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">{currentTopic.headline}</h2>
              <p className="mt-3 text-base text-white/80">{currentTopic.copy}</p>
              <ul className="mt-5 space-y-3 text-sm">
                {currentTopic.bullets.map((bullet) => (
                  <li key={bullet}>• {bullet}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">Why it snaps</p>
              <p className="mt-3 text-lg text-white/90">
                Tap through the chips on the left to see how Bitcoin’s economics, security, and real-world uses interlock. Each module summarizes the big picture while the live stats above prove the network is humming right now.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/70">
                <span className="rounded-full border border-white/15 px-3 py-1">Open network</span>
                <span className="rounded-full border border-white/15 px-3 py-1">Provable scarcity</span>
                <span className="rounded-full border border-white/15 px-3 py-1">Energy backed</span>
                <span className="rounded-full border border-white/15 px-3 py-1">Self custody</span>
              </div>
            </div>
          </div>
        </section>

        {/* JOURNEY */}
        <section className="rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top,#ff7600_0%,#100200_65%)] p-10 shadow-[0_20px_90px_rgba(0,0,0,0.5)]">
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{ backgroundImage: `url(${gridTexture})`, backgroundSize: "cover" }}
          />
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-white/70">
              <Activity size={16} /> Bitcoin journey map
            </div>
            <h2 className="text-3xl font-semibold text-white">From a cypherpunk PDF to a nation-state asset.</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {journey.map((stop, index) => (
                <div key={stop.step} className="rounded-2xl border border-white/15 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">0{index + 1}</p>
                  <p className="mt-2 text-xl font-semibold text-white">{stop.step}</p>
                  <p className="mt-2 text-white/80">{stop.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MYTH BUSTER */}
        <section className="rounded-[32px] border border-white/10 bg-white/5 p-8">
          <div className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-white/60">
            <Sparkles size={16} className="text-orange-200" /> Myth vs Reality
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {myths.map((entry) => (
              <div key={entry.myth} className="rounded-2xl border border-white/15 bg-black/30 p-5 text-sm text-white/80">
                <p className="text-xs uppercase tracking-[0.3em] text-orange-200">Myth</p>
                <p className="mt-2 font-semibold text-white">{entry.myth}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.3em] text-white/60">Reality</p>
                <p className="mt-2 text-white/80">{entry.reality}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="rounded-[32px] border border-white/10 bg-white/5 p-8">
          <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h3 className="text-sm uppercase tracking-[0.4em] text-white/60">Take the signal further</h3>
              <p className="mt-3 text-3xl font-semibold text-white">Build with this kit, or drop it into your onboarding funnel.</p>
              <p className="mt-4 text-base text-white/80">
                Everything you see here ships as a Next.js project with Tailwind, live data hooks, and static-export compatibility. Fork it, remix the palette, hook up new APIs (Lightning, ordinals, mempool visualizations) and deploy to Pages, Vercel, or Cloudflare.
              </p>
              <div className="mt-6 flex items-center gap-3 text-white/70">
                <Zap className="text-orange-300" size={20} />
                Crafted autonomously, ready for your brand voice.
              </div>
            </div>
            <div className="rounded-3xl border border-white/15 bg-black/30 p-6 space-y-4 text-sm text-white/80">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Next steps</p>
              <ul className="space-y-3">
                <li>• Clone repo → `npm install` → `npm run dev`.</li>
                <li>• Swap copy + imagery to match your offer.</li>
                <li>• Deploy with `next export` (already configured for GitHub Pages).</li>
              </ul>
              <Link
                href="https://github.com/zakkeasterbrook/blockpulse-next"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2 text-white transition hover:bg-white/10"
                target="_blank"
              >
                Fork the experience <ArrowRight size={16} />
              </Link>
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

type ProgressBarProps = {
  label: string;
  value: number;
  color: string;
};

function ProgressBar({ label, value, color }: ProgressBarProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-white/50">
        <span>{label}</span>
        <span>{Math.round(value)}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full bg-gradient-to-r ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

type StatBadgeProps = {
  title: string;
  value: string;
};

function StatBadge({ title, value }: StatBadgeProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
      <p className="text-[11px] uppercase tracking-[0.3em] text-white/50">{title}</p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}
