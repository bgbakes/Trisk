'use client';
// app/welcome.tsx
import Link from 'next/link';
import TriskelionSVG from '@/components/ui/TriskelionSVG';

export default function WelcomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16"
      style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 45%, #1a0d02 0%, #080806 70%)' }}>

      {/* Eyebrow */}
      <p className="font-sans text-[9px] tracking-[0.6em] uppercase text-gold-deep mb-12 animate-fade-up">
        Now in Beta
      </p>

      {/* Logo */}
      <div className="mb-10 animate-breathe">
        <TriskelionSVG size={200} />
      </div>

      {/* Wordmark */}
      <h1 className="font-display text-7xl md:text-8xl font-black tracking-[0.3em] gold-text mb-4 animate-fade-up">
        TRISK
      </h1>
      <p className="font-serif italic text-muted text-lg tracking-widest mb-12 animate-fade-up">
        Power. Trust. Dynamic.
      </p>

      {/* Three pillars */}
      <div className="flex gap-10 mb-14">
        {[
          { label: 'Track',     desc: 'Your dynamic' },
          { label: 'Scene',     desc: 'The community' },
          { label: 'Connect',   desc: 'Coming soon' },
        ].map((p) => (
          <div key={p.label} className="text-center">
            <p className="font-display text-xs tracking-[0.2em] text-gold-bright mb-1">{p.label}</p>
            <p className="font-sans text-[9px] tracking-widest text-muted uppercase">{p.desc}</p>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div className="w-full max-w-sm flex flex-col gap-3 mb-8">
        <Link href="/signup" className="btn-gold text-center">
          Enter the Scene
        </Link>
        <Link href="/login" className="btn-outline text-center">
          I have an account
        </Link>
      </div>

      <p className="font-sans text-[9px] text-dim tracking-widest text-center">
        18+ only · Consensual adults only
      </p>
    </main>
  );
}
