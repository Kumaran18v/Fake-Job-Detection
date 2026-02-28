'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
    const { user, token } = useAuth();
    const [stats, setStats] = useState(null);
    const [trending, setTrending] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) loadData();
    }, [token]);

    const loadData = async () => {
        setLoading(true);
        try {
            const [statsRes, trendRes] = await Promise.all([
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/my-stats`, { headers: { Authorization: `Bearer ${token}` } }),
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/trending`),
            ]);
            if (statsRes.ok) setStats(await statsRes.json());
            if (trendRes.ok) setTrending(await trendRes.json());
        } catch (err) { console.error('Dashboard load failed:', err); }
        finally { setLoading(false); }
    };

    if (!user) return (
        <div style={{ minHeight: '100vh', paddingTop: 80, background: 'var(--charcoal-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
                <div className="mono" style={{ color: 'var(--red)', marginBottom: 16 }}>■ ACCESS DENIED</div>
                <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--off-white)', fontSize: '2rem', marginBottom: 16 }}>SIGN IN REQUIRED</h2>
                <a href="/login" className="btn-primary" style={{ textDecoration: 'none' }}>ACCESS →</a>
            </div>
        </div>
    );

    return (
        <div style={{ minHeight: '100vh', paddingTop: 80, background: 'var(--charcoal-warm)' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto', padding: '60px 40px' }}>
                <div className="mono" style={{ color: 'var(--teal)', marginBottom: 16 }}>■ PERSONAL DASHBOARD</div>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--off-white)', lineHeight: 0.95, marginBottom: 8 }}>
                    YOUR ANALYTICS.
                </h1>
                <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '0.85rem', color: 'var(--bone-muted)', marginBottom: 48 }}>
                    Welcome back, <span style={{ color: 'var(--off-white)', fontWeight: 600 }}>{user.username}</span>
                    {stats?.member_since && <> — member since {new Date(stats.member_since).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</>}
                </p>

                {loading && (
                    <div className="mono" style={{ color: 'var(--red)', fontSize: '0.72rem', animation: 'blink 1s infinite' }}>■ LOADING ANALYTICS...</div>
                )}

                {stats && (
                    <>
                        {/* ═══ Stat Cards ═══ */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--charcoal-lighter)', marginBottom: 40 }}>
                            {[
                                { label: 'TOTAL ANALYSES', value: stats.total_analyses, color: 'var(--off-white)' },
                                { label: 'FRAUDULENT', value: stats.total_fake, color: 'var(--red)' },
                                { label: 'LEGITIMATE', value: stats.total_real, color: 'var(--teal)' },
                                { label: 'FRAUD RATE', value: `${stats.fraud_rate}%`, color: stats.fraud_rate > 30 ? 'var(--red)' : 'var(--teal)' },
                            ].map(({ label, value, color }) => (
                                <div key={label} style={{ background: 'var(--charcoal)', padding: '28px 24px', textAlign: 'center' }}>
                                    <div className="mono" style={{ fontSize: '0.55rem', marginBottom: 12, color: 'var(--bone-muted)' }}>{label}</div>
                                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color }}>{value}</div>
                                </div>
                            ))}
                        </div>

                        {/* ═══ Secondary Stats ═══ */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--charcoal-lighter)', marginBottom: 40 }}>
                            {[
                                { label: 'AVG CONFIDENCE', value: `${stats.avg_confidence}%`, color: 'var(--off-white)' },
                                { label: 'FEEDBACK GIVEN', value: stats.feedback_given, color: 'var(--bone-dim)' },
                                { label: 'AGREEMENT RATE', value: stats.feedback_given > 0 ? `${Math.round(stats.feedback_agree / stats.feedback_given * 100)}%` : '—', color: 'var(--teal)' },
                            ].map(({ label, value, color }) => (
                                <div key={label} style={{ background: 'var(--charcoal)', padding: '20px 24px', textAlign: 'center' }}>
                                    <div className="mono" style={{ fontSize: '0.55rem', marginBottom: 10, color: 'var(--bone-muted)' }}>{label}</div>
                                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color }}>{value}</div>
                                </div>
                            ))}
                        </div>

                        {/* ═══ Weekly Trend ═══ */}
                        {stats.weekly_trend?.length > 0 && (
                            <div style={{ marginBottom: 40 }}>
                                <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--bone-muted)', marginBottom: 16 }}>■ WEEKLY ACTIVITY</div>
                                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 100, padding: '0 8px' }}>
                                    {stats.weekly_trend.map((w, i) => {
                                        const maxVal = Math.max(...stats.weekly_trend.map(x => x.total), 1);
                                        const h = Math.max(8, (w.total / maxVal) * 100);
                                        const fakeH = w.total > 0 ? (w.fake / w.total) * h : 0;
                                        return (
                                            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                                                <div style={{ width: '100%', position: 'relative', height: h }}>
                                                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: h, background: 'var(--teal)', opacity: 0.6 }} />
                                                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: fakeH, background: 'var(--red)', opacity: 0.8 }} />
                                                </div>
                                                <span className="mono" style={{ fontSize: '0.4rem', color: 'var(--bone-muted)', whiteSpace: 'nowrap' }}>{w.week.split('-W')[1] ? `W${w.week.split('-W')[1]}` : w.week}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
                                    <span className="mono" style={{ fontSize: '0.5rem', color: 'var(--teal)' }}>■ LEGIT</span>
                                    <span className="mono" style={{ fontSize: '0.5rem', color: 'var(--red)' }}>■ FRAUD</span>
                                </div>
                            </div>
                        )}

                        {/* ═══ Recent Predictions ═══ */}
                        {stats.recent_predictions?.length > 0 && (
                            <div style={{ marginBottom: 40 }}>
                                <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--bone-muted)', marginBottom: 12 }}>■ RECENT ANALYSES</div>
                                <div style={{ background: 'var(--charcoal)', border: '1px solid var(--charcoal-lighter)', overflow: 'hidden' }}>
                                    {stats.recent_predictions.map((p, i) => (
                                        <div key={p.id} style={{
                                            display: 'grid', gridTemplateColumns: '1fr 80px 60px 100px',
                                            padding: '12px 16px', borderBottom: i < stats.recent_predictions.length - 1 ? '1px solid var(--charcoal-lighter)' : 'none',
                                            transition: 'background 0.1s', alignItems: 'center',
                                        }}
                                            onMouseEnter={e => e.currentTarget.style.background = 'var(--charcoal-light)'}
                                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                            <div style={{ fontSize: '0.78rem', color: 'var(--bone-dim)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: 12 }}>{p.preview}</div>
                                            <div><span className={p.prediction === 'Fake' ? 'tag-red' : 'tag-teal'} style={{ fontSize: '0.55rem', padding: '2px 8px' }}>{p.prediction === 'Fake' ? 'FRAUD' : 'LEGIT'}</span></div>
                                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: p.prediction === 'Fake' ? 'var(--red)' : 'var(--teal)' }}>{p.confidence}%</div>
                                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--bone-muted)' }}>
                                                {p.created_at ? new Date(p.created_at + 'Z').toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }) : '—'}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* ═══════════ TRENDING SCAM PATTERNS ═══════════ */}
                {trending && trending.total_fake_detected > 0 && (
                    <div>
                        <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--red)', marginBottom: 16 }}>■ TRENDING SCAM PATTERNS (LAST {trending.period_days} DAYS)</div>

                        {/* Pattern bars */}
                        {trending.patterns?.length > 0 && (
                            <div style={{ marginBottom: 32 }}>
                                {trending.patterns.map((p, i) => (
                                    <div key={i} style={{ marginBottom: 8 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--off-white)' }}>
                                                {p.pattern}
                                            </span>
                                            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                                <span className={`mono`} style={{
                                                    fontSize: '0.5rem', padding: '2px 8px',
                                                    background: p.severity === 'high' ? '#e6394620' : p.severity === 'medium' ? '#ff990020' : '#64748b20',
                                                    color: p.severity === 'high' ? '#e63946' : p.severity === 'medium' ? '#ff9900' : '#64748b',
                                                    border: `1px solid ${p.severity === 'high' ? '#e6394640' : p.severity === 'medium' ? '#ff990040' : '#64748b40'}`,
                                                }}>
                                                    {p.severity.toUpperCase()}
                                                </span>
                                                <span className="mono" style={{ fontSize: '0.6rem', color: 'var(--bone-muted)' }}>{p.count} ({p.percentage}%)</span>
                                            </div>
                                        </div>
                                        <div style={{ height: 4, background: 'var(--charcoal-lighter)', overflow: 'hidden' }}>
                                            <div style={{
                                                height: '100%', width: `${p.percentage}%`,
                                                background: p.severity === 'high' ? 'var(--red)' : p.severity === 'medium' ? '#ff9900' : 'var(--bone-muted)',
                                                transition: 'width 0.8s ease',
                                            }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Top keywords */}
                        {trending.top_keywords?.length > 0 && (
                            <div style={{ marginBottom: 32 }}>
                                <div className="mono" style={{ fontSize: '0.55rem', color: 'var(--bone-muted)', marginBottom: 12 }}>TOP FLAGGED KEYWORDS</div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                    {trending.top_keywords.map((kw, i) => (
                                        <span key={i} style={{
                                            fontFamily: 'var(--font-mono)', fontSize: '0.65rem', padding: '6px 12px',
                                            background: 'var(--charcoal)', border: '1px solid var(--charcoal-lighter)',
                                            color: i < 3 ? 'var(--red)' : 'var(--bone-dim)',
                                        }}>
                                            {kw.keyword} <span style={{ color: 'var(--bone-muted)', fontSize: '0.55rem' }}>×{kw.count}</span>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Total detected */}
                        <div style={{ padding: '16px 20px', border: '1px solid var(--charcoal-lighter)', background: 'var(--charcoal)' }}>
                            <span className="mono" style={{ fontSize: '0.6rem', color: 'var(--bone-muted)' }}>
                                TOTAL FRAUD DETECTED: <span style={{ color: 'var(--red)', fontWeight: 600 }}>{trending.total_fake_detected}</span> IN LAST {trending.period_days} DAYS
                            </span>
                        </div>
                    </div>
                )}

                {!stats && !loading && (
                    <div style={{ textAlign: 'center', padding: '80px 0' }}>
                        <div style={{ fontSize: '3rem', marginBottom: 16, opacity: 0.2 }}>📊</div>
                        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--bone-muted)', fontSize: '0.9rem' }}>
                            No data yet. <a href="/analyze" style={{ color: 'var(--teal)', textDecoration: 'underline' }}>Analyze some job posts</a> to see your stats.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
