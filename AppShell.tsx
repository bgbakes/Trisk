'use client';
// components/ui/AppShell.tsx
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import TriskelionSVG from './TriskelionSVG';

// ── ICONS ─────────────────────────────────────────────────────────

function IconTrack({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="3" y="3" width="7" height="7" rx="1.5"
        stroke={active ? '#E8C244' : '#3D3424'} strokeWidth="1.5" />
      <rect x="12" y="3" width="7" height="7" rx="1.5"
        stroke={active ? '#E8C244' : '#3D3424'} strokeWidth="1.5" />
      <rect x="3" y="12" width="7" height="7" rx="1.5"
        stroke={active ? '#E8C244' : '#3D3424'} strokeWidth="1.5" />
      <path d="M13 15.5l2 2 4-4" stroke={active ? '#E8C244' : '#3D3424'}
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconScene({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M11 2L4 7v13h14V7z" stroke={active ? '#E8C244' : '#3D3424'}
        strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 20v-7h6v7" stroke={active ? '#E8C244' : '#3D3424'}
        strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function IconProfile({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="8" r="4" stroke={active ? '#E8C244' : '#3D3424'} strokeWidth="1.5" />
      <path d="M3 19c0-4 3.6-7 8-7s8 3 8 7" stroke={active ? '#E8C244' : '#3D3424'}
        strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const NAV = [
  { href: '/track',   label: 'Track',   Icon: IconTrack   },
  { href: '/scene',   label: 'Scene',   Icon: IconScene   },
  { href: '/profile', label: 'Profile', Icon: IconProfile },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  return (
    <div className="flex flex-col min-h-screen bg-void max-w-lg mx-auto relative">

      {/* Top bar */}
      <header className="flex items-center justify-between px-5 pt-safe-top pt-4 pb-3"
        style={{ background: 'linear-gradient(180deg, #160e04 0%, transparent 100%)' }}>
        <span className="font-display text-base tracking-[0.3em] gold-text">TRISK</span>
        <TriskelionSVG size={28} />
      </header>

      {/* Page content */}
      <main className="flex-1 overflow-y-auto pb-24">
        {children}
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto z-50"
        style={{
          background: 'rgba(14,10,2,0.92)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(196,154,42,0.18)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}>
        <div className="flex">
          {NAV.map(({ href, label, Icon }) => {
            const active = path.startsWith(href);
            return (
              <Link key={href} href={href}
                className="flex-1 flex flex-col items-center gap-1 py-3 transition-opacity active:opacity-70">
                <Icon active={active} />
                <span className={`font-sans text-[9px] tracking-[0.18em] uppercase transition-colors ${
                  active ? 'text-gold-bright' : 'text-dim'
                }`}>{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
