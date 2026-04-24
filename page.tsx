'use client';
// app/onboarding/page.tsx
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const DYNAMIC_TYPES = ['D/s','M/s','O/p','DD/lg','MD/lb','CG/l','Pet Play','TPE','Other'];
const KINKS = [
  'Bondage','Impact Play','Protocol','Service','Sensation Play',
  'Roleplay','Praise Kink','Orgasm Control','Collar & Lead',
  'Aftercare Focus','Age Play','Pet Play','Power Exchange','Exhibitionism',
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep]           = useState(0);
  const [displayName, setName]    = useState('');
  const [bio, setBio]             = useState('');
  const [location, setLocation]   = useState('');
  const [dynamicTypes, setTypes]  = useState<string[]>([]);
  const [kinks, setKinks]         = useState<string[]>([]);
  const [discreet, setDiscreet]   = useState(false);
  const [loading, setLoading]     = useState(false);

  const toggle = (arr: string[], setArr: Function, val: string) =>
    setArr((p: string[]) => p.includes(val) ? p.filter(x => x !== val) : [...p, val]);

  const finish = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from('profiles').upsert({
        id: user.id, display_name: displayName, bio, location,
        dynamic_types: dynamicTypes, kinks, discreet_mode: discreet,
        updated_at: new Date().toISOString(),
      });
    }
    router.push('/track');
  };

  const STEPS = ['Identity','Dynamic','Interests','Privacy','Ready'];
  const next = () => step < 4 ? setStep(s => s + 1) : finish();

  return (
    <main className="min-h-screen flex flex-col bg-void px-5 pt-safe-top"
      style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 30%, #1a0d02 0%, #080806 70%)' }}>

      {/* Header */}
      <div className="flex items-center justify-between pt-12 pb-6">
        <button onClick={() => step > 0 ? setStep(s => s - 1) : router.back()}
          className="font-sans text-xs text-muted tracking-widest">← Back</button>
        <div className="flex gap-1.5">
          {STEPS.map((_, i) => (
            <div key={i} className={`h-0.5 w-6 rounded-full transition-colors ${step >= i ? 'bg-gold-bright' : 'bg-dim'}`} />
          ))}
        </div>
        <span className="font-sans text-[10px] text-dim">{step + 1}/{STEPS.length}</span>
      </div>

      <div className="flex-1 overflow-y-auto pb-32">

        {/* STEP 0 */}
        {step === 0 && (
          <div className="flex flex-col gap-4">
            <h1 className="font-display text-2xl gold-text tracking-widest leading-tight mb-1">Build Your Scene Identity</h1>
            <p className="font-serif italic text-muted text-sm mb-4">How the community knows you.</p>
            <div><label className="label">Display Name</label>
              <input className="input" value={displayName} onChange={e => setName(e.target.value)} placeholder="How you want to be known" /></div>
            <div><label className="label">City</label>
              <input className="input" value={location} onChange={e => setLocation(e.target.value)} placeholder="Las Vegas, NV" /></div>
            <div><label className="label">Bio</label>
              <textarea className="input h-24 resize-none" value={bio} onChange={e => setBio(e.target.value)} placeholder="Tell the scene who you are..." /></div>
          </div>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <div>
            <h1 className="font-display text-2xl gold-text tracking-widest mb-1">Your Dynamic Style</h1>
            <p className="font-serif italic text-muted text-sm mb-6">Select all that apply.</p>
            <div className="flex flex-wrap gap-2">
              {DYNAMIC_TYPES.map(dt => (
                <button key={dt} onClick={() => toggle(dynamicTypes, setTypes, dt)}
                  className={`px-4 py-2 rounded-full border text-sm font-sans transition-all ${
                    dynamicTypes.includes(dt)
                      ? 'border-gold-bright bg-gold/10 text-gold-bright'
                      : 'border-gold-deep/25 bg-leather text-muted hover:border-gold/40'
                  }`}>{dt}</button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div>
            <h1 className="font-display text-2xl gold-text tracking-widest mb-1">Your Interests</h1>
            <p className="font-serif italic text-muted text-sm mb-6">Shown to your matches only.</p>
            <div className="flex flex-wrap gap-2">
              {KINKS.map(k => (
                <button key={k} onClick={() => toggle(kinks, setKinks, k)}
                  className={`px-4 py-2 rounded-full border text-sm font-sans transition-all ${
                    kinks.includes(k)
                      ? 'border-gold-bright bg-gold/10 text-gold-bright'
                      : 'border-gold-deep/25 bg-leather text-muted hover:border-gold/40'
                  }`}>{k}</button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="flex flex-col gap-4">
            <h1 className="font-display text-2xl gold-text tracking-widest mb-1">Privacy First</h1>
            <p className="font-serif italic text-muted text-sm mb-4">You control everything.</p>
            {[
              { val: true,  label: 'Discreet Mode',  desc: 'Only verified Trisk members see your profile.' },
              { val: false, label: 'Standard',        desc: 'Visible to all members. Easier to connect.'    },
            ].map(o => (
              <button key={String(o.val)} onClick={() => setDiscreet(o.val)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  discreet === o.val ? 'border-gold-bright bg-gold/8' : 'border-gold-deep/25 bg-leather'
                }`}>
                <div className="flex gap-3 items-start">
                  <div className={`mt-1 w-4 h-4 rounded-full border-2 flex-shrink-0 ${discreet === o.val ? 'border-gold-bright bg-gold-bright' : 'border-muted'}`} />
                  <div>
                    <p className={`font-display text-sm tracking-wider ${discreet === o.val ? 'text-gold-bright' : 'text-muted'}`}>{o.label}</p>
                    <p className="font-sans text-xs text-dim mt-0.5">{o.desc}</p>
                  </div>
                </div>
              </button>
            ))}
            <div className="card mt-2">
              <p className="font-sans text-[10px] text-muted leading-relaxed">
                🔒 Your safewords, rules, and journal are always private — never shared without your consent.
              </p>
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div className="flex flex-col items-center pt-8 gap-4 text-center">
            <p className="text-5xl opacity-30 mb-2">⟁</p>
            <h1 className="font-display text-3xl gold-text tracking-widest">You're Ready</h1>
            <p className="font-serif italic text-muted text-base leading-relaxed">
              Welcome to Trisk.<br/>Your scene. Your rules. Your dynamic.
            </p>
            <div className="flex gap-8 mt-4">
              {[{ l: 'Track', d: 'Your dynamic' }, { l: 'Scene', d: 'Community' }].map(s => (
                <div key={s.l}>
                  <p className="font-display text-sm text-gold-bright tracking-widest">{s.l}</p>
                  <p className="font-sans text-[9px] text-muted tracking-widest uppercase">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="fixed bottom-0 left-0 right-0 px-5 pb-8 pt-4 bg-void/95 backdrop-blur-sm border-t border-gold-deep/15">
        <button onClick={next} disabled={loading}
          className="btn-gold w-full disabled:opacity-50">
          {loading ? 'Setting up...' : step === 4 ? 'Enter the Scene' : 'Continue'}
        </button>
        {step < 4 && (
          <button onClick={next} className="w-full text-center font-sans text-xs text-dim mt-3 hover:text-muted">
            Skip for now
          </button>
        )}
      </div>
    </main>
  );
}
