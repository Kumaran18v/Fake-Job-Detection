'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { HiArrowRight, HiCheckCircle, HiShieldCheck, HiChartBar, HiClock, HiFlag, HiLockClosed, HiUser } from 'react-icons/hi2';
import { TbRefresh, TbApi } from 'react-icons/tb';
import { RiGithubFill } from 'react-icons/ri';

// Reusable animation component
function FadeIn({ children, delay = 0, ...props }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <main style={{ backgroundColor: 'var(--charcoal)', color: 'var(--off-white)' }}>
      {/* 1. HERO SECTION */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '100px',
        paddingLeft: 'clamp(20px, 4vw, 40px)',
        paddingRight: 'clamp(20px, 4vw, 40px)',
        paddingBottom: 'clamp(60px, 8vw, 100px)',
        textAlign: 'center',
      }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(4rem, 12vw, 9rem)',
            lineHeight: 0.95,
            marginBottom: '24px',
            color: 'var(--off-white)',
          }}
        >
          Hello, JobCheck.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
            fontWeight: 300,
            marginBottom: '48px',
            color: 'var(--bone-dim)',
          }}
        >
          Paste a job. Know the truth.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '32px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Link href="/analyze" className="btn-danger" style={{
            fontSize: '1.1rem',
            padding: '16px 40px',
          }}>
            Try It Now
          </Link>
          <a
            href="https://github.com/Kumaran18v/Fake-Job-Detection"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            style={{
              fontSize: '1.1rem',
              padding: '16px 40px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <RiGithubFill size={20} />
            View on GitHub
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          className="mono"
          style={{
            fontSize: '0.85rem',
            color: 'var(--bone-muted)',
            maxWidth: '600px',
          }}
        >
          Fake job detection powered by NLP. Free. Instant. No login required.
        </motion.p>
      </section>

      {/* 2. HIGHLIGHTS GALLERY */}
      <section style={{
        paddingTop: 'clamp(80px, 10vw, 140px)',
        paddingBottom: 'clamp(80px, 10vw, 140px)',
        overflow: 'hidden',
      }}>
        <FadeIn>
          <div style={{
            display: 'flex',
            gap: '20px',
            overflowX: 'auto',
            paddingLeft: 'clamp(20px, 4vw, 40px)',
            paddingRight: 'clamp(20px, 4vw, 40px)',
            scrollPaddingLeft: 'clamp(20px, 4vw, 40px)',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }} className="hide-scrollbar">
            {[
              { title: 'Instant Analysis', desc: 'Paste any job description, get FAKE or REAL verdict with confidence score', color: 'var(--red)' },
              { title: 'No Login Required', desc: 'Anyone can analyze jobs instantly', color: 'var(--teal)' },
              { title: 'Save Your History', desc: 'Sign in to track your past analyses', color: 'var(--red)' },
              { title: 'Admin Dashboard', desc: 'Charts, logs, CSV & PDF export', color: 'var(--teal)' },
              { title: 'Model Retraining', desc: 'Retrain the ML model directly from the dashboard', color: 'var(--red)' },
              { title: 'Flag Suspicious Results', desc: 'Users can flag predictions for review', color: 'var(--teal)' },
              { title: 'Secure Auth', desc: 'JWT-based login with role-based access', color: 'var(--red)' },
            ].map((item, i) => (
              <div key={i} style={{
                minWidth: '320px',
                backgroundColor: 'var(--charcoal-light)',
                padding: '40px 32px',
                borderRadius: '8px',
                borderTop: `3px solid ${item.color}`,
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.8rem',
                  marginBottom: '16px',
                  color: 'var(--off-white)',
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  color: 'var(--bone-muted)',
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* 3. DESIGN / INTRO SECTION */}
      <section style={{
        paddingTop: 'clamp(100px, 14vw, 140px)',
        paddingBottom: 'clamp(100px, 14vw, 140px)',
        paddingLeft: 'clamp(20px, 4vw, 40px)',
        paddingRight: 'clamp(20px, 4vw, 40px)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <FadeIn>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 8vw, 5.5rem)',
            lineHeight: 1.1,
            marginBottom: '40px',
            background: 'linear-gradient(180deg, var(--off-white) 0%, var(--bone-dim) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            maxWidth: '800px',
          }}>
            Protect Yourself. Instantly.
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            lineHeight: 1.7,
            color: 'var(--bone-dim)',
            maxWidth: '800px',
            marginBottom: '40px',
          }}>
            JobCheck is an AI-powered platform that analyzes job postings in real time, exposing fraudulent listings before they can harm you. Built with NLP, trained on real data, and designed for everyone.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <a href="#how-it-works" style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.1rem',
            color: 'var(--red)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            transition: 'gap 0.3s ease',
          }} onMouseEnter={(e) => e.currentTarget.style.gap = '12px'}
            onMouseLeave={(e) => e.currentTarget.style.gap = '8px'}>
            See How It Works <HiArrowRight size={20} />
          </a>
        </FadeIn>
      </section>

      {/* 4. PRODUCT VIEWER */}
      <section style={{
        paddingTop: 'clamp(80px, 10vw, 120px)',
        paddingBottom: 'clamp(80px, 10vw, 120px)',
        paddingLeft: 'clamp(20px, 4vw, 40px)',
        paddingRight: 'clamp(20px, 4vw, 40px)',
      }}>
        <FadeIn>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <p className="mono" style={{
              fontSize: '0.75rem',
              color: 'var(--red)',
              letterSpacing: '0.15em',
              marginBottom: '16px',
            }}>
              PRODUCT
            </p>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              marginBottom: '60px',
              color: 'var(--off-white)',
            }}>
              Take a closer look.
            </h2>

            <div style={{
              display: 'flex',
              gap: '32px',
              marginBottom: '40px',
              borderBottom: '1px solid var(--charcoal-lighter)',
              flexWrap: 'wrap',
            }}>
              {['Analyze', 'Verdict', 'Dashboard', 'History', 'Flag'].map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.1rem',
                    padding: '16px 8px',
                    background: 'none',
                    border: 'none',
                    color: activeTab === i ? 'var(--off-white)' : 'var(--bone-muted)',
                    cursor: 'pointer',
                    borderBottom: activeTab === i ? '2px solid var(--red)' : '2px solid transparent',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div style={{ minHeight: '400px', position: 'relative' }}>
              <AnimatePresence mode="wait">
                {activeTab === 0 && (
                  <motion.div
                    key="analyze"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2rem',
                      marginBottom: '16px',
                      color: 'var(--off-white)',
                    }}>
                      Paste. Analyze. Know.
                    </h3>
                    <div style={{
                      backgroundColor: 'var(--charcoal-light)',
                      padding: '32px',
                      borderRadius: '8px',
                      border: '1px solid var(--charcoal-lighter)',
                      marginTop: '32px',
                    }}>
                      <div style={{
                        backgroundColor: 'var(--charcoal-warm)',
                        padding: '24px',
                        borderRadius: '4px',
                        minHeight: '200px',
                        marginBottom: '20px',
                        border: '1px solid var(--charcoal-lighter)',
                      }}>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.9rem',
                          color: 'var(--bone-muted)',
                          fontStyle: 'italic',
                        }}>
                          Paste job description here...
                        </p>
                      </div>
                      <button className="btn-danger" style={{
                        width: '100%',
                        padding: '16px',
                        fontSize: '1rem',
                      }}>
                        RUN ANALYSIS
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeTab === 1 && (
                  <motion.div
                    key="verdict"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2rem',
                      marginBottom: '16px',
                      color: 'var(--off-white)',
                    }}>
                      FAKE or REAL, instantly.
                    </h3>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '300px',
                      flexDirection: 'column',
                      gap: '24px',
                    }}>
                      <motion.div
                        className="verdict-stamp verdict-legit"
                        initial={{ opacity: 0, scale: 1.5, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: -3 }}
                        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                        style={{
                          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        }}
                      >
                        LEGITIMATE
                      </motion.div>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mono"
                        style={{
                          fontSize: '1.2rem',
                          color: 'var(--green)',
                        }}
                      >
                        94.2% CONFIDENCE
                      </motion.p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 2 && (
                  <motion.div
                    key="dashboard"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2rem',
                      marginBottom: '16px',
                      color: 'var(--off-white)',
                    }}>
                      Full visibility for admins.
                    </h3>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                      gap: '20px',
                      marginTop: '32px',
                    }}>
                      {['Prediction Distribution', 'Daily Activity', 'Model Performance'].map((label, i) => (
                        <div key={i} style={{
                          backgroundColor: 'var(--charcoal-light)',
                          padding: '32px',
                          borderRadius: '8px',
                          border: '1px solid var(--charcoal-lighter)',
                          minHeight: '200px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          <div style={{
                            width: '100%',
                            height: '120px',
                            backgroundColor: 'var(--charcoal-warm)',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                            <HiChartBar size={40} style={{ color: 'var(--bone-muted)' }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 3 && (
                  <motion.div
                    key="history"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2rem',
                      marginBottom: '16px',
                      color: 'var(--off-white)',
                    }}>
                      Your past analyses, saved.
                    </h3>
                    <div style={{ marginTop: '32px' }}>
                      {[
                        { date: '2024-01-15', snippet: 'Senior Developer at TechCorp...', verdict: 'LEGITIMATE' },
                        { date: '2024-01-14', snippet: 'Work from home opportunity...', verdict: 'SCAM' },
                        { date: '2024-01-13', snippet: 'Marketing Manager position...', verdict: 'LEGITIMATE' },
                      ].map((item, i) => (
                        <div key={i} style={{
                          backgroundColor: 'var(--charcoal-light)',
                          padding: '24px',
                          marginBottom: '12px',
                          borderRadius: '8px',
                          border: '1px solid var(--charcoal-lighter)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: '16px',
                        }}>
                          <div>
                            <p className="mono" style={{ fontSize: '0.8rem', color: 'var(--bone-muted)', marginBottom: '8px' }}>
                              {item.date}
                            </p>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--bone-dim)' }}>
                              {item.snippet}
                            </p>
                          </div>
                          <span className={item.verdict === 'LEGITIMATE' ? 'tag-green' : 'tag-red'}>
                            {item.verdict}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 4 && (
                  <motion.div
                    key="flag"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2rem',
                      marginBottom: '16px',
                      color: 'var(--off-white)',
                    }}>
                      Something off? Flag it.
                    </h3>
                    <div style={{
                      backgroundColor: 'var(--charcoal-light)',
                      padding: '48px 32px',
                      borderRadius: '8px',
                      border: '1px solid var(--charcoal-lighter)',
                      marginTop: '32px',
                      textAlign: 'center',
                    }}>
                      <HiFlag size={48} style={{ color: 'var(--red)', marginBottom: '24px' }} />
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '1rem',
                        color: 'var(--bone-dim)',
                        marginBottom: '24px',
                      }}>
                        If a prediction seems incorrect, flag it for admin review.
                      </p>
                      <button className="btn-outline" style={{ padding: '12px 32px' }}>
                        FLAG THIS RESULT
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 5. PERFORMANCE / ML SECTION */}
      <section style={{
        paddingTop: 'clamp(60px, 8vw, 100px)',
        paddingBottom: 'clamp(60px, 8vw, 100px)',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          paddingLeft: 'clamp(20px, 4vw, 40px)',
          paddingRight: 'clamp(20px, 4vw, 40px)',
        }}>
          <FadeIn>
            <p className="mono" style={{
              fontSize: '0.75rem',
              color: 'var(--red)',
              letterSpacing: '0.15em',
              marginBottom: '16px',
            }}>
              ML PIPELINE
            </p>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              marginBottom: '24px',
              color: 'var(--off-white)',
            }}>
              The engine behind the verdict.
            </h2>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'var(--bone-dim)',
              marginBottom: '80px',
              maxWidth: '800px',
            }}>
              JobCheck uses a multi-model NLP pipeline to classify job postings with high accuracy.
            </p>
          </FadeIn>

          <div>
            {[
              {
                num: '01',
                title: 'TF-IDF Vectorization',
                subtitle: 'Text transformed into meaning.',
                desc: 'Converts job text into n-gram (1,2) feature vectors using TF-IDF vectorization.',
              },
              {
                num: '02',
                title: 'Three Classifiers',
                subtitle: 'Logistic Regression. Random Forest. Gradient Boosting.',
                desc: 'All three models are trained simultaneously on the same data, each bringing different strengths.',
              },
              {
                num: '03',
                title: 'Best Model Wins',
                subtitle: 'Only the top performer is deployed.',
                desc: 'The model with the highest F1 score is automatically selected and saved for inference.',
              },
            ].map((chapter, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div style={{
                  borderTop: '1px solid var(--charcoal-lighter)',
                  paddingTop: '60px',
                  paddingBottom: '60px',
                }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gap: '40px',
                    alignItems: 'start',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(3rem, 6vw, 4rem)',
                      color: 'var(--charcoal-lighter)',
                      lineHeight: 1,
                    }}>
                      {chapter.num}
                    </span>
                    <div>
                      <h3 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                        marginBottom: '12px',
                        color: 'var(--off-white)',
                      }}>
                        {chapter.title}
                      </h3>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '1.1rem',
                        color: 'var(--bone-dim)',
                        marginBottom: '16px',
                      }}>
                        {chapter.subtitle}
                      </p>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.95rem',
                        color: 'var(--bone-muted)',
                        lineHeight: 1.7,
                      }}>
                        {chapter.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS */}
      <section id="how-it-works" style={{
        paddingTop: 'clamp(80px, 10vw, 120px)',
        paddingBottom: 'clamp(80px, 10vw, 120px)',
        paddingLeft: 'clamp(20px, 4vw, 40px)',
        paddingRight: 'clamp(20px, 4vw, 40px)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <FadeIn>
            <p className="mono" style={{
              fontSize: '0.75rem',
              color: 'var(--teal)',
              letterSpacing: '0.15em',
              marginBottom: '16px',
            }}>
              HOW IT WORKS
            </p>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              marginBottom: '60px',
              color: 'var(--off-white)',
            }}>
              Three steps. Zero guesswork.
            </h2>
          </FadeIn>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            {[
              {
                num: '01',
                title: 'Paste',
                desc: 'Copy any job posting text and paste it into the analysis box.',
              },
              {
                num: '02',
                title: 'Analyze',
                desc: 'Our NLP pipeline processes the text through TF-IDF and classifiers.',
              },
              {
                num: '03',
                title: 'Verdict',
                desc: 'Receive LEGITIMATE or SCAM verdict with a confidence score, instantly.',
              },
            ].map((step, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{
                  backgroundColor: 'var(--charcoal-light)',
                  padding: '48px 36px',
                  borderRadius: '8px',
                  border: '1px solid var(--charcoal-lighter)',
                }}>
                  <p className="mono" style={{
                    fontSize: '0.75rem',
                    color: 'var(--teal)',
                    letterSpacing: '0.15em',
                    marginBottom: '16px',
                  }}>
                    STEP {step.num}
                  </p>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2rem',
                    marginBottom: '16px',
                    color: 'var(--off-white)',
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    lineHeight: 1.7,
                    color: 'var(--bone-muted)',
                  }}>
                    {step.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 7. API SECTION */}
      <section style={{
        paddingTop: 'clamp(80px, 10vw, 120px)',
        paddingBottom: 'clamp(80px, 10vw, 120px)',
        paddingLeft: 'clamp(20px, 4vw, 40px)',
        paddingRight: 'clamp(20px, 4vw, 40px)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <FadeIn>
            <p className="mono" style={{
              fontSize: '0.75rem',
              color: 'var(--teal)',
              letterSpacing: '0.15em',
              marginBottom: '16px',
            }}>
              API
            </p>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              marginBottom: '24px',
              color: 'var(--off-white)',
            }}>
              From paste to verdict.
            </h2>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'var(--bone-dim)',
              marginBottom: '60px',
              maxWidth: '800px',
            }}>
              JobCheck exposes a clean REST API for developers. Integrate job fraud detection into your own apps.
            </p>
          </FadeIn>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { method: 'POST', path: '/api/predict', desc: 'Analyze a job posting', tag: 'OPTIONAL AUTH', tagColor: 'var(--teal)' },
              { method: 'GET', path: '/api/stats', desc: 'Dashboard statistics', tag: 'PUBLIC', tagColor: 'var(--green)' },
              { method: 'GET', path: '/api/my-predictions', desc: "Current user's history", tag: 'AUTH REQUIRED', tagColor: 'var(--red)' },
              { method: 'POST', path: '/api/flag', desc: 'Flag a prediction', tag: 'OPTIONAL AUTH', tagColor: 'var(--teal)' },
              { method: 'POST', path: '/api/retrain', desc: 'Retrain ML model', tag: 'ADMIN ONLY', tagColor: 'var(--red)' },
            ].map((endpoint, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div style={{
                  backgroundColor: 'var(--charcoal-light)',
                  padding: '24px 32px',
                  borderRadius: '8px',
                  border: '1px solid var(--charcoal-lighter)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px',
                }}>
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flex: '1', flexWrap: 'wrap' }}>
                    <span className="mono" style={{
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      color: endpoint.method === 'POST' ? 'var(--red)' : 'var(--teal)',
                    }}>
                      {endpoint.method}
                    </span>
                    <span className="mono" style={{
                      fontSize: '0.9rem',
                      color: 'var(--off-white)',
                    }}>
                      {endpoint.path}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      color: 'var(--bone-muted)',
                    }}>
                      {endpoint.desc}
                    </span>
                  </div>
                  <span className="mono" style={{
                    fontSize: '0.7rem',
                    padding: '6px 12px',
                    backgroundColor: 'var(--charcoal-warm)',
                    border: `1px solid ${endpoint.tagColor}`,
                    color: endpoint.tagColor,
                    borderRadius: '4px',
                  }}>
                    {endpoint.tag}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TECH STACK */}
      <section style={{
        paddingTop: 'clamp(80px, 10vw, 120px)',
        paddingBottom: 'clamp(80px, 10vw, 120px)',
        paddingLeft: 'clamp(20px, 4vw, 40px)',
        paddingRight: 'clamp(20px, 4vw, 40px)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <FadeIn>
            <p className="mono" style={{
              fontSize: '0.75rem',
              color: 'var(--bone-muted)',
              letterSpacing: '0.15em',
              marginBottom: '16px',
            }}>
              TECH STACK
            </p>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              marginBottom: '60px',
              color: 'var(--off-white)',
            }}>
              Built with the right tools.
            </h2>
          </FadeIn>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
          }}>
            {[
              { name: 'Next.js 15 + React', desc: 'Frontend framework' },
              { name: 'Tailwind CSS', desc: 'Utility-first styling' },
              { name: 'Framer Motion', desc: 'Animations' },
              { name: 'Recharts', desc: 'Dashboard charts' },
              { name: 'FastAPI', desc: 'Backend API' },
              { name: 'SQLAlchemy + SQLite', desc: 'Database ORM' },
              { name: 'scikit-learn', desc: 'ML classifiers' },
              { name: 'TF-IDF + NLTK', desc: 'Text preprocessing' },
              { name: 'JWT + bcrypt', desc: 'Secure authentication' },
              { name: 'jsPDF + html2canvas', desc: 'PDF export' },
            ].map((tech, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div style={{
                  backgroundColor: 'var(--charcoal-light)',
                  padding: '32px 24px',
                  borderRadius: '8px',
                  border: '1px solid var(--charcoal-lighter)',
                }}>
                  <h3 className="mono" style={{
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    color: 'var(--off-white)',
                    marginBottom: '12px',
                  }}>
                    {tech.name}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem',
                    color: 'var(--bone-muted)',
                  }}>
                    {tech.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 9. WHY JOBCHECK */}
      <section style={{
        paddingTop: 'clamp(80px, 10vw, 120px)',
        paddingBottom: 'clamp(80px, 10vw, 120px)',
        paddingLeft: 'clamp(20px, 4vw, 40px)',
        paddingRight: 'clamp(20px, 4vw, 40px)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <FadeIn>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              marginBottom: '60px',
              color: 'var(--off-white)',
            }}>
              Why JobCheck?
            </h2>
          </FadeIn>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}>
            {[
              { title: 'Free to Use', desc: 'No cost, no account required for basic analysis.' },
              { title: 'No Data Stored (Guest)', desc: 'Guest analyses are not saved.' },
              { title: 'Admin Controls', desc: 'Full dashboard with retrain capability.' },
              { title: 'Open Source', desc: 'Available on GitHub for inspection and contribution.' },
              { title: 'Multi-Model ML', desc: 'Three classifiers compete, best one wins.' },
              { title: 'Confidence Scores', desc: 'Every verdict comes with a probability score.' },
            ].map((feature, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{
                  backgroundColor: 'var(--charcoal)',
                  border: '1px solid var(--charcoal-lighter)',
                  padding: '40px 32px',
                  borderRadius: '8px',
                }}>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    marginBottom: '16px',
                    color: 'var(--off-white)',
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    lineHeight: 1.7,
                    color: 'var(--bone-muted)',
                  }}>
                    {feature.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer style={{
        borderTop: '1px solid var(--charcoal-lighter)',
        paddingTop: '60px',
        paddingBottom: '60px',
        paddingLeft: 'clamp(20px, 4vw, 40px)',
        paddingRight: 'clamp(20px, 4vw, 40px)',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          marginBottom: '60px',
        }}>
          <div>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2rem',
              marginBottom: '12px',
              color: 'var(--off-white)',
            }}>
              JOBCHECK
            </h3>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              color: 'var(--bone-muted)',
            }}>
              Fight job fraud with AI.
            </p>
          </div>

          <div>
            <h4 style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              color: 'var(--bone-dim)',
              marginBottom: '16px',
            }}>
              Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="https://github.com/Kumaran18v/Fake-Job-Detection" target="_blank" rel="noopener noreferrer" style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                color: 'var(--bone-muted)',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
              }}>
                GitHub
              </a>
              <a href="http://localhost:8000/docs" target="_blank" rel="noopener noreferrer" style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                color: 'var(--bone-muted)',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
              }}>
                API Docs
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                color: 'var(--bone-muted)',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
              }}>
                Overview
              </a>
              <a href="#how-it-works" style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                color: 'var(--bone-muted)',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
              }}>
                Features
              </a>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid var(--charcoal-lighter)',
          paddingTop: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            color: 'var(--bone-muted)',
          }}>
            Built for educational and demonstration purposes.
          </p>
          <p className="mono" style={{
            fontSize: '0.75rem',
            color: 'var(--bone-muted)',
          }}>
            Next.js · FastAPI · scikit-learn
          </p>
        </div>
      </footer>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}
