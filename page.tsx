'use client';
// app/signup/page.tsx
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import TriskelionSVG from '@/components/ui/TriskelionSVG';

type Role = 'dominant' | 'submissive' | 'switch';

const ROLES: { value: Role; label: string; desc: string }[] = [
  { value: 'dominant',   label: 'Dominant',  desc: 'I lead the dynamic'       },
  { value: 'submissive', label: 'Submissive', desc: 'I follow the dynamic'     },
  { value: 'switch',     label: 'Switch',     desc: 'I move between both'      },
];

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep]         = useState(1);
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole]         = useState<Role | null>(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) { setError('Please select your role.'); return; }
    setError(''); setLoading(true);
    const supabase = createClient();
    const { error: signUpErr } = await supabase.auth.signUp({
      email, password,
      options: { data: { username, role } },
    });
    if (signUpErr) { setError(signUpErr.message); setLoading(false); return; }
    router.push('/onboarding');
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16"
      style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 40%, #1a0d02 0%, #080806 70%)' }}>

      <Link href="/" className="mb-10">
        <TriskelionSVG size={64} />
      </Link>

      {/* Step indicators */}
      <div className="flex gap-2 mb-8">
        {[1, 2].map(s => (
          <div key={s} className={`h-0.5 w-8 rounded-full transition-colors ${step >= s ? 'bg-gold-bright' : 'bg-dim'}`} />
        ))}
      </div>

      {step === 1 ? (
        <>
          <h1 className="font-display text-3xl font-black tracking-[0.2em] gold-text mb-2">Join the Scene</h1>
          <p className="font-serif italic text-muted mb-10">Your kink community awaits.</p>
          <form className="w-full max-w-sm flex flex-col gap-4" onSubmit={e => { e.preventDefault(); setStep(2); }}>
            <div>
              <label className="label">Email</label>
              <input className="input" type="email" value={email}
                onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required />
            </div>
            <div>
              <label className="label">Password (8+ characters)</label>
              <input className="input" type="password" value={password}
                onChange={e => setPassword(e.target.value)} placeholder="••••••••" required minLength={8} />
            </div>
            <button type="submit" className="btn-gold mt-2">Continue</button>
          </form>
        </>
      ) : (
        <>
          <h1 className="font-display text-3xl font-black tracking-[0.2em] gold-text mb-2">Who Are You?</h1>
          <p className="font-serif italic text-muted mb-10">Set your scene identity.</p>
          <form className="w-full max-w-sm flex flex-col gap-4" onSubmit={handleSignup}>
            <div>
              <label className="label">Username</label>
              <input className="input" type="text" value={username}
                onChange={e => setUsername(e.target.value)} placeholder="your_scene_name" required />
            </div>
            <div className="flex flex-col gap-2">
              <label className="label">Your Role</label>
              {ROLES.map(r => (
                <button key={r.value} type="button"
                  onClick={() => setRole(r.value)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    role === r.value
                      ? 'border-gold-bright bg-gold/10'
                      : 'border-gold-deep/25 bg-leather hover:border-gold/40'
                  }`}>
                  <p className={`font-display text-sm tracking-widest ${role === r.value ? 'text-gold-bright' : 'text-muted'}`}>
                    {r.label}
                  </p>
                  <p className="font-sans text-xs text-dim mt-0.5">{r.desc}</p>
                </button>
              ))}
            </div>

            {error && <p className="text-xs text-red-400 font-sans">{error}</p>}

            <button type="submit" disabled={loading || !role}
              className="btn-gold mt-2 disabled:opacity-50">
              {loading ? 'Creating...' : 'Enter Trisk'}
            </button>
            <button type="button" onClick={() => setStep(1)}
              className="font-sans text-xs text-muted text-center hover:text-cream">← Back</button>
          </form>
        </>
      )}

      <p className="font-sans text-xs text-muted mt-8">
        Already a member?{' '}
        <Link href="/login" className="text-gold-bright hover:underline">Sign in</Link>
      </p>
    </main>
  );
}
