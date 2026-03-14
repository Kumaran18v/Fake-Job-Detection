'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { HiClipboardDocument, HiCpuChip, HiCheckBadge } from 'react-icons/hi2';
import HeroSection from '@/components/HeroSection';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

/* ── Reusable fade-in wrapper ── */
function FadeIn({ children, delay = 0, ...props }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

const steps = [
  {
    num: '01',
    icon: HiClipboardDocument,
    title: 'Paste',
    desc: 'Copy any job posting text and paste it into the analysis box.',
  },
  {
    num: '02',
    icon: HiCpuChip,
    title: 'Analyze',
    desc: 'Our NLP pipeline processes the text through TF-IDF vectorization and classifiers.',
  },
  {
    num: '03',
    icon: HiCheckBadge,
    title: 'Verdict',
    desc: 'Receive a clear LEGITIMATE or SCAM verdict with a confidence score, instantly.',
  },
];

export default function HomePage() {
  return (
    <main style={{ paddingTop: 64 }}>
      <HeroSection />
      <Features />

      {/* ═══ HOW IT WORKS ═══ */}
      <section style={{
        padding: 'clamp(36px, 5vw, 56px) clamp(16px, 4vw, 40px)',
        background: 'var(--bg-white)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(24px, 3vw, 36px)' }}>
            <span style={{
              fontFamily: 'var(--font-body)', fontWeight: 600,
              fontSize: '0.85rem', color: 'var(--primary)',
              marginBottom: 8, display: 'block',
            }}>How it works</span>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              color: 'var(--text-primary)', lineHeight: 1.2,
            }}>Three simple steps to verify any job posting</h2>
          </div>

          <div style={{
            display: 'flex', flexWrap: 'wrap',
            gap: 'clamp(16px, 2vw, 24px)',
            justifyContent: 'center',
          }}>
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <FadeIn key={step.num} delay={i * 0.1}
                  style={{
                    flex: '1 1 280px', maxWidth: 360,
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'clamp(20px, 2.5vw, 28px)',
                    textAlign: 'center',
                    position: 'relative',
                  }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: 'var(--primary-lighter)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 14px',
                  }}>
                    <Icon style={{ fontSize: '1.3rem', color: 'var(--primary)' }} />
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                    color: 'var(--text-muted)', marginBottom: 4,
                  }}>STEP {step.num}</div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)', fontWeight: 600,
                    fontSize: '1.12rem', color: 'var(--text-primary)',
                    marginBottom: 6,
                  }}>{step.title}</h3>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.88rem',
                    color: 'var(--text-secondary)', lineHeight: 1.55,
                  }}>{step.desc}</p>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ CTA SECTION ═══ */}
      <section style={{
        padding: 'clamp(40px, 5vw, 64px) clamp(16px, 4vw, 40px)',
        background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))',
        textAlign: 'center',
      }}>
        <FadeIn>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
            color: 'white', lineHeight: 1.2,
            marginBottom: 12,
          }}>Ready to check a job posting?</h2>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '1rem',
            color: 'rgba(255,255,255,0.8)',
            marginBottom: 24,
          }}>
            It&apos;s free, instant, and no account required.
          </p>
          <Link href="/analyze" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.95rem',
            padding: '14px 36px', background: 'white', color: 'var(--primary)',
            borderRadius: 'var(--radius-md)', textDecoration: 'none',
            boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}>
            Run Analysis
            <span style={{ fontSize: '1.1rem' }}>→</span>
          </Link>
        </FadeIn>
      </section>

      <Footer />
    </main>
  );
}
