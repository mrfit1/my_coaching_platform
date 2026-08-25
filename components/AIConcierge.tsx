'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';

type Lang = 'en' | 'fa' | 'fr' | 'es';
type Message = { role: 'user' | 'assistant'; content: string };

const labels = {
  en: {
    button: 'Ask Coach AI',
    title: 'Coach AI',
    intro: 'How can I help you today?',
    welcome: 'How can I help? Ask about services, online programs, booking, pricing or your next step.',
    placeholder: 'Type your question…',
    send: 'Send',
    voice: 'Speak',
    stop: 'Stop',
    disclaimer: 'General site guidance only — not medical advice.',
    actions: [
      ['Book a Session', 'I want to book a session. Please help me choose the right option.'],
      ['Get a Program', 'I want a workout or nutrition program. Please help me choose the right program.'],
      ['Pricing', 'Please show me the current pricing and package options.'],
      ['Ask a Question', ''],
    ],
  },
  fa: {
    button: 'پرسش از Coach AI',
    title: 'Coach AI',
    intro: 'چطور می‌تونم کمکتون کنم؟',
    welcome: 'درباره خدمات، برنامه آنلاین، رزرو، قیمت‌ها یا قدم بعدی سؤال کنید.',
    placeholder: 'سؤال خود را بنویسید…',
    send: 'ارسال',
    voice: 'صحبت',
    stop: 'توقف',
    disclaimer: 'راهنمای عمومی سایت است و جایگزین مشاوره پزشکی نیست.',
    actions: [
      ['رزرو جلسه', 'می‌خواهم یک جلسه رزرو کنم. لطفاً کمکم کنید گزینه مناسب را انتخاب کنم.'],
      ['دریافت برنامه', 'برای برنامه تمرینی یا تغذیه‌ای راهنمایی می‌خواهم.'],
      ['قیمت‌ها', 'لطفاً قیمت‌ها و پکیج‌های فعلی را توضیح بده.'],
      ['پرسیدن سؤال', ''],
    ],
  },
  fr: {
    button: 'Demander à Coach AI',
    title: 'Coach AI',
    intro: 'Comment puis-je vous aider aujourd’hui ?',
    welcome: 'Posez vos questions sur les services, le coaching en ligne, les réservations, les tarifs ou la prochaine étape.',
    placeholder: 'Écrivez votre question…',
    send: 'Envoyer',
    voice: 'Parler',
    stop: 'Arrêter',
    disclaimer: 'Informations générales seulement — pas un avis médical.',
    actions: [
      ['Réserver une séance', 'Je veux réserver une séance. Aidez-moi à choisir la bonne option.'],
      ['Obtenir un programme', 'Je veux un programme d’entraînement ou de nutrition.'],
      ['Tarifs', 'Montrez-moi les tarifs et forfaits actuels.'],
      ['Poser une question', ''],
    ],
  },
  es: {
    button: 'Preguntar a Coach AI',
    title: 'Coach AI',
    intro: '¿Cómo puedo ayudarte hoy?',
    welcome: 'Pregunta por servicios, coaching online, reservas, precios o el siguiente paso.',
    placeholder: 'Escribe tu pregunta…',
    send: 'Enviar',
    voice: 'Hablar',
    stop: 'Parar',
    disclaimer: 'Orientación general del sitio; no sustituye consejo médico.',
    actions: [
      ['Reservar una sesión', 'Quiero reservar una sesión. Ayúdame a elegir la opción adecuada.'],
      ['Obtener un programa', 'Quiero un programa de entrenamiento o nutrición.'],
      ['Precios', 'Muéstrame los precios y paquetes actuales.'],
      ['Hacer una pregunta', ''],
    ],
  },
} as const;

const AUTO_OPEN_KEY = 'coach-ai-intro-seen';

