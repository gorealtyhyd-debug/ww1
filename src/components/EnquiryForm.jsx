'use client';
import { useState } from 'react';

const PREFS = ['3 BHK + Media', '4 BHK + Media', 'Site visit'];

export default function EnquiryForm({ compact = false, cta = 'Request a call back', onDone }) {
  const [f, setF] = useState({ name: '', phone: '', pref: '' });
  const [err, setErr] = useState('');
  const [sent, setSent] = useState(false);
  const set = (k, v) => { setF(s => ({ ...s, [k]: v })); setErr(''); };

  const submit = e => {
    e.preventDefault();
    if (f.name.trim().length < 2) return setErr('Please enter your name.');
    if (f.phone.length !== 10) return setErr('Please enter a valid 10-digit mobile number.');
    // TODO: POST to your CRM / lead endpoint here.
    setSent(true); onDone && onDone(f);
  };

  if (sent) return (
    <div className="flex flex-col gap-3 py-2">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-olive text-xl text-ivory">✓</div>
      <p className="font-serif text-[32px] leading-tight">Thank you, {f.name.trim().split(' ')[0]}.</p>
      <p className="text-[15px] leading-relaxed text-soft">Our team will call you on +91 {f.phone} shortly to share pricing and schedule your site visit.</p>
    </div>
  );

  return (
    <form onSubmit={submit} className="flex flex-col gap-3" noValidate>
      <input className="field" value={f.name} onChange={e => set('name', e.target.value)} placeholder="Full name" autoComplete="name" />
      <div className="flex h-[52px] border border-line bg-white focus-within:border-olive">
        <span className="flex items-center border-r border-line px-3.5 text-[15px] text-soft">+91</span>
        <input className="min-w-0 flex-1 bg-transparent px-4 text-[15px] outline-none placeholder:text-faint" inputMode="numeric" autoComplete="tel-national"
          value={f.phone} onChange={e => set('phone', e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="Mobile number" />
      </div>
      {!compact && (
        <div className="flex flex-wrap gap-2">
          {PREFS.map(p => (
            <button type="button" key={p} onClick={() => set('pref', f.pref === p ? '' : p)}
              className={`h-9 whitespace-nowrap rounded-full border px-4 text-[13px] transition-colors ${f.pref === p ? 'border-olive-deep bg-olive-deep text-ivory' : 'border-line text-olive-deep hover:border-olive'}`}>{p}</button>
          ))}
        </div>
      )}
      {err && <p className="text-[13px] text-[#a8432a]">{err}</p>}
      <button type="submit" className="btn-dark mt-1 w-full">{cta}</button>
      <p className="text-center text-[11px] text-muted">Your details are safe with us.</p>
    </form>
  );
}
