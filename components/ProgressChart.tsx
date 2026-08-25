'use client';

import { useMemo, useState } from 'react';

type Point = {
  metric: string;
  value: number | string;
  unit?: string | null;
  logged_at: string;
};

type Labels = {
  title: string;
  empty: string;
  latest: string;
  change: string;
};

const labelsByLocale: Record<string, Labels> = {
  en: { title: 'Progress trend', empty: 'Add at least two progress entries to see a trend.', latest: 'Latest', change: 'Change' },
  fa: { title: 'روند پیشرفت', empty: 'برای دیدن روند حداقل دو رکورد پیشرفت ثبت کنید.', latest: 'آخرین', change: 'تغییر' },
  fr: { title: 'Évolution des progrès', empty: 'Ajoutez au moins deux mesures pour voir une tendance.', latest: 'Dernière', change: 'Évolution' },
  es: { title: 'Tendencia de progreso', empty: 'Añade al menos dos registros para ver una tendencia.', latest: 'Último', change: 'Cambio' },
};

function formatNumber(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

export default function ProgressChart({ points, locale = 'en', compact = false }: { points: Point[]; locale?: string; compact?: boolean }) {
  const grouped = useMemo(() => {
    const map = new Map<string, Point[]>();
    for (const row of points) {
      const value = Number(row.value);
      if (!Number.isFinite(value)) continue;
      const metric = row.metric.trim();
      if (!metric) continue;
      const list = map.get(metric) || [];
      list.push({ ...row, value });
      map.set(metric, list);
    }
    for (const list of map.values()) list.sort((a, b) => +new Date(a.logged_at) - +new Date(b.logged_at));
    return map;
  }, [points]);

  const metrics = [...grouped.keys()];
  const preferred = metrics.find((m) => /weight|وزن|poids|peso/i.test(m)) || metrics[0] || '';
  const [selected, setSelected] = useState(preferred);
  const metric = grouped.has(selected) ? selected : preferred;
  const series = grouped.get(metric) || [];
  const t = labelsByLocale[locale] || labelsByLocale.en;

  if (!series.length) {
    return <div className={`progress-chart ${compact ? 'compact' : ''}`}><div className="progress-chart-head"><h3>{t.title}</h3></div><p className="muted">{t.empty}</p></div>;
  }

  const values = series.map((p) => Number(p.value));
  const minRaw = Math.min(...values);
  const maxRaw = Math.max(...values);
  const spread = Math.max(maxRaw - minRaw, Math.abs(maxRaw) * 0.05, 1);
  const min = minRaw - spread * 0.15;
  const max = maxRaw + spread * 0.15;
  const width = 720;
  const height = compact ? 190 : 270;
  const padX = 34;
  const padY = 24;
  const x = (i: number) => series.length <= 1 ? width / 2 : padX + (i / (series.length - 1)) * (width - padX * 2);
  const y = (v: number) => padY + ((max - v) / Math.max(max - min, 1)) * (height - padY * 2);
  const polyline = series.map((p, i) => `${x(i)},${y(Number(p.value))}`).join(' ');
  const unit = series[series.length - 1]?.unit || '';
  const latest = Number(series[series.length - 1]?.value || 0);
  const first = Number(series[0]?.value || 0);
  const delta = latest - first;

  return <div className={`progress-chart ${compact ? 'compact' : ''}`}>
    <div className="progress-chart-head">
      <div><span className="eyebrow-mini">{t.title}</span><h3>{metric}</h3></div>
      {metrics.length > 1 && !compact && <label className="metric-select"><span className="sr-only">Metric</span><select value={metric} onChange={(e) => setSelected(e.target.value)}>{metrics.map((m) => <option key={m} value={m}>{m}</option>)}</select></label>}
    </div>
    <div className="progress-summary"><span><strong>{formatNumber(latest)} {unit}</strong><small>{t.latest}</small></span>{series.length > 1 && <span><strong>{delta > 0 ? '+' : ''}{formatNumber(delta)} {unit}</strong><small>{t.change}</small></span>}</div>
    {series.length < 2 ? <p className="muted">{t.empty}</p> : <div className="chart-scroll"><svg className="progress-svg" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${metric} ${t.title}`}>
      <line x1={padX} y1={height-padY} x2={width-padX} y2={height-padY} className="chart-axis" />
      <line x1={padX} y1={padY} x2={padX} y2={height-padY} className="chart-axis" />
      <polyline points={polyline} fill="none" className="chart-line" />
      {series.map((p, i) => <g key={`${p.logged_at}-${i}`}><circle cx={x(i)} cy={y(Number(p.value))} r="5" className="chart-dot"><title>{`${new Date(p.logged_at).toLocaleDateString(locale)}: ${formatNumber(Number(p.value))} ${p.unit || ''}`}</title></circle>{(!compact && (i === 0 || i === series.length - 1)) && <text x={x(i)} y={Math.max(y(Number(p.value))-10,14)} textAnchor={i===0?'start':'end'} className="chart-value">{formatNumber(Number(p.value))}</text>}</g>)}
    </svg></div>}
  </div>;
}
