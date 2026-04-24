'use client';
// app/(app)/profile/page.tsx
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import TriskelionSVG from '@/components/ui/TriskelionSVG';
import { useState } from 'react';

const MOCK = {
  username: 'babygirl_rose', display_name: 'Rose',
  role: 'submissive', type: 'D/s', is_collared: true,
  is_premium: false, location: 'Las Vegas, NV',
  bio: 'DD/lg little. Soft things and strict protocols.',
  streak: 14, tasks_done: 287,
};

export default function ProfilePage() {
  const router = useRouter();
  const [discreet, setDiscreet] = useState(false);
  const [collar,   setCollar]   = useState(true);

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <div className="pb-8">

      {/* Hero */}
      <div className="flex flex-col items-center px-5 pt-6 pb-6"
        style={{ background: 'linear-gradient(180deg, rgba(196,154,42,0.1) 0%, transparent 100%)' }}>
        <div className="relative mb-3">
          <div className="w-20 h-20 rounded-full bg-leather border-2 border-gold-bright flex items-center justify-center">
            <span className="font-display text-3xl text-gold-bright">{MOCK.username[0].toUpperCase()}</span>
          </div>
          {MOCK.is_collared && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gold-bright flex items-center justify-center">
              <span className="text-void text-[10px]">⊙</span>
            </div>
          )}
        </div>
        <p className="font-display text-xl tracking-widest text-gold-bright mb-0.5">{MOCK.display_name}</p>
        <p className="font-sans text-xs text-muted mb-2">@{MOCK.username}</p>
        <div className="border border-gold-deep/30 rounded-full px-3 py-0.5 mb-3">
          <p className="font-sans text-[9px] uppercase tracking-widest text-muted">{MOCK.role} · {MOCK.type}</p>
        </div>
        <p className="font-serif italic text-sm text-cream text-center leading-relaxed mb-4">{MOCK.bio}</p>
        <div className="flex gap-8">
          {[{ v: MOCK.streak, l: 'Day Streak' }, { v: MOCK.tasks_done, l: 'Tasks Done' }].map(s => (
            <div key={s.l} className="text-center">
              <p className="font-display text-xl text-gold-bright">{s.v}</p>
              <p className="font-sans text-[9px] text-muted uppercase tracking-widest">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Upgrade */}
      {!MOCK.is_premium && (
        <div className="mx-4 mb-4 rounded-xl overflow-hidden"
          style={{ background: 'linear-gradient(90deg, #F7E88A, #E8C244, #C49A2A)' }}>
          <div className="flex justify-between items-center p-4">
            <div>
              <p className="font-display text-sm tracking-widest text-void mb-0.5">Upgrade to Pro</p>
              <p className="font-sans text-[10px] text-void/70">Unlimited dynamics · Full tracker · Analytics</p>
            </div>
            <p className="font-display text-lg text-void">$9.99</p>
          </div>
        </div>
      )}

      {/* Privacy */}
      <SectionTitle>Privacy</SectionTitle>
      <div className="mx-4 card divide-y divide-gold-deep/15">
        <Toggle label="Discreet Mode" desc="Hide from non-members" value={discreet} onChange={setDiscreet} />
        <Toggle label="Show Collar Status" desc="Display badge publicly" value={collar} onChange={setCollar} />
      </div>

      {/* Account */}
      <SectionTitle>Account</SectionTitle>
      <div className="mx-4 card divide-y divide-gold-deep/15">
        {['Edit Profile', 'Notification Settings', 'Blocked Users', 'Data & Privacy', 'Help & Support'].map(item => (
          <button key={item} className="w-full flex justify-between items-center py-3 text-left hover:text-gold-bright transition-colors">
            <span className="font-sans text-sm text-cream">{item}</span>
            <span className="text-dim text-xl">›</span>
          </button>
        ))}
      </div>

      {/* Sign out */}
      <div className="mx-4 mt-4">
        <button onClick={signOut}
          className="w-full py-3 rounded-xl border border-red-500/25 font-sans text-sm text-red-400 hover:bg-red-500/5 transition-colors">
          Sign Out
        </button>
      </div>

      <p className="font-sans text-[9px] text-dim text-center mt-6 tracking-widest px-4">
        Trisk v1.0.0 · trisk.app · © 2025 Mestre'K Enterprises LLC
      </p>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-display text-[9px] tracking-[0.3em] uppercase text-gold-bright px-4 pt-5 pb-2">
      {children}
    </p>
  );
}

function Toggle({ label, desc, value, onChange }: {
  label: string; desc: string; value: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex justify-between items-center py-3">
      <div>
        <p className="font-sans text-sm text-cream">{label}</p>
        <p className="font-sans text-[10px] text-muted">{desc}</p>
      </div>
      <button onClick={() => onChange(!value)}
        className={`relative w-10 h-5 rounded-full transition-colors ${value ? 'bg-gold' : 'bg-leather-dark border border-gold-deep/30'}`}>
        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-cream transition-all ${value ? 'left-5' : 'left-0.5'}`} />
      </button>
    </div>
  );
}
