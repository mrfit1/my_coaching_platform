'use client';

import { useState } from 'react';
import { getSupabaseBrowser } from '@/lib/supabase-browser';

export default function LoginPanel({ t, lang }: { t: any; lang: string }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const supabase = getSupabaseBrowser();

  function callbackUrl() {
    const next = encodeURIComponent(`/${lang}/dashboard`);
    return `${location.origin}/auth/callback?next=${next}`;
  }

  async function google() {
    if (!supabase) {
      setMessage('Authentication is ready for Supabase setup. Add the environment keys in Vercel.');
      return;
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: callbackUrl() },
    });

    if (error) setMessage(error.message);
  }

  async function magic(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) {
      setMessage('Authentication is ready for Supabase setup. Add the environment keys in Vercel.');
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: callbackUrl() },
    });

    setMessage(error ? error.message : 'Check your email for the secure sign-in link.');
  }

  return (
    <div className="login-card">
      <button className="btn google" onClick={google}>
        {t.google}
      </button>
      <div className="divider">
        <span>or</span>
      </div>
      <form onSubmit={magic}>
        <label>
          {t.email}
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button className="btn secondary" type="submit">
          {t.magic}
        </button>
      </form>
      {message && <p className="form-status">{message}</p>}
    </div>
  );
}
