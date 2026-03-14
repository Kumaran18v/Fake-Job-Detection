'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiShieldCheck, HiLockClosed, HiClock, HiChartBar, HiFlag } from 'react-icons/hi2';
import { TbRefresh } from 'react-icons/tb';

const features = [
  {
    icon: HiShieldCheck,
    color: 'var(--primary)',
    bg: 'var(--primary-lighter)',
    title: 'Instant Analysis',
    desc: 'Paste any job description and receive a verdict with confidence score in seconds.',
  },
  {
    icon: HiLockClosed,
    color: 'var(--success)',
    bg: 'var(--success-light)',
    title: 'No Login Required',
    desc: 'Analyze jobs freely without creating an account. Sign in to save history.',
  },
  {
    icon: HiClock,
    color: 'var(--primary-light)',
    bg: 'var(--primary-lighter)',
    title: 'Analysis History',
    desc: 'Track all your past analyses with timestamps and verdicts when signed in.',
  },
  {
    icon: HiChartBar,
    color: 'var(--warning)',
    bg: 'var(--warning-light)',
    title: 'Admin Dashboard',
    desc: 'Comprehensive charts, prediction logs, with CSV and PDF export capabilities.',
  },
  {
    icon: TbRefresh,
    color: 'var(--primary)',
    bg: 'var(--primary-lighter)',
    title: 'Model Retraining',
    desc: 'Admins can retrain the ML model directly from the dashboard interface.',
  },
  {
    icon: HiFlag,
    color: 'var(--danger)',
    bg: 'var(--danger-light)',
    title: 'Flag System',
    desc: 'Flag suspicious predictions for admin review and continuous model improvement.',
  },
];

function FeatureCard({ feature, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        background: 'var(--bg-white)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: 'clamp(20px, 2.5vw, 28px)',
        boxShadow: 'var(--shadow-sm)',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        cursor: 'default',
        flex: '1 1 300px',
        minWidth: 0,
      }}
      whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: 'var(--radius-md)',
        background: feature.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 14,
      }}>
        <Icon style={{ fontSize: '1.25rem', color: feature.color }} />
      </div>
      <h3 style={{
        fontFamily: 'var(--font-display)', fontWeight: 600,
        fontSize: '1.05rem', color: 'var(--text-primary)',
        marginBottom: 6, lineHeight: 1.3,
      }}>{feature.title}</h3>
      <p style={{
        fontFamily: 'var(--font-body)', fontSize: '0.88rem',
        color: 'var(--text-secondary)', lineHeight: 1.55,
      }}>{feature.desc}</p>
    </motion.div>
  );
}

export default function Features() {
  return (
    <section
      id="features"
      style={{
        padding: 'clamp(32px, 4vw, 48px) clamp(16px, 4vw, 40px)',
        background: 'var(--bg-primary)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(24px, 3vw, 36px)' }}>
          <span style={{
            fontFamily: 'var(--font-body)', fontWeight: 600,
            fontSize: '0.85rem', color: 'var(--primary)',
            marginBottom: 8, display: 'block',
          }}>Features</span>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            color: 'var(--text-primary)', lineHeight: 1.2,
          }}>Everything you need to stay safe</h2>
        </div>

        <div style={{
          display: 'flex', flexWrap: 'wrap',
          gap: 'clamp(12px, 2vw, 20px)',
        }}>
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