export default function AIConcierge({ lang }: { lang: Lang }) {
  const t = labels[lang];
  const [open, setOpen] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);
  const [introLeaving, setIntroLeaving] = useState(false);
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: t.welcome },
  ]);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const speechSupported = useMemo(
    () =>
      typeof window !== 'undefined' &&
      Boolean((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition),
    [],
  );

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(AUTO_OPEN_KEY)) return;
      const timer = window.setTimeout(() => {
        setOpen(true);
        window.sessionStorage.setItem(AUTO_OPEN_KEY, '1');
      }, 700);
      return () => window.clearTimeout(timer);
    } catch {
      const timer = window.setTimeout(() => setOpen(true), 700);
      return () => window.clearTimeout(timer);
    }
  }, []);

  function enterChat({ focus = true }: { focus?: boolean } = {}) {
    if (!introVisible) {
      if (focus) window.setTimeout(() => inputRef.current?.focus(), 0);
      return;
    }
    setIntroLeaving(true);
    window.setTimeout(() => {
      setIntroVisible(false);
      setIntroLeaving(false);
      if (focus) inputRef.current?.focus();
    }, 280);
  }

  async function sendText(text: string) {
    const clean = text.trim();
    if (!clean || loading) return;

    const next: Message[] = [...messages, { role: 'user', content: clean }];
    setMessages(next);
    setValue('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/concierge', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ lang, messages: next.slice(-10) }),
      });
      const data = await res.json();
      const reply = String(
        data.answer || data.error || 'Sorry, I could not answer that right now.',
      );
      setMessages((current) => [...current, { role: 'assistant', content: reply }]);
    } catch {
      setMessages((current) => [
        ...current,
        { role: 'assistant', content: 'Sorry, the assistant is temporarily unavailable.' },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function send(e?: FormEvent) {
    e?.preventDefault();
    enterChat({ focus: false });
    await sendText(value);
  }

  function handleQuickAction(prompt: string) {
    enterChat({ focus: !prompt });
    if (!prompt) return;
    window.setTimeout(() => void sendText(prompt), 300);
  }

  function toggleVoice() {
    if (!speechSupported) return;
    enterChat({ focus: false });

    if (listening) {
      recognitionRef.current?.stop();
      return;
    }

    const Ctor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new Ctor();
    recognitionRef.current = recognition;
    recognition.lang = lang === 'fa' ? 'fa-IR' : lang === 'fr' ? 'fr-CA' : lang === 'es' ? 'es-ES' : 'en-CA';
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results?.[0]?.[0]?.transcript || '';
      setValue(transcript);
    };
    recognition.start();
  }

  function speak(text: string) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'fa' ? 'fa-IR' : lang === 'fr' ? 'fr-CA' : lang === 'es' ? 'es-ES' : 'en-CA';
    window.speechSynthesis.speak(utterance);
  }

  return (
    <div className={`ai-concierge ${open ? 'open' : ''}`}>
      <button
        className="ai-launcher"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls="coach-ai-panel"
      >
        {t.button}
      </button>

      {open && (
        <div id="coach-ai-panel" className="ai-panel" role="dialog" aria-label={t.title}>
          <div className="ai-head">
            <div>
              <strong>{t.title}</strong>
              <small>24/7</small>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close Coach AI">
              ×
            </button>
          </div>

          <div className="ai-body">
            {introVisible && (
              <div className={`ai-video-intro ${introLeaving ? 'leaving' : ''}`}>
                <video
                  className="ai-intro-video"
                  src="/media/ai-concierge-intro.mp4"
                  poster="/media/ai-concierge-poster.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                />
                <div className="ai-video-shade" />
                <div className="ai-video-content">
                  <p>{t.intro}</p>
                  <div className="ai-quick-actions">
                    {t.actions.map(([label, prompt]) => (
                      <button key={label} type="button" onClick={() => handleQuickAction(prompt)}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className={`ai-chat-stage ${introVisible ? 'covered' : ''}`} aria-hidden={introVisible}>
              <div className="ai-messages" aria-live="polite">
                {messages.map((message, index) => (
                  <div key={index} className={`ai-message ${message.role}`}>
                    <p>{message.content}</p>
                    {message.role === 'assistant' && (
                      <button
                        className="speak-reply"
                        type="button"
                        onClick={() => speak(message.content)}
                        aria-label="Read reply aloud"
                      >
                        🔊
                      </button>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className="ai-message assistant">
                    <p>…</p>
                  </div>
                )}
              </div>

              <form className="ai-form" onSubmit={send}>
                <input
                  ref={inputRef}
                  value={value}
                  onFocus={() => enterChat({ focus: false })}
                  onChange={(event) => setValue(event.target.value)}
                  placeholder={t.placeholder}
                  aria-label={t.placeholder}
                />
                {speechSupported && (
                  <button type="button" className="voice-btn" onClick={toggleVoice}>
                    {listening ? t.stop : t.voice}
                  </button>
                )}
                <button className="btn small" type="submit">
                  {t.send}
                </button>
              </form>
              <small className="ai-disclaimer">{t.disclaimer}</small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
